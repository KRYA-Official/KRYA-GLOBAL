// Firebase कॉन्फिग (यहाँ अपना कॉन्फिग डालें)
const firebaseConfig = { /* आपका वही पुराना कॉन्फिग */ };
firebase.initializeApp(firebaseConfig);

document.getElementById('reg-btn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    // यहाँ Firebase Auth का उपयोग करें
    firebase.auth().createUserWithEmailAndPassword(email, "password123") // एक टेम्परेरी पासवर्ड
        .then((userCredential) => {
            // ईमेल वेरिफिकेशन भेजें
            userCredential.user.sendEmailVerification().then(() => {
                alert("पंजीकरण सफल! आपकी ईमेल पर एक वेरिफिकेशन लिंक भेजा गया है।");
                window.location.href = 'admin.html';
            });
        })
        .catch((error) => alert("एरर: " + error.message));
});
