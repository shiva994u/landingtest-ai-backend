import puppeteer from 'puppeteer';

/**
 * Render HTML content in a headless browser and return a screenshot.
 * @param {string} html - The HTML string to render.
 * @returns {Promise<Buffer>} - PNG screenshot as a Buffer.
 */
export const renderInPuppeteer = async (html) => {
  const browser = await puppeteer.launch({
    headless: 'new', // for Chromium >= 112
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    await page.setContent(html, {
      waitUntil: ['domcontentloaded', 'networkidle0']
    });

    const screenshot = await page.screenshot({ fullPage: true });
    await browser.close();

    return screenshot;
  } catch (error) {
    await browser.close();
    console.error('Puppeteer render error:', error);
    throw new Error('Failed to render HTML in Puppeteer');
  }
};
