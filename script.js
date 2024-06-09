document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('signature-pad');
    var context = canvas.getContext('2d');
    var clearButton = document.getElementById('clear-btn');
    var saveButton = document.getElementById('save-btn');
    var downloadLink = document.getElementById('download-link');
    var colorPicker = document.getElementById('color-picker');
    var markerSizeInput = document.getElementById('marker-size');

    // Set up canvas
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    // Ensure the canvas dimensions match its display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;

    // Functions
    function getMousePosition(e) {
        return {
            x: e.offsetX,
            y: e.offsetY
        };
    }

    function getTouchPosition(e) {
        var touch = e.touches[0];
        var rect = canvas.getBoundingClientRect();
        return {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        var pos = e.type.includes('mouse') ? getMousePosition(e) : getTouchPosition(e);
        [lastX, lastY] = [pos.x, pos.y];
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault(); // Prevent scrolling when drawing

        var pos = e.type.includes('mouse') ? getMousePosition(e) : getTouchPosition(e);

        context.strokeStyle = colorPicker.value;
        context.lineWidth = markerSizeInput.value;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        [lastX, lastY] = [pos.x, pos.y];
    }

    function endDrawing() {
        isDrawing = false;
        context.beginPath();
    }

    function clearSignature() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveSignature() {
        var signatureData = canvas.toDataURL(); // Save signature as base64 data
        downloadLink.href = signatureData;
        downloadLink.download = 'signature.png';
        downloadLink.click();
    }

    // Event listeners for mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseout', endDrawing);

    // Event listeners for touch events
    canvas.addEventListener('touchstart', startDrawing, false);
    canvas.addEventListener('touchmove', draw, false);
    canvas.addEventListener('touchend', endDrawing, false);
    canvas.addEventListener('touchcancel', endDrawing, false);

    clearButton.addEventListener('click', clearSignature);
    saveButton.addEventListener('click', saveSignature);
});
