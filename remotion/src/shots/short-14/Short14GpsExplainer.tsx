import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { SCENES, SFX_CUES, VO } from './vo.gen';

// Original 60-second everyday-technology explainer. All diagrams and motion
// graphics are drawn here; narration and captions share measured audio timing.
export const compositionConfig = {
  id: 'Short14GpsExplainer',
  durationInSeconds: 60,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const F = (seconds: number) => Math.max(0, Math.round(seconds * 30));
const C = {
  bg: '#050914',
  panel: '#0b1424',
  panel2: '#101d31',
  white: '#f3f7ff',
  muted: '#9aabc2',
  cyan: '#67e8ff',
  blue: '#5b8cff',
  mint: '#6cf0bd',
  amber: '#ffcc73',
  coral: '#ff9278',
};

const line = (id: string) => {
  const found = VO.find((item) => item.id === id);
  if (!found) throw new Error(`Missing GPS narration segment: ${id}`);
  return found;
};
const sceneTime = (id: string) => {
  const found = SCENES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing GPS scene: ${id}`);
  return found;
};
const seeded = (seed: number) => {
  const value = Math.sin(seed * 91.731 + 17.17) * 43758.5453;
  return value - Math.floor(value);
};
const STARS = Array.from({ length: 74 }, (_, index) => ({
  x: seeded(index + 3) * W,
  y: 60 + seeded(index + 173) * 1250,
  r: 0.6 + seeded(index + 337) * 1.9,
  phase: seeded(index + 511) * Math.PI * 2,
}));

const GpsDefs: React.FC = () => (
  <defs>
    <radialGradient id="gps-earth" cx="35%" cy="28%">
      <stop offset="0%" stopColor="#376ca8" />
      <stop offset="55%" stopColor="#153a67" />
      <stop offset="100%" stopColor="#07172d" />
    </radialGradient>
    <radialGradient id="gps-halo">
      <stop offset="0%" stopColor={C.cyan} stopOpacity="0.55" />
      <stop offset="45%" stopColor={C.blue} stopOpacity="0.18" />
      <stop offset="100%" stopColor={C.blue} stopOpacity="0" />
    </radialGradient>
    <linearGradient id="gps-panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#263a57" />
      <stop offset="100%" stopColor="#0a1322" />
    </linearGradient>
    <linearGradient id="gps-screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#10263a" />
      <stop offset="100%" stopColor="#07111f" />
    </linearGradient>
    <clipPath id="gps-phone-clip">
      <rect x={-132} y={-250} width={264} height={470} rx={28} />
    </clipPath>
  </defs>
);

const SpaceBackground: React.FC<{ t: number; grid?: boolean; glow?: number }> = ({ t, grid = true, glow = 0.45 }) => (
  <AbsoluteFill>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 100% 70% at 50% 40%, #0c1c33 0%, #060c18 52%, #03060d 100%)' }} />
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
      <GpsDefs />
      {STARS.map((star, index) => (
        <circle key={index} cx={star.x} cy={star.y} r={star.r} fill="#d9edff" opacity={0.09 + Math.max(0, Math.sin(t * 0.7 + star.phase)) * 0.28} />
      ))}
      <circle cx={540} cy={850} r={590} fill="url(#gps-halo)" opacity={glow} />
      {grid && Array.from({ length: 13 }, (_, index) => (
        <line key={`v${index}`} x1={index * 90} y1={390} x2={index * 90} y2={1370} stroke={C.blue} strokeOpacity={0.045} strokeWidth={1} />
      ))}
      {grid && Array.from({ length: 12 }, (_, index) => (
        <line key={`h${index}`} x1={0} y1={390 + index * 90} x2={W} y2={390 + index * 90} stroke={C.blue} strokeOpacity={0.045} strokeWidth={1} />
      ))}
    </svg>
  </AbsoluteFill>
);

const TitleBlock: React.FC<{
  eyebrow: string;
  lines: string[];
  accentIndex?: number;
  subtitle?: string;
  y?: number;
  size?: number;
  opacity?: number;
}> = ({ eyebrow, lines, accentIndex = -1, subtitle, y = 145, size = 70, opacity = 1 }) => (
  <div style={{ position: 'absolute', top: y, left: 52, right: 52, textAlign: 'center', opacity }}>
    <div style={{ fontFamily: FONT_MONO, fontWeight: 500, fontSize: 23, letterSpacing: 4.5, color: C.cyan, textTransform: 'uppercase', marginBottom: 22 }}>{eyebrow}</div>
    {lines.map((text, index) => (
      <div key={text} style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: size, lineHeight: 1.04, letterSpacing: -1.2, textTransform: 'uppercase', color: index === accentIndex ? C.cyan : C.white, textShadow: '0 8px 34px rgba(0,0,0,0.55)' }}>{text}</div>
    ))}
    {subtitle && <div style={{ marginTop: 22, fontFamily: FONT_BODY, fontSize: 29, fontWeight: 500, lineHeight: 1.35, color: C.muted }}>{subtitle}</div>}
  </div>
);

const Pill: React.FC<{ text: string; y: number; color?: string; opacity?: number; size?: number }> = ({ text, y, color = C.cyan, opacity = 1, size = 24 }) => (
  <div style={{ position: 'absolute', top: y, left: 60, right: 60, display: 'flex', justifyContent: 'center', opacity }}>
    <div style={{ fontFamily: FONT_MONO, fontSize: size, fontWeight: 500, letterSpacing: 2.4, textTransform: 'uppercase', color, border: `1px solid ${color}55`, background: 'rgba(5,12,24,0.86)', borderRadius: 999, padding: '14px 24px', boxShadow: `0 0 34px ${color}12` }}>{text}</div>
  </div>
);

const Scene: React.FC<{ t: number; id: string; children: React.ReactNode }> = ({ t, id, children }) => {
  const { start, end } = sceneTime(id);
  if (t < start || t > end + 0.22) return null;
  const enter = id === 'hook' ? 1 : prog(t, start, start + 0.34);
  const exit = id === 'closing' ? 1 : 1 - prog(t, end - 0.18, end + 0.18);
  return <AbsoluteFill style={{ opacity: enter * exit }}>{children}</AbsoluteFill>;
};

const Satellite: React.FC<{ x: number; y: number; scale?: number; rotation?: number; t: number; accent?: string; opacity?: number; label?: string }> = ({
  x, y, scale = 1, rotation = 0, t, accent = C.cyan, opacity = 1, label,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
    <circle r={165} fill="url(#gps-halo)" opacity={0.28} />
    <g stroke={accent} strokeWidth={3}>
      <rect x={-205} y={-54} width={130} height={108} rx={5} fill="#153a67" />
      <rect x={75} y={-54} width={130} height={108} rx={5} fill="#153a67" />
      {[-165, -125, 115, 155].map((px) => <line key={px} x1={px} y1={-54} x2={px} y2={54} strokeOpacity={0.55} />)}
      {[-18, 18].map((py) => <React.Fragment key={py}><line x1={-205} y1={py} x2={-75} y2={py} strokeOpacity={0.55} /><line x1={75} y1={py} x2={205} y2={py} strokeOpacity={0.55} /></React.Fragment>)}
      <line x1={-75} y1={0} x2={-48} y2={0} /><line x1={48} y1={0} x2={75} y2={0} />
    </g>
    <rect x={-52} y={-43} width={104} height={86} rx={15} fill="url(#gps-panel)" stroke={C.amber} strokeWidth={4} />
    <rect x={-31} y={-24} width={62} height={48} rx={7} fill="#09111f" stroke={C.muted} strokeOpacity={0.45} />
    <path d="M 0 43 L 0 81 M -28 82 Q 0 52 28 82" fill="none" stroke={C.white} strokeWidth={5} strokeLinecap="round" />
    <circle cx={0} cy={84} r={7} fill={accent} opacity={0.45 + Math.max(0, Math.sin(t * 5)) * 0.55} />
    <circle cx={34} cy={-29} r={5} fill={C.mint} opacity={0.4 + Math.max(0, Math.sin(t * 4 + 1)) * 0.6} />
    {label && <g transform="translate(0 -105)"><circle r={29} fill={C.bg} stroke={accent} strokeWidth={3} /><text textAnchor="middle" dominantBaseline="central" fill={accent} fontFamily={FONT_MONO} fontWeight={700} fontSize={28}>{label}</text></g>}
  </g>
);

const LocationPin: React.FC<{ x: number; y: number; scale?: number; t: number; color?: string; opacity?: number }> = ({ x, y, scale = 1, t, color = C.cyan, opacity = 1 }) => {
  const pulse = (t * 0.8) % 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <circle cy={-34} r={70 + pulse * 85} fill="none" stroke={color} strokeWidth={4} opacity={(1 - pulse) * 0.32} />
      <circle cy={-34} r={105} fill="url(#gps-halo)" opacity={0.55} />
      <path d="M 0 42 C -18 12, -62 -24, -62 -70 A 62 62 0 1 1 62 -70 C 62 -24 18 12 0 42 Z" fill={color} stroke={C.white} strokeOpacity={0.7} strokeWidth={3} />
      <circle cy={-70} r={23} fill={C.bg} />
      <circle cy={-70} r={11} fill={C.white} />
    </g>
  );
};

const Phone: React.FC<{ x: number; y: number; scale?: number; rotation?: number; t: number; opacity?: number; pin?: boolean }> = ({ x, y, scale = 1, rotation = 0, t, opacity = 1, pin = true }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
    <ellipse cx={18} cy={305} rx={180} ry={40} fill="#000" opacity={0.35} />
    <rect x={-165} y={-294} width={330} height={590} rx={50} fill="#02050b" stroke="#42516a" strokeWidth={8} />
    <rect x={-147} y={-275} width={294} height={550} rx={39} fill="url(#gps-panel)" />
    <rect x={-132} y={-250} width={264} height={470} rx={28} fill="url(#gps-screen)" />
    <g clipPath="url(#gps-phone-clip)">
      <path d="M -180 -160 C -90 -210, -15 -105, 80 -160 S 210 -110, 160 -30 S 40 40, 110 120 S 40 230, -60 185 S -180 110, -110 20 S -190 -70, -180 -160" fill="none" stroke="#28465e" strokeWidth={20} opacity={0.65} />
      <path d="M -180 -160 C -90 -210, -15 -105, 80 -160 S 210 -110, 160 -30 S 40 40, 110 120 S 40 230, -60 185 S -180 110, -110 20 S -190 -70, -180 -160" fill="none" stroke={C.mint} strokeWidth={4} strokeDasharray="8 12" opacity={0.75} />
      <path d="M -120 -60 L 130 80 M -90 160 L 100 -210 M -140 20 L 140 -100" stroke="#20364d" strokeWidth={7} opacity={0.8} />
      <circle cx={-74} cy={135} r={45} fill={C.blue} opacity={0.12} />
      <circle cx={88} cy={-155} r={58} fill={C.mint} opacity={0.09} />
    </g>
    <rect x={-43} y={-265} width={86} height={12} rx={6} fill="#02050b" />
    {pin && <LocationPin x={0} y={-12} scale={0.72} t={t} />}
    <rect x={-48} y={239} width={96} height={7} rx={4} fill="#72819a" opacity={0.55} />
  </g>
);

const Earth: React.FC<{ x: number; y: number; r: number; opacity?: number }> = ({ x, y, r, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <circle r={r + 42} fill="url(#gps-halo)" opacity={0.45} />
    <circle r={r} fill="url(#gps-earth)" stroke={C.cyan} strokeOpacity={0.65} strokeWidth={4} />
    <g fill="none" stroke={C.cyan} strokeOpacity={0.18} strokeWidth={2}>
      <ellipse rx={r} ry={r * 0.38} /><ellipse rx={r} ry={r * 0.72} />
      <ellipse rx={r * 0.42} ry={r} /><ellipse rx={r * 0.74} ry={r} />
      <line x1={-r} y1={0} x2={r} y2={0} /><line x1={0} y1={-r} x2={0} y2={r} />
    </g>
    <g fill={C.mint} opacity={0.38}>
      <path d={`M ${-r * 0.62} ${-r * 0.42} l ${r * 0.32} ${-r * 0.18} ${r * 0.25} ${r * 0.13} ${-r * 0.08} ${r * 0.24} ${-r * 0.27} ${r * 0.08} ${-r * 0.18} ${-r * 0.16} Z`} />
      <path d={`M ${r * 0.12} ${-r * 0.55} l ${r * 0.38} ${r * 0.04} ${r * 0.18} ${r * 0.27} ${-r * 0.16} ${r * 0.18} ${-r * 0.06} ${r * 0.43} ${-r * 0.25} ${-r * 0.17} ${-r * 0.2} ${-r * 0.36} Z`} />
      <path d={`M ${-r * 0.2} ${r * 0.18} l ${r * 0.22} ${r * 0.08} ${r * 0.07} ${r * 0.42} ${-r * 0.2} ${r * 0.26} ${-r * 0.18} ${-r * 0.35} Z`} />
    </g>
    <circle r={r + 9} fill="none" stroke={C.cyan} strokeOpacity={0.16} strokeWidth={12} />
  </g>
);

const AtomicClock: React.FC<{ t: number; opacity?: number; scale?: number }> = ({ t, opacity = 1, scale = 1 }) => (
  <g transform={`translate(540 850) scale(${scale})`} opacity={opacity}>
    <circle r={350} fill="url(#gps-halo)" opacity={0.5} />
    {Array.from({ length: 12 }, (_, index) => {
      const x = -245 + index * 44.5;
      return <g key={index} stroke={C.amber} strokeWidth={7} strokeLinecap="round"><line x1={x} y1={-225} x2={x} y2={-182} /><line x1={x} y1={182} x2={x} y2={225} /></g>;
    })}
    <rect x={-285} y={-190} width={570} height={380} rx={40} fill="#101a29" stroke={C.amber} strokeWidth={5} />
    <rect x={-245} y={-145} width={490} height={190} rx={22} fill="#030810" stroke={C.cyan} strokeOpacity={0.35} strokeWidth={3} />
    <text x={0} y={-35} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={58}>04:32:07</text>
    <text x={0} y={25} textAnchor="middle" fill={C.cyan} fontFamily={FONT_MONO} fontSize={30} letterSpacing={7}>.{String(Math.floor(t * 1000) % 1000).padStart(3, '0')} SEC</text>
    <path d="M -225 105 L -175 105 L -150 65 L -110 145 L -65 82 L -20 105 L 40 105 L 75 58 L 115 150 L 155 105 L 225 105" fill="none" stroke={C.amber} strokeWidth={5} strokeLinejoin="round" />
    <text x={0} y={275} textAnchor="middle" fill={C.amber} fontFamily={FONT_MONO} fontSize={28} letterSpacing={5}>ATOMIC CLOCK</text>
  </g>
);

const DataCard: React.FC<{ x: number; y: number; label: string; value: string; color: string; opacity?: number; scale?: number }> = ({ x, y, label, value, color, opacity = 1, scale = 1 }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: 390, transform: `translate(-50%, -50%) scale(${scale})`, opacity, border: `1px solid ${color}66`, borderRadius: 24, background: 'rgba(8,18,32,0.94)', padding: '25px 28px', boxShadow: `0 18px 60px rgba(0,0,0,0.35), 0 0 34px ${color}18` }}>
    <div style={{ fontFamily: FONT_MONO, fontSize: 24, letterSpacing: 3, color, textTransform: 'uppercase' }}>{label}</div>
    <div style={{ marginTop: 10, fontFamily: FONT_BODY, fontSize: 26, lineHeight: 1.3, fontWeight: 500, color: C.white }}>{value}</div>
  </div>
);

const highlightWords = new Set(['gps', 'internet', 'atomic clock', 'position', 'time', 'distance', 'speed of light', 'fourth', 'trilateration', 'delay']);
const CaptionText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(GPS|internet|atomic clock|position|time|distance|speed of light|fourth|trilateration|delay)/gi).map((part, index) => (
      <span key={index} style={{ color: highlightWords.has(part.toLowerCase()) ? C.cyan : C.white }}>{part}</span>
    ))}
  </>
);

const ExactCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const active = VO.find((item) => t >= item.start && t < item.end + 0.14);
  if (!active) return null;
  const enter = prog(t, active.start, active.start + 0.13);
  const exit = 1 - prog(t, active.end + 0.05, active.end + 0.14);
  const progress = prog(t, active.start, active.end);
  return (
    <div style={{ position: 'absolute', left: 62, right: 62, top: 1400, display: 'flex', justifyContent: 'center', opacity: enter * exit, transform: `translateY(${(1 - enter) * 14}px)` }}>
      <div style={{ position: 'relative', maxWidth: 920, border: '1px solid rgba(103,232,255,0.22)', borderRadius: 24, background: 'rgba(4,10,20,0.92)', padding: '24px 31px 27px', boxShadow: '0 18px 64px rgba(0,0,0,0.48)', overflow: 'hidden' }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 43, lineHeight: 1.25, letterSpacing: 0.1, textAlign: 'center' }}>
          <CaptionText text={active.text} />
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, height: 4, width: `${progress * 100}%`, background: C.cyan, opacity: 0.85 }} />
      </div>
    </div>
  );
};

const Sound: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const endFade = 1 - prog(t, 58.6, 60);
  const narrationEnd = line('closing-map').end;
  return (
    <>
      <Audio src={staticFile('voiceovers/gps-explainer/narration.wav')} volume={0.92} />
      <Audio src={staticFile('library/music/clips/tech-pulse.mp3')} volume={() => {
        const duck = prog(t, 0.3, 1.0) * (1 - prog(t, narrationEnd - 0.2, narrationEnd + 0.8));
        return (0.34 - duck * 0.20) * endFade;
      }} />
      {SFX_CUES.map((cue, index) => (
        <Sequence key={index} from={F(cue.at)}>
          <Audio src={staticFile(`library/sfx/clips/${cue.id}.mp3`)} volume={cue.gain * endFade} />
        </Sequence>
      ))}
    </>
  );
};

const Short14GpsExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const endOpacity = 1 - prog(t, 59.3, 60);
  const mapDistinction = prog(t, line('hook-map').start - 0.15, line('hook-map').start + 0.35);
  const clockReveal = prog(t, line('orbit-clock').start - 0.2, line('orbit-clock').start + 0.45);
  const timePacket = prog(t, line('signal-time').start - 0.15, line('signal-time').end);
  const precision = prog(t, line('delay-precise').start - 0.15, line('delay-precise').start + 0.35);
  const equation = prog(t, line('delay-light').start - 0.1, line('delay-light').start + 0.5);
  const fourReveal = prog(t, line('four-position').start - 0.15, line('four-position').start + 0.45);
  const correction = prog(t, line('four-correction').start - 0.12, line('four-correction').start + 0.4);
  const spheres = prog(t, line('tri-spheres').start - 0.1, line('tri-spheres').end + 0.2);
  const intersection = prog(t, line('tri-location').start - 0.1, line('tri-location').start + 0.55);
  const recap = prog(t, line('closing-map').start - 0.15, line('closing-map').start + 0.55);
  const finalRevealStart = line('closing-map').end + 0.1;
  const finalReveal = prog(t, finalRevealStart, finalRevealStart + 0.75);
  const closingExit = 1 - prog(t, finalRevealStart - 0.6, finalRevealStart);

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: FONT_BODY }}>
      <AbsoluteFill style={{ opacity: endOpacity }}>
        <Scene t={t} id="hook">
          <SpaceBackground t={t} glow={0.55} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <GpsDefs />
            <Satellite x={850} y={500} scale={0.62} rotation={-15} t={t} opacity={0.85} />
            {[0, 1, 2].map((index) => {
              const p = (t * 0.55 + index / 3) % 1;
              return <path key={index} d={`M ${810 - p * 190} ${560 + p * 190} Q ${690 - p * 80} ${610 + p * 220} ${650 - p * 65} ${760 + p * 170}`} fill="none" stroke={C.cyan} strokeWidth={4} strokeDasharray="10 16" opacity={(1 - p) * 0.36} />;
            })}
            <Phone x={540} y={930} scale={1.08} rotation={-3} t={t} />
          </svg>
          <TitleBlock eyebrow="Everyday tech, explained" lines={['No signal.', 'Still found.']} accentIndex={1} subtitle="Your phone has a space-based receiver." y={145} size={82} opacity={1 - mapDistinction} />
          <Pill text="Mobile data ✕   •   Internet ✕   •   GPS ✓" y={560} opacity={1 - mapDistinction} size={22} />
          <div style={{ opacity: mapDistinction, position: 'absolute', left: 120, right: 120, top: 1240, border: `1px solid ${C.mint}55`, borderRadius: 24, background: 'rgba(7,19,28,0.9)', padding: '24px 28px', textAlign: 'center' }}>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 46, color: C.mint }}>GPS ≠ INTERNET</div>
            <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 27, color: C.muted, marginTop: 8 }}>Maps can be downloaded. Position comes from space.</div>
          </div>
        </Scene>

        <Scene t={t} id="orbit">
          <SpaceBackground t={t} grid={false} glow={0.42} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <GpsDefs />
            <g opacity={1 - clockReveal * 0.75}>
              <ellipse cx={540} cy={960} rx={455} ry={185} fill="none" stroke={C.blue} strokeOpacity={0.35} strokeWidth={3} strokeDasharray="10 14" />
              <ellipse cx={540} cy={960} rx={400} ry={320} fill="none" stroke={C.cyan} strokeOpacity={0.18} strokeWidth={2} />
              <Earth x={540} y={980} r={275} />
              <Satellite x={540 + Math.cos(t * 0.45) * 405} y={890 + Math.sin(t * 0.45) * 190} scale={0.65} rotation={t * 8} t={t} />
              <path d="M 800 710 L 800 935 M 784 710 L 816 710 M 784 935 L 816 935" stroke={C.amber} strokeWidth={4} />
              <text x={830} y={820} fill={C.amber} fontFamily={FONT_MONO} fontWeight={700} fontSize={34}>≈20,000</text>
              <text x={830} y={862} fill={C.amber} fontFamily={FONT_MONO} fontSize={28}>KM UP</text>
            </g>
            <AtomicClock t={t} opacity={clockReveal} scale={0.82 + clockReveal * 0.18} />
          </svg>
          <TitleBlock eyebrow="Global Positioning System" lines={['Clocks', 'in orbit']} accentIndex={0} subtitle="A constellation of precise transmitters." size={78} opacity={1 - clockReveal} />
          <TitleBlock eyebrow="The key ingredient" lines={['Atomic', 'time']} accentIndex={1} subtitle="Extremely accurate clocks make the system work." size={80} opacity={clockReveal} />
        </Scene>

        <Scene t={t} id="signals">
          <SpaceBackground t={t} grid={false} glow={0.48} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <GpsDefs />
            <Satellite x={540} y={525} scale={0.86} rotation={-5} t={t} />
            <Phone x={540} y={1140} scale={0.56} t={t} />
            {[0, 1, 2].map((index) => {
              const p = (t * 0.65 + index / 3) % 1;
              const y = 650 + p * 310;
              return <path key={index} d={`M ${430 - p * 80} ${y} Q 540 ${y + 75} ${650 + p * 80} ${y}`} fill="none" stroke={index % 2 ? C.mint : C.cyan} strokeWidth={5} opacity={(1 - p) * 0.6} />;
            })}
            <g transform={`translate(${275 + timePacket * 265} ${690 + timePacket * 285})`} opacity={0.25 + timePacket * 0.75}>
              <rect x={-88} y={-34} width={176} height={68} rx={16} fill={C.panel2} stroke={C.amber} strokeWidth={3} />
              <text textAnchor="middle" dominantBaseline="central" fill={C.amber} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>TIME SENT</text>
            </g>
          </svg>
          <TitleBlock eyebrow="Every signal carries two facts" lines={['A timestamp', 'from space']} accentIndex={0} size={72} />
          <DataCard x={285} y={650} label="01 · Position" value="Where the satellite is" color={C.cyan} opacity={1 - timePacket * 0.25} />
          <DataCard x={785} y={960} label="02 · Time sent" value="When the signal left" color={C.amber} opacity={timePacket} scale={0.9 + timePacket * 0.1} />
          <Pill text="Radio messages, not a two-way conversation" y={1260} opacity={prog(t, line('signal-time').start, line('signal-time').start + 0.4)} size={21} />
        </Scene>

        <Scene t={t} id="delay">
          <SpaceBackground t={t} glow={0.42} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <GpsDefs />
            <g transform={`translate(540 720) scale(${1 + precision * 0.08})`} opacity={1 - equation * 0.25}>
              <circle r={255} fill="#081421" stroke={C.cyan} strokeWidth={6} />
              <circle r={220} fill="none" stroke={C.muted} strokeOpacity={0.2} strokeWidth={3} />
              {Array.from({ length: 24 }, (_, index) => {
                const a = (index / 24) * Math.PI * 2;
                return <line key={index} x1={Math.cos(a) * 195} y1={Math.sin(a) * 195} x2={Math.cos(a) * 218} y2={Math.sin(a) * 218} stroke={index % 6 === 0 ? C.amber : C.muted} strokeWidth={index % 6 === 0 ? 6 : 3} />;
              })}
              <rect x={-55} y={-315} width={110} height={65} rx={15} fill={C.panel2} stroke={C.cyan} strokeWidth={5} />
              <line x1={0} y1={-250} x2={0} y2={-220} stroke={C.cyan} strokeWidth={8} />
              <g transform={`rotate(${t * 85})`}><line x1={0} y1={25} x2={0} y2={-165} stroke={C.amber} strokeWidth={8} strokeLinecap="round" /><circle r={18} fill={C.amber} /></g>
              <text x={0} y={100} textAnchor="middle" fill={C.white} fontFamily={FONT_MONO} fontWeight={700} fontSize={47}>Δt ≈ 67 ms</text>
              <text x={0} y={148} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={24}>SIGNAL TRAVEL TIME</text>
            </g>
            <g opacity={equation} transform={`translate(540 1080) scale(${0.9 + equation * 0.1})`}>
              <rect x={-440} y={-115} width={880} height={230} rx={30} fill={C.panel} stroke={C.mint} strokeWidth={3} />
              <text x={0} y={-20} textAnchor="middle" fill={C.mint} fontFamily={FONT_DISPLAY} fontWeight={700} fontSize={49}>DISTANCE = TIME × c</text>
              <text x={0} y={48} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={25}>c = SPEED OF LIGHT</text>
            </g>
          </svg>
          <TitleBlock eyebrow="Measure the delay" lines={['Time becomes', 'distance']} accentIndex={1} size={74} opacity={1 - equation * 0.35} />
          <Pill text="A tiny delay contains real distance information" y={1230} color={C.amber} opacity={precision * (1 - equation)} size={22} />
          <Pill text="67 ms × light speed ≈ 20,000 km" y={1260} color={C.mint} opacity={equation} size={25} />
        </Scene>

        <Scene t={t} id="four">
          <SpaceBackground t={t} grid={false} glow={0.36} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <GpsDefs />
            {[{ x: 210, y: 570, n: '1' }, { x: 870, y: 570, n: '2' }, { x: 210, y: 1110, n: '3' }, { x: 870, y: 1110, n: '4' }].map((sat, index) => {
              const visible = index === 0 ? 1 : fourReveal;
              const isFourth = index === 3;
              const color = isFourth ? C.amber : C.cyan;
              return <g key={sat.n} opacity={visible}>
                <line x1={sat.x} y1={sat.y} x2={540} y2={865} stroke={color} strokeWidth={isFourth ? 5 : 4} strokeDasharray="10 14" strokeDashoffset={-t * 30} opacity={0.25 + correction * (isFourth ? 0.55 : 0.15)} />
                <Satellite x={sat.x} y={sat.y} scale={0.42} rotation={index % 2 ? 12 : -12} t={t} accent={color} label={sat.n} />
              </g>;
            })}
            <circle cx={540} cy={865} r={110 + Math.sin(t * 2) * 8} fill="url(#gps-halo)" opacity={0.7} />
            <LocationPin x={540} y={895} scale={0.82} t={t} color={correction > 0.5 ? C.mint : C.white} />
            <g opacity={1 - fourReveal}>
              <circle cx={540} cy={865} r={360} fill="none" stroke={C.cyan} strokeWidth={4} strokeOpacity={0.35} />
              <ellipse cx={540} cy={865} rx={360} ry={130} fill="none" stroke={C.cyan} strokeOpacity={0.2} strokeWidth={3} />
            </g>
          </svg>
          <TitleBlock eyebrow="Solve position + clock error" lines={['Why four', 'satellites?']} accentIndex={1} size={76} />
          <Pill text="1 distance = many possible positions" y={1245} opacity={1 - fourReveal} size={23} />
          <div style={{ position: 'absolute', left: 105, right: 105, top: 1215, opacity: fourReveal, display: 'flex', gap: 18 }}>
            <div style={{ flex: 1, border: `1px solid ${C.cyan}55`, borderRadius: 22, background: 'rgba(6,16,28,0.92)', padding: '22px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: C.cyan, letterSpacing: 2 }}>1 + 2 + 3</div><div style={{ fontFamily: FONT_DISPLAY, fontSize: 31, fontWeight: 700, color: C.white, marginTop: 8 }}>POSITION</div>
            </div>
            <div style={{ flex: 1, border: `1px solid ${C.amber}66`, borderRadius: 22, background: 'rgba(22,18,13,0.94)', padding: '22px 16px', textAlign: 'center', boxShadow: correction > 0 ? `0 0 38px ${C.amber}22` : undefined }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: C.amber, letterSpacing: 2 }}>4TH</div><div style={{ fontFamily: FONT_DISPLAY, fontSize: 31, fontWeight: 700, color: C.white, marginTop: 8 }}>CLOCK FIX</div>
            </div>
          </div>
          <Pill text={correction > 0.5 ? 'Clock corrected ✓  •  Position solved ✓' : 'Your phone clock is not atomic'} y={1340} color={correction > 0.5 ? C.mint : C.amber} opacity={fourReveal} size={21} />
        </Scene>

        <Scene t={t} id="trilateration">
          <SpaceBackground t={t} grid={false} glow={0.35} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <GpsDefs />
            {[{ x: 235, y: 600, color: C.cyan }, { x: 845, y: 600, color: C.mint }, { x: 540, y: 1170, color: C.amber }].map((sat, index) => {
              const targetX = 540;
              const targetY = 850;
              const radius = Math.hypot(sat.x - targetX, sat.y - targetY);
              const local = prog(spheres, index * 0.12, 0.82 + index * 0.06);
              const r = radius * local;
              return <g key={index} opacity={0.2 + local * 0.8}>
                {[1, 0.82, 0.64].map((factor) => <circle key={factor} cx={sat.x} cy={sat.y} r={r * factor} fill="none" stroke={sat.color} strokeWidth={factor === 1 ? 4 : 2} strokeOpacity={factor === 1 ? 0.48 : 0.16} />)}
                <ellipse cx={sat.x} cy={sat.y} rx={r} ry={r * 0.32} fill="none" stroke={sat.color} strokeWidth={2} strokeOpacity={0.2} />
                <Satellite x={sat.x} y={sat.y} scale={0.38} rotation={index * 18 - 15} t={t} accent={sat.color} />
              </g>;
            })}
            <circle cx={540} cy={850} r={60 + intersection * 170} fill="url(#gps-halo)" opacity={intersection} />
            <LocationPin x={540} y={885} scale={0.78 + intersection * 0.18} t={t} color={C.white} opacity={intersection} />
          </svg>
          <TitleBlock eyebrow="Distances, not angles" lines={['Trilateration']} accentIndex={0} subtitle="Where the distance solutions agree: your location." size={76} opacity={0.55 + intersection * 0.45} />
          <Pill text="3 spheres  →  1 receiver position" y={1260} color={C.mint} opacity={intersection} size={25} />
        </Scene>

        <Scene t={t} id="closing">
          <SpaceBackground t={t} grid={false} glow={0.5} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <GpsDefs />
            <g opacity={closingExit}>
              <Satellite x={540} y={560} scale={0.65} t={t} />
              <Phone x={540} y={1100} scale={0.62} t={t} />
              {[0, 1, 2].map((index) => {
                const p = (t * 0.6 + index / 3) % 1;
                return <circle key={index} cx={540} cy={665 + p * 250} r={8 + p * 7} fill={index === 1 ? C.amber : C.cyan} opacity={(1 - p) * 0.8} />;
              })}
            </g>
            <g opacity={finalReveal} transform={`translate(0 ${(1 - finalReveal) * 45})`}>
              <Satellite x={855} y={560} scale={0.5} rotation={-12} t={t} />
              <Phone x={540} y={1000} scale={0.92} rotation={-2} t={t} />
            </g>
          </svg>
          <TitleBlock eyebrow="The whole idea" lines={['A cosmic', 'stopwatch']} accentIndex={1} size={82} opacity={closingExit} />
          <div style={{ position: 'absolute', left: 88, right: 88, top: 650, opacity: recap * closingExit, display: 'flex', justifyContent: 'center', gap: 12 }}>
            {[{ n: '01', text: 'TIME', color: C.amber }, { n: '02', text: 'DISTANCE', color: C.cyan }, { n: '03', text: 'POSITION', color: C.mint }].map((item) => (
              <div key={item.n} style={{ border: `1px solid ${item.color}55`, borderRadius: 20, background: 'rgba(6,15,27,0.94)', padding: '20px 18px', textAlign: 'center', minWidth: 245 }}>
                <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: item.color }}>{item.n}</div><div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 29, color: C.white, marginTop: 6 }}>{item.text}</div>
              </div>
            ))}
          </div>
          <div style={{ opacity: finalReveal }}>
            <TitleBlock eyebrow="Now you know" lines={['How GPS', 'finds you']} accentIndex={1} subtitle="Satellites send time. Your phone solves the geometry." y={165} size={82} />
            <Pill text="Time  →  Distance  →  Position" y={600} color={C.mint} size={25} />
          </div>
        </Scene>

        <AbsoluteFill style={{ background: 'radial-gradient(ellipse 125% 95% at 50% 50%, transparent 55%, rgba(0,0,0,0.54) 100%)', pointerEvents: 'none' }} />
        <ExactCaptions />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'rgba(255,255,255,0.1)' }}><div style={{ width: `${(frame / 1799) * 100}%`, height: '100%', background: C.cyan }} /></div>
        <div style={{ position: 'absolute', left: 40, top: 38, fontFamily: FONT_MONO, fontSize: 18, letterSpacing: 2.5, color: 'rgba(190,215,240,0.58)' }}>TECH EXPLAINED · GPS</div>
        <div style={{ position: 'absolute', right: 40, top: 38, fontFamily: FONT_MONO, fontSize: 18, letterSpacing: 2, color: 'rgba(190,215,240,0.58)' }}>60 SEC</div>
      </AbsoluteFill>
      <Sound />
    </AbsoluteFill>
  );
};

export default Short14GpsExplainer;
