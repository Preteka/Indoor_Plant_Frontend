/**
 * Replace all greenspace-logo-transparent.png references with greenspace-logo-transparent.png
 * across the entire project (HTML, CSS, JS files).
 */

const fs = require('fs');
const path = require('path');
const glob = require('fs');

const ROOT = __dirname;
const OLD_LOGO = 'greenspace-logo-transparent.png';
const NEW_LOGO = 'greenspace-logo-transparent.png';

// All extensions to scan
const EXTENSIONS = ['.html', '.css', '.js'];

// Collect all files recursively, skipping node_modules
function walkDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walkDir(fullPath, results);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const files = walkDir(ROOT);
let totalReplacements = 0;
let filesChanged = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(OLD_LOGO)) {
    const newContent = content.split(OLD_LOGO).join(NEW_LOGO);
    const count = (content.match(new RegExp(OLD_LOGO.replace('.', '\\.'), 'g')) || []).length;
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`  ✓ ${path.relative(ROOT, file)} — ${count} replacement(s)`);
    totalReplacements += count;
    filesChanged++;
  }
}

console.log('');
console.log(`✅ Done. ${filesChanged} files updated, ${totalReplacements} total replacements.`);

// Verify the transparent PNG exists
const transparentPath = path.join(ROOT, 'images', NEW_LOGO);
if (fs.existsSync(transparentPath)) {
  const stat = fs.statSync(transparentPath);
  console.log(`✅ Transparent logo confirmed: ${transparentPath} (${(stat.size / 1024).toFixed(1)} KB)`);
} else {
  console.error('❌ Transparent logo file not found!');
}
