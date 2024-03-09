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

    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;

    // Functions
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;
        context.strokeStyle = colorPicker.value;
        context.lineWidth = markerSizeInput.value;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function endDrawing() {
        isDrawing = false;
    }

    function clearSignature() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveSignature() {
        var signatureData = canvas.toDataURL(); // Save signature as base64 data
        downloadLink.href = signatureData;
    }

    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseout', endDrawing);
    clearButton.addEventListener('click', clearSignature);
    saveButton.addEventListener('click', saveSignature);
});
