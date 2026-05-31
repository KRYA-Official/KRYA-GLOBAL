document.addEventListener("DOMContentLoaded", () => {

    // 1. ⏳ लाइव टाइमर लॉजिक
    const launchDate = new Date("June 28, 2026 10:00:00").getTime();
    const daysEl = document.getElementById("days");
    
    if(daysEl) {
        const timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const timeLeft = launchDate - now;

            if (timeLeft < 0) {
                clearInterval(timerInterval);
                return;
            }

            const d = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const h = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML = d < 10 ? "0" + d : d;
            document.getElementById("hours").innerHTML = h < 10 ? "0" + h : h;
            document.getElementById("minutes").innerHTML = m < 10 ? "0" + m : m;
            document.getElementById("seconds").innerHTML = s < 10 ? "0" + s : s;
        }, 1000);
    }

    // 2. 🔥 Firebase Initialization & Form Submit (नई 100% सुरक्षित चाबी के साथ)
    if (typeof firebase !== 'undefined') {
        // Mukesh Bhai's New Secure Firebase Config
        const firebaseConfig = {
          apiKey: "AIzaSyCtSIGAybHuIga19QpPRS1egRrsbhvJV2c",
          authDomain: "krya-94e55.firebaseapp.com",
          projectId: "krya-94e55",
          storageBucket: "krya-94e55.firebasestorage.app",
          messagingSenderId: "1025043894227",
          appId: "1:1025043894227:web:fa57c21ed2f6381a792926",
          measurementId: "G-VMC9CDSCXK"
        };
        
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();

        let userLocation = { city: "Unknown", region: "Unknown", country: "Unknown" };
        fetch('https://ipapi.co/json/').then(res => res.json()).then(data => {
            userLocation = { city: data.city || "Unknown", region: data.region || "Unknown", country: data.country_name || "Unknown" };
        }).catch(err => console.warn("Location service blocked."));

        const contactForm = document.getElementById('jansabha-form');
        const submitBtn = document.getElementById('submit-btn');
        const successBox = document.getElementById('success-box');

        if(contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
                
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = "⏳ सुरक्षित किया जा रहा है...";
                
                db.collection("jansabha_leads").add({
                    brandName: "KRYA",
                    u_name: document.getElementById('u-name').value.trim(),
                    u_email: document.getElementById('u-email').value.trim(),
                    u_phone: document.getElementById('u-phone').value.trim(),
                    u_message: document.getElementById('msg-box').value.trim(),
                    u_city: userLocation.city,
                    u_region: userLocation.region,
                    u_country: userLocation.country,
                    u_device: navigator.userAgent,
                    submittedAt: new Date()
                }).then(() => {
                    if(successBox) {
                        successBox.style.display = 'block';
                        setTimeout(() => { successBox.style.display = 'none'; }, 8000);
                    }
                    contactForm.reset();
                }).catch(err => alert("डेटा सेव नहीं हो सका। कृपया नेटवर्क चेक करें।"))
                  .finally(() => { submitBtn.disabled = false; submitBtn.innerHTML = originalText; });
            });
        }
    }

    // 3. 📱 PWA Service Worker Logic
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => console.warn('PWA Error:', err));
    }
    let deferredPrompt;
    const installBanner = document.getElementById('krya-install-banner');
    const installBtn = document.getElementById('krya-install-btn');
    const closeBanner = document.getElementById('krya-close-banner');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault(); deferredPrompt = e;
        if(installBanner) installBanner.style.display = 'block';
    });
    if(installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                await deferredPrompt.userChoice;
                installBanner.style.display = 'none'; deferredPrompt = null;
            }
        });
    }
    if(closeBanner) closeBanner.addEventListener('click', () => installBanner.style.display = 'none');

});

// 4. 🤖 100% Brand Safe KRYA Voice Engine (Digital Founder Version)
var synth = window.speechSynthesis;
var globalSpeechInstance = null;
var isGlobalSpeaking = false;

function getHindiVoice() {
    var voices = synth.getVoices();
    var premiumVoice = voices.find(v => 
        (v.lang === 'hi-IN' || v.lang.includes('hi')) && 
        (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google'))
    );
    if (premiumVoice) return premiumVoice;
    return voices.find(v => v.lang === 'hi-IN' || v.lang.includes('hi')) || null;
}

window.toggleKryaGlobalSpeech = function() {
    var fBtn = document.getElementById('krya-global-sarathi');
    if (!('speechSynthesis' in window)) {
        alert("क्षमा करें, आपका ब्राउज़र वॉयस को सपोर्ट नहीं करता।"); return;
    }

    if (isGlobalSpeaking) {
        synth.cancel();
        fBtn.innerHTML = "🤖 KRYA एआई असिस्टेंट";
        fBtn.style.background = "var(--krya-gold)";
        isGlobalSpeaking = false;
    } else {
        synth.cancel(); 
        globalSpeechInstance = new SpeechSynthesisUtterance();
        
        // 🌟 यहाँ आपकी नई 'डिजिटल फाउंडर' वाली शानदार स्क्रिप्ट अपडेट कर दी गई है
        globalSpeechInstance.text = "नमस्कार! केआरवाईए (KRYA) ग्लोबल में आपका स्वागत है। मैं केआरवाईए का स्मार्ट डिजिटल गाइड हूँ। यह 100 प्रतिशत सुरक्षित प्लेटफॉर्म बांका बिहार के डिजिटल फाउंडर, मुकेश जी की सालों की कड़ी मेहनत का नतीजा है। 2016 से इंटरनेट की दुनिया को समझकर, मुकेश जी ने इसे पूरी ईमानदारी के साथ बनाया है। उनका विज़न है कि डिजिटल दुनिया में कोई धोखा न हो, और वे अपनी मेहनत से अपने 7 लाख के कर्ज को चुका कर एक कामयाब उद्यमी बन सकें। यहाँ केआरवाईए के 15 अजूबों में आपका डेटा और भरोसा दोनों पूरी तरह लीगल और सुरक्षित हैं। स्क्रीन पर दिए गए किसी भी बटन का बेझिझक इस्तेमाल करें। इंसानियत ही हमारा धर्म है। धन्यवाद!";
        
        globalSpeechInstance.lang = 'hi-IN';
        globalSpeechInstance.rate = 0.95; // 🌟 आवाज़ को और भी नेचुरल और रिलैक्स करने के लिए स्पीड सेट की गई है
        globalSpeechInstance.pitch = 1.0; 

        var chosenVoice = getHindiVoice();
        if (chosenVoice) {
            globalSpeechInstance.voice = chosenVoice;
        }

        globalSpeechInstance.onend = function() {
            fBtn.innerHTML = "🤖 KRYA एआई असिस्टेंट";
            fBtn.style.background = "var(--krya-gold)";
            isGlobalSpeaking = false;
        };
        globalSpeechInstance.onerror = function() { isGlobalSpeaking = false; };

        fBtn.innerHTML = "🛑 बंद करें (Stop)";
        fBtn.style.background = "#ff4d4d";
        isGlobalSpeaking = true;
        
        setTimeout(() => {
            synth.speak(globalSpeechInstance);
        }, 100);
    }
};

if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getHindiVoice;
}

document.body.addEventListener('click', function() {
    if(synth.getVoices().length > 0) synth.speak(new SpeechSynthesisUtterance(''));
}, { once: true });
    
