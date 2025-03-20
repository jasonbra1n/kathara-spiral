# Kathara Spiral Generator

Create stunning, customizable spirals with vibrant colored mirrors, multi-layered designs, and dynamic cosmic effects. This web-based tool lets you tweak scale, nodes, layers, and ratios, with options for logarithmic or linear growth, gradient strokes, dashed lines, and auto-rotation. Explore 12 presets—from the ethereal **Nebula** to the rippling **Cosmic Wave**—or craft your own spiral masterpiece.

An interactive web-based spiral generator that creates mesmerizing Kathara-inspired spiral patterns with customizable parameters and mirror effects. Built with HTML, CSS, and JavaScript, this project allows users to experiment with spirals, layers, mirroring, and colors, and download high-resolution images of their creations.

**[Live Demo](https://jasonbra1n.github.io/kathara-spiral/)** | **[Repository](https://github.com/jasonbra1n/kathara-spiral)**

## Features

- **Layered Spirals**: Stack up to 100 layers with adjustable scaling (shrink or grow).
- **Colored Mirroring**: Vertical, horizontal, or both, with distinct colors for each.
- **Dynamic Effects**: Auto-rotate, curved lines, gradients, and dashes for visual flair.
- **Presets**: 12 unique designs, optimized for cosmic and artistic impact.
- **Responsive**: Works on desktop and mobile with touch controls.
- **Export**: Download high-res PNGs (2160x2160).

## Topics

- canvas
- javascript
- spiral-generator
- visual-art
- web-app
- interactive
- cosmic-design
- geometry

## Usage

1. Open the [live demo](https://jasonbra1n.github.io/kathara-spiral/) in your browser.
2. Use the controls to customize your spiral:
   - **Core Parameters**: Adjust scale, nodes, rotation, and toggle auto-rotation.
   - **Layer Controls**: Set the number of layers (max 100) and layer ratio, or use Golden/Silver Ratio buttons.
   - **Mirror Effects**: Enable mirroring and pick colors for vertical, horizontal, or both.
   - **Style Options**: Choose colors, line width, opacity, spiral type, gradient stroke, and dashed lines.
3. Click "Download Image (2160×2160)" to save your creation as a high-resolution PNG.

## Installation

To run this project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jasonbra1n/kathara-spiral.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd kathara-spiral
   ```
3. **Open `index.html`**:
   - Use a local server (recommended) for full functionality:
     ```bash
     npx http-server
     ```
     Then visit `http://localhost:8080` in your browser.
   - Alternatively, open `index.html` directly (some features, like downloads, may be limited due to browser security restrictions).

## Files

- `index.html`: The main HTML structure with controls and canvas.
- `script.js`: JavaScript logic for drawing spirals, handling inputs, and exporting images.
- `styles.css`: CSS for responsive layout and styling.

## How It Works

- The spiral is drawn on an HTML5 canvas using JavaScript, updating instantly with user inputs.
- Mirror effects reflect the spiral path across vertical and/or horizontal axes with customizable colors.
- Logarithmic spirals use an exponential growth factor, while linear spirals increase radius proportionally.
- Performance is optimized for up to 50 nodes and 100 layers, with options to disable gradient strokes for lighter rendering.

## Presets

- **Golden Spiral**: A dense logarithmic spiral with 50 nodes, 50 layers, and a soft golden glow (ratio 4.8).
- **Dense Mirror**: A tightly packed, mirrored linear spiral with 50 nodes, 80 layers, and dashed lines (ratio 4.6).
- **Minimalist**: A subtle, three-layer spiral with 12 nodes and smooth curves (ratio 5).
- **Star Burst**: A vibrant, fully mirrored spiral with 50 nodes, 40 layers, and auto-rotation (ratio 5.2).
- **Double Helix**: A helical logarithmic spiral with 40 nodes, 20 layers, and vertical mirroring (ratio 5.5).
- **Nebula**: A cosmic, semi-transparent spiral with 50 nodes, 100 layers, and a space-cloud effect (ratio 4.7).
- **Kaleidoscope**: A mirrored, dashed spiral with 50 nodes, 60 layers, and auto-rotation (ratio 4.8).
- **Cosmic Wave**: A flowing, auto-rotating spiral with 45 nodes, 70 layers, and logarithmic curves (ratio 4.5).
- **Fractal Bloom**: A detailed, mirrored spiral with 50 nodes, 50 layers, and smooth curves (ratio 5.3).
- **Crystal Vortex**: A sharp, logarithmic spiral with 40 nodes, 40 layers, and vertical mirroring (ratio 4.9).
- **Galactic Pulse**: A bold, auto-rotating spiral with 50 nodes, 60 layers, and horizontal mirroring (ratio 5.1).
- **Ethereal Rings**: A soft, dashed spiral with 30 nodes, 80 layers, and full mirroring (ratio 4.6).

## Contributing

Feel free to fork this repository and submit pull requests with enhancements or bug fixes. Suggestions are welcome via GitHub Issues!

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by geometric art and the Kathara grid.
- Built with love for creative coding and interactive web experiences.
- Special thanks to collaborators for feedback and feature ideas!

---

Created by [jasonbra1n](https://github.com/jasonbra1n) | March 2025
