// js/firebase/firestore.js - KRYA Database Operations

import { db } from './config.js';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- BUTTON MANAGEMENT ---
const buttonsCollection = collection(db, 'kryaButtons');

// 1. Create New Button
export const createButton = async (buttonData, userEmail) => {
    try {
        const docRef = await addDoc(buttonsCollection, {
            ...buttonData,
            clicks: 0,
            createdBy: userEmail,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        await logActivity('CREATE', 'Wonder Button', docRef.id, userEmail);
        return docRef.id;
    } catch (error) {
        console.error("Error creating button:", error);
        throw error;
    }
};

// 2. Get All Buttons
export const getAllButtons = async () => {
    try {
        const q = query(buttonsCollection, orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching buttons:", error);
        throw error;
    }
};

// 3. Update Button
export const updateButton = async (id, updateData, userEmail) => {
    try {
        const buttonRef = doc(db, 'kryaButtons', id);
        await updateDoc(buttonRef, {
            ...updateData,
            updatedBy: userEmail,
            updatedAt: serverTimestamp()
        });
        await logActivity('UPDATE', 'Wonder Button', id, userEmail);
        return true;
    } catch (error) {
        console.error("Error updating button:", error);
        throw error;
    }
};

// 4. Delete Button
export const deleteButton = async (id, userEmail) => {
    try {
        const buttonRef = doc(db, 'kryaButtons', id);
        await deleteDoc(buttonRef);
        await logActivity('DELETE', 'Wonder Button', id, userEmail);
        return true;
    } catch (error) {
        console.error("Error deleting button:", error);
        throw error;
    }
};

// --- ACTIVITY LOGGING ---
export const logActivity = async (action, module, itemId, userEmail) => {
    try {
        await addDoc(collection(db, 'activityLogs'), {
            action,
            module,
            itemId,
            userEmail,
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error("Error logging activity:", error);
    }
};
  
