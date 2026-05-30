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

    // 2. 🔥 Firebase Initialization & Form Submit
    if (typeof firebase !== 'undefined') {
        const firebaseConfig = {
            apiKey: "AIzaSyBzqLMQFgA7EBDM5XvgdXtJCKSKyWXgWlI",
            authDomain: "krya-global.firebaseapp.com",
            projectId: "krya-global",
            storageBucket: "krya-global.firebasestorage.app",
            messagingSenderId: "372340448782",
            appId: "1:372340448782:web:8e26d6d1169a3b8af8665f"
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

// 4. 🤖 100% Brand Safe KRYA Voice Engine (Advanced Natural Voice)
var synth = window.speechSynthesis;
var globalSpeechInstance = null;
var isGlobalSpeaking = false;

// 🌟 स्मार्ट वॉयस फाइंडर: यह सबसे अच्छी 'इंसानों जैसी' आवाज़ खोजेगा
function getHindiVoice() {
    var voices = synth.getVoices();
    
    // पहला प्रयास: Google या Microsoft की 'Online/Natural' प्रीमियम आवाज़ खोजना
    var premiumVoice = voices.find(v => 
        (v.lang === 'hi-IN' || v.lang.includes('hi')) && 
        (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Google'))
    );
    
    if (premiumVoice) {
        return premiumVoice;
    }
    
    // दूसरा प्रयास: अगर प्रीमियम न मिले, तो जो भी हिंदी आवाज़ हो उसे ले लेना
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
        globalSpeechInstance.text = "नमस्कार! मैं केआरवाईए एआई असिस्टेंट हूँ। इंसानियत की पहली डिजिटल क्रांति में आपका स्वागत है। यहाँ स्क्रीन पर नीचे आपको हमारे महा-लॉन्च का लाइव टाइमर, और केआरवाईए के 15 डिजिटल अजूबों का डैशबोर्ड दिखाई देगा। आप किसी भी अजूबे के बटन पर क्लिक करके उस सेवा का लाभ उठा सकते हैं। हमारे साथ जुड़ने के लिए जन-सभा फॉर्म भरें। धन्यवाद!";
        
        globalSpeechInstance.lang = 'hi-IN';
        
        // 🌟 आवाज़ को इंसानों जैसा बनाने के लिए सेटिंग
        globalSpeechInstance.rate = 0.95; // बोलने की स्पीड थोड़ी रिलैक्स और नॉर्मल
        globalSpeechInstance.pitch = 1.0; // प्राकृतिक आवाज़ का भारीपन 

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
        
        // ब्राउज़र को थोड़ा समय देना ताकि वह प्रीमियम आवाज़ लोड कर सके
        setTimeout(() => {
            synth.speak(globalSpeechInstance);
        }, 100);
    }
};

// वॉयस लिस्ट लोड होने पर उसे अपडेट करना
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = getHindiVoice;
}

// Touch policy bypass for audio
document.body.addEventListener('click', function() {
    if(synth.getVoices().length > 0) synth.speak(new SpeechSynthesisUtterance(''));
}, { once: true });
                            
