// Render the complete original Living Light film (narration + music + SFX).
// Preview: node scripts/render-living-light.mjs --frames=0,105,240 --scale=0.5
// Final:   node scripts/render-living-light.mjs --video
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const video = args.includes('--video');
const scaleArg = args.find((arg) => arg.startsWith('--scale='));
const scale = scaleArg ? Number(scaleArg.split('=')[1]) : video ? 1 : 0.5;
const framesArg = args.find((arg) => arg.startsWith('--frames='));
const frames = framesArg
  ? framesArg.split('=')[1].split(',').map((value) => Number(value))
  : [0, 105, 240, 390, 570, 720, 900, 1080, 1270, 1450, 1640, 1740];
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || '/tmp/chromium';
const outDir = path.join(root, 'out');
const previewDir = path.join(outDir, 'living-light-preview');
mkdirSync(previewDir, { recursive: true });

console.log('Bundling Living Light with local media and fonts…');
const serveUrl = await bundle({
  entryPoint: path.join(root, 'src', 'index.ts'),
  publicDir: path.join(root, '..', 'media'),
});
const shared = {
  browserExecutable,
  chromeMode: 'headless-shell',
  chromiumOptions: { enableMultiProcessOnLinux: true },
  timeoutInMilliseconds: 120000,
};
const composition = await selectComposition({ serveUrl, id: 'Short13LivingLight', ...shared });
console.log(`Composition: ${composition.width}x${composition.height}, ${composition.durationInFrames} frames @ ${composition.fps}`);

if (video) {
  const outputLocation = path.join(outDir, 'Short13LivingLight.mp4');
  let lastReported = -10;
  await renderMedia({
    serveUrl,
    composition,
    outputLocation,
    ...shared,
    codec: 'h264',
    audioCodec: 'aac',
    audioBitrate: '192k',
    crf: 18,
    pixelFormat: 'yuv420p',
    imageFormat: 'jpeg',
    jpegQuality: 88,
    scale,
    concurrency: 2,
    enforceAudioTrack: true,
    overwrite: true,
    onProgress: ({ progress }) => {
      const reported = Math.floor(progress * 10) * 10;
      if (reported !== lastReported) {
        lastReported = reported;
        console.log(`Living Light: ${reported}%`);
      }
    },
  });
  console.log(`Final film: ${outputLocation}`);
} else {
  for (const frame of frames) {
    const output = path.join(previewDir, `frame-${String(frame).padStart(4, '0')}.jpg`);
    await renderStill({
      serveUrl,
      composition,
      output,
      frame,
      imageFormat: 'jpeg',
      jpegQuality: 90,
      scale,
      overwrite: true,
      ...shared,
    });
    console.log(`Preview frame ${frame}: ${output}`);
  }
}
