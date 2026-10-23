import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, Header, Pill, Scene, TitleBlock, line, wavePath } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short20DigitalPhoto', durationInSeconds: 50, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const PhotoLandscape: React.FC<{ x: number; y: number; scale?: number; reveal?: number; dark?: boolean }> = ({ x, y, scale = 1, reveal = 1, dark = false }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-300} y={-205} width={600} height={410} rx={35} fill={dark ? '#263249' : '#dcecf4'} stroke={dark ? C.mint : C.line} strokeWidth={4} />
    <circle cx={175} cy={-105} r={52} fill={C.amber} opacity={0.35 + reveal * 0.65} />
    <path d="M -300 90 L -120 -85 L 10 35 L 145 -115 L 300 70 L 300 205 L -300 205 Z" fill={C.indigo} opacity={0.25 + reveal * 0.65} />
    <path d="M -300 135 L -130 10 L -10 120 L 125 -20 L 300 125 L 300 205 L -300 205 Z" fill={C.teal} opacity={0.3 + reveal * 0.65} />
    <path d="M -300 165 Q -100 100 90 160 T 300 145 L 300 205 L -300 205 Z" fill="#78a97b" opacity={0.3 + reveal * 0.65} />
    <g opacity={reveal}><rect x={-205} y={30} width={18} height={130} fill="#72533d" /><circle cx={-196} cy={10} r={70} fill="#4e956f" /><circle cx={-235} cy={45} r={45} fill="#5ca879" /></g>
    <rect x={-300} y={-205} width={600} height={410} rx={35} fill={C.paper} opacity={(1 - reveal) * 0.45} />
  </g>
);

const BayerGrid: React.FC<{ x: number; y: number; scale?: number; labels?: boolean; highlight?: number; opacity?: number }> = ({ x, y, scale = 1, labels = false, highlight = 0, opacity = 1 }) => {
  const colors = [C.red, C.green, C.blue];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <rect x={-18} y={-18} width={516} height={516} rx={28} fill={C.paper} stroke={C.line} strokeWidth={4} />
      {Array.from({ length: 64 }, (_, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        const colorIndex = row % 2 === 0 ? (col % 2 === 0 ? 0 : 1) : (col % 2 === 0 ? 1 : 2);
        const selected = highlight > 0 && row === 3 && col === 4;
        return <g key={index}>
          <rect x={col * 60} y={row * 60} width={56} height={56} rx={5} fill={colors[colorIndex]} opacity={0.72} stroke={selected ? C.ink : C.paper} strokeWidth={selected ? 7 : 2} />
          {labels && <text x={col * 60 + 28} y={row * 60 + 38} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={25}>{['R', 'G', 'B'][colorIndex]}</text>}
        </g>;
      })}
    </g>
  );
};

const Short20DigitalPhoto: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const measured = prog(t, line(VO, 'hook-measure').start - 0.1, line(VO, 'hook-measure').start + 0.6);
  const signal = prog(t, line(VO, 'sensor-signal').start - 0.1, line(VO, 'sensor-signal').start + 0.7);
  const mosaic = prog(t, line(VO, 'mosaic-pattern').start - 0.1, line(VO, 'mosaic-onecolor').start + 0.4);
  const demosaic = prog(t, line(VO, 'process-neighbors').start - 0.1, line(VO, 'process-demosaic').start + 0.5);
  const adjusted = prog(t, line(VO, 'process-adjust').start - 0.1, line(VO, 'process-adjust').start + 0.6);
  const finalStart = line(VO, 'closing-weave').end + 0.55;
  const finalReveal = prog(t, finalStart, finalStart + 0.9);
  const closingExit = 1 - prog(t, finalStart - 0.65, finalStart);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} />
        <TitleBlock eyebrow="Everyday tech, explained" lines={['Not a finished', 'photo.']} accentIndex={1} subtitle="The sensor begins with tiny light measurements." size={73} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <PhotoLandscape x={540} y={760} scale={0.85} reveal={0.35 + measured * 0.65} />
          <g transform="translate(540 1170)" opacity={measured}>
            {Array.from({ length: 18 }, (_, index) => <rect key={index} x={-270 + (index % 9) * 60} y={Math.floor(index / 9) * 60 - 60} width={52} height={52} rx={5} fill={index % 3 === 0 ? C.red : index % 3 === 1 ? C.green : C.blue} opacity={0.7} />)}
          </g>
        </svg>
        <Pill text="MILLIONS OF PHOTOSITES" y={1320} color={C.teal} />
      </Scene>

      <Scene t={t} id="sensor" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} />
        <TitleBlock eyebrow="Inside one photosite" lines={['Light becomes', 'signal.']} accentIndex={1} subtitle="Incoming photons produce an electrical response." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <g stroke={C.amber} strokeWidth={9} strokeLinecap="round">
            {[-160, -80, 0, 80, 160].map((dx, index) => <line key={index} x1={540 + dx} y1={500} x2={540 + dx * 0.45} y2={720} opacity={0.35 + signal * 0.6} />)}
          </g>
          <rect x={285} y={730} width={510} height={360} rx={45} fill={C.ink} />
          <rect x={320} y={765} width={440} height={290} rx={30} fill={C.indigo} opacity={0.55} />
          <circle cx={540} cy={900} r={95} fill="none" stroke={C.mint} strokeWidth={9} opacity={0.4 + signal * 0.6} />
          <path d={wavePath(390, 1190, 300, 55, 1.5, t * 0.4)} fill="none" stroke={C.teal} strokeWidth={9} opacity={signal} />
          <text x={540} y={1300} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={25} letterSpacing={2} opacity={signal}>ELECTRICAL SIGNAL</text>
        </svg>
        <Pill text="LIGHT INTENSITY  →  MEASURED VALUE" y={1340} color={C.teal} />
      </Scene>

      <Scene t={t} id="mosaic" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} />
        <TitleBlock eyebrow="The color filter array" lines={['One color', 'per site.']} accentIndex={1} subtitle="A red, green, and blue mosaic covers the sensor." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><BayerGrid x={300} y={535} scale={1.0} labels highlight={mosaic} /></svg>
        <Pill text="EACH SITE MEASURES ONE COLOR'S BRIGHTNESS" y={1190} color={C.teal} size={21} />
      </Scene>

      <Scene t={t} id="process" scenes={SCENES}>
        <Background t={t} dark /><Header label="TECH EXPLAINED · CAMERA" seconds={50} dark />
        <TitleBlock dark eyebrow="Image processing" lines={['Fill in', 'the colors.']} accentIndex={1} subtitle="Neighboring measurements estimate the missing values." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <BayerGrid x={130} y={650} scale={0.55} opacity={1 - demosaic * 0.25} />
          <Chip x={540} y={1180} scale={0.58} opacity={demosaic} label="COLOR" />
          <path d="M 380 850 L 500 850" stroke={C.mint} strokeWidth={7} strokeDasharray="11 14" opacity={demosaic} />
          <PhotoLandscape x={730} y={850} scale={0.48} reveal={demosaic} dark />
        </svg>
        <Pill dark text={adjusted > 0.5 ? 'BRIGHTNESS + NOISE REDUCTION' : 'DEMOSAICING'} y={1300} />
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} />
        <AbsoluteFill style={{ opacity: closingExit }}>
          <TitleBlock eyebrow="The whole idea" lines={['Measurements', 'become an image.']} accentIndex={1} size={63} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><PhotoLandscape x={540} y={850} scale={1.05} reveal={1} /></svg>
          <Pill text="MEASURE  →  DEMOSAIC  →  IMAGE" y={1260} color={C.teal} />
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: finalReveal, transform: `translateY(${(1 - finalReveal) * 18}px)` }}>
          <TitleBlock eyebrow="Now you know" lines={['Light,', 'woven into', 'color.']} accentIndex={2} subtitle="Tiny measurements, reconstructed by the processor." y={245} size={87} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><PhotoLandscape x={540} y={1050} scale={0.85} reveal={1} /></svg>
        </AbsoluteFill>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['photograph', 'photosites', 'electrical signal', 'color filter', 'red, green, and blue', 'missing colors', 'demosaicing', 'brightness', 'noise']} />
      <CalmSound narration="voiceovers/digital-photo/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-weave').end} duration={50} />
    </AbsoluteFill>
  );
};

export default Short20DigitalPhoto;
