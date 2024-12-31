const countdownElement = document.getElementById('countdown');
const locationSelect = document.getElementById('location');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cities = [];
let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Load GeoJSON data and populate the dropdown
async function loadCities() {
    try {
        const response = await fetch('cities.geojson'); // Fetch GeoJSON file
        const data = await response.json();
        cities = data.features.map(feature => ({
            name: feature.properties.name,
            timezone: feature.properties.timezone
        }));
        populateCityOptions(cities);
    } catch (error) {
        console.error("Error loading cities:", error);
    }
}

// Populate the dropdown menu
function populateCityOptions(cities) {
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.timezone;
        option.textContent = city.name;
        locationSelect.appendChild(option);
    });
}

// Update the countdown timer
function updateCountdown() {
    const now = new Date();
    const targetTime = moment.tz("2025-01-01T00:00:00", selectedTimezone).toDate();
    const difference = targetTime - now;

    if (difference <= 0) {
        countdownElement.textContent = "🎉 Happy New Year 2025! 🎉";
        startFireworks();
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
        <span>${days}</span> Days 
        <span>${hours}</span> Hours 
        <span>${minutes}</span> Minutes 
        <span>${seconds}</span> Seconds
    `;
}

// Fireworks animation
function startFireworks() {
    // Add fireworks animation logic here
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

setInterval(updateCountdown, 1000);

// Listen for dropdown changes
locationSelect.addEventListener('change', () => {
    selectedTimezone = locationSelect.value === "auto"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : locationSelect.value;
});

// Initialize the page
async function init() {
    await loadCities();
}

init();
