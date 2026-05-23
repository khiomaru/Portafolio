import { launch } from 'puppeteer-core';
import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = join(root, 'dist');

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

function findChrome() {
  const paths = [];
  if (process.platform === 'win32') {
    paths.push('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
    paths.push('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe');
    paths.push(`${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`);
    try {
      const result = execSync('where chrome 2>nul', { encoding: 'utf-8' }).trim();
      if (result) paths.unshift(result.split('\n')[0].trim());
    } catch {}
  } else if (process.platform === 'darwin') {
    paths.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
    try {
      const result = execSync('which google-chrome || which chromium || which google-chrome-stable 2>/dev/null', { encoding: 'utf-8' }).trim();
      if (result) paths.unshift(result.split('\n')[0].trim());
    } catch {}
  } else {
    paths.push('/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium');
    try {
      const result = execSync('which google-chrome chromium chromium-browser 2>/dev/null || echo ""', { encoding: 'utf-8' }).trim();
      if (result) paths.unshift(result.split('\n')[0].trim());
    } catch {}
  }
  return paths.find((p) => existsSync(p));
}

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
  const chromePath = findChrome();
  if (!chromePath) {
    console.log('Chrome not found — skipping prerender (run locally before deploy for best SEO)');
    return;
  }

  console.log(`Starting prerender with ${chromePath}...`);

  if (!existsSync(distDir)) {
    console.error('dist not found — skipping prerender');
    return;
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

    await page.waitForSelector('#root > *', { timeout: 15000 }).catch(() => {});
    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 2000));

    const html = await page.content();

    const indexPath = join(distDir, 'index.html');
    writeFileSync(indexPath, html, 'utf-8');
    console.log(`Prerendered HTML saved (${(html.length / 1024).toFixed(1)} KB)`);
  } finally {
    await browser.close();
    server.close();
  }
}

prerender().catch((err) => {
  console.error('Prerender skipped:', err.message);
});
