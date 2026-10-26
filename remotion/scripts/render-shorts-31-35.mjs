// Preview or render the five original everyday-technology explainers.
// Preview: node scripts/render-shorts-31-35.mjs --scale=0.5
// Final:   node scripts/render-shorts-31-35.mjs --video
// Subset:  node scripts/render-shorts-31-35.mjs --video --only=Short31SolarPanel,Short32HeatPump
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { mkdirSync, readFileSync, rmSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.resolve(root, '..');
const args = process.argv.slice(2);
const video = args.includes('--video');
const scaleArg = args.find((arg) => arg.startsWith('--scale='));
const scale = scaleArg ? Number(scaleArg.split('=')[1]) : video ? 1 : 0.5;
const onlyArg = args.find((arg) => arg.startsWith('--only='));
const only = onlyArg ? onlyArg.split('=')[1].split(',') : [];
const projects = [
  ['Short31SolarPanel', 'short-31-solar-panel'],
  ['Short32HeatPump', 'short-32-heat-pump'],
  ['Short33AccelerometerSteps', 'short-33-accelerometer-steps'],
  ['Short34Printer3D', 'short-34-3d-printer'],
  ['Short35Airbag', 'short-35-airbag'],
].filter(([id]) => !only.length || only.includes(id));
if (!projects.length) throw new Error('No matching shorts 31-35 compositions');

const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || '/tmp/chromium';
const outDir = path.join(root, 'out');
mkdirSync(outDir, { recursive: true });
console.log(`Bundling ${projects.length} explainer(s) with local media and fonts…`);
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

for (const [id, shortId] of projects) {
  const composition = await selectComposition({ serveUrl, id, ...shared });
  console.log(`${id}: ${composition.width}x${composition.height}, ${composition.durationInFrames} frames @ ${composition.fps}`);
  if (video) {
    const outputLocation = path.join(outDir, `${id}.mp4`);
    let lastReported = -10;
    await renderMedia({
      serveUrl,
      composition,
      outputLocation,
      ...shared,
      codec: 'h264',
      audioCodec: 'aac',
      audioBitrate: '192k',
      crf: 17,
      pixelFormat: 'yuv420p',
      imageFormat: 'jpeg',
      jpegQuality: 90,
      scale,
      concurrency: 2,
      enforceAudioTrack: true,
      overwrite: true,
      onProgress: ({ progress }) => {
        const reported = Math.floor(progress * 10) * 10;
        if (reported !== lastReported) {
          lastReported = reported;
          console.log(`${id}: ${reported}%`);
        }
      },
    });
    console.log(`Final mixed render: ${outputLocation}`);
  } else {
    const beats = JSON.parse(readFileSync(path.join(repo, 'shorts', shortId, 'beats.json'), 'utf8'));
    const previewDir = path.join(outDir, 'shorts-31-35-preview', id);
    rmSync(previewDir, { recursive: true, force: true });
    mkdirSync(previewDir, { recursive: true });
    const samples = beats.vo.flatMap((line) => [
      {
        label: `${line.id}-onset`,
        frame: Math.min(composition.durationInFrames - 1, Math.round((line.start + 0.18) * composition.fps)),
      },
      {
        label: `${line.id}-mid`,
        frame: Math.min(composition.durationInFrames - 1, Math.round(((line.start + line.end) / 2) * composition.fps)),
      },
    ]);
    samples.push({ label: 'outro', frame: composition.durationInFrames - 15 });
    for (const sample of samples) {
      const output = path.join(previewDir, `${String(sample.frame).padStart(4, '0')}-${sample.label}.jpg`);
      await renderStill({
        serveUrl,
        composition,
        output,
        frame: sample.frame,
        imageFormat: 'jpeg',
        jpegQuality: 92,
        scale,
        overwrite: true,
        ...shared,
      });
      console.log(`Preview ${id} ${sample.label}: frame ${sample.frame}`);
    }
  }
}
