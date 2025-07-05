import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1", // custom base URL
});

/**
 * Uses GPT-4 to infer user gaze focus zones on a webpage.
 * @param {string} html - HTML string of the landing page.
 * @param {string} persona - Persona description.
 * @returns {Promise<Array<{label: string, x: number, y: number, focusScore: number}>>}
 */
export const gptInferGazeAreas = async (html, persona) => {
  const prompt = `
You are an expert in UX behavior modeling and visual attention simulation.

A user with the following persona is viewing a web landing page rendered in HTML:

Persona: "${persona}"

You must:
1. Estimate the user's engagement level with this page on a scale from 0.0 (not engaged) to 1.0 (very engaged).
2. Identify **exactly 3** key visual focus areas where the user's attention would likely go.

For each focus area, provide:
- "label" — a short name for the section (e.g., "Hero Title", "CTA Button")
- "x", "y" — screen coordinates (assume a 1280x720 viewport)
- "focusScore" — attention intensity on this area (0.0 to 1.0)

Return your response in this exact JSON format:

{
  "engagementScore": 0.85,
  "gazePoints": [
    { "label": "Hero Title", "x": 220, "y": 100, "focusScore": 0.92 },
    { "label": "CTA Button", "x": 640, "y": 400, "focusScore": 0.88 },
    { "label": "Pricing Section", "x": 400, "y": 600, "focusScore": 0.73 }
  ]
}

HTML content:
${html}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const text = completion.choices[0].message.content.trim();

    try {
      const result = JSON.parse(text);
      if (result && result.gazePoints) return result;
    } catch (parseErr) {
      console.warn("Failed to parse JSON from GPT:", text);
    }

    return { engagementScore: 0, gazePoints: [] };
  } catch (err) {
    console.error("OpenAI API error:", err);
    return { engagementScore: 0, gazePoints: [] };
  }
};
