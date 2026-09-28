// Generates WebP variants of public/images/*.png|jpg for every width next/image can request
// (deviceSizes + imageSizes in lib/image-sizes.json). Runs before dev and build.
// Variants never upscale: widths above the original reuse the original size.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const SRC = "public/images";
const OUT = join(SRC, "_v");
const { deviceSizes, imageSizes } = JSON.parse(readFileSync("lib/image-sizes.json", "utf8"));
const widths = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

mkdirSync(OUT, { recursive: true });
let written = 0;
for (const file of readdirSync(SRC)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const input = join(SRC, file);
  const srcTime = statSync(input).mtimeMs;
  const { name } = parse(file);
  const meta = await sharp(input).metadata();
  const quality = meta.hasAlpha ? 90 : 82;
  for (const width of widths) {
    const output = join(OUT, `${name}-${width}.webp`);
    if (existsSync(output) && statSync(output).mtimeMs >= srcTime) continue;
    await sharp(input)
      .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
      .webp({ quality, alphaQuality: 100, effort: 5 })
      .toFile(output);
    written++;
  }
}
console.log(`images: ${written} WebP variant(s) written to ${OUT}`);
