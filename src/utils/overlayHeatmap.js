import { createCanvas, loadImage } from 'canvas';

/**
 * Overlay heatmap blobs on a screenshot using gaze points.
 * @param {Buffer} screenshotBuffer - PNG screenshot of the landing page.
 * @param {Array<{label: string, x: number, y: number, focusScore: number}>} gazePoints
 * @returns {Buffer} - PNG image with heatmap overlay
 */
export const overlayHeatmap = async (screenshotBuffer, gazePoints) => {
  const width = 1280;
  const height = 720;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Load and draw the base screenshot
  const screenshot = await loadImage(screenshotBuffer);
  ctx.drawImage(screenshot, 0, 0, width, height);

  // Draw heatmap blobs for each gaze point
  gazePoints.forEach(({ x, y, focusScore }) => {
    const radius = 60;
    const opacity = Math.min(Math.max(focusScore, 0.1), 1);

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(255, 0, 0, ${opacity})`);
    gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  });

  return canvas.toBuffer('image/png');
};
