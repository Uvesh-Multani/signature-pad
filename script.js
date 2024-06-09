const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let drawing = false;

// Event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Event listeners for touch events
canvas.addEventListener('touchstart', startDrawing, false);
canvas.addEventListener('touchend', stopDrawing, false);
canvas.addEventListener('touchmove', draw, false);

function startDrawing(event) {
    drawing = true;
    draw(event);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(event) {
    event.preventDefault();
    if (!drawing) return;

    ctx.lineWidth = document.getElementById('size-picker').value;
    ctx.strokeStyle = document.getElementById('color-picker').value;
    ctx.lineCap = 'round';

    // Get the correct coordinates
    let x, y;
    if (event.type.startsWith('mouse')) {
        x = event.clientX - canvas.offsetLeft;
        y = event.clientY - canvas.offsetTop;
    } else {
        const touch = event.touches[0];
        x = touch.clientX - canvas.offsetLeft;
        y = touch.clientY - canvas.offsetTop;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

document.getElementById('clear-btn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('save-btn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL();
    link.click();
});
