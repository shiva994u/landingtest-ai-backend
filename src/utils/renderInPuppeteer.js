import puppeteer from "puppeteer";
import { chromium } from "playwright";

export const renderInPuppeteer = async (html) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html);
  const screenshot = await page.screenshot();
  await browser.close();
  return screenshot;
};

export const renderInPlaywright = async (html) => {
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
