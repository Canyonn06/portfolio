import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const activeHtml = html.replace(/<!--[\s\S]*?-->/g, '');

// Fail before packaging if a portfolio asset is missing. Project links belong
// to separate deployments and deliberately are not bundled with the portfolio.
for (const match of activeHtml.matchAll(/(?:src|href|content)=["']([^"']+)["']/g)) {
  const url = match[1];
  if (!url.startsWith('/') && !url.startsWith('./')) continue;
  if (url.startsWith('/projects/')) continue;
  const relative = decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\.?\//, '');
  if (!fs.existsSync(path.join(dist, relative))) {
    throw new Error(`Missing website file: ${url}`);
  }
}
for (const name of ['web.config', 'robots.txt', 'sitemap.xml', 'construction.html']) {
  if (!fs.existsSync(path.join(dist, name))) throw new Error(`Missing website file: ${name}`);
}
if (fs.existsSync(path.join(dist, 'projects'))) {
  throw new Error('The portfolio upload must not contain the separately managed projects folder.');
}
if (/\/(?:src|node_modules)\//.test(activeHtml)) {
  throw new Error('The build still references development files.');
}

const upload = path.join(root, 'upload');
const target = path.join(upload, 'portfolio');
fs.mkdirSync(upload, { recursive: true });
fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(dist, target, { recursive: true });
fs.rmSync(path.join(upload, 'portfolio.zip'), { force: true });
const zip = spawnSync('/usr/bin/zip', ['-qr', 'portfolio.zip', 'portfolio'], {
  cwd: upload, stdio: 'inherit',
});
if (zip.status !== 0) throw new Error('Could not create the upload ZIP.');
console.log('Ready: upload/portfolio and upload/portfolio.zip');
console.log('Upload the contents into the existing website root, merging folders.');
console.log('Upload assets first and index.html last. Leave the server projects folder alone.');
