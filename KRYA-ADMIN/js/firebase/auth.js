// js/firebase/auth.js - KRYA Secure Authentication

import { auth, googleProvider, db } from './config.js';
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Google Login Function
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        // Security Check: Verify if user exists in KRYA adminUsers collection
        const userDocRef = doc(db, 'adminUsers', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            await logoutUser();
            throw new Error("Access Denied: You are not authorized as an admin in KRYA Control Room.");
        }

        const userData = userDoc.data();
        return { user, role: userData.role };
    } catch (error) {
        console.error("Login Error: ", error);
        throw error;
    }
};

// Logout Function
export const logoutUser = async () => {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
    } catch (error) {
        console.error("Logout Error: ", error);
        throw error;
    }
};

// Monitor Auth State (Auto Login Detection)
export const checkAuthState = (callback) => {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDocRef = doc(db, 'adminUsers', user.uid);
            const userDoc = await getDoc(userDocRef);
            const role = userDoc.exists() ? userDoc.data().role : null;
            callback({ user, role });
        } else {
            callback(null);
        }
    });
};
  
