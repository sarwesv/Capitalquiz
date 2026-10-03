/* ============================================================
   storage.js — Everything that touches localStorage lives here.
   Keeps the rest of the app from worrying about save/load.
   ============================================================ */

const STORAGE_KEY = "capitalsquest.v1";
const LEGACY_STORAGE_KEY = "prodigymind.v1";

// The shape of a brand-new save file.
function defaultSave() {
  return {
    sound: true,               // Sound effects enabled by default.
    tutorialDone: false,       // Have we shown the arrow tutorial yet?
    neomorphism: true,         // Soft "neomorphism" look on or off.
    // Per-state mastery. Each entry: { seen, correct, attempts, mastered }
    progress: {},
    coins: 0,                  // spendable currency earned from lessons/quizzes.
    miniGame: { day: "", coins: 0 }, // coins earned from mini games on `day` (YYYY-MM-DD, local) — capped per day.
    modifiedAt: 0,             // ms timestamp of the last change; the cloud merge uses it to pick the newer coins/collection.
    collection: {},            // { animalId: count } — duplicates allowed!
    quizHistory: [],           // [{ date, score, total }] for the chart.
    bestStreak: 0,             // longest correct streak ever.
    theme: "auto",             // "auto" | "light" | "dark".
    answerLayout: "grid",      // quiz answers: "grid" (2x2 squares) | "stack".
    historyOpen: false,        // is the Time-on-Task history list expanded?
    shopOpen: true,            // is the Pack Shop body expanded?
    collectionOpen: true,      // is the My Collection body expanded?
    // Time-on-task log. Each entry:
    // { type:"lesson"|"quiz", quizMode, date, durationMs, states:[abbr],
    //   score, total }
    activityLog: [],
    // Quizzes you exited part-way and can resume from the home screen.
    // Each: { id, quizMode, order:[abbr], idx, score, streak, sessionCoins,
    //         elapsedMs, savedAt }
    pausedQuizzes: [],
    currentSubject: "capitals",  // active subject id
    subjectProgress: {},         // { subjectId: { itemId: { correct, attempts } } }
    staySignedIn: true,     // keep Firebase session across browser closes
    profileAvatar: null,    // null = Google photo; animal id = use that animal emoji
  };
}

// Total milliseconds spent across every logged activity.
function totalTimeOnTask(save) {
  return (save.activityLog || []).reduce((sum, a) => sum + (a.durationMs || 0), 0);
}

// How many DIFFERENT animals the learner has collected.
function uniqueAnimalCount(save) {
  return Object.keys(save.collection).filter((id) => save.collection[id] > 0).length;
}

// Add one animal to the collection and return its new count.
function addAnimal(save, id) {
  save.collection[id] = (save.collection[id] || 0) + 1;
  return save.collection[id];
}

// Load the save, filling in any missing fields (forward compatible).
function loadSave() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
  } catch (e) {
    data = null;
  }
  return Object.assign(defaultSave(), data || {});
}

// Write the whole save back to disk (and trigger cloud sync if authenticated).
// `opts.keepStamp` saves without touching modifiedAt (used when we are only
// storing the result of a cloud merge, not a change the player made).
function persist(save, opts) {
  if (!(opts && opts.keepStamp)) save.modifiedAt = Date.now();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
  } catch (e) {
    // Storage might be full or blocked (private mode) — fail quietly.
    console.warn("Could not save progress:", e);
  }

  // Trigger cloud sync if user is authenticated with Firebase
  if (window.FirebaseService && typeof window.FirebaseService.getCurrentUser === "function") {
    const user = window.FirebaseService.getCurrentUser();
    if (user && user.uid) {
      window.FirebaseService.saveCloudSave(user.uid, save);
    }
  }
}

// Get (or create) the progress record for one state.
function stateProgress(save, abbr) {
  if (!save.progress) save.progress = {};
  if (!save.progress[abbr]) {
    save.progress[abbr] = { seen: false, correct: 0, attempts: 0, mastered: false };
  }
  return save.progress[abbr];
}

// Count how many states are fully mastered.
function masteredCount(save) {
  if (!save.progress) return 0;
  return Object.values(save.progress).filter((p) => p && p.mastered).length;
}

// Wipe everything (used by the "reset progress" button in settings).
function clearSave() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (e) {
    console.warn("Could not clear storage:", e);
  }
}

// Get (or create) the progress record for a non-capitals subject item.
function getItemProgress(save, subjectId, itemId) {
  if (!save.subjectProgress) save.subjectProgress = {};
  if (!save.subjectProgress[subjectId]) save.subjectProgress[subjectId] = {};
  if (!save.subjectProgress[subjectId][itemId]) {
    save.subjectProgress[subjectId][itemId] = { correct: 0, attempts: 0 };
  }
  return save.subjectProgress[subjectId][itemId];
}
