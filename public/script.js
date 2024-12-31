const currentTimeElement = document.getElementById('current-time');
const countrySelect = document.getElementById('country');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Default to the user's detected timezone
let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Function to update the current time
function updateCurrentTime() {
    try {
        const now = new Date(); // Get the current time
        const localTime = moment.tz(now, selectedTimezone).format('HH:mm:ss'); // Format time in selected timezone

        // Display the formatted current time
        currentTimeElement.textContent = `Current Time: ${localTime}`;

        // Trigger fireworks at midnight
        if (localTime === "00:00:00") {
            startFireworks();
        }
    } catch (error) {
        console.error("Error updating current time:", error);
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

// Handle timezone changes when a country is selected
countrySelect.addEventListener('change', () => {
    selectedTimezone = countrySelect.value === "auto"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : countrySelect.value;

    updateCurrentTime(); // Immediately update the time after selection
});

// Update the current time every second
setInterval(updateCurrentTime, 1000);

// Initialize
updateCurrentTime();
