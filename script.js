const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function startDrawing(e) {
  if (e.button === 2) { // Disable context menu on right click
    e.preventDefault();
    ctx.globalCompositeOperation = 'destination-out'; // Use destination-out to erase
  } else {
    ctx.globalCompositeOperation = 'source-over'; // Use source-over to draw
  }
  isDrawing = true;
  [lastX, lastY] = [e.clientX, e.clientY];
}

function stopDrawing() {
  isDrawing = false;
  ctx.globalCompositeOperation = 'source-over'; // Switch back to source-over mode
}

function draw(e) {
  if (!isDrawing) return;
  const lineWidth = e.buttons === 2 ? 30 : 10; // Use right mouse button as an eraser
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  [lastX, lastY] = [e.clientX, e.clientY];
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function animate() {
  requestAnimationFrame(animate);
}
animate();

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('contextmenu', e => e.preventDefault()); // Disable context menu on canvas
