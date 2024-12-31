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
        // Extract relevant data
        cities = data.features.map(feature => ({
            name: feature.properties.name,
            timezone: feature.properties.timezone,
            coordinates: feature.geometry.coordinates
        }));
        populateCityOptions(cities);
    } catch (error) {
        console.error("Error loading cities:", error);
    }
}

// Populate the dropdown menu with city options
function populateCityOptions(cities) {
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.timezone; // Use timezone as value
        option.textContent = city.name; // Display city name
        locationSelect.appendChild(option);
    });
}

// Update the countdown timer
function updateCountdown() {
    const now = new Date();
    const targetTime = moment.tz("2025-01-01T00:00:00", selectedTimezone).toDate();
    const difference = targetTime - now;

    if (difference <= 0) {
        countdownElement.textContent = "Happy New Year 2025!";
        startFireworks();
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Fireworks animation
function startFireworks() {
    // Add fireworks animation logic here
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
