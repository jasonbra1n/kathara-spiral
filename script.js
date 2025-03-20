const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');

let currentParams = {};
let history = [];
const defaultParams = {
  scale: 30, nodes: 12, rotation: 0, layers: 3, layerRatio: 2,
  verticalMirror: false, horizontalMirror: false, strokeColor: '#00FFFF',
  lineWidth: 2, opacity: 1, spiralType: 'linear', backgroundColor: '#111111',
  verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#FFFFFF',
  gradientStroke: true, dashEffect: false, autoRotate: false, curvedLines: false
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
    const currentScale = params.scale * Math.pow(params.layerRatio / 5, l);
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
  let prevX = centerX;
  let prevY = centerY;

  context.moveTo(prevX, prevY);

  for (let i = 1; i < params.nodes; i++) {
    let r = spiralType === 'linear' ? currentScale * i : currentScale * Math.exp(0.1 * i);
    let x = centerX + Math.cos(angle) * r;
    let y = centerY + Math.sin(angle) * r;

    if (mirrorX) x = centerX * 2 - x;
    if (mirrorY) y = centerY * 2 - y;

    if (params.curvedLines) {
      const midX = (prevX + x) / 2;
      const midY = (prevY + y) / 2;
      context.quadraticCurveTo(prevX, prevY, midX, midY);
    } else {
      context.lineTo(x, y);
    }

    prevX = x;
    prevY = y;
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
    autoRotate: document.getElementById('autoRotate').checked,
    curvedLines: document.getElementById('curvedLines').checked
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
  goldenSpiral: { scale: 25, nodes: 50, rotation: 0, layers: 50, layerRatio: 4.8, verticalMirror: true, horizontalMirror: false, strokeColor: '#FFD700', lineWidth: 1, opacity: 0.7, spiralType: 'logarithmic', backgroundColor: '#111111', verticalColor: '#FF4500', horizontalColor: '#FFFF00', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: false, curvedLines: true },
  denseMirror: { scale: 15, nodes: 50, rotation: 0, layers: 80, layerRatio: 4.6, verticalMirror: true, horizontalMirror: true, strokeColor: '#00FF00', lineWidth: 2, opacity: 0.8, spiralType: 'linear', backgroundColor: '#111111', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#00FF00', gradientStroke: false, dashEffect: true, autoRotate: false, curvedLines: false },
  minimalist: { scale: 30, nodes: 12, rotation: 0, layers: 3, layerRatio: 5, verticalMirror: false, horizontalMirror: false, strokeColor: '#FFFFFF', lineWidth: 1, opacity: 0.9, spiralType: 'linear', backgroundColor: '#111111', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#FFFFFF', gradientStroke: false, dashEffect: false, autoRotate: false, curvedLines: true },
  starBurst: { scale: 25, nodes: 50, rotation: 0, layers: 40, layerRatio: 5.2, verticalMirror: true, horizontalMirror: true, strokeColor: '#FF69B4', lineWidth: 1, opacity: 0.85, spiralType: 'linear', backgroundColor: '#111111', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#FFA500', gradientStroke: true, dashEffect: false, autoRotate: true, curvedLines: false },
  doubleHelix: { scale: 15, nodes: 40, rotation: 0, layers: 20, layerRatio: 5.5, verticalMirror: true, horizontalMirror: false, strokeColor: '#00CED1', lineWidth: 1, opacity: 0.9, spiralType: 'logarithmic', backgroundColor: '#111111', verticalColor: '#9400D3', horizontalColor: '#FFFF00', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: false, curvedLines: true },
  nebula: { scale: 20, nodes: 50, rotation: 0, layers: 100, layerRatio: 4.7, verticalMirror: false, horizontalMirror: true, strokeColor: '#8A2BE2', lineWidth: 2, opacity: 0.6, spiralType: 'logarithmic', backgroundColor: '#1A0033', verticalColor: '#FF00FF', horizontalColor: '#00CED1', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: false, curvedLines: true },
  kaleidoscope: { scale: 20, nodes: 50, rotation: 0, layers: 60, layerRatio: 4.8, verticalMirror: true, horizontalMirror: true, strokeColor: '#FF1493', lineWidth: 2, opacity: 0.75, spiralType: 'linear', backgroundColor: '#111111', verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#00FFFF', gradientStroke: false, dashEffect: true, autoRotate: true, curvedLines: false },
  cosmicWave: { scale: 40, nodes: 45, rotation: 0, layers: 70, layerRatio: 4.5, verticalMirror: false, horizontalMirror: true, strokeColor: '#00B7EB', lineWidth: 1, opacity: 0.9, spiralType: 'logarithmic', backgroundColor: '#0A1F44', verticalColor: '#FF00FF', horizontalColor: '#00CED1', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: true, curvedLines: true },
  fractalBloom: { scale: 15, nodes: 50, rotation: 0, layers: 50, layerRatio: 5.3, verticalMirror: true, horizontalMirror: true, strokeColor: '#FF4500', lineWidth: 1, opacity: 0.65, spiralType: 'linear', backgroundColor: '#222222', verticalColor: '#FFD700', horizontalColor: '#FF69B4', bothColor: '#FFFFFF', gradientStroke: false, dashEffect: false, autoRotate: false, curvedLines: true },
  crystalVortex: { scale: 25, nodes: 40, rotation: 0, layers: 40, layerRatio: 4.9, verticalMirror: true, horizontalMirror: false, strokeColor: '#00FFFF', lineWidth: 1, opacity: 0.8, spiralType: 'logarithmic', backgroundColor: '#0D1B2A', verticalColor: '#1E90FF', horizontalColor: '#FFFF00', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: false, curvedLines: true },
  galacticPulse: { scale: 50, nodes: 50, rotation: 0, layers: 60, layerRatio: 5.1, verticalMirror: false, horizontalMirror: true, strokeColor: '#FF00FF', lineWidth: 2, opacity: 0.9, spiralType: 'linear', backgroundColor: '#000033', verticalColor: '#FF00FF', horizontalColor: '#00FF00', bothColor: '#FFFFFF', gradientStroke: true, dashEffect: false, autoRotate: true, curvedLines: false },
  etherealRings: { scale: 30, nodes: 30, rotation: 0, layers: 80, layerRatio: 4.6, verticalMirror: true, horizontalMirror: true, strokeColor: '#E6E6FA', lineWidth: 1, opacity: 0.5, spiralType: 'logarithmic', backgroundColor: '#2A2A40', verticalColor: '#D8BFD8', horizontalColor: '#98FB98', bothColor: '#FFFFFF', gradientStroke: false, dashEffect: true, autoRotate: false, curvedLines: true },
  violetBloom: { scale: 7, nodes: 50, rotation: 0, layers: 15, layerRatio: 4.2, verticalMirror: true, horizontalMirror: true, strokeColor: '#FF00F7', lineWidth: 4, opacity: 0.8, spiralType: 'linear', backgroundColor: '#000000', verticalColor: '#FF00F7', horizontalColor: '#000000', bothColor: '#6E00DB', gradientStroke: true, dashEffect: false, autoRotate: true, curvedLines: false },
  twilightPetals: { scale: 20, nodes: 40, rotation: 0, layers: 25, layerRatio: 4.8, verticalMirror: true, horizontalMirror: true, strokeColor: '#8A2BE2', lineWidth: 2, opacity: 0.7, spiralType: 'logarithmic', backgroundColor: '#1A0033', verticalColor: '#00CED1', horizontalColor: '#483D8B', bothColor: '#DDA0DD', gradientStroke: true, dashEffect: false, autoRotate: true, curvedLines: true },
  solarFlareBlossom: { scale: 12, nodes: 22, rotation: 0, layers: 32, layerRatio: 5.0, verticalMirror: true, horizontalMirror: true, strokeColor: '#FFF700', lineWidth: 10, opacity: 0.2, spiralType: 'linear', backgroundColor: '#000000', verticalColor: '#FFD700', horizontalColor: '#FFFF00', bothColor: '#FFA500', gradientStroke: true, dashEffect: true, autoRotate: true, curvedLines: true },
  midnightBloom: { scale: 10, nodes: 45, rotation: 0, layers: 30, layerRatio: 4.5, verticalMirror: true, horizontalMirror: true, strokeColor: '#191970', lineWidth: 2, opacity: 0.6, spiralType: 'logarithmic', backgroundColor: '#0A0A23', verticalColor: '#4B0082', horizontalColor: '#8A2BE2', bothColor: '#FFFFFF', gradientStroke: false, dashEffect: true, autoRotate: false, curvedLines: true }
};
  const preset = presets[this.value];
  if (preset) {
    Object.keys(preset).forEach(key => {
      const element = document.getElementById(key);
      if (element.type === 'checkbox') element.checked = preset[key];
      else element.value = preset[key];
      const valueSpan = document.getElementById(key + 'Value');
      if (valueSpan) valueSpan.textContent = preset[key];
      if (key === 'layerRatio') {
        const numberInput = document.getElementById('layerRatioNumber');
        if (numberInput) numberInput.value = parseFloat(preset[key]).toFixed(1);
      }
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
      if (numberInput) numberInput.value = parseFloat(this.value).toFixed(1);
      const valueSpan = document.getElementById(this.id + 'Value');
      if (valueSpan) valueSpan.textContent = parseFloat(this.value).toFixed(1);
    } else if (this.id === 'layerRatioNumber') {
      const slider = document.getElementById('layerRatio');
      let value = parseFloat(this.value) || 0.1;
      value = Math.max(0.1, Math.min(10, value));
      this.value = value.toFixed(1);
      slider.value = value;
      const valueSpan = document.getElementById('layerRatioValue');
      if (valueSpan) valueSpan.textContent = value.toFixed(1);
    }
    drawSpiral();
  });

  // Blur event for layerRatioNumber validation
  if (input.id === 'layerRatioNumber') {
    input.addEventListener('blur', function() {
      const slider = document.getElementById('layerRatio');
      const valueSpan = document.getElementById('layerRatioValue');
      let value = parseFloat(this.value) || 0.1;
      value = Math.max(0.1, Math.min(10, value));
      this.value = value.toFixed(1);
      slider.value = value;
      if (valueSpan) valueSpan.textContent = value.toFixed(1);
      drawSpiral();
    });
  }
});

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

// -------------------------------
// Ratio Buttons
// -------------------------------
function setRatio(ratio) {
  document.getElementById('layerRatio').value = ratio;
  document.getElementById('layerRatioNumber').value = ratio.toFixed(1);
  document.getElementById('layerRatioValue').textContent = ratio.toFixed(1);
  saveState();
  drawSpiral();
}

// -------------------------------
// Fullscreen Handling
// -------------------------------
const fullscreenButton = document.getElementById('fullscreenButton');
const fullscreenOverlay = document.getElementById('fullscreenOverlay');

fullscreenButton.addEventListener('click', () => {
  const canvas = document.getElementById('spiralCanvas');
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
    showFullscreenOverlay();
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreenOverlay.style.display = 'none';
    resizeCanvas(); // Restore normal size
  } else {
    resizeCanvas(); // Adjust to fullscreen
  }
});

function showFullscreenOverlay() {
  fullscreenOverlay.style.display = 'block';
  setTimeout(() => {
    fullscreenOverlay.style.display = 'none';
  }, 3000); // Hide after 3 seconds
}

// Initial draw
drawSpiral();
