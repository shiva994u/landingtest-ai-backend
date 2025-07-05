import { renderInPuppeteer } from "../utils/renderInPuppeteer.js";
import { gptInferGazeAreas } from "../utils/gptInferGazeAreas.js";
import { overlayHeatmap } from "../utils/overlayHeatmap.js";
import { uploadToSupabaseStorage } from "../utils/uploadToSupabaseStorage.js";

/**
 * Generates a heatmap based on the provided HTML and user persona.
 * 
 * @param {string} html - The HTML content of the landing page.
 * @param {string} persona - The user persona to simulate.
 * @returns {Promise<string>} - The URL of the uploaded heatmap image.
 */
export const generateHeatmap = async (html, persona) => {
  const screenshotBuffer = await renderInPuppeteer(html);
  const {engagementScore, gazePoints } = await gptInferGazeAreas(html, persona);
  const heatmapBuffer = await overlayHeatmap(screenshotBuffer, gazePoints);
  const imageUrl = await uploadToSupabaseStorage(heatmapBuffer, persona);

  return {
    heatmapUrl: imageUrl,
    engagementScore,
  };
};
