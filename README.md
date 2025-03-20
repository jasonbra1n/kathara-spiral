# Kathara Spiral with Colored Mirrors

An interactive web-based spiral generator that creates mesmerizing Kathara-inspired spiral patterns with customizable parameters and mirror effects. Built with HTML, CSS, and JavaScript, this project allows users to experiment with spirals, layers, mirroring, and colors, and download high-resolution images of their creations.

**[Live Demo](https://jasonbra1n.github.io/kathara-spiral/)** | **[Repository](https://github.com/jasonbra1n/kathara-spiral)**

## Features

- **Customizable Spirals**: Adjust scale (1-100), nodes (5-50), rotation (0-360°), and spiral type (linear or logarithmic).
- **Layer Controls**: Add up to 100 layers with adjustable ratios, including presets for Golden Ratio (1.618) and Silver Ratio (2.414).
- **Mirror Effects**: Enable vertical and/or horizontal mirroring with distinct color options for each.
- **Style Options**: Modify stroke color, line width (1-10), opacity (0-1), background color, gradient strokes, and dashed lines.
- **Auto-Rotation**: Toggle continuous spiral rotation for dynamic visuals.
- **Presets**: Choose from predefined configurations like Golden Spiral, Dense Mirror, Minimalist, Star Burst, Double Helix, Nebula, Kaleidoscope, Cosmic Wave, and Fractal Bloom.
- **High-Resolution Export**: Download your spiral as a 2160x2160 PNG image.
- **Responsive Design**: Works seamlessly on mobile (with pinch-to-zoom and swipe-to-rotate) and desktop devices.
- **Undo/Reset**: Revert to previous states or reset to defaults with a 10-step undo history.

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
   - Alternatively, open `index.html` directly (some features, like downloads, may be limited due to security restrictions).

## Files

- `index.html`: The main HTML structure with controls and canvas.
- `script.js`: JavaScript logic for drawing spirals, handling inputs, and exporting images.
- `styles.css`: CSS for responsive layout and styling.

## How It Works

- The spiral is drawn on an HTML5 canvas using JavaScript, updating instantly with user inputs.
- Mirror effects reflect the spiral path across vertical and/or horizontal axes with customizable colors.
- Logarithmic spirals use an exponential growth factor, while linear spirals increase radius proportionally.
- Performance is optimized with a max of 50 nodes and 100 layers, with options to disable gradient strokes for lighter rendering.

## Presets

- **Golden Spiral**: A logarithmic spiral with 50 nodes, 10 layers, and golden-hued growth (ratio 6).
- **Dense Mirror**: A dense, mirrored linear spiral with 50 nodes, 20 layers, and dashed lines (ratio 5.5).
- **Minimalist**: A simple, single-layer spiral with 12 nodes and smooth curves (ratio 5).
- **Star Burst**: A vibrant, fully mirrored spiral with 50 nodes, 5 layers, and auto-rotation (ratio 6.5).
- **Double Helix**: A two-layer logarithmic spiral with 40 nodes and vertical mirroring (ratio 7).
- **Nebula**: A cosmic, semi-transparent spiral with 50 nodes, 100 layers, and a space-cloud effect (ratio 4.7).
- **Kaleidoscope**: A mirrored, dashed-line spiral with 50 nodes, 8 layers, and auto-rotation (ratio 6).
- **Cosmic Wave**: A flowing, auto-rotating spiral with 45 nodes, 10 layers, and logarithmic curves (ratio 5.8).
- **Fractal Bloom**: A detailed, mirrored spiral with 50 nodes, 15 layers, and smooth curves (ratio 6.2).
- **Crystal Vortex**: A sharp, logarithmic spiral with 40 nodes, 6 layers, and vertical mirroring (ratio 5.5).
- **Galactic Pulse**: A bold, auto-rotating spiral with 50 nodes, 8 layers, and horizontal mirroring (ratio 6.5).
- **Ethereal Rings**: A soft, dashed spiral with 30 nodes, 12 layers, and full mirroring (ratio 5.2).

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
```
