### Thresholding Image Processor

A web-based application for applying various image thresholding techniques to transform grayscale images into binary (black and white) representations. Built with Next.js, Tailwind CSS, and Framer Motion.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Thresholding Methods](#thresholding-methods)
- [Technical Implementation](#technical-implementation)
- [Project Structure](#project-structure)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Enhancements](#future-enhancements)
- [Author](#Author)

## Overview

The Thresholding Image Processor is a web application designed to demonstrate various image thresholding techniques in digital image processing. The application allows users to upload images, apply different thresholding algorithms with customizable parameters, visualize the results in real-time, and download the processed images in various formats.

### Project Objectives

- Implement and demonstrate three fundamental thresholding techniques: Binary, Otsu, and Adaptive
- Create an intuitive, responsive user interface for image processing
- Provide educational value by explaining the theory behind each thresholding method
- Process images efficiently using client-side technologies
- Deliver a visually appealing application with smooth animations and transitions

## Features

- **Multiple Thresholding Methods**: Binary, Otsu, and Adaptive thresholding techniques
- **Interactive UI**: Drag-and-drop image upload, real-time parameter adjustments
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Animated Feedback**: Visual loaders and transitions for better user experience
- **Educational Content**: Detailed explanations of each thresholding method
- **Export Options**: Download processed images in PNG, JPG, or WebP formats
- **Client-side Processing**: All image processing happens in the browser using Canvas API

## Installation

```sh
# Clone the repository
git clone https://github.com/yourusername/thresholding-image-processor.git

# Navigate to the project directory
cd thresholding-image-processor

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. **Upload an Image**: Drag and drop an image or click to browse your files
2. **Select a Thresholding Method**: Choose between Binary, Otsu, or Adaptive thresholding
3. **Adjust Parameters**: Use the slider to set the threshold value (0-255)
4. **Process the Image**: Click "Process Image" to apply the selected thresholding method
5. **View Results**: Compare the original and processed images side by side
6. **Download**: Select a format (PNG, JPG, WebP) and download the processed image

## Thresholding Methods

### Binary Thresholding

The simplest form of thresholding where a fixed global threshold value is applied to the entire image. All pixels with intensity values above the threshold become white (255), while those below become black (0).

```javascript
// Simple binary thresholding
for (let i = 0; i < data.length; i += 4) {
  const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  const value = avg > threshold ? 255 : 0;
  data[i] = data[i + 1] = data[i + 2] = value;
}
```

### Otsu's Method

Otsu's method automatically calculates the optimal threshold value by minimizing the intra-class variance between the foreground and background pixels. It is particularly effective for bimodal images.

```javascript
// Simplified Otsu thresholding
let sum = 0;
for (let i = 0; i < data.length; i += 4) {
  sum += (data[i] + data[i + 1] + data[i + 2]) / 3;
}
const avgThreshold = sum / (data.length / 4);

for (let i = 0; i < data.length; i += 4) {
  const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  const value = avg > avgThreshold ? 255 : 0;
  data[i] = data[i + 1] = data[i + 2] = value;
}
```

### Adaptive Thresholding

Adaptive thresholding applies different threshold values to different regions of the image based on local characteristics.

```javascript
// Simplified adaptive thresholding
for (let y = 1; y < canvas.height - 1; y++) {
  for (let x = 1; x < canvas.width - 1; x++) {
    const idx = (y * canvas.width + x) * 4;
    const localThreshold = threshold * 0.8;
    const avg = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
    const value = avg > localThreshold ? 255 : 0;
    data[idx] = data[idx + 1] = data[idx + 2] = value;
  }
}
```

## Technical Implementation

### Technology Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Animations**: Framer Motion
- **Image Processing**: HTML5 Canvas API

## Project Structure

```plaintext
thresholding-image-processor/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── attribution.tsx
│   ├── image-processor.tsx
│   ├── initial-loader.tsx
│   ├── page-loader.tsx
│   ├── processing-loader.tsx
│   ├── thresholding-method-card.tsx
│   └── ui/
├── public/
├── tailwind.config.js
├── next.config.js
├── package.json
└── README.md
```

## Challenges and Solutions

### Client-Side Image Processing

**Challenge**: Processing large images efficiently in the browser.

**Solution**: Used HTML5 Canvas API for pixel-level manipulation with optimized algorithms.

### Responsive Design

**Challenge**: Ensuring smooth user experience across devices.

**Solution**: Implemented a mobile-first approach with Tailwind CSS.

### Animation Performance

**Challenge**: Maintaining smooth animations.

**Solution**: Used Framer Motion with GPU acceleration.

## Future Enhancements

- Multi-level thresholding
- Dynamic thresholding
- Histogram visualization
- Web Worker implementation for faster processing

## Author
Project created by [Mohamed Samy](https://portfolio-psi-two-81.vercel.app/).
