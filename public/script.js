const currentTimeElement = document.getElementById('current-time');
const countrySelect = document.getElementById('country');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Default to user's timezone

// Update the current time display
function updateCurrentTime() {
    const now = new Date();
    const localTime = moment.tz(now, selectedTimezone).format('HH:mm:ss');

    currentTimeElement.textContent = `Current Time: ${localTime}`;

    // Trigger fireworks at midnight
    if (localTime === "00:00:00") {
        startFireworks();
    }
}

// Fireworks animation
function startFireworks() {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        drawFirework(x, y);
    }, 500);
}

function drawFirework(x, y) {
    const colors = ['#ffcc00', '#ff6600', '#ff0000', '#ff66cc'];
    for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const dx = Math.cos(angle) * (Math.random() * 50);
        const dy = Math.sin(angle) * (Math.random() * 50);

        ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();
    }
}

// Detect user's location automatically or use selected timezone
countrySelect.addEventListener('change', () => {
    selectedTimezone = countrySelect.value === "auto"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : countrySelect.value;

    updateCurrentTime(); // Update time immediately after selection
});

// Update current time every second
setInterval(updateCurrentTime, 1000);

// Initialize
updateCurrentTime();