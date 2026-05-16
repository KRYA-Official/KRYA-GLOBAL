/* KRYA GLOBAL - Main JavaScript (Core Logic) */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. महा-लॉन्च टाइमर (Countdown Timer Logic)
    // ==========================================
    // लक्ष्य: 28 जून 2026, सुबह 10:00 बजे
    const launchDate = new Date("June 28, 2026 10:00:00").getTime();

    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        // समय का गणित (Math for time)
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // HTML में अपडेट करना (0 लगाना अगर संख्या 10 से कम हो)
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    }, 1000);


    // ==========================================
    // 2. KRYA सारथी (Web Speech API - Voice Assistant)
    // ==========================================
    const sarthiBtn = document.getElementById('voice-sarathi-btn');
    
    sarthiBtn.addEventListener('click', () => {
        // चेक करें कि ब्राउज़र में बोलने की क्षमता है या नहीं
        if ('speechSynthesis' in window) {
            // पहले से कुछ बोल रहा हो तो उसे रोक दें
            window.speechSynthesis.cancel();

            const textToSpeak = "नमस्कार! के आर वाई ए ग्लोबल में आपका स्वागत है। यह इंसानियत की पहली डिजिटल क्रांति है। हमारा महा-लॉन्च अठाइस जून दो हज़ार छब्बीस को है। सिस्टम में प्रवेश करने के लिए सुनहरे बटन पर क्लिक करें।";
            
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'hi-IN'; // हिंदी भाषा सेट की गई
            utterance.rate = 0.9; // बोलने की स्पीड (थोड़ी आराम से ताकि सब समझें)
            utterance.pitch = 1;

            window.speechSynthesis.speak(utterance);
            
            // बटन का टेक्स्ट थोड़ी देर के लिए बदलना
            sarthiBtn.innerText = "🔊 सारथी बोल रहा है...";
            
            utterance.onend = () => {
                sarthiBtn.innerText = "🔊 KRYA सारथी चालू करें";
            };

        } else {
            alert("क्षमा करें, आपका ब्राउज़र आवाज़ सपोर्ट नहीं करता।");
        }
    });


    // ==========================================
    // 3. प्रवेश बटन (Entry Button Logic - Auth Link)
    // ==========================================
    const entryBtn = document.getElementById('entry-btn');
    entryBtn.addEventListener('click', () => {
        // अभी के लिए पॉपअप, अगले स्टेप में हम इसे Auth (लॉगिन) पेज से जोड़ेंगे
        alert("KRYA निजता-शील्ड (सुरक्षित लॉगिन सिस्टम) एक्टिवेट हो रहा है... कृपया प्रतीक्षा करें।");
    });

});
