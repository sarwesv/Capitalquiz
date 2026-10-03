/* ============================================================
   firebase.js — Firebase Authentication & Firestore Cloud Sync
   Uses ES modules imported directly from official Firebase CDN.
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  deleteUser
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let app = null;
let auth = null;
let db = null;
let currentUser = null;
let syncStatusCallback = null;
let authChangedCallback = null;
let unsubscribeFirestore = null;

function setSyncStatus(status, details) {
  if (typeof syncStatusCallback === "function") {
    syncStatusCallback(status, details);
  }
}

export function initFirebase(onAuthChanged, onSyncStatus) {
  authChangedCallback = onAuthChanged;
  syncStatusCallback = onSyncStatus;

  if (!window.isFirebaseConfigured || !window.isFirebaseConfigured()) {
    console.warn("Capitals Quest: Firebase config missing or contains placeholders. Running in offline/guest mode.");
    setSyncStatus("offline", "Config unconfigured");
    if (typeof authChangedCallback === "function") {
      authChangedCallback(null);
    }
    return false;
  }

  try {
    app = initializeApp(window.FIREBASE_CONFIG);
    auth = getAuth(app);
    db = getFirestore(app);

    getRedirectResult(auth).then((result) => {
      if (result && result.user) {
        setSyncStatus("synced", "Signed in");
      }
    }).catch((err) => {
      console.warn("Redirect result handler:", err);
    });

    onAuthStateChanged(auth, (user) => {
      currentUser = user;
      if (typeof authChangedCallback === "function") {
        authChangedCallback(user);
      }
      if (user) {
        listenToCloudSave(user.uid);
      } else {
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
          unsubscribeFirestore = null;
        }
        setSyncStatus("offline", "Logged out");
      }
    });

    return true;
  } catch (err) {
    console.error("Failed to initialize Firebase:", err);
    setSyncStatus("error", err.message);
    return false;
  }
}

export async function signInWithGoogle() {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Please check your credentials in js/firebase-config.js.");
  }

  const provider = new GoogleAuthProvider();
  setSyncStatus("syncing", "Signing in with Google...");

  try {
    const result = await signInWithPopup(auth, provider);
    if (result && result.user) {
      setSyncStatus("synced", "Signed in");
      return result.user;
    }
  } catch (error) {
    if (error.code === "auth/popup-blocked") {
      console.warn("Sign-in popup was blocked by browser. Falling back to redirect...", error);
      setSyncStatus("syncing", "Redirecting to Google...");
      await signInWithRedirect(auth, provider);
      return;
    } else if (error.code === "auth/popup-closed-by-user") {
      setSyncStatus("offline", "Sign-in cancelled");
      return;
    } else if (error.code === "auth/unauthorized-domain") {
      const msg = "Domain (" + window.location.hostname + ") is not authorized in Firebase Console under Auth > Settings > Authorized domains.";
      setSyncStatus("error", msg);
      throw new Error(msg);
    }
    console.error("Google sign-in error:", error);
    setSyncStatus("error", error.message);
    throw error;
  }
}

export async function signOutUser() {
  if (!auth) return;
  if (unsubscribeFirestore) {
    unsubscribeFirestore();
    unsubscribeFirestore = null;
  }
  try {
    await signOut(auth);
    currentUser = null;
    setSyncStatus("offline", "Signed out");
  } catch (err) {
    console.error("Sign-out error:", err);
    throw err;
  }
}

export async function fetchCloudSave(uid) {
  if (!db || !uid) return null;
  try {
    setSyncStatus("syncing", "Fetching cloud data...");
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    setSyncStatus("synced", "Data retrieved");
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    console.error("Error fetching cloud save:", err);
    setSyncStatus("error", err.message);
    return null;
  }
}

export async function saveCloudSave(uid, data) {
  if (!db || !uid) return;
  try {
    setSyncStatus("syncing", "Saving to cloud...");
    const ref = doc(db, "users", uid);
    await setDoc(ref, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    setSyncStatus("synced", "Synced to cloud");
  } catch (err) {
    console.error("Error saving cloud save:", err);
    setSyncStatus("error", err.message);
  }
}

function listenToCloudSave(uid) {
  if (!db || !uid) return;
  if (unsubscribeFirestore) {
    unsubscribeFirestore();
  }
  const ref = doc(db, "users", uid);
  unsubscribeFirestore = onSnapshot(ref, (snap) => {
    // Our own write coming straight back: nothing new to merge.
    if (snap.metadata.hasPendingWrites) return;
    if (snap.exists()) {
      setSyncStatus("synced", "Cloud synced");
      const event = new CustomEvent("firebaseCloudSaveReceived", { detail: snap.data() });
      window.dispatchEvent(event);
    }
  }, (err) => {
    console.error("Firestore real-time listener error:", err);
    setSyncStatus("error", err.message);
  });
}

// When the save last changed. Older cloud copies only have `updatedAt`.
function savedAtMs(save) {
  return save.modifiedAt || Date.parse(save.updatedAt) || 0;
}

export function mergeSaves(localSave, cloudSave) {
  if (!cloudSave) return { ...localSave };
  if (!localSave) return { ...cloudSave };

  const merged = { ...cloudSave, ...localSave };
  merged.modifiedAt = Math.max(savedAtMs(localSave), savedAtMs(cloudSave));
  merged.bestStreak = Math.max(localSave.bestStreak || 0, cloudSave.bestStreak || 0);

  // Coins and animals go up AND down (buying, selling), so "keep the bigger
  // number" would hand back spent coins and sold animals whenever an older
  // copy arrives. Take both from whichever copy changed most recently.
  const localIsNewer = savedAtMs(localSave) >= savedAtMs(cloudSave);
  const newer = localIsNewer ? localSave : cloudSave;
  const older = localIsNewer ? cloudSave : localSave;
  merged.collection = { ...(newer.collection || {}) };
  merged.coins = newer.coins || 0;
  merged.miniGame = newer.miniGame || { day: "", coins: 0 };

  // Per-state progress only ever grows, so combine both copies. The one-time
  // reward flags must survive (they stop coins being paid twice), and a reward
  // earned on the older copy but unknown to the newer one is added to coins.
  const rewards = window.COIN_REWARDS || {};
  merged.progress = {};
  const abbrs = new Set([
    ...Object.keys(localSave.progress || {}),
    ...Object.keys(cloudSave.progress || {})
  ]);
  abbrs.forEach((abbr) => {
    const loc = (localSave.progress || {})[abbr] || {};
    const cloud = (cloudSave.progress || {})[abbr] || {};
    const p = { ...cloud, ...loc };
    p.seen = !!(loc.seen || cloud.seen);
    p.correct = Math.max(loc.correct || 0, cloud.correct || 0);
    p.attempts = Math.max(loc.attempts || 0, cloud.attempts || 0);
    p.mastered = !!(loc.mastered || cloud.mastered);
    if (loc.perfectSeen || cloud.perfectSeen) p.perfectSeen = true;
    Object.keys(rewards).forEach((flag) => {
      p[flag] = !!(loc[flag] || cloud[flag]);
      const inNewer = ((newer.progress || {})[abbr] || {})[flag];
      const inOlder = ((older.progress || {})[abbr] || {})[flag];
      if (inOlder && !inNewer) merged.coins += rewards[flag];
    });
    merged.progress[abbr] = p;
  });

  const combinedHistory = [...(cloudSave.quizHistory || []), ...(localSave.quizHistory || [])];
  const historyMap = new Map();
  combinedHistory.forEach((h) => {
    const key = `${h.date}_${h.score}_${h.total}`;
    if (!historyMap.has(key)) historyMap.set(key, h);
  });
  merged.quizHistory = Array.from(historyMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));

  const combinedActivity = [...(cloudSave.activityLog || []), ...(localSave.activityLog || [])];
  const activityMap = new Map();
  combinedActivity.forEach((a) => {
    const key = `${a.date}_${a.type}_${a.durationMs}`;
    if (!activityMap.has(key)) activityMap.set(key, a);
  });
  merged.activityLog = Array.from(activityMap.values()).sort((a, b) => new Date(b.date) - new Date(a.date));

  merged.neomorphism = localSave.neomorphism !== undefined ? localSave.neomorphism : cloudSave.neomorphism;
  merged.theme = localSave.theme || cloudSave.theme || "auto";
  merged.answerLayout = localSave.answerLayout || cloudSave.answerLayout || "grid";
  merged.tutorialDone = localSave.tutorialDone || cloudSave.tutorialDone || false;

  return merged;
}

export async function setPersistenceMode(local) {
  if (!auth) return;
  try {
    await setPersistence(auth, local ? browserLocalPersistence : browserSessionPersistence);
  } catch (err) {
    console.error("setPersistence error:", err);
  }
}

export async function deleteCurrentUser() {
  if (!auth || !currentUser) throw new Error("Not signed in");
  await deleteUser(currentUser);
}

window.FirebaseService = {
  initFirebase,
  signInWithGoogle,
  signOutUser,
  fetchCloudSave,
  saveCloudSave,
  mergeSaves,
  setPersistenceMode,
  deleteCurrentUser,
  getCurrentUser: () => currentUser
};

window.dispatchEvent(new CustomEvent("firebaseServiceReady"));

