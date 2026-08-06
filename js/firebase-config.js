/* ============================================================
   firebase-config.js — Firebase configuration settings.
   Auto-configured for project: capitals-quest-app
   ============================================================ */

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCE1E2a4nQYYQE70GLGSmT8UKnSay0C_Sc",
  authDomain: "capitals-quest-app.firebaseapp.com",
  projectId: "capitals-quest-app",
  storageBucket: "capitals-quest-app.firebasestorage.app",
  messagingSenderId: "841194447405",
  appId: "1:841194447405:web:6d4610b5da888e6533cea4"
};

// Check if credentials are valid (non-placeholder)
window.isFirebaseConfigured = function() {
  const cfg = window.FIREBASE_CONFIG;
  return cfg &&
         cfg.apiKey &&
         cfg.apiKey !== "YOUR_API_KEY" &&
         cfg.projectId &&
         cfg.projectId !== "YOUR_PROJECT_ID";
};
