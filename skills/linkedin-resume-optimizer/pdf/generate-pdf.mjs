#!/usr/bin/env node
// Renders an ATS-safe CV HTML file (already filled in from the template) to PDF.
// Uses puppeteer-core against a locally installed Chrome/Edge — no bundled Chromium download.
//
// Usage: node generate-pdf.mjs <input.html> <output.pdf> [--format=letter|a4]

import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const [, , inputArg, outputArg, ...rest] = process.argv;

if (!inputArg || !outputArg) {
  console.error("Usage: node generate-pdf.mjs <input.html> <output.pdf> [--format=letter|a4]");
  process.exit(1);
}

const formatArg = rest.find((a) => a.startsWith("--format="));
const format = formatArg ? formatArg.split("=")[1] : "letter";
const pdfFormat = format === "a4" ? "A4" : "Letter";

const inputPath = path.resolve(inputArg);
const outputPath = path.resolve(outputArg);

if (!existsSync(inputPath)) {
  console.error(`Input HTML not found: ${inputPath}`);
  process.exit(1);
}

// pdf/output/ is gitignored, so a fresh clone won't have it yet.
mkdirSync(path.dirname(outputPath), { recursive: true });

function findBrowser() {
  const candidates =
    process.platform === "win32"
      ? [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
          "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
        ]
      : process.platform === "darwin"
      ? [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        ]
      : [
          "/usr/bin/google-chrome",
          "/usr/bin/chromium-browser",
          "/usr/bin/chromium",
          "/usr/bin/microsoft-edge",
        ];

  const found = candidates.find((p) => existsSync(p));
  if (!found) {
    console.error(
      "No local Chrome/Edge install found. Install Google Chrome or Microsoft Edge, " +
        "or set PUPPETEER_EXECUTABLE_PATH to a Chromium-based browser binary."
    );
    process.exit(1);
  }
  return found;
}

const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || findBrowser();

const browser = await puppeteer.launch({ executablePath, headless: true });
try {
  const page = await browser.newPage();
  await page.goto(`file://${inputPath}`, { waitUntil: "networkidle0" });
  await page.pdf({
    path: outputPath,
    format: pdfFormat,
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`PDF written to ${outputPath}`);
} finally {
  await browser.close();
}
