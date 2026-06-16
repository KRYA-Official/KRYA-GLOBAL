// js/firebase/config.js - KRYA Firebase Connection

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// KRYA Enterprise - Secure Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtSIGAybHuIga19QpPRS1egRrsbhvJV2c",
  authDomain: "krya-94e55.firebaseapp.com",
  projectId: "krya-94e55",
  storageBucket: "krya-94e55.firebasestorage.app",
  messagingSenderId: "1025043894227",
  appId: "1:1025043894227:web:fa57c21ed2f6381a792926",
  measurementId: "G-VMC9CDSCXK"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
