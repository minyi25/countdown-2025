const currentTimeElement = document.getElementById('current-time');
const countrySelect = document.getElementById('country');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Default to user's detected timezone
let selectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Function to update the current time
function updateCurrentTime() {
    try {
        const now = new Date(); // Get the current time
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: selectedTimezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        const localTime = formatter.format(now); // Format time in the selected timezone

        // Display the formatted current time
        currentTimeElement.textContent = `Current Time: ${localTime}`;

        // Trigger fireworks at midnight
        if (localTime === "19:13:00") {
            startFireworks();
        }
    } catch (error) {
        console.error("Error updating current time:", error);
    }
}

// Fireworks animation
const particles = []; // Array to hold particles

// Create a firework at a specific position
function createFirework(x, y) {
    const numParticles = 200; // Number of particles per firework
    const colors = ['#ffcc00', '#ff6600', '#ff0000', '#66ccff', '#00ff00', '#ff33ff'];

    for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2; // Random direction
        const speed = Math.random() * 5 + 2; // Random speed
        particles.push({
            x: x,
            y: y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            radius: Math.random() * 3 + 1, // Random size
            color: colors[Math.floor(Math.random() * colors.length)], // Random color
            alpha: 1, // Full opacity
            decay: Math.random() * 0.015 + 0.005, // Gradual fade-out
            glitter: Math.random() > 0.8 // Add glitter effect
        });
    }
}

// Update and draw particles
function updateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Fading background for trails
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.dx; // Update position
        p.y += p.dy;
        p.alpha -= p.decay; // Reduce opacity
        p.radius *= 0.98; // Gradual size reduction for realism

        // Remove particle if completely faded
        if (p.alpha <= 0 || p.radius <= 0) {
            particles.splice(i, 1);
            continue;
        }

        // Draw the particle with vibrant color and optional glitter
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const glitterEffect = p.glitter ? Math.random() * 0.5 : 0; // Random sparkle
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha + glitterEffect})`;
        ctx.fill();
    }
}

// Convert HEX color to RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

// Trigger random fireworks
function startFireworks() {
    setInterval(() => {
        const x = Math.random() * canvas.width; // Random x-coordinate
        const y = Math.random() * canvas.height / 2; // Random y-coordinate
        createFirework(x, y);
    }, 700);

    function animate() {
        updateFireworks();
        requestAnimationFrame(animate); // Smooth animation
    }
    animate();
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
