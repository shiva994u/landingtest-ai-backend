import puppeteer from "puppeteer";

export const renderInPuppeteer = async (html) => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: puppeteer.executablePath(), // Ensures correct path
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.setContent(html, { waitUntil: "networkidle0" });

  const screenshot = await page.screenshot({ type: "png" });

  await browser.close();
  return screenshot;
};
