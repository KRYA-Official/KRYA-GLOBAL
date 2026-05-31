// 30 दिनों का रेडीमेड कंटेंट (इसे आप एक बार सेट कर दें)
const yearLongContent = [
    { word: "Trust", meaning: "विश्वास" },
    { word: "Honest", meaning: "ईमानदार" },
    { word: "Growth", meaning: "विकास" },
    { word: "Learn", meaning: "सीखना" },
    { word: "Digital", meaning: "डिजिटल" },
    { word: "Goal", meaning: "लक्ष्य" },
    { word: "Help", meaning: "मदद" },
    { word: "Future", meaning: "भविष्य" },
    { word: "Action", meaning: "कार्य" },
    { word: "Success", meaning: "सफलता" },
    { word: "Hardwork", meaning: "मेहनत" },
    { word: "Knowledge", meaning: "ज्ञान" },
    { word: "Skill", meaning: "कौशल" },
    { word: "Practice", meaning: "अभ्यास" },
    { word: "Time", meaning: "समय" },
    { word: "Power", meaning: "शक्ति" },
    { word: "Dream", meaning: "सपना" },
    { word: "Believe", meaning: "विश्वास करना" },
    { word: "Start", meaning: "शुरुआत" },
    { word: "Change", meaning: "बदलाव" },
    { word: "Smart", meaning: "होशियार" },
    { word: "Focus", meaning: "ध्यान केंद्रित" },
    { word: "Value", meaning: "मूल्य" },
    { word: "Idea", meaning: "विचार" },
    { word: "Create", meaning: "बनाना" },
    { word: "Build", meaning: "निर्माण" },
    { word: "Lead", meaning: "नेतृत्व" },
    { word: "Win", meaning: "जीत" },
    { word: "Care", meaning: "देखभाल" },
    { word: "Unity", meaning: "एकता" }
];

function updateDailyContent() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // यह साल के हर दिन के हिसाब से कंटेंट को रोटेट करेगा
    const index = (dayOfYear - 1) % 30; 
    const content = yearLongContent[index];

    if (content) {
        // आपकी वेबसाइट में जहाँ आईडी 'daily-word' और 'daily-meaning' है, वहाँ यह अपडेट हो जाएगा
        document.getElementById("daily-word").innerText = content.word;
        document.getElementById("daily-meaning").innerText = content.meaning;
    }
}
window.onload = updateDailyContent;
