import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1" // custom base URL
});

/**
 * Runs a GPT-based simulation for a persona viewing the landing page.
 * @param {string} html - The HTML content of the landing page.
 * @param {string} persona - The persona type (e.g., "Gen Z", "SaaS Founder").
 * @returns {string} - GPT-generated behavioral insight.
 */
export const runLLMSimulation = async (html, persona) => {

  const prompt = `
You're simulating the behavior of a user persona: "${persona}".
Given the HTML content of a landing page, describe what the user notices first, what they ignore, whether they understand the CTA, and what would prevent them from converting.

Landing Page HTML: 
${html}

Respond in 3 bullet points, focused on behavioral insights from the perspective of "${persona}".
`;

  const completion = await openai.chat.completions.create({
    model: "anthropic/claude-3-haiku", // You can also use "gpt-3.5-turbo" if needed
    messages: [
      { role: "system", content: "You are a UX behavior simulation agent." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
};
