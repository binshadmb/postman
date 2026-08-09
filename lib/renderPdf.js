// lib/renderPdf.js
// Vercel-safe HTML → PDF rendering, same launcher pattern used across the
// Khagatara stack (puppeteer-core + @sparticuz/chromium).

const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

async function renderHtmlToPdf(html) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "18mm", bottom: "18mm", left: "16mm", right: "16mm" },
    });
    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

module.exports = { renderHtmlToPdf };
