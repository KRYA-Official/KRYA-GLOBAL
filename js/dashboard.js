/* KRYA GLOBAL - Dashboard & 15 Wonders Core System */

document.addEventListener('DOMContentLoaded', () => {
    
    // 15 अजूबों का डेटा (यहाँ हमने किसान-सेतु का लिंक जोड़ दिया है)
    const kryaWonders = [
        { id: "kisan-setu", name: "KRYA किसान-सेतु", icon: "🌾", link: "kisan-setu.html" },
        { id: "hunar-mandi", name: "KRYA हुनर-मंडी", icon: "💼", link: "#" },
        { id: "sukoon", name: "KRYA सुकून", icon: "🤝", link: "#" },
        { id: "imaandari-score", name: "KRYA ईमानदारी-स्कोर", icon: "⚖️", link: "#" },
        { id: "samay-mudra", name: "KRYA समय-मुद्रा", icon: "⏳", link: "#" },
        { id: "hunar-hub", name: "KRYA हुनर-हब", icon: "🛠️", link: "#" },
        { id: "nano-mart", name: "KRYA नैनो-मार्ट", icon: "🏪", link: "#" },
        { id: "goonj", name: "KRYA गूँज", icon: "📢", link: "#" },
        { id: "jan-sabha", name: "KRYA जन-सभा", icon: "👥", link: "#" },
        { id: "vidya-deep", name: "KRYA विद्या-दीप", icon: "🪔", link: "#" },
        { id: "samvad-sutra", name: "KRYA संवाद-सूत्र", icon: "💬", link: "#" },
        { id: "sanjeevani", name: "KRYA संजीवनी", icon: "🚑", link: "#" },
        { id: "arth-saarthi", name: "KRYA अर्थ-सारथी", icon: "📈", link: "#" },
        { id: "nyay-rakshak", name: "KRYA न्याय-रक्षक", icon: "🛡️", link: "#" },
        { id: "vyapar-rath", name: "KRYA व्यापार-रथ", icon: "🛒", link: "#" }
    ];

    const container = document.getElementById('wonders-container');

    // HTML में 15 कार्ड्स (बॉक्सेस) अपने आप बनाना
    if (container) {
        kryaWonders.forEach(wonder => {
            const card = document.createElement('div');
            card.className = 'wonder-card';
            card.innerHTML = `
                <div class="wonder-icon">${wonder.icon}</div>
                <div class="wonder-name">${wonder.name}</div>
            `;
            
            // जब कोई किसी अजूबे पर क्लिक करेगा
            card.addEventListener('click', () => {
                if (wonder.id === "kisan-setu") {
                    // अगर किसान-सेतु पर क्लिक किया है, तो उसे नए पन्ने पर भेजें
                    window.location.href = wonder.link;
                } else {
                    // बाकी अजूबों के लिए अलर्ट दिखाएं
                    alert(`🚀 ${wonder.name} का निर्माण चल रहा है। महा-लॉन्च 28 जून 2026 को होगा!`);
                }
            });
            
            container.appendChild(card);
        });
    }

    // KRYA मार्गदर्शक (ऑडियो गाइड)
    window.startKryaTour = function() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // पुरानी आवाज़ रोकना
            
            const text = "नमस्कार! KRYA डैशबोर्ड में आपका स्वागत है। आपके सामने हमारे 15 डिजिटल अजूबे हैं। किसी भी अजूबे के बारे में जानने के लिए उसके बॉक्स पर क्लिक करें।";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'hi-IN'; // हिंदी आवाज़
            utterance.rate = 0.9;
            
            window.speechSynthesis.speak(utterance);
        } else {
            alert("👋 KRYA मार्गदर्शक: आपके सामने हमारे 15 डिजिटल अजूबे हैं। किसी भी बॉक्स पर क्लिक करें!");
        }
    };
});
