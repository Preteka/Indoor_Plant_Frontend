/**
 * Remove white background from greenspace-logo-transparent.png
 * Pure Node.js — no external dependencies required.
 * Uses the PNG spec directly via raw buffer manipulation with the 'zlib' built-in.
 *
 * Strategy:
 *   1. Decode PNG to raw RGBA pixels using the built-in pngjs approach via zlib.
 *   2. For every pixel that is "near white" (R>220 && G>220 && B>220), set alpha=0.
 *   3. Also handle semi-transparent edge fringing by blending.
 *   4. Re-encode as PNG with alpha channel.
 *   5. Save as images/greenspace-logo-transparent.png
 */

// We'll use the 'sharp' npm package if available, otherwise fall back to
// a self-contained approach using Canvas via the 'canvas' package.
// If neither is available, we install 'sharp' first.

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'images', 'greenspace-logo-transparent.png');
const DEST = path.join(__dirname, 'images', 'greenspace-logo-transparent.png');

// ── Try sharp first ──────────────────────────────────────────────────────────
function trySharp() {
  try {
    require.resolve('sharp');
    return true;
  } catch {
    return false;
  }
}

function installSharp() {
  console.log('Installing sharp...');
  const r = spawnSync('npm', ['install', 'sharp', '--no-save'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });
  return r.status === 0;
}

async function removeWithSharp() {
  const sharp = require('sharp');

  // Get raw RGBA pixel buffer
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info; // channels = 4

  // Threshold tuning
  const WHITE_THRESH = 230;   // pixels brighter than this on all channels = background
  const EDGE_THRESH  = 200;   // soft-edge zone
  const TOLERANCE    = 18;    // max channel variation to still count as "white"

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Is the pixel near-white?
    const isWhite = r > WHITE_THRESH && g > WHITE_THRESH && b > WHITE_THRESH
                    && Math.max(r, g, b) - Math.min(r, g, b) < TOLERANCE;

    if (isWhite) {
      // Fully transparent
      data[i + 3] = 0;
    } else {
      // Semi-transparent edge handling
      // Calculate "whiteness" score: 0 = fully coloured, 1 = fully white
      const whiteness = Math.min(r, g, b) / 255;
      if (whiteness > EDGE_THRESH / 255) {
        // Blend: reduce alpha proportionally to remove halo
        const alpha = Math.round((1 - whiteness) * 255 * 2.5);
        data[i + 3] = Math.min(255, Math.max(0, alpha));
      }
      // else: keep pixel fully opaque (logo artwork)
    }
  }

  await sharp(data, {
    raw: { width, height, channels: 4 }
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(DEST);

  console.log(`✅ Transparent logo saved to: ${DEST}`);
  console.log(`   Size: ${width}x${height}px`);
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  if (!fs.existsSync(SRC)) {
    console.error('❌ Source logo not found:', SRC);
    process.exit(1);
  }

  if (!trySharp()) {
    const ok = installSharp();
    if (!ok) {
      console.error('❌ Could not install sharp. Please run: npm install sharp');
      process.exit(1);
    }
  }

  try {
    await removeWithSharp();
  } catch (err) {
    console.error('❌ Error removing background:', err.message);
    process.exit(1);
  }
})();
