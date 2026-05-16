// KRYA GLOBAL - Firebase Configuration & Initialization

const firebaseConfig = {
    apiKey: "AIzaSyCq3AhEBbdmw_k7f1vE1qFfbXvHk2jl4CM",
    authDomain: "krya-store.firebaseapp.com",
    projectId: "krya-store",
    storageBucket: "krya-store.firebasestorage.app",
    messagingSenderId: "479732624984",
    appId: "1:479732624984:web:089845fa99978ec0a5e42d",
    measurementId: "G-QY0C8PVNM8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ग्लोबली इस्तेमाल के लिए टूल्स को एक्टिव करना (ताकि पूरे ऐप में काम करे)
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

console.log("KRYA Firebase Securely Initialized!");
