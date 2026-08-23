#!/usr/bin/env node
/**
 * Chapter PDF generation for the web edition.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import config from '../lib/config.js';

const baseDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outputDir = path.join(baseDir, 'pdf-output');
const pathSegment = config.pathPrefix.replace(/^\/|\/$/g, '');

const argIdx = process.argv.indexOf('--base-url');
const baseUrl =
  argIdx !== -1
    ? process.argv[argIdx + 1].replace(/\/$/, '')
    : `http://localhost:4000/${pathSegment}`;
const maxConcurrency = Number(process.env.MAX_CONCURRENCY || 4);

const manifestPath = path.join(baseDir, 'generated', 'print-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('generated/print-manifest.json not found — run `npm run build` first');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
fs.mkdirSync(outputDir, { recursive: true });

const pdfOptions = {
  format: 'Letter',
  printBackground: true,
  margin: { top: '0.75in', bottom: '0.75in', left: '0.75in', right: '0.75in' },
  displayHeaderFooter: true,
  headerTemplate:
    '<div style="font-size: 9px; width: 100%; text-align: center; color: #666;"><span class="title"></span></div>',
  footerTemplate:
    '<div style="font-size: 9px; width: 100%; text-align: center; color: #666;">' +
    `${config.bookTitle} (Michael Corral) — ${config.license} — ` +
    'Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
};

async function generateOne(browser, entry) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  try {
    const url = `${baseUrl}${entry.printUrl}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
    await page.evaluate(async () => {
      if (window.MathJax && window.MathJax.startup) await window.MathJax.startup.promise;
    });
    await page.waitForTimeout(500);
    await page.pdf({ ...pdfOptions, path: path.join(outputDir, entry.pdfName) });
    console.log(`  ✓ ${entry.pdfName} (${entry.title})`);
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch();
try {
  console.log(`Generating ${manifest.length} chapter PDFs from ${baseUrl} ...`);
  let i = 0;
  async function worker() {
    while (i < manifest.length) {
      const entry = manifest[i++];
      await generateOne(browser, entry);
    }
  }
  await Promise.all(Array.from({ length: maxConcurrency }, () => worker()));
  console.log(`Done — PDFs in ${outputDir}`);
} finally {
  await browser.close();
}
