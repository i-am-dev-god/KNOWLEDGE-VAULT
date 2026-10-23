import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { Captions, ProgressBar, prog } from '../../lib/shorts';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { VO } from './vo.gen';

// Original 60-second science film. Every illustration is drawn here; no stock
// footage, generated sample footage, or earlier shot composition is reused.
export const compositionConfig = {
  id: 'Short13LivingLight',
  durationInSeconds: 60,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const F = (seconds: number) => Math.max(0, Math.round(seconds * 30));
const C = {
  abyss: '#010711',
  deep: '#031525',
  mid: '#073149',
  cyan: '#71f6ff',
  blue: '#35aaff',
  aqua: '#22d9c5',
  white: '#effdff',
  muted: '#9ab8c8',
  amber: '#ffd28a',
  coral: '#ff9e84',
};

const line = (beat: string) => {
  const found = VO.find((item) => item.beat === beat);
  if (!found) throw new Error(`Missing narration beat: ${beat}`);
  return found;
};
const wordAt = (beat: string, word: string) => {
  const found = line(beat).words?.find((item) => item.w.toLowerCase().includes(word.toLowerCase()));
  return found?.start ?? line(beat).start;
};

const seeded = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

type Particle = { x: number; y: number; r: number; phase: number; speed: number; drift: number };
const PARTICLES: Particle[] = Array.from({ length: 150 }, (_, index) => ({
  x: seeded(index + 1),
  y: seeded(index + 211),
  r: 1.2 + seeded(index + 419) * 4.4,
  phase: seeded(index + 617) * Math.PI * 2,
  speed: 0.35 + seeded(index + 811) * 1.1,
  drift: 4 + seeded(index + 1013) * 15,
}));
const STARS = Array.from({ length: 55 }, (_, index) => ({
  x: seeded(index + 1401) * W,
  y: 70 + seeded(index + 1601) * 590,
  r: 0.7 + seeded(index + 1801) * 1.7,
  phase: seeded(index + 2001) * Math.PI * 2,
}));

const ParticleField: React.FC<{
  t: number;
  glow?: number;
  fromY?: number;
  toY?: number;
  count?: number;
  color?: string;
}> = ({ t, glow = 0.7, fromY = 340, toY = 1690, count = 100, color = C.cyan }) => (
  <>
    {PARTICLES.slice(0, count).map((particle, index) => {
      const x = (particle.x * W + t * particle.drift + Math.sin(t * particle.speed + particle.phase) * 22 + W) % W;
      const y = fromY + particle.y * (toY - fromY) + Math.cos(t * particle.speed * 0.7 + particle.phase) * 16;
      const shimmer = Math.pow(Math.max(0, Math.sin(t * (1.3 + particle.speed) + particle.phase)), 5);
      const opacity = 0.08 + glow * (0.12 + shimmer * 0.8);
      return (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={particle.r * (0.75 + shimmer * 0.75)}
          fill={index % 5 === 0 ? C.blue : color}
          opacity={opacity}
        />
      );
    })}
  </>
);

const SvgDefs: React.FC = () => (
  <defs>
    <radialGradient id="ll-halo">
      <stop offset="0%" stopColor={C.white} stopOpacity="0.95" />
      <stop offset="15%" stopColor={C.cyan} stopOpacity="0.72" />
      <stop offset="45%" stopColor={C.blue} stopOpacity="0.25" />
      <stop offset="100%" stopColor={C.blue} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="ll-cell" cx="38%" cy="30%">
      <stop offset="0%" stopColor="#5ce8dc" stopOpacity="0.32" />
      <stop offset="60%" stopColor="#147d8d" stopOpacity="0.18" />
      <stop offset="100%" stopColor="#031c31" stopOpacity="0.72" />
    </radialGradient>
    <linearGradient id="ll-ocean" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#082c44" />
      <stop offset="55%" stopColor="#031a2c" />
      <stop offset="100%" stopColor="#010a15" />
    </linearGradient>
    <linearGradient id="ll-wave" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor={C.blue} stopOpacity="0.05" />
      <stop offset="45%" stopColor={C.cyan} stopOpacity="0.95" />
      <stop offset="75%" stopColor={C.blue} stopOpacity="0.65" />
      <stop offset="100%" stopColor={C.blue} stopOpacity="0.08" />
    </linearGradient>
  </defs>
);

const Dinoflagellate: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
  t: number;
  flash?: number;
  opacity?: number;
  detailed?: boolean;
}> = ({ x, y, scale = 1, rotation = 0, t, flash = 0, opacity = 1, detailed = true }) => {
  const wag = Math.sin(t * 5.2) * 16;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
      {flash > 0.005 && <circle cx={0} cy={0} r={250 + flash * 90} fill="url(#ll-halo)" opacity={flash * 0.9} />}
      <path
        d={`M -28 65 C ${-65 + wag} 112, ${-25 - wag} 148, ${-64 + wag} 190`}
        fill="none"
        stroke={C.aqua}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.65}
      />
      <path
        d={`M 22 66 C ${58 - wag} 112, ${18 + wag} 148, ${62 - wag} 176`}
        fill="none"
        stroke={C.cyan}
        strokeWidth={3.5}
        strokeLinecap="round"
        opacity={0.5}
      />
      <ellipse cx={0} cy={0} rx={91} ry={76} fill="url(#ll-cell)" stroke={flash > 0.15 ? C.white : C.aqua} strokeWidth={3 + flash * 3} />
      <ellipse cx={0} cy={0} rx={77} ry={63} fill="none" stroke={C.cyan} strokeOpacity={0.2} strokeWidth={2} />
      <path d="M -84 -4 C -35 16, 36 18, 84 -5" fill="none" stroke={C.cyan} strokeOpacity={0.5} strokeWidth={5} />
      <path d="M -10 -71 C -24 -26, -22 25, -7 72" fill="none" stroke={C.aqua} strokeOpacity={0.32} strokeWidth={4} />
      {detailed && (
        <>
          <ellipse cx={20} cy={-12} rx={25} ry={20} fill="#b7fff1" opacity={0.18} />
          {[
            [-46, -33, 8], [-37, 33, 6], [48, 29, 7], [50, -35, 5], [-2, 43, 5], [3, -47, 4],
          ].map(([cx, cy, r], index) => (
            <circle key={index} cx={cx} cy={cy} r={r} fill={index % 2 ? C.cyan : C.aqua} opacity={0.35 + flash * 0.5} />
          ))}
        </>
      )}
      {flash > 0.01 && <ellipse cx={0} cy={0} rx={99} ry={84} fill="none" stroke={C.white} strokeWidth={5} opacity={flash} />}
    </g>
  );
};

const Grazer: React.FC<{ x: number; y: number; scale?: number; rotation?: number; opacity?: number; lit?: number }> = ({
  x, y, scale = 1, rotation = 0, opacity = 1, lit = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
    {lit > 0 && <circle r={100} fill="url(#ll-halo)" opacity={lit * 0.55} />}
    <path d="M -42 -12 L -118 -66 M -38 -23 L -93 -104" stroke={lit > 0.2 ? C.white : C.muted} strokeWidth={4} strokeLinecap="round" />
    <ellipse cx={0} cy={0} rx={54} ry={30} fill={lit > 0.2 ? '#a9faff' : '#345369'} stroke={lit > 0.2 ? C.white : C.muted} strokeWidth={3} />
    <ellipse cx={47} cy={-2} rx={24} ry={22} fill={lit > 0.2 ? C.cyan : '#466a7c'} />
    <circle cx={58} cy={-8} r={4} fill={C.abyss} />
    {[-30, -10, 12, 31].map((px, index) => (
      <path key={index} d={`M ${px} 19 L ${px - 18} 52 M ${px + 8} 18 L ${px + 23} 48`} stroke={lit > 0.2 ? C.cyan : C.muted} strokeWidth={3} />
    ))}
    <path d="M -52 0 L -91 -20 M -52 4 L -91 24" stroke={lit > 0.2 ? C.cyan : C.muted} strokeWidth={4} />
  </g>
);

const Fish: React.FC<{ x: number; y: number; scale?: number; rotation?: number; opacity?: number }> = ({
  x, y, scale = 1, rotation = 0, opacity = 1,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
    <path d="M -125 0 C -74 -63, 39 -65, 116 -6 C 49 58, -63 62, -125 0 Z" fill="#102e43" stroke="#4a7d96" strokeWidth={3} />
    <path d="M 102 -5 L 177 -64 L 158 3 L 180 62 Z" fill="#102e43" stroke="#4a7d96" strokeWidth={3} />
    <path d="M -14 -48 L 33 -91 L 54 -43" fill="#102e43" stroke="#4a7d96" strokeWidth={3} />
    <circle cx={-77} cy={-13} r={8} fill={C.cyan} opacity={0.8} />
  </g>
);

const wavePath = (y: number, amplitude: number, phase: number, close = false) => {
  const points = Array.from({ length: 45 }, (_, index) => {
    const x = (index / 44) * W;
    const py = y + Math.sin(index * 0.49 + phase) * amplitude + Math.sin(index * 0.17 - phase * 0.7) * amplitude * 0.45;
    return [x, py] as const;
  });
  const linePath = points.map(([x, py], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${py.toFixed(1)}`).join(' ');
  return close ? `${linePath} L ${W} ${H} L 0 ${H} Z` : linePath;
};

const Ocean: React.FC<{ t: number; glow: number; closing?: boolean }> = ({ t, glow, closing = false }) => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #01050d 0%, #03111f 34%, #062a40 58%, #010914 100%)' }} />
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
      <SvgDefs />
      {STARS.map((star, index) => (
        <circle key={index} cx={star.x} cy={star.y} r={star.r} fill="#c9e7ff" opacity={0.15 + Math.max(0, Math.sin(t * 0.7 + star.phase)) * 0.32} />
      ))}
      <path d="M 0 660 C 230 630, 390 676, 610 650 C 800 628, 930 656, 1080 640 L 1080 1920 L 0 1920 Z" fill="url(#ll-ocean)" />
      <path d={wavePath(1030, 35, t * 0.85, true)} fill="#041b2c" opacity={0.9} />
      <path d={wavePath(1030, 35, t * 0.85)} fill="none" stroke="url(#ll-wave)" strokeWidth={7 + glow * 8} opacity={0.2 + glow * 0.8} />
      <path d={wavePath(1250, 46, t * 0.62 + 2, true)} fill="#020f1d" opacity={0.92} />
      <path d={wavePath(1250, 46, t * 0.62 + 2)} fill="none" stroke="url(#ll-wave)" strokeWidth={4 + glow * 6} opacity={0.12 + glow * 0.55} />
      <g transform={`translate(0 ${closing ? 80 : 0})`}>
        <ParticleField t={t} glow={glow} fromY={820} toY={1500} count={125} />
      </g>
      {Array.from({ length: 34 }, (_, index) => {
        const x = (index / 33) * W;
        const y = 1030 + Math.sin(index * 0.49 + t * 0.85) * 35 + Math.sin(index * 0.17 - t * 0.595) * 15.75;
        const flicker = Math.pow(Math.max(0, Math.sin(t * 3 + index * 1.7)), 3);
        return <circle key={index} cx={x} cy={y - 8} r={4 + flicker * 8} fill={index % 3 ? C.cyan : C.white} opacity={glow * (0.18 + flicker * 0.82)} />;
      })}
    </svg>
  </AbsoluteFill>
);

const TitleBlock: React.FC<{
  eyebrow?: string;
  lines: string[];
  accentIndex?: number;
  subtitle?: string;
  y?: number;
  size?: number;
  opacity?: number;
  align?: 'center' | 'left';
}> = ({ eyebrow, lines, accentIndex = -1, subtitle, y = 160, size = 72, opacity = 1, align = 'center' }) => (
  <div style={{ position: 'absolute', top: y, left: align === 'center' ? 48 : 72, right: align === 'center' ? 48 : 72, opacity, textAlign: align }}>
    {eyebrow && (
      <div style={{ fontFamily: FONT_MONO, fontWeight: 500, fontSize: 25, letterSpacing: 5, color: C.cyan, marginBottom: 24, textTransform: 'uppercase' }}>
        {eyebrow}
      </div>
    )}
    {lines.map((text, index) => (
      <div
        key={text}
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.04,
          letterSpacing: -1.5,
          textTransform: 'uppercase',
          color: index === accentIndex ? C.cyan : C.white,
          textShadow: '0 6px 34px rgba(0,0,0,0.55)',
        }}
      >
        {text}
      </div>
    ))}
    {subtitle && (
      <div style={{ marginTop: 24, fontFamily: FONT_BODY, fontWeight: 500, fontSize: 31, lineHeight: 1.35, color: C.muted }}>
        {subtitle}
      </div>
    )}
  </div>
);

const Pill: React.FC<{ text: string; y: number; color?: string; opacity?: number; size?: number }> = ({
  text, y, color = C.cyan, opacity = 1, size = 26,
}) => (
  <div style={{ position: 'absolute', top: y, left: 60, right: 60, display: 'flex', justifyContent: 'center', opacity }}>
    <div style={{ fontFamily: FONT_MONO, fontSize: size, fontWeight: 500, letterSpacing: 3, textTransform: 'uppercase', color, border: `1px solid ${color}66`, background: 'rgba(1,12,24,0.76)', borderRadius: 999, padding: '14px 25px' }}>
      {text}
    </div>
  </div>
);

const Scene: React.FC<{ t: number; start: number; end: number; immediate?: boolean; children: React.ReactNode }> = ({
  t, start, end, immediate = false, children,
}) => {
  if (t < start || t > end + 0.2) return null;
  const enter = immediate ? 1 : prog(t, start, start + 0.35);
  const exit = 1 - prog(t, end - 0.18, end + 0.18);
  return <AbsoluteFill style={{ opacity: enter * exit }}>{children}</AbsoluteFill>;
};

const ReactionNode: React.FC<{ label: string; sub?: string; x: number; y: number; color: string; scale?: number; opacity?: number; small?: boolean }> = ({
  label, sub, x, y, color, scale = 1, opacity = 1, small = false,
}) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, opacity, textAlign: 'center' }}>
    <div style={{ width: small ? 116 : 156, height: small ? 116 : 156, borderRadius: '50%', border: `3px solid ${color}`, background: `radial-gradient(circle at 35% 30%, ${color}44, rgba(2,16,29,0.94) 70%)`, boxShadow: `0 0 54px ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: small ? 34 : 42, color: C.white }}>
      {label}
    </div>
    {sub && <div style={{ marginTop: 16, fontFamily: FONT_MONO, fontSize: 23, letterSpacing: 2, color, textTransform: 'uppercase' }}>{sub}</div>}
  </div>
);

const Sound: React.FC = () => {
  const frame = useCurrentFrame();
  const endFade = 1 - prog(frame / 30, 58.5, 60);
  const cues: { at: number; id: string; volume: number }[] = [
    { at: 2.75, id: 'stream-soft', volume: 0.25 },
    { at: wordAt('hook', 'blue'), id: 'sparkle-soft', volume: 0.3 },
    { at: 7.72, id: 'whoosh-soft', volume: 0.22 },
    { at: wordAt('organisms', 'flash'), id: 'sparkle-soft', volume: 0.27 },
    { at: 16.02, id: 'whoosh-wind', volume: 0.18 },
    { at: wordAt('chemistry', 'light'), id: 'chime-magic', volume: 0.2 },
    { at: 26.16, id: 'impact-soft', volume: 0.16 },
    { at: wordAt('why', 'burglar'), id: 'riser-soft', volume: 0.2 },
    { at: wordAt('predators', 'startle'), id: 'impact-deep-soft', volume: 0.22 },
    { at: wordAt('predators', 'expose'), id: 'whoosh-wind', volume: 0.17 },
    { at: wordAt('meaning', 'warning'), id: 'pop-reveal', volume: 0.18 },
    { at: wordAt('meaning', 'call'), id: 'chime-reward', volume: 0.16 },
    { at: 46.35, id: 'whoosh-reverse', volume: 0.16 },
    { at: 52.9, id: 'warm-shimmer', volume: 0.23 },
    { at: 56.3, id: 'sparkle-soft', volume: 0.16 },
  ];
  return (
    <>
      <Audio src={staticFile('voiceovers/living-light/narration.wav')} volume={0.9} />
      <Audio
        src={staticFile('library/music/clips/cinematic-min.mp3')}
        volume={(frame) => {
          const t = frame / 30;
          const narrationDuck = prog(t, 0.35, 1.1) * (1 - prog(t, 53.0, 55.0));
          const endFade = 1 - prog(t, 58.5, 60);
          return (0.42 - narrationDuck * 0.22) * endFade;
        }}
      />
      {cues.map((cue, index) => (
        <Sequence key={index} from={F(cue.at)}>
          <Audio src={staticFile(`library/sfx/clips/${cue.id}.mp3`)} volume={cue.volume * endFade} />
        </Sequence>
      ))}
    </>
  );
};

const Short13LivingLight: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const hookGlow = 0.16 + 0.84 * prog(t, 2.75, 4.05);
  const closingGlow = 0.4 + 0.6 * prog(t, 46.5, 52.8);
  const endOpacity = 1 - prog(t, 59.25, 60);

  const organismFlash = Math.max(0, 1 - Math.abs(t - wordAt('organisms', 'flash')) / 0.75);
  const cellFlash = Math.max(0, 1 - Math.abs(t - wordAt('chemistry', 'light')) / 1.1);
  const whyFlash = Math.max(0, 1 - Math.abs(t - wordAt('why', 'alarm')) / 0.8);
  const predatorFlash = Math.max(0, 1 - Math.abs(t - wordAt('predators', 'startle')) / 0.9);
  const approach = prog(t, line('why').start, line('why').end + 1.2);
  const startle = prog(t, wordAt('predators', 'startle'), wordAt('predators', 'startle') + 0.65);
  const expose = prog(t, wordAt('predators', 'expose'), wordAt('predators', 'expose') + 1.2);

  return (
    <AbsoluteFill style={{ background: C.abyss, fontFamily: FONT_BODY }}>
      <AbsoluteFill style={{ opacity: endOpacity }}>
        <Scene t={t} start={0} end={8.0} immediate>
          <Ocean t={t} glow={hookGlow} />
          <TitleBlock
            eyebrow="A living light story"
            lines={["The ocean's", 'living light']}
            accentIndex={1}
            subtitle="A dark wave hides an extraordinary signal."
            y={155}
            size={83}
            opacity={1 - prog(t, 6.5, 7.4)}
          />
          <Pill text="It's alive" y={680} opacity={prog(t, 5.9, 6.35) * (1 - prog(t, 7.2, 7.7))} size={31} />
        </Scene>

        <Scene t={t} start={7.65} end={16.35}>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 65% at 50% 44%, #073a4c 0%, #031827 48%, #010711 100%)' }} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <SvgDefs />
            <ParticleField t={t} glow={0.5} fromY={300} toY={1500} count={90} />
            <Dinoflagellate x={190} y={570} scale={0.42} rotation={-22} t={t} opacity={0.45} detailed={false} />
            <Dinoflagellate x={890} y={1020} scale={0.52} rotation={28} t={t} opacity={0.42} detailed={false} />
            <Dinoflagellate x={540} y={835} scale={1.65} rotation={-8} t={t} flash={organismFlash} />
            {[0, 1, 2].map((ring) => {
              const p = prog(t, 12.55 + ring * 0.18, 14.25 + ring * 0.18);
              return <ellipse key={ring} cx={540} cy={835} rx={130 + p * 390} ry={105 + p * 320} fill="none" stroke={C.cyan} strokeWidth={4 - p * 2} opacity={p > 0 && p < 1 ? (1 - p) * 0.45 : 0} />;
            })}
          </svg>
          <TitleBlock eyebrow="Microscopic drifters" lines={['Meet the', 'dinoflagellates']} accentIndex={1} y={155} size={70} opacity={1 - prog(t, 12.0, 12.8)} />
          <Pill text="Some species answer disturbance with a flash" y={1210} opacity={prog(t, 12.2, 12.8)} size={22} />
        </Scene>

        <Scene t={t} start={16.0} end={26.55}>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse 85% 65% at 50% 46%, #082c42 0%, #020b17 70%)' }} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <SvgDefs />
            <circle cx={540} cy={790} r={330} fill="url(#ll-cell)" stroke={C.aqua} strokeOpacity={0.25} strokeWidth={4} />
            <circle cx={540} cy={790} r={300} fill="none" stroke={C.cyan} strokeOpacity={0.12} strokeWidth={2} strokeDasharray="8 18" />
            {cellFlash > 0 && <circle cx={540} cy={740} r={110 + cellFlash * 270} fill="url(#ll-halo)" opacity={cellFlash} />}
            {Array.from({ length: 12 }, (_, index) => {
              const angle = (index / 12) * Math.PI * 2;
              const length = 90 + cellFlash * 90;
              const x1 = 540 + Math.cos(angle) * 72;
              const y1 = 740 + Math.sin(angle) * 72;
              const x2 = 540 + Math.cos(angle) * (72 + length);
              const y2 = 740 + Math.sin(angle) * (72 + length);
              return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={index % 2 ? C.cyan : C.white} strokeWidth={5} strokeLinecap="round" opacity={cellFlash * 0.75} />;
            })}
          </svg>
          <TitleBlock eyebrow="Inside a living cell" lines={['Chemistry', 'becomes light']} accentIndex={1} y={145} size={69} opacity={1 - prog(t, 22.5, 23.4)} />
          <ReactionNode label="L" sub="Luciferin" x={250 + prog(t, 18.3, 20.2) * 130} y={790} color={C.aqua} opacity={1 - prog(t, 21.2, 22.0)} />
          <ReactionNode label="O₂" sub="Oxygen" x={830 - prog(t, 18.3, 20.2) * 130} y={790} color={C.blue} small opacity={1 - prog(t, 21.2, 22.0)} />
          <ReactionNode label="✦" sub="Blue light" x={540} y={740} color={C.cyan} scale={0.7 + cellFlash * 0.55} opacity={prog(t, 22.1, 22.9)} />
          <div style={{ position: 'absolute', left: 250, right: 250, top: 1040, opacity: 1 - prog(t, 22.0, 22.8), textAlign: 'center', fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 3, color: C.amber }}>
            <div style={{ border: `1px solid ${C.amber}66`, borderRadius: 18, padding: '20px 16px', background: 'rgba(2,15,27,0.8)' }}>LUCIFERASE · ENZYME CATALYST</div>
          </div>
          <Pill text="Light · with very little heat" y={1185} color={C.cyan} opacity={prog(t, 23.6, 24.2)} size={26} />
        </Scene>

        <Scene t={t} start={26.1} end={32.55}>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 65% at 50% 50%, #062a3d 0%, #010711 72%)' }} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <SvgDefs />
            <ParticleField t={t} glow={0.3} fromY={430} toY={1310} count={55} />
            <Dinoflagellate x={390} y={850} scale={1.35} rotation={-12} t={t} flash={whyFlash} />
            <Grazer x={910 - approach * 290} y={845 + Math.sin(t * 2) * 18} scale={1.1} rotation={180} lit={whyFlash} />
            <path d="M 715 1070 C 635 1120, 495 1130, 410 1080" fill="none" stroke={C.amber} strokeWidth={3} strokeDasharray="8 12" opacity={prog(t, 28.4, 29.0)} />
          </svg>
          <TitleBlock eyebrow="A survival question" lines={['Why flash', 'when touched?']} accentIndex={1} y={150} size={74} opacity={1 - prog(t, 29.0, 29.7)} />
          <TitleBlock eyebrow="One leading hypothesis" lines={['The burglar', 'alarm effect']} accentIndex={0} y={190} size={72} opacity={prog(t, 29.25, 29.85)} />
          <Pill text="Not magic · a possible survival signal" y={1210} color={C.amber} opacity={prog(t, 29.6, 30.2)} size={23} />
        </Scene>

        <Scene t={t} start={32.1} end={40.0}>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse 95% 68% at 45% 48%, #062639 0%, #010711 72%)' }} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <SvgDefs />
            <ParticleField t={t} glow={0.26 + expose * 0.3} fromY={390} toY={1350} count={60} />
            <Fish x={180 + expose * 210} y={490 + expose * 75} scale={0.82 + expose * 0.12} rotation={-12 + expose * 24} opacity={0.25 + expose * 0.75} />
            <Dinoflagellate x={350} y={895} scale={1.15} rotation={-10} t={t} flash={predatorFlash} />
            <Grazer x={710 + startle * 145} y={875 - startle * 65} scale={1.25} rotation={180 + startle * 24} lit={Math.max(predatorFlash, expose)} />
            <path d={`M 410 840 Q 590 ${680 - expose * 80} 770 820`} fill="none" stroke={C.cyan} strokeWidth={4} strokeDasharray="10 16" opacity={expose * 0.55} />
          </svg>
          <TitleBlock eyebrow="The burglar alarm" lines={['A flash can', 'change the hunt']} accentIndex={1} y={145} size={70} />
          <Pill text="1 · Startle the tiny predator" y={1150} opacity={1 - expose} size={25} />
          <Pill text="2 · Expose it to a larger hunter" y={1150} color={C.amber} opacity={expose} size={25} />
        </Scene>

        <Scene t={t} start={39.65} end={46.75}>
          <AbsoluteFill style={{ background: 'radial-gradient(ellipse 90% 65% at 50% 46%, #073145 0%, #010711 72%)' }} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <SvgDefs />
            <ParticleField t={t} glow={0.4} fromY={380} toY={1320} count={65} />
          </svg>
          <TitleBlock eyebrow="A living signal" lines={['More than', 'beautiful']} accentIndex={1} y={145} size={78} />
          {[
            { label: 'Warning', note: 'A sudden flash says: stop.', at: wordAt('meaning', 'warning'), color: C.amber, icon: '!' },
            { label: 'Distraction', note: 'A bright instant breaks focus.', at: wordAt('meaning', 'distraction'), color: C.cyan, icon: '✦' },
            { label: 'Call for help', note: 'Light can reveal the grazer.', at: wordAt('meaning', 'call'), color: C.aqua, icon: '⌁' },
          ].map((item, index) => {
            const enter = prog(t, item.at - 0.15, item.at + 0.35);
            const y = 535 + index * 235;
            return (
              <div key={item.label} style={{ position: 'absolute', left: 90, right: 90, top: y, opacity: enter, transform: `translateX(${(1 - enter) * 42}px)`, display: 'flex', alignItems: 'center', gap: 30, border: `1px solid ${item.color}44`, background: 'rgba(3,19,32,0.78)', borderRadius: 26, padding: '24px 30px' }}>
                <div style={{ width: 86, height: 86, flex: '0 0 auto', borderRadius: '50%', border: `2px solid ${item.color}`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_DISPLAY, fontSize: 48, fontWeight: 700, boxShadow: `0 0 34px ${item.color}22` }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 42, fontWeight: 700, textTransform: 'uppercase', color: item.color }}>{item.label}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 28, color: C.muted, marginTop: 5 }}>{item.note}</div>
                </div>
              </div>
            );
          })}
        </Scene>

        <Scene t={t} start={46.3} end={60}>
          <Ocean t={t} glow={closingGlow} closing />
          <TitleBlock eyebrow="Next time the night ocean ignites" lines={['Look closer']} accentIndex={0} y={170} size={91} opacity={1 - prog(t, 50.3, 51.2)} />
          <TitleBlock eyebrow="You're watching a hidden conversation" lines={['Written', 'in blue']} accentIndex={1} y={185} size={88} opacity={prog(t, 50.4, 51.2) * (1 - prog(t, 53.5, 54.1))} />
          <div style={{ opacity: prog(t, 54.3, 55.1) }}>
            <TitleBlock eyebrow="Bioluminescence" lines={["The ocean's", 'living light']} accentIndex={1} subtitle="Living chemistry. Ocean wonder." y={360} size={84} />
            <Pill text="Look closer" y={780} opacity={prog(t, 55.6, 56.4)} size={27} />
          </div>
        </Scene>

        <AbsoluteFill style={{ background: 'radial-gradient(ellipse 120% 95% at 50% 50%, transparent 55%, rgba(0,0,0,0.52) 100%)', pointerEvents: 'none' }} />
        <Captions lines={VO} y={1415} size={50} maxWords={4} accent={C.cyan} plate />
        <ProgressBar color={C.cyan} />
        <div style={{ position: 'absolute', left: 42, top: 40, fontFamily: FONT_MONO, fontSize: 19, letterSpacing: 3, color: 'rgba(190,235,245,0.52)' }}>FIELD NOTE · 01</div>
        <div style={{ position: 'absolute', right: 42, top: 40, fontFamily: FONT_MONO, fontSize: 19, letterSpacing: 2, color: 'rgba(190,235,245,0.52)' }}>60 SEC</div>
      </AbsoluteFill>
      <Sound />
    </AbsoluteFill>
  );
};

export default Short13LivingLight;
