// KRYA GLOBAL - Main Logic File
console.log("KRYA GLOBAL System Initialized...");

// Phase 1 Launch: 28 June 2026, 10:00 AM
const launchDate = new Date("June 28, 2026 10:00:00").getTime();

// Countdown Timer Logic
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // यह टाइमर आगे चलकर हमारे लैंडिंग पेज पर दिखेगा
    // console.log("Time left: " + days + "d " + hours + "h");

    // When the countdown is over
    if (distance < 0) {
        clearInterval(timer);
        console.log("KRYA GLOBAL IS LIVE!");
    }
}, 1000);

