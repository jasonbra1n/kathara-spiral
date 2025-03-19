const canvas = document.getElementById('spiralCanvas');
    const ctx = canvas.getContext('2d');

    // -------------------------------
    // Responsive Canvas Setup
    // -------------------------------
    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientWidth; // Maintain a square canvas
      drawSpiral();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // -------------------------------
    // Spiral Drawing Functions
    // -------------------------------
    function drawSpiralOnContext(context, width, height) {
      const backgroundColor = document.getElementById('backgroundColor').value;
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height); // Set dynamic background color

      context.save();
      
      // Get control values
      const params = {
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
        verticalColor: document.getElementById('verticalColor').value,
        horizontalColor: document.getElementById('horizontalColor').value,
        bothColor: document.getElementById('bothColor').value
      };
      
      context.lineWidth = params.lineWidth;
      context.globalAlpha = params.opacity;
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      for (let l = 0; l < params.layers; l++) {
        const currentScale = params.scale * (l + 1) * (params.layerRatio / 10);
        const initialAngle = (params.rotation + (l * 10)) * (Math.PI / 180);
  
        // Draw original spiral
        drawSpiralPath(context, centerX, centerY, params, initialAngle, currentScale, false, false, params.strokeColor);
  
        // Draw mirrored spirals with custom colors
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
      context.strokeStyle = color;
      let angle = initialAngle;
      const spiralType = document.getElementById('spiralType').value; // Get selected spiral type
      
      for (let i = 0; i < params.nodes; i++) {
        let r;
        if (spiralType === 'linear') {
          r = currentScale * i; // Linear radius increase
        } else if (spiralType === 'logarithmic') {
          r = currentScale * Math.exp(0.1 * i); // Logarithmic radius increase
        }
        let x = centerX + Math.cos(angle) * r;
        let y = centerY + Math.sin(angle) * r;
  
        if (mirrorX) x = centerX * 2 - x;
        if (mirrorY) y = centerY * 2 - y;
  
        context.lineTo(x, y);
        angle += Math.PI / 3;
      }
      context.stroke();
    }
    
    // Draw the spiral on the main canvas
    function drawSpiral() {
      drawSpiralOnContext(ctx, canvas.width, canvas.height);
    }
    
    // -------------------------------
    // Preset Ratio and Input Sync
    // -------------------------------
    function setRatio(ratio) {
      document.getElementById('layerRatio').value = ratio;
      document.getElementById('layerRatioNumber').value = ratio;
      drawSpiral();
    }
    
    document.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', function() {
        // Update linked number inputs
        if (this.type === 'range') {
          const numberInput = document.getElementById(this.id + 'Number');
          if (numberInput) numberInput.value = this.value;
        }
        // Update value displays
        const valueSpan = document.getElementById(this.id + 'Value');
        if (valueSpan) valueSpan.textContent = this.value;
        drawSpiral();
      });
    });
    
    // Specific listener for spiral type change
    document.getElementById('spiralType').addEventListener('change', drawSpiral);
    
    // -------------------------------
    // Auto-Rotate Animation
    // -------------------------------
    let isAnimating = false;
    
    function animateRotation() {
      if (isAnimating) {
        let rotationInput = document.getElementById('rotation');
        let currentRotation = parseFloat(rotationInput.value);
        currentRotation = (currentRotation + 1) % 360; // Increment by 1 degree per frame
        rotationInput.value = currentRotation;
        document.getElementById('rotationValue').textContent = Math.round(currentRotation);
        drawSpiral();
        requestAnimationFrame(animateRotation); // Schedule next frame
      }
    }
    
    document.getElementById('autoRotate').addEventListener('change', function() {
      isAnimating = this.checked;
      if (isAnimating) {
        animateRotation(); // Start animation if checked
      }
    });
    
    // -------------------------------
    // Download Function (2160x2160)
    // -------------------------------
    function downloadCanvas() {
      // Create an offscreen canvas for high-resolution download
      const downloadCanvas = document.createElement('canvas');
      downloadCanvas.width = 2160;
      downloadCanvas.height = 2160;
      const downloadCtx = downloadCanvas.getContext('2d');
      
      // Draw the spiral at 2160x2160 resolution
      drawSpiralOnContext(downloadCtx, downloadCanvas.width, downloadCanvas.height);
      
      const link = document.createElement('a');
      link.download = 'kathara-spiral.png';
      link.href = downloadCanvas.toDataURL();
      link.click();
    }
    
    // Initial draw
    drawSpiral();
