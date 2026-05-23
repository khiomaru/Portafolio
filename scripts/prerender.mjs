import { launch } from 'puppeteer-core';
import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { cwd } from 'process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = join(root, 'dist');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);
  if (!existsSync(filePath)) {
    filePath = join(distDir, 'index.html');
  }
  const ext = extname(filePath);
  const content = readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  res.end(content);
});

function startServer() {
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve(port);
    });
  });
}

async function prerender() {
  console.log('Starting prerender...');

  if (!existsSync(distDir)) {
    console.error('dist directory not found. Run vite build first.');
    process.exit(1);
  }

  const port = await startServer();
  const url = `http://127.0.0.1:${port}/`;

  console.log(`Server running at ${url}`);

  const browser = await launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for React to render content
    await page.waitForSelector('#root > *', { timeout: 15000 }).catch(() => {});
    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});
    // Give a bit more time for fonts/animations
    await new Promise((r) => setTimeout(r, 2000));

    const html = await page.content();

    const indexPath = join(distDir, 'index.html');
    writeFileSync(indexPath, html, 'utf-8');
    console.log(`Prerendered HTML saved to ${indexPath} (${(html.length / 1024).toFixed(1)} KB)`);
  } finally {
    await browser.close();
    server.close();
  }
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
