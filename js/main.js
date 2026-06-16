document.addEventListener("DOMContentLoaded", () => {
    // 1. ⏳ लाइव टाइमर लॉजिक
    const launchDate = new Date("June 28, 2026 10:00:00").getTime();
    const daysEl = document.getElementById("days");
    if(daysEl) {
        const timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const timeLeft = launchDate - now;
            if (timeLeft < 0) { clearInterval(timerInterval); return; }
            document.getElementById("days").innerHTML = Math.floor(timeLeft / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").innerHTML = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("minutes").innerHTML = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("seconds").innerHTML = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);
    }

    // 2. 🔥 Firebase & Modal Logic
    if (typeof firebase !== 'undefined') {
        const db = firebase.firestore();
        
        // Modal Logic
        const modal = document.getElementById('jansabha-modal');
        const openBtn = document.getElementById('open-jansabha');
        if (openBtn && modal) {
            openBtn.addEventListener('click', (e) => { e.preventDefault(); modal.style.display = 'flex'; });
            document.querySelector('.close-modal').addEventListener('click', () => { modal.style.display = 'none'; });
        }

        // Form Submit
        const contactForm = document.getElementById('jansabha-form');
        if(contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = document.getElementById('submit-btn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = "⏳ सुरक्षित किया जा रहा है...";
                db.collection("jansabha_leads").add({
                    brandName: "KRYA",
                    u_name: document.getElementById('u-name').value.trim(),
                    u_email: document.getElementById('u-email').value.trim(),
                    u_phone: document.getElementById('u-phone').value.trim(),
                    u_message: document.getElementById('msg-box').value.trim(),
                    submittedAt: new Date()
                }).then(() => {
                    document.getElementById('success-box').style.display = 'block';
                    contactForm.reset();
                }).finally(() => { submitBtn.disabled = false; submitBtn.innerHTML = "🚀 सुरक्षित सबमिट करें"; });
            });
        }

        // 4. 🔐 एडमिन लॉगिन लॉजिक (नया और पक्का वर्शन)
        const loginBtn = document.getElementById('admin-login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider)
                    .then((result) => {
                        alert("सफलता! मुकेश जी, आपका स्वागत है।");
                        window.location.href = 'dashboard.html';
                    })
                    .catch((error) => {
                        console.error("लॉगिन एरर:", error);
                        alert("लॉगिन विफल: " + error.message);
                    });
            });
        }
    }

    // 3. 🤖 KRYA Voice Engine
    var synth = window.speechSynthesis;
    window.toggleKryaGlobalSpeech = function() {
        var fBtn = document.getElementById('krya-global-sarathi');
        if (synth.speaking) { synth.cancel(); fBtn.innerHTML = "🤖 KRYA एआई असिस्टेंट"; return; }
        
        var msg = new SpeechSynthesisUtterance("नमस्कार! केआरवाईए ग्लोबल में आपका स्वागत है। मैं मुकेश जी का डिजिटल गाइड हूँ।");
        msg.lang = 'hi-IN';
        synth.speak(msg);
        fBtn.innerHTML = "🛑 बंद करें";
    };
});
