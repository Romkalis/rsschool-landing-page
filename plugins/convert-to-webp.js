import path from 'node:path';
import sharp from 'sharp';

const RASTER = /\.(jpe?g|png)$/i;
const TEXT = /\.(html|css|js|mjs)$/i;

const MIN_QUALITY = 50;
const QUALITY_STEP = 10;
const RESIZE_FACTOR = 0.85;
const MIN_WIDTH = 320;

// Encodes the image to webp. When the result is bigger than maxSize the quality is lowered
// step by step; if even the minimal quality is not enough, the image is scaled down and retried.
async function encode(input, { quality, maxSize }) {
  const { width } = await sharp(input).metadata();
  let targetWidth = width;

  for (;;) {
    const image = () => sharp(input).resize({ width: targetWidth });
    let buffer;

    for (let q = quality; q >= MIN_QUALITY; q -= QUALITY_STEP) {
      buffer = await image().webp({ quality: q }).toBuffer();
      if (!maxSize || buffer.length <= maxSize) return buffer;
    }

    const nextWidth = Math.round(targetWidth * RESIZE_FACTOR);
    if (nextWidth < MIN_WIDTH) return buffer;
    targetWidth = nextWidth;
  }
}

// Converts every jpg/png emitted by the build to webp and updates the references to it
// in html, css and js. Works only in build: the dev server keeps the original files.
// maxSize (bytes) limits the size of every converted image.
export function convertToWebp({ quality = 80, maxSize = 0 } = {}) {
  return {
    name: 'convert-to-webp',
    apply: 'build',
    enforce: 'post',
    generateBundle: {
      // Runs after the html and css files are generated, so all references can be updated
      order: 'post',
      async handler(_, bundle) {
        const renamed = new Map();

        for (const [key, file] of Object.entries(bundle)) {
          if (file.type !== 'asset' || !RASTER.test(key)) continue;

          const source = await encode(file.source, { quality, maxSize });
          const fileName = key.replace(RASTER, '.webp');

          delete bundle[key];
          this.emitFile({ type: 'asset', fileName, source });
          renamed.set(path.basename(key), path.basename(fileName));
        }

        if (!renamed.size) return;

        for (const [key, file] of Object.entries(bundle)) {
          if (!TEXT.test(key)) continue;

          const field = file.type === 'chunk' ? 'code' : 'source';
          if (typeof file[field] !== 'string') continue;

          for (const [from, to] of renamed) {
            file[field] = file[field].split(from).join(to);
          }
        }
      },
    },
  };
}
