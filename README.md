# Kathara Spiral with Colored Mirrors

An interactive web-based spiral generator that creates mesmerizing Kathara-inspired spiral patterns with customizable parameters and mirror effects. Built with HTML, CSS, and JavaScript, this project allows users to experiment with spirals, layers, mirroring, and colors, and even download high-resolution images of their creations.

**[Live Demo](https://jasonbra1n.github.io/kathara-spiral/)** | **[Repository](https://github.com/jasonbra1n/kathara-spiral)**

## Features

- **Customizable Spirals**: Adjust scale, number of nodes, rotation, and spiral type (linear or logarithmic).
- **Layer Controls**: Add multiple layers with adjustable ratios, including presets for Golden Ratio (1.618) and Silver Ratio (2.414).
- **Mirror Effects**: Enable vertical and/or horizontal mirroring with distinct color options for each.
- **Style Options**: Modify stroke color, line width, opacity, and background color.
- **Auto-Rotation**: Toggle continuous spiral rotation for dynamic visuals.
- **High-Resolution Export**: Download your spiral as a 2160x2160 PNG image.
- **Responsive Design**: Works seamlessly on both mobile and desktop devices.

## Usage

1. Open the [live demo](https://jasonbra1n.github.io/kathara-spiral/) in your browser.
2. Use the controls to customize your spiral:
   - **Core Parameters**: Adjust scale, nodes, rotation, and toggle auto-rotation.
   - **Layer Controls**: Set the number of layers and layer ratio, or use the Golden/Silver Ratio buttons.
   - **Mirror Effects**: Enable mirroring and pick colors for vertical, horizontal, or both.
   - **Style Options**: Choose colors, line width, opacity, and spiral type.
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
   - Use a local server (recommended) for proper functionality:
     ```bash
     npx http-server
     ```
     Then visit `http://localhost:8080` in your browser.
   - Alternatively, open `index.html` directly in a browser (some features may be limited due to security restrictions).

## Files

- `index.html`: The main HTML structure with controls and canvas.
- `script.js`: JavaScript logic for drawing spirals, handling inputs, and exporting images.
- `styles.css`: CSS for responsive layout and styling.

## How It Works

- The spiral is drawn on an HTML5 canvas using JavaScript.
- Users can tweak parameters in real-time, with the canvas updating instantly.
- Mirror effects are achieved by reflecting the spiral path across vertical and/or horizontal axes, with customizable colors.
- The logarithmic spiral option uses an exponential growth factor, while the linear spiral increases radius proportionally.

## Contributing

Feel free to fork this repository and submit pull requests with enhancements or bug fixes. Suggestions are welcome via GitHub Issues!

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by geometric art and the Kathara grid.
- Built with love for creative coding and interactive web experiences.

---

Created by [jasonbra1n](https://github.com/jasonbra1n) | March 2025
```
