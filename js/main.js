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

        // समय का गणित
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / (1000));

        // HTML में अपडेट करना (0 लगाना अगर संख्या 10 से कम हो)
        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    }, 1000);

    // ==========================================
    // 2. KRYA सारथी (Web Speech API - Voice Assistant)
    // ==========================================
    const sarthiBtn = document.getElementById('voice-sarthi-btn');

    if (sarthiBtn) {
        sarthiBtn.addEventListener('click', () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();

                const textToSpeak = "KRYA ग्लोबल में आपका स्वागत है। यह इंसानियत की पहली डिजिटल क्रांति है। प्लेटफ़ॉर्म में प्रवेश करने के लिए ऊपर दिए गए सुनहरे बटन पर क्लिक करें।";
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'hi-IN';
                utterance.rate = 0.9;
                utterance.pitch = 1;

                window.speechSynthesis.speak(utterance);
                sarthiBtn.innerText = "📢 सारथी बोल रहा है...";

                utterance.onend = () => {
                    sarthiBtn.innerText = "🔊 KRYA सारथी चालू करें";
                };
            } else {
                alert("कृपया ध्यान दें, आपका ब्राउज़र आवाज़ सपोर्ट नहीं करता है।");
            }
        });
    }

    // ==========================================
    // 3. प्रवेश बटन लॉजिक (Direct Link to Dashboard)
    // ==========================================
    const entryBtn = document.getElementById('entry-btn');
    if (entryBtn) {
        entryBtn.addEventListener('click', () => {
            // सुरक्षा कवच का अलर्ट दिखाना
            alert("🛡️ KRYA निजता-शील्ड: सुरक्षित लॉगिन सिस्टम सक्रिय हो रहा है... सीधे डैशबोर्ड पर भेजा जा रहा है।");
            
            // सीधे लाइव डैशबोर्ड पेज पर भेज देना (Redirect)
            window.location.href = "dashboard.html";
        });
    }

});
