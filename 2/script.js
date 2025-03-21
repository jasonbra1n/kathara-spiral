const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');

let currentParams = {};
let history = [];
const defaultParams = {
  scale: 30, nodes: 12, rotation: 0, layers: 3, layerRatio: 2,
  verticalMirror: false, horizontalMirror: false, strokeColor: '#00FFFF',
  lineWidth: 2, opacity: 1, spiralType: 'linear', backgroundColor: '#111111',
  verticalColor: '#FF00FF', horizontalColor: '#FFFF00', bothColor: '#FFFFFF',
  gradientStroke: true, dashEffect: false, curvedLines: false
};
let baseScale = defaultParams.scale;

// -------------------------------
// Responsive Canvas Setup
// -------------------------------
function resizeCanvas() {
  if (document.fullscreenElement) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    canvas.width = vw;
    canvas.height = vh;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
  } else {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientWidth;
    canvas.style.width = '';
    canvas.style.height = '';
  }
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
    curvedLines: document.getElementById('curvedLines').checked,
    autoRotate: document.getElementById('autoRotate').checked,
    audioReactive: document.getElementById('audioReactive').checked,
    audioRotate: document.getElementById('audioRotate').checked,
    audioScale: document.getElementById('audioScale').checked,
    audioOpacity: document.getElementById('audioOpacity').checked
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
      if (key === 'scale') {
        baseScale = parseFloat(preset[key]);
        document.getElementById('scale').value = baseScale;
        document.getElementById('scaleValue').textContent = baseScale;
        console.log(`Preset loaded: baseScale set to ${baseScale}`);
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
      if (key === 'scale') baseScale = parseFloat(lastState[key]);
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
    if (key === 'scale') baseScale = defaultParams[key];
  });
  document.getElementById('autoRotate').checked = false;
  document.getElementById('audioReactive').checked = false;
  document.getElementById('audioRotate').checked = false;
  document.getElementById('audioScale').checked = false;
  document.getElementById('audioOpacity').checked = false;
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
    if (this.id === 'scale' && !currentParams.audioReactive) {
      baseScale = parseFloat(this.value);
      console.log(`Manual scale adjust: baseScale set to ${baseScale}`);
    }
    drawSpiral();
  });

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
function animateRotation() {
  if (currentParams.autoRotate) {
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
  currentParams.autoRotate = this.checked;
  if (this.checked) animateRotation();
  else drawSpiral();
});

// -------------------------------
// Audio Reactive Setup
// -------------------------------
let audioContext, analyser, dataArray;

async function initAudio() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 64;
    analyser.smoothingTimeConstant = 0.3;
    source.connect(analyser);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    console.log('Audio initialized');
  } catch (err) {
    console.error('Error accessing microphone:', err);
    alert('Couldn’t access microphone. Please allow mic permissions.');
  }
}

function getAudioAmplitude() {
  if (!analyser) return 0;
  analyser.getByteTimeDomainData(dataArray);
  let max = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const a = Math.abs(dataArray[i] / 128 - 1);
    max = Math.max(max, a);
  }
  return max;
}

function animateAudioReactive() {
  if (currentParams.audioReactive) {
    const amplitude = getAudioAmplitude();
    const scaleInput = document.getElementById('scale');
    const rotationInput = document.getElementById('rotation');
    const opacityInput = document.getElementById('opacity');

    if (currentParams.audioRotate) {
      let baseRotation = parseFloat(rotationInput.value) || 0;
      const fluctuation = amplitude * 180;
      rotationInput.value = (baseRotation + fluctuation) % 360;
      document.getElementById('rotationValue').textContent = Math.round(rotationInput.value);
    }

    if (currentParams.audioScale) {
      const currentScale = parseFloat(scaleInput.value);
      let newScale;
      if (amplitude > 0.05) {
        const targetScale = baseScale + (amplitude * 100);
        newScale = Math.min(Math.max(targetScale, baseScale), 100);
      } else {
        newScale = baseScale; // Force exact baseScale when silent
      }
      scaleInput.value = newScale;
      document.getElementById('scaleValue').textContent = Math.round(newScale);
      console.log(`Audio reactive: baseScale=${baseScale}, currentScale=${currentScale}, newScale=${newScale}, amplitude=${amplitude}`);
    }

    if (currentParams.audioOpacity) {
      const baseOpacity = parseFloat(opacityInput.value) || 1;
      const fluctuation = amplitude * 0.5;
      opacityInput.value = Math.min(Math.max(baseOpacity - fluctuation + 0.5, 0), 1);
      document.getElementById('opacityValue').textContent = opacityInput.value;
    }

    drawSpiral();
    requestAnimationFrame(animateAudioReactive);
  }
}

document.getElementById('audioReactive').addEventListener('change', function() {
  currentParams.audioReactive = this.checked;
  document.getElementById('audioOptions').style.display = this.checked ? 'block' : 'none';
  if (this.checked && !audioContext) {
    baseScale = parseFloat(document.getElementById('scale').value);
    console.log(`Audio reactive enabled: baseScale locked to ${baseScale}`);
    initAudio().then(() => {
      animateAudioReactive();
    });
  } else if (this.checked) {
    baseScale = parseFloat(document.getElementById('scale').value);
    console.log(`Audio reactive re-enabled: baseScale reset to ${baseScale}`);
    animateAudioReactive();
  } else {
    document.getElementById('scale').value = baseScale;
    document.getElementById('scaleValue').textContent = Math.round(baseScale);
    console.log(`Audio reactive disabled: scale reset to baseScale=${baseScale}`);
    drawSpiral();
  }
});

document.getElementById('audioScale').addEventListener('change', function() {
  currentParams.audioScale = this.checked;
  if (!this.checked) {
    document.getElementById('scale').value = baseScale;
    document.getElementById('scaleValue').textContent = Math.round(baseScale);
    console.log(`Audio scale disabled: scale reset to baseScale=${baseScale}`);
  }
  drawSpiral();
});

document.getElementById('audioRotate').addEventListener('change', function() {
  currentParams.audioRotate = this.checked;
  drawSpiral();
});

document.getElementById('audioOpacity').addEventListener('change', function() {
  currentParams.audioOpacity = this.checked;
  drawSpiral();
});

// Allow manual adjustments during audio reactivity
['scale', 'opacity'].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('input', function() {
    if (currentParams.audioReactive && id === 'scale' && !currentParams.audioScale) {
      baseScale = parseFloat(this.value);
      console.log(`Manual adjust during audio reactive (audioScale off): baseScale set to ${baseScale}`);
    }
    document.getElementById(id + 'Value').textContent = id === 'opacity' ? this.value : Math.round(this.value);
    drawSpiral();
  });
});

// -------------------------------
// Mobile Touch Controls
// -------------------------------
let initialPinchDistance = null;
let initialScale = null;
let touchStartTime = null;
const TAP_THRESHOLD = 200;

canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
canvas.addEventListener('touchmove', handleTouchMove, { passive: false }); // Non-passive due to preventDefault

function handleTouchStart(e) {
  if (document.fullscreenElement && isMobile) {
    touchStartTime = Date.now();
  }
  if (e.touches.length === 2) {
    initialPinchDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    initialScale = parseFloat(document.getElementById('scale').value);
  }
}

function handleTouchMove(e) {
  e.preventDefault(); // Needed for pinch/rotate control
  if (e.touches.length === 2 && initialPinchDistance) {
    const currentDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    const scaleInput = document.getElementById('scale');
    const newScale = initialScale * (currentDistance / initialPinchDistance);
    scaleInput.value = Math.min(Math.max(newScale, 1), 100);
    if (!currentParams.audioReactive || !currentParams.audioScale) {
      baseScale = parseFloat(scaleInput.value);
      console.log(`Pinch adjust: baseScale set to ${baseScale}`);
    }
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

function handleTouchEnd(e) {
  if (document.fullscreenElement && isMobile && e.touches.length === 0) {
    const touchDuration = Date.now() - touchStartTime;
    if (touchDuration < TAP_THRESHOLD && initialPinchDistance === null) {
      document.exitFullscreen();
    }
  }
  initialPinchDistance = null;
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
const isMobile = 'ontouchstart' in window || window.innerWidth < 768;

fullscreenButton.addEventListener('click', () => {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
    showFullscreenOverlay();
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    fullscreenOverlay.style.display = 'none';
    resizeCanvas();
  } else {
    resizeCanvas();
  }
});

function showFullscreenOverlay() {
  fullscreenOverlay.textContent = isMobile ? 'Tap to exit full screen' : 'Press ESC to exit full screen';
  fullscreenOverlay.style.display = 'block';
  setTimeout(() => {
    fullscreenOverlay.style.display = 'none';
  }, 3000);
}

// Initial draw
drawSpiral();
