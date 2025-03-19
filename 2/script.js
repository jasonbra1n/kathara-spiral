const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');

let currentParams = {};
let history = [];
const defaultParams = {
  scale: 30, nodes: 12, rotation: 0, layers: 3, layerRatio: 2,
  verticalMirror: false, horizontalMirror: false, strokeColor: '#00FFFF',
  lineWidth: 2, opacity: 1, spiralType: 'linear', backgroundColor: '#111111',
  verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#FFFFFF',
  gradientStroke: true, dashEffect: false, autoRotate: false
};

// -------------------------------
// Responsive Canvas Setup
// -------------------------------
function resizeCanvas() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientWidth;
  drawSpiral();
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// -------------------------------
// Spiral Drawing Functions
// -------------------------------
function drawSpiralOnContext(context, width, height, params) {
  context.fillStyle = params.backgroundColor;
  context.fillRect(0, 0, width, height);
  context.save();

  context.lineWidth = params.lineWidth;
  context.globalAlpha = params.opacity;
  if (params.dashEffect) context.setLineDash([5, 5]); else context.setLineDash([]);

  const centerX = width / 2;
  const centerY = height / 2;

  for (let l = 0; l < params.layers; l++) {
    const currentScale = params.scale * (l + 1) * (params.layerRatio / 10);
    const initialAngle = (params.rotation + (l * 10)) * (Math.PI / 180);

    drawSpiralPath(context, centerX, centerY, params, initialAngle, currentScale, false, false, params.strokeColor);
    if (params.verticalMirror || params.horizontalMirror) {
      if (params.verticalMirror && params.horizontalMirror) {
        drawSpiralPath(context, centerX, centerY, params, initialAngle, currentScale, true, true, params.bothColor);
      }
      if (params.verticalMirror) {
        drawSpiralPath(context, centerX, centerY, params, initialAngle, currentScale, true, false, params.verticalColor);
      }
      if (params.horizontalMirror) {
        drawSpiralPath(context, centerX, centerY, params, initialAngle, currentScale, false, true, params.horizontalColor);
      }
    }
  }
  context.restore();
}

function drawSpiralPath(context, centerX, centerY, params, initialAngle, currentScale, mirrorX, mirrorY, color) {
  context.beginPath();
  if (params.gradientStroke) {
    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, currentScale * params.nodes);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#000000');
    context.strokeStyle = gradient;
  } else {
    context.strokeStyle = color;
  }

  let angle = initialAngle;
  const spiralType = params.spiralType;

  for (let i = 0; i < params.nodes; i++) {
    let r = spiralType === 'linear' ? currentScale * i : currentScale * Math.exp(0.1 * i);
    let x = centerX + Math.cos(angle) * r;
    let y = centerY + Math.sin(angle) * r;

    if (mirrorX) x = centerX * 2 - x;
    if (mirrorY) y = centerY * 2 - y;

    context.lineTo(x, y);
    angle += Math.PI / 3;
  }
  context.stroke();
}

function updateParams() {
  currentParams = {
    scale: parseFloat(document.getElementById('scale').value),
    nodes: parseInt(document.getElementById('nodes').value),
    rotation: parseFloat(document.getElementById('rotation').value),
    layers: parseInt(document.getElementById('layers').value),
    layerRatio: parseFloat(document.getElementById('layerRatio').value),
    verticalMirror: document.getElementById('verticalMirror').checked,
    horizontalMirror: document.getElementById('horizontalMirror').checked,
    strokeColor: document.getElementById('strokeColor').value,
    lineWidth: parseFloat(document.getElementById('lineWidth').value),
    opacity: parseFloat(document.getElementById('opacity').value),
    spiralType: document.getElementById('spiralType').value,
    backgroundColor: document.getElementById('backgroundColor').value,
    verticalColor: document.getElementById('verticalColor').value,
    horizontalColor: document.getElementById('horizontalColor').value,
    bothColor: document.getElementById('bothColor').value,
    gradientStroke: document.getElementById('gradientStroke').checked,
    dashEffect: document.getElementById('dashEffect').checked,
    autoRotate: document.getElementById('autoRotate').checked
  };
}

function drawSpiral() {
  updateParams();
  drawSpiralOnContext(ctx, canvas.width, canvas.height, currentParams);
}

// -------------------------------
// Presets, Undo, Reset
// -------------------------------
document.getElementById('presetSelector').addEventListener('change', function() {
  const presets = {
    goldenSpiral: { scale: 20, nodes: 50, rotation: 0, layers: 5, layerRatio: 1.618, verticalMirror: true, horizontalMirror: false, strokeColor: '#FFD700', lineWidth: 2, opacity: 1, spiralType: 'logarithmic', backgroundColor: '#111111', verticalColor: '#FF4500', horizontalColor: '#FFFF00', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: false },
    denseMirror: { scale: 10, nodes: 50, rotation: 0, layers: 10, layerRatio: 2, verticalMirror: true, horizontalMirror: true, strokeColor: '#00FF00', lineWidth: 3, opacity: 1, spiralType: 'linear', backgroundColor: '#111111', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#00FF00', gradientStroke: false, dashEffect: false, autoRotate: false },
    minimalist: { scale: 30, nodes: 12, rotation: 0, layers: 1, layerRatio: 2, verticalMirror: false, horizontalMirror: false, strokeColor: '#FFFFFF', lineWidth: 1, opacity: 0.8, spiralType: 'linear', backgroundColor: '#111111', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#FFFFFF', gradientStroke: false, dashEffect: false, autoRotate: false },
    starBurst: { scale: 25, nodes: 50, rotation: 0, layers: 3, layerRatio: 1.5, verticalMirror: true, horizontalMirror: true, strokeColor: '#FF69B4', lineWidth: 2, opacity: 1, spiralType: 'linear', backgroundColor: '#111111', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#FFA500', gradientStroke: true, dashEffect: false, autoRotate: false },
    doubleHelix: { scale: 15, nodes: 40, rotation: 0, layers: 2, layerRatio: 2, verticalMirror: true, horizontalMirror: false, strokeColor: '#00CED1', lineWidth: 2, opacity: 1, spiralType: 'logarithmic', backgroundColor: '#111111', verticalColor: '#9400D3', horizontalColor: '#FFFF00', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: false },
    nebula: { scale: 35, nodes: 50, rotation: 0, layers: 7, layerRatio: 1.8, verticalMirror: false, horizontalMirror: false, strokeColor: '#8A2BE2', lineWidth: 2, opacity: 0.6, spiralType: 'logarithmic', backgroundColor: '#1A0033', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: false },
    kaleidoscope: { scale: 20, nodes: 50, rotation: 0, layers: 4, layerRatio: 2.2, verticalMirror: true, horizontalMirror: true, strokeColor: '#FF1493', lineWidth: 3, opacity: 1, spiralType: 'linear', backgroundColor: '#111111', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#00FFFF', gradientStroke: false, dashEffect: true, autoRotate: false },
    cosmicWave: { scale: 40, nodes: 45, rotation: 0, layers: 6, layerRatio: 1.9, verticalMirror: false, horizontalMirror: true, strokeColor: '#00B7EB', lineWidth: 2, opacity: 0.9, spiralType: 'logarithmic', backgroundColor: '#0A1F44', verticalColor: '#FF00FF', horizontalColor: '#00CED1', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: true },
    fractalBloom: { scale: 15, nodes: 50, rotation: 0, layers: 8, layerRatio: 2.414, verticalMirror: true, horizontalMirror: true, strokeColor: '#FF4500', lineWidth: 1, opacity: 0.7, spiralType: 'linear', backgroundColor: '#222222', verticalColor: '#FFD700', horizontalColor: '#FF69B4', bothColor: '#FFFFFF', gradientStroke: false, dashEffect: true, autoRotate: false }
  };
  const preset = presets[this.value];
  if (preset) {
    Object.keys(preset).forEach(key => {
      const element = document.getElementById(key);
      if (element.type === 'checkbox') element.checked = preset[key];
      else element.value = preset[key];
      const valueSpan = document.getElementById(key + 'Value');
      if (valueSpan) valueSpan.textContent = preset[key];
    });
    saveState();
    drawSpiral();
  }
});

function saveState() {
  const state = {};
  document.querySelectorAll('input, select').forEach(el => {
    state[el.id] = el.type === 'checkbox' ? el.checked : el.value;
  });
  history.push(state);
  if (history.length > 10) history.shift();
}

function undo() {
  if (history.length > 1) {
    history.pop();
    const lastState = history[history.length - 1];
    Object.keys(lastState).forEach(key => {
      const el = document.getElementById(key);
      if (el.type === 'checkbox') el.checked = lastState[key];
      else el.value = lastState[key];
      const valueSpan = document.getElementById(key + 'Value');
      if (valueSpan) valueSpan.textContent = lastState[key];
    });
    drawSpiral();
  }
}

function reset() {
  Object.keys(defaultParams).forEach(key => {
    const el = document.getElementById(key);
    if (el.type === 'checkbox') el.checked = defaultParams[key];
    else el.value = defaultParams[key];
    const valueSpan = document.getElementById(key + 'Value');
    if (valueSpan) valueSpan.textContent = defaultParams[key];
  });
  history = [];
  drawSpiral();
}

// -------------------------------
// Input Handlers
// -------------------------------
document.querySelectorAll('input, select').forEach(input => {
  input.addEventListener('input', function() {
    saveState();
    if (this.type === 'range') {
      const numberInput = document.getElementById(this.id + 'Number');
      if (numberInput) numberInput.value = this.value;
      const valueSpan = document.getElementById(this.id + 'Value');
      if (valueSpan) valueSpan.textContent = this.value;
    }
    drawSpiral();
  });
});

function setRatio(ratio) {
  document.getElementById('layerRatio').value = ratio;
  document.getElementById('layerRatioNumber').value = ratio;
  saveState();
  drawSpiral();
}

// -------------------------------
// Auto-Rotate Animation
// -------------------------------
let isAnimating = false;
function animateRotation() {
  if (isAnimating) {
    let rotationInput = document.getElementById('rotation');
    let currentRotation = parseFloat(rotationInput.value);
    currentRotation = (currentRotation + 1) % 360;
    rotationInput.value = currentRotation;
    document.getElementById('rotationValue').textContent = Math.round(currentRotation);
    drawSpiral();
    requestAnimationFrame(animateRotation);
  }
}

document.getElementById('autoRotate').addEventListener('change', function() {
  isAnimating = this.checked;
  if (isAnimating) animateRotation();
});

// -------------------------------
// Mobile Touch Controls
// -------------------------------
let initialPinchDistance = null;
let initialScale = null;

canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);

function handleTouchStart(e) {
  if (e.touches.length === 2) {
    initialPinchDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    initialScale = parseFloat(document.getElementById('scale').value);
  }
}

function handleTouchMove(e) {
  e.preventDefault();
  if (e.touches.length === 2 && initialPinchDistance) {
    const currentDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    const scaleInput = document.getElementById('scale');
    const newScale = initialScale * (currentDistance / initialPinchDistance);
    scaleInput.value = Math.min(Math.max(newScale, 1), 100);
    document.getElementById('scaleValue').textContent = Math.round(scaleInput.value);
    saveState();
    drawSpiral();
  } else if (e.touches.length === 1) {
    const rotationInput = document.getElementById('rotation');
    const deltaX = e.touches[0].pageX - (e.touches[0].pageX - e.touches[0].movementX || 0);
    rotationInput.value = (parseFloat(rotationInput.value) + deltaX * 0.5) % 360;
    document.getElementById('rotationValue').textContent = Math.round(rotationInput.value);
    saveState();
    drawSpiral();
  }
}

// -------------------------------
// Download Function
// -------------------------------
function downloadCanvas() {
  const downloadCanvas = document.createElement('canvas');
  downloadCanvas.width = 2160;
  downloadCanvas.height = 2160;
  const downloadCtx = downloadCanvas.getContext('2d');
  drawSpiralOnContext(downloadCtx, downloadCanvas.width, downloadCanvas.height, currentParams);

  const link = document.createElement('a');
  link.download = 'kathara-spiral.png';
  link.href = downloadCanvas.toDataURL();
  link.click();
}

// Initial draw
drawSpiral();
