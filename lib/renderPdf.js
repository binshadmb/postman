// lib/renderPdf.js
// Vercel-safe HTML → PDF rendering (puppeteer-core + @sparticuz/chromium).
// Matches @sparticuz/chromium's current documented usage pattern exactly —
// the previous version was pinned to an old (v123) release with outdated
// launch args, which caused "libnss3.so: cannot open shared object file"
// at runtime on Vercel. Newer releases of both packages are ESM-only, so
// this file uses import/export instead of require()/module.exports.

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

// Disabling WebGL isn't needed for rendering print documents and reduces
// the chance of graphics-related launch failures in the serverless sandbox.
chromium.setGraphicsMode = false;

export async function renderHtmlToPdf(html) {
  const browser = await puppeteer.launch({
    args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: "shell",
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
