const canvas = document.getElementById('world-map');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawRandomFireworks() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const dx = Math.cos(angle) * (Math.random() * 50);
        const dy = Math.sin(angle) * (Math.random() * 50);

        ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();
    }
}

setInterval(drawRandomFireworks, 1000);