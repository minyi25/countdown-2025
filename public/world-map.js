const canvas = document.getElementById('world-map');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cities = [];

// Load GeoJSON data and map cities
async function loadCities() {
    try {
        const response = await fetch('cities.geojson'); // Fetch GeoJSON file
        const data = await response.json();
        cities = data.features.map(feature => ({
            name: feature.properties.name,
            timezone: feature.properties.timezone,
            lat: feature.geometry.coordinates[1], // Latitude
            lon: feature.geometry.coordinates[0]  // Longitude
        }));
        drawWorldMap();
    } catch (error) {
        console.error("Error loading cities:", error);
    }
}

// Draw the world map
function drawWorldMap() {
    // Fill the background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw city points
    cities.forEach(city => {
        const x = (city.lon + 180) * (canvas.width / 360); // Longitude to X
        const y = (90 - city.lat) * (canvas.height / 180); // Latitude to Y

        // Draw city marker
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();

        // Optionally add city names
        ctx.fillStyle = "yellow";
        ctx.font = "10px Arial";
        ctx.fillText(city.name, x + 5, y);
    });
}

// Trigger fireworks at cities when they reach midnight
function checkCityTimes() {
    const now = new Date();

    cities.forEach(city => {
        const cityTime = moment.tz(city.timezone).toDate();
        if (cityTime.getHours() === 0 && cityTime.getMinutes() === 0) {
            drawFireworksForCity(city);
        }
    });
}

// Draw fireworks for a city
function drawFireworksForCity(city) {
    const x = (city.lon + 180) * (canvas.width / 360);
    const y = (90 - city.lat) * (canvas.height / 180);

    // Draw fireworks animation
    for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10;
        const dx = Math.cos(angle) * 20;
        const dy = Math.sin(angle) * 20;

        ctx.strokeStyle = `rgba(255, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();
    }
}

// Initialize the page
async function init() {
    await loadCities();
    setInterval(checkCityTimes, 60000); // Check every minute
}

init();
