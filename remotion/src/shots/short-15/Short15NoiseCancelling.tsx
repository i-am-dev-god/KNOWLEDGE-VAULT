import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../../fonts';
import { SCENES, SFX_CUES, VO } from './vo.gen';

// Original calm everyday-technology explainer. All artwork is drawn in code.
// Captions intentionally have no progress/timing line and no word-pop motion.
export const compositionConfig = {
  id: 'Short15NoiseCancelling',
  durationInSeconds: 60,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const F = (seconds: number) => Math.max(0, Math.round(seconds * 30));
const C = {
  bg: '#f6f6f1',
  paper: '#fffef9',
  ink: '#182235',
  muted: '#68758a',
  indigo: '#6366f1',
  violet: '#9b7cc4',
  teal: '#329f96',
  mint: '#78cdbd',
  coral: '#df7f96',
  amber: '#c89532',
  line: '#dfe3e7',
  pale: '#eceef2',
};

const line = (id: string) => {
  const found = VO.find((item) => item.id === id);
  if (!found) throw new Error(`Missing ANC narration segment: ${id}`);
  return found;
};
const sceneTime = (id: string) => {
  const found = SCENES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing ANC scene: ${id}`);
  return found;
};

const wavePath = (
  x: number,
  y: number,
  width: number,
  amplitude: number,
  cycles: number,
  phase = 0,
  irregularity = 0,
) => {
  const points = Array.from({ length: 121 }, (_, index) => {
    const p = index / 120;
    const envelope = Math.sin(Math.PI * Math.min(1, p * 1.08)) ** 0.35;
    const regular = Math.sin(p * Math.PI * 2 * cycles + phase);
    const irregular = irregularity * (
      Math.sin(p * Math.PI * 2 * cycles * 2.37 + 1.2) * 0.55
      + Math.sin(p * Math.PI * 2 * cycles * 4.13 + 0.4) * 0.3
    );
    return `${index === 0 ? 'M' : 'L'} ${(x + p * width).toFixed(2)} ${(y - (regular + irregular) * amplitude * envelope).toFixed(2)}`;
  });
  return points.join(' ');
};

const Background: React.FC<{ t: number; dark?: boolean }> = ({ t, dark = false }) => (
  <AbsoluteFill style={{ background: dark ? '#101827' : C.bg }}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `radial-gradient(${dark ? 'rgba(255,255,255,0.10)' : 'rgba(24,34,53,0.10)'} 1px, transparent 1px)`,
      backgroundSize: '38px 38px', opacity: 0.32,
    }} />
    <div style={{
      position: 'absolute', width: 760, height: 760, borderRadius: '50%', left: -270, top: 240,
      background: dark ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.12)', filter: 'blur(90px)',
      transform: `translate(${Math.sin(t * 0.11) * 34}px, ${Math.cos(t * 0.09) * 28}px)`,
    }} />
    <div style={{
      position: 'absolute', width: 700, height: 700, borderRadius: '50%', right: -300, top: 800,
      background: dark ? 'rgba(50,159,150,0.15)' : 'rgba(50,159,150,0.12)', filter: 'blur(100px)',
      transform: `translate(${Math.cos(t * 0.08) * 32}px, ${Math.sin(t * 0.1) * 30}px)`,
    }} />
  </AbsoluteFill>
);

const Header: React.FC<{ dark?: boolean }> = ({ dark = false }) => (
  <div style={{
    position: 'absolute', top: 48, left: 56, right: 56, display: 'flex', justifyContent: 'space-between',
    fontFamily: FONT_MONO, fontSize: 20, fontWeight: 500, letterSpacing: 3.2,
    color: dark ? 'rgba(255,255,255,0.58)' : C.muted,
  }}>
    <span>TECH EXPLAINED · ANC</span><span>60 SEC</span>
  </div>
);

const TitleBlock: React.FC<{
  eyebrow: string;
  lines: string[];
  accentIndex?: number;
  subtitle?: string;
  y?: number;
  size?: number;
  opacity?: number;
  dark?: boolean;
}> = ({ eyebrow, lines, accentIndex = -1, subtitle, y = 145, size = 72, opacity = 1, dark = false }) => (
  <div style={{ position: 'absolute', top: y, left: 54, right: 54, textAlign: 'center', opacity }}>
    <div style={{ fontFamily: FONT_MONO, fontWeight: 500, fontSize: 22, letterSpacing: 4, color: dark ? C.mint : C.indigo, textTransform: 'uppercase', marginBottom: 22 }}>{eyebrow}</div>
    {lines.map((text, index) => (
      <div key={text} style={{
        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: size, lineHeight: 1.06,
        letterSpacing: -1.5, textTransform: 'uppercase',
        color: index === accentIndex ? (dark ? C.mint : C.teal) : (dark ? C.paper : C.ink),
      }}>{text}</div>
    ))}
    {subtitle && <div style={{ marginTop: 22, fontFamily: FONT_BODY, fontSize: 28, fontWeight: 500, lineHeight: 1.4, color: dark ? 'rgba(255,255,255,0.65)' : C.muted }}>{subtitle}</div>}
  </div>
);

const Pill: React.FC<{ text: string; y: number; color?: string; opacity?: number; size?: number; dark?: boolean }> = ({
  text, y, color = C.indigo, opacity = 1, size = 22, dark = false,
}) => (
  <div style={{ position: 'absolute', top: y, left: 70, right: 70, display: 'flex', justifyContent: 'center', opacity }}>
    <div style={{
      fontFamily: FONT_MONO, fontSize: size, fontWeight: 500, letterSpacing: 2.1, textTransform: 'uppercase',
      color: dark ? C.mint : color, border: `1px solid ${dark ? 'rgba(120,205,189,0.35)' : `${color}55`}`,
      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,254,249,0.88)', borderRadius: 999,
      padding: '15px 25px', boxShadow: dark ? 'none' : '0 10px 34px rgba(24,34,53,0.07)', textAlign: 'center',
    }}>{text}</div>
  </div>
);

const Scene: React.FC<{ t: number; id: string; children: React.ReactNode }> = ({ t, id, children }) => {
  const { start, end } = sceneTime(id);
  if (t < start || t > end + 0.32) return null;
  const enter = id === 'hook' ? 1 : prog(t, start, start + 0.65);
  const exit = id === 'closing' ? 1 : 1 - prog(t, end - 0.28, end + 0.28);
  return (
    <AbsoluteFill style={{ opacity: enter * exit, transform: `translateY(${(1 - enter) * 18}px)` }}>
      {children}
    </AbsoluteFill>
  );
};

const NoiseWaves: React.FC<{ x: number; y: number; scale?: number; color?: string; opacity?: number; phase?: number }> = ({
  x, y, scale = 1, color = C.coral, opacity = 1, phase = 0,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fill="none" stroke={color} strokeWidth={13} strokeLinecap="round">
    {[0, 1, 2].map((index) => {
      const r = 62 + index * 66 + Math.sin(phase) * 3;
      return <path key={index} d={`M 0 ${-r} Q ${r * 1.12} 0 0 ${r}`} opacity={0.92 - index * 0.2} />;
    })}
  </g>
);

const Headphones: React.FC<{
  x: number; y: number; scale?: number; t: number; active?: boolean; mic?: boolean; dark?: boolean;
}> = ({ x, y, scale = 1, t, active = false, mic = false, dark = false }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <circle cx={0} cy={70} r={335} fill={dark ? C.mint : C.indigo} opacity={dark ? 0.055 : 0.045} />
    <path d="M -205 55 C -235 -285 235 -285 205 55" fill="none" stroke={dark ? '#e9edf5' : C.ink} strokeWidth={55} strokeLinecap="round" />
    <path d="M -194 28 C -205 -225 205 -225 194 28" fill="none" stroke={C.indigo} strokeWidth={8} strokeLinecap="round" opacity={0.8} />
    {[-1, 1].map((side) => (
      <g key={side} transform={`translate(${side * 205} 95) rotate(${side * 5})`}>
        <rect x={-70} y={-65} width={140} height={300} rx={58} fill={dark ? '#e9edf5' : C.ink} />
        <rect x={-49} y={-40} width={98} height={250} rx={43} fill={dark ? '#263249' : '#303b50'} stroke={dark ? C.mint : C.violet} strokeOpacity={0.45} strokeWidth={4} />
        <rect x={-26} y={-6} width={52} height={160} rx={24} fill={dark ? '#101827' : '#111927'} opacity={0.85} />
        {active && <path d={wavePath(-18, 75, 36, 24, 1.5, t * 0.7)} fill="none" stroke={C.mint} strokeWidth={5} strokeLinecap="round" />}
      </g>
    ))}
    {mic && <g transform="translate(280 110)">
      <circle r={36} fill={C.paper} stroke={C.teal} strokeWidth={6} />
      <rect x={-9} y={-19} width={18} height={29} rx={9} fill={C.teal} />
      <path d="M -17 5 Q 0 25 17 5 M 0 22 L 0 31" fill="none" stroke={C.teal} strokeWidth={5} strokeLinecap="round" />
      <circle r={49 + Math.sin(t * 1.2) * 3} fill="none" stroke={C.teal} strokeWidth={3} opacity={0.22} />
    </g>}
  </g>
);

const Chip: React.FC<{ x: number; y: number; scale?: number; opacity?: number; label?: string }> = ({ x, y, scale = 1, opacity = 1, label = 'DSP' }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    {Array.from({ length: 6 }, (_, index) => {
      const px = -110 + index * 44;
      return <g key={index} stroke={C.muted} strokeWidth={7} strokeLinecap="round"><line x1={px} y1={-94} x2={px} y2={-72} /><line x1={px} y1={72} x2={px} y2={94} /></g>;
    })}
    <rect x={-145} y={-75} width={290} height={150} rx={25} fill={C.ink} />
    <rect x={-125} y={-55} width={250} height={110} rx={17} fill="none" stroke={C.indigo} strokeWidth={3} strokeOpacity={0.7} />
    <text x={0} y={17} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={49} letterSpacing={5}>{label}</text>
  </g>
);

const Driver: React.FC<{ x: number; y: number; scale?: number; color?: string; opacity?: number }> = ({ x, y, scale = 1, color = C.indigo, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <rect x={-82} y={-108} width={110} height={216} rx={25} fill={C.ink} />
    <path d="M 15 -64 L 92 -112 L 92 112 L 15 64 Z" fill={color} opacity={0.9} />
    <circle cx={-28} cy={0} r={22} fill={C.paper} opacity={0.85} />
  </g>
);

const highlightWords = new Set(['sound', 'anti-noise', 'flipped', 'peak', 'trough', 'cancel', 'destructive interference', 'silence', 'reverse']);
const CaptionText: React.FC<{ text: string }> = ({ text }) => (
  <>{text.split(/(anti-noise|destructive interference|flipped|peak|trough|cancel|silence|reverse|sound)/gi).map((part, index) => (
    <span key={index} style={{ color: highlightWords.has(part.toLowerCase()) ? C.mint : C.paper }}>{part}</span>
  ))}</>
);

const CalmCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const activeIndex = VO.findIndex((item, index) => {
    const nextStart = VO[index + 1]?.start ?? Number.POSITIVE_INFINITY;
    return t >= item.start && t < Math.min(item.end + 0.24, nextStart);
  });
  if (activeIndex < 0) return null;
  const active = VO[activeIndex];
  const nextStart = VO[activeIndex + 1]?.start ?? Number.POSITIVE_INFINITY;
  const visibleEnd = Math.min(active.end + 0.24, nextStart);
  const enter = prog(t, active.start, active.start + 0.22);
  const exit = 1 - prog(t, visibleEnd - 0.16, visibleEnd);
  return (
    <div style={{ position: 'absolute', left: 62, right: 62, top: 1415, display: 'flex', justifyContent: 'center', opacity: enter * exit }}>
      <div style={{
        maxWidth: 930, border: '1px solid rgba(120,205,189,0.24)', borderRadius: 25,
        background: 'rgba(16,24,39,0.96)', padding: '27px 32px 30px',
        boxShadow: '0 18px 60px rgba(24,34,53,0.20)',
      }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 41, lineHeight: 1.3, letterSpacing: 0.1, textAlign: 'center' }}>
          <CaptionText text={active.text} />
        </div>
      </div>
    </div>
  );
};

const Sound: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const narrationEnd = line('closing-reverse').end;
  const endFade = 1 - prog(t, 57.4, 60);
  const release = prog(t, narrationEnd + 1.6, narrationEnd + 4.0);
  return (
    <>
      <Audio src={staticFile('voiceovers/noise-cancelling/narration.wav')} volume={0.94} />
      <Audio src={staticFile('library/music/clips/ambient-pad.mp3')} volume={() => {
        const speaking = prog(t, 0.2, 1.2) * (1 - prog(t, narrationEnd - 0.2, narrationEnd + 0.8));
        return (0.25 - speaking * 0.14 + release * 0.025) * endFade;
      }} />
      {SFX_CUES.map((cue, index) => (
        <Sequence key={index} from={F(cue.at)}>
          <Audio src={staticFile(`library/sfx/clips/${cue.id}.mp3`)} volume={cue.gain * endFade} />
        </Sequence>
      ))}
    </>
  );
};

const Short15NoiseCancelling: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const addSound = prog(t, line('hook-add').start - 0.1, line('hook-add').start + 0.55);
  const copyMade = prog(t, line('listen-copy').start - 0.1, line('listen-copy').start + 0.6);
  const flipped = prog(t, line('invert-flip').start - 0.1, line('invert-flip').start + 0.7);
  const playAnti = prog(t, line('invert-play').start - 0.1, line('invert-play').start + 0.6);
  const meet = prog(t, line('cancel-meet').start - 0.1, line('cancel-meet').start + 0.85);
  const nameInterference = prog(t, line('cancel-name').start - 0.1, line('cancel-name').start + 0.45);
  const sudden = prog(t, line('limits-sudden').start - 0.1, line('limits-sudden').start + 0.55);
  const finalRevealStart = line('closing-reverse').end + 0.6;
  const finalReveal = prog(t, finalRevealStart, finalRevealStart + 1.0);
  const closingExit = 1 - prog(t, finalRevealStart - 0.7, finalRevealStart);

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: FONT_BODY }}>
      <Scene t={t} id="hook">
        <Background t={t} />
        <Header />
        <TitleBlock eyebrow="Everyday tech, explained" lines={['Silence,', 'made with sound.']} accentIndex={1} subtitle="Noise cancellation is an active process." size={78} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <NoiseWaves x={115} y={895} scale={1.05} phase={t * 0.5} opacity={0.9 - addSound * 0.35} />
          <Headphones x={585} y={865} scale={1.05} t={t} active={addSound > 0.2} />
          <g opacity={addSound} transform="translate(850 965) rotate(180)">
            <NoiseWaves x={0} y={0} scale={0.55} color={C.teal} phase={t * 0.5} />
          </g>
        </svg>
        <Pill text={addSound > 0.5 ? 'BLOCK SOME  +  CANCEL SOME' : 'NOT JUST THICKER EARCUPS'} y={1265} color={addSound > 0.5 ? C.teal : C.indigo} />
      </Scene>

      <Scene t={t} id="waves">
        <Background t={t} />
        <Header />
        <TitleBlock eyebrow="Start with the sound" lines={['Sound is', 'pressure']} accentIndex={1} subtitle="A wave has alternating peaks and troughs." />
        <div style={{ position: 'absolute', left: 72, right: 72, top: 515, height: 665, borderRadius: 38, background: 'rgba(255,254,249,0.91)', border: `1px solid ${C.line}`, boxShadow: '0 22px 70px rgba(24,34,53,0.09)' }} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <Driver x={180} y={825} scale={0.67} color={C.coral} />
          <line x1={290} y1={825} x2={940} y2={825} stroke={C.muted} strokeWidth={2} strokeDasharray="8 13" opacity={0.38} />
          <path d={wavePath(295, 825, 640, 135, 2.5, t * 0.55)} fill="none" stroke={C.coral} strokeWidth={10} strokeLinecap="round" />
          <g fontFamily={FONT_MONO} fontSize={23} fontWeight={700} letterSpacing={2}>
            <text x={515} y={625} fill={C.indigo}>PEAK · COMPRESSION</text>
            <text x={575} y={1045} fill={C.teal}>TROUGH · RAREFACTION</text>
          </g>
          <line x1={555} y1={650} x2={555} y2={700} stroke={C.indigo} strokeWidth={3} />
          <line x1={760} y1={925} x2={760} y2={1015} stroke={C.teal} strokeWidth={3} />
          {Array.from({ length: 30 }, (_, index) => {
            const x = 300 + index * 21.5;
            const density = Math.sin(index / 29 * Math.PI * 5 + t * 0.55);
            return <circle key={index} cx={x} cy={1115 + density * 12} r={5.5} fill={C.indigo} opacity={0.16 + Math.abs(density) * 0.18} />;
          })}
        </svg>
        <Pill text="AIR PRESSURE, MOVING IN WAVES" y={1235} />
      </Scene>

      <Scene t={t} id="listen">
        <Background t={t} />
        <Header />
        <TitleBlock eyebrow="Active noise control" lines={['First,', 'listen.']} accentIndex={1} subtitle="The headphones need a copy of the noise." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <g transform="translate(115 675)">
            <rect x={-45} y={-65} width={210} height={130} rx={25} fill={C.paper} stroke={C.line} strokeWidth={3} />
            <text x={60} y={-12} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20} letterSpacing={2}>ENGINE</text>
            <text x={60} y={28} textAnchor="middle" fill={C.coral} fontFamily={FONT_DISPLAY} fontWeight={700} fontSize={31}>HUM</text>
          </g>
          <NoiseWaves x={280} y={710} scale={0.52} phase={t * 0.45} />
          <Headphones x={580} y={785} scale={0.82} t={t} mic />
          <path d="M 800 875 Q 820 1040 660 1110" fill="none" stroke={C.teal} strokeWidth={5} strokeDasharray="10 14" opacity={0.25 + copyMade * 0.6} />
          <Chip x={540} y={1160} scale={0.72} opacity={0.2 + copyMade * 0.8} />
        </svg>
        <Pill text={copyMade > 0.5 ? 'MICROPHONE  →  DIGITAL COPY' : 'A TINY MICROPHONE LISTENS OUTSIDE'} y={1300} color={C.teal} />
      </Scene>

      <Scene t={t} id="invert">
        <Background t={t} />
        <Header />
        <TitleBlock eyebrow="Digital signal processing" lines={['Make the', 'opposite.']} accentIndex={1} />
        <div style={{ position: 'absolute', left: 74, right: 74, top: 475, height: 350, borderRadius: 34, background: 'rgba(255,254,249,0.92)', border: `1px solid ${C.line}` }} />
        <div style={{ position: 'absolute', left: 74, right: 74, top: 865, height: 350, borderRadius: 34, background: 'rgba(255,254,249,0.92)', border: `1px solid ${C.line}`, opacity: 0.35 + flipped * 0.65 }} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <text x={125} y={545} fill={C.coral} fontFamily={FONT_MONO} fontWeight={700} fontSize={23} letterSpacing={2}>ORIGINAL NOISE</text>
          <line x1={125} y1={665} x2={955} y2={665} stroke={C.muted} strokeOpacity={0.25} strokeDasharray="7 12" />
          <path d={wavePath(135, 665, 810, 95, 2.4, t * 0.45)} fill="none" stroke={C.coral} strokeWidth={9} strokeLinecap="round" />
          <g opacity={flipped}>
            <text x={125} y={935} fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={23} letterSpacing={2}>ANTI-NOISE · FLIPPED</text>
            <line x1={125} y1={1055} x2={955} y2={1055} stroke={C.muted} strokeOpacity={0.25} strokeDasharray="7 12" />
            <path d={wavePath(135, 1055, 810, -95 * flipped, 2.4, t * 0.45)} fill="none" stroke={C.teal} strokeWidth={9} strokeLinecap="round" />
          </g>
          <g transform="translate(540 845)">
            <circle r={43} fill={C.ink} />
            <path d="M -12 -20 L -12 20 M -23 9 L -12 20 L -1 9 M 12 20 L 12 -20 M 1 -9 L 12 -20 L 23 -9" fill="none" stroke={C.paper} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g opacity={playAnti}><Driver x={910} y={1280} scale={0.43} color={C.teal} /></g>
        </svg>
        <Pill text={playAnti > 0.5 ? 'PLAY THE COPY AT THE RIGHT MOMENT' : 'EVERY PEAK BECOMES A TROUGH'} y={1270} color={C.teal} opacity={0.25 + flipped * 0.75} />
      </Scene>

      <Scene t={t} id="cancel">
        <Background t={t} dark />
        <Header dark />
        <TitleBlock dark eyebrow="When the waves meet" lines={['Opposites', 'cancel.']} accentIndex={1} subtitle="The pressures push in opposite directions." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <rect x={75} y={500} width={930} height={530} rx={38} fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.13)" strokeWidth={2} />
          <line x1={140} y1={765} x2={940} y2={765} stroke="rgba(255,255,255,0.2)" strokeDasharray="8 13" />
          <path d={wavePath(145, 665 + meet * 100, 790, 95 * (1 - meet * 0.25), 2.35, t * 0.4)} fill="none" stroke={C.coral} strokeWidth={9} opacity={1 - meet * 0.45} />
          <path d={wavePath(145, 865 - meet * 100, 790, -95 * (1 - meet * 0.25), 2.35, t * 0.4)} fill="none" stroke={C.mint} strokeWidth={9} opacity={1 - meet * 0.45} />
          <g opacity={meet}>
            <rect x={170} y={1075} width={740} height={150} rx={30} fill="rgba(120,205,189,0.09)" stroke={C.mint} strokeOpacity={0.45} strokeWidth={3} />
            <text x={270} y={1170} fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={31}>RESULT</text>
            <line x1={420} y1={1150} x2={710} y2={1150} stroke={C.mint} strokeWidth={8} strokeLinecap="round" />
            <text x={820} y={1175} textAnchor="middle" fill={C.paper} fontFamily={FONT_DISPLAY} fontWeight={700} fontSize={62}>≈ 0</text>
          </g>
        </svg>
        <Pill dark text={nameInterference > 0.4 ? 'DESTRUCTIVE INTERFERENCE' : 'PEAK  +  TROUGH  =  CANCELLATION'} y={1290} opacity={0.4 + meet * 0.6} />
      </Scene>

      <Scene t={t} id="limits">
        <Background t={t} />
        <Header />
        <TitleBlock eyebrow="The useful limitation" lines={['Best with', 'steady noise.']} accentIndex={1} subtitle="Prediction is easier when a sound keeps repeating." size={69} />
        <div style={{ position: 'absolute', left: 66, right: 66, top: 535, display: 'flex', gap: 24 }}>
          <div style={{ flex: 1, height: 580, borderRadius: 34, background: C.paper, border: `1px solid ${C.teal}55`, padding: 26, boxShadow: '0 18px 54px rgba(24,34,53,0.08)' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 20, letterSpacing: 2, color: C.teal }}>STEADY · LOW</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 34, color: C.ink, marginTop: 14 }}>ENGINE HUM</div>
            <svg width="100%" height={220} viewBox="0 0 400 220"><path d={wavePath(15, 110, 370, 58, 2.2, t * 0.3)} fill="none" stroke={C.teal} strokeWidth={8} /></svg>
            <div style={{ fontFamily: FONT_MONO, fontSize: 22, color: C.teal, textAlign: 'center', marginTop: 28 }}>✓ EASIER TO CANCEL</div>
          </div>
          <div style={{ flex: 1, height: 580, borderRadius: 34, background: C.paper, border: `1px solid ${C.coral}66`, padding: 26, opacity: 0.18 + sudden * 0.82, boxShadow: '0 18px 54px rgba(24,34,53,0.08)' }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 20, letterSpacing: 2, color: C.coral }}>SUDDEN · SHARP</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 34, color: C.ink, marginTop: 14 }}>CLATTER</div>
            <svg width="100%" height={220} viewBox="0 0 400 220"><path d={wavePath(15, 110, 370, 70, 3.4, t * 0.3, 1.25)} fill="none" stroke={C.coral} strokeWidth={7} /></svg>
            <div style={{ fontFamily: FONT_MONO, fontSize: 20, color: C.coral, textAlign: 'center', marginTop: 28, lineHeight: 1.5 }}>HARDER TO<br />PREDICT</div>
          </div>
        </div>
        <Pill text="POWERFUL, NOT PERFECT" y={1215} color={C.coral} opacity={0.3 + sudden * 0.7} />
      </Scene>

      <Scene t={t} id="closing">
        <Background t={t} dark />
        <Header dark />
        <AbsoluteFill style={{ opacity: closingExit }}>
          <TitleBlock dark eyebrow="The whole idea" lines={['Quiet,', 'by design.']} accentIndex={1} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <NoiseWaves x={115} y={900} scale={0.85} phase={t * 0.35} opacity={0.45} />
            <Headphones x={570} y={845} scale={1.0} t={t} active dark />
          </svg>
          <Pill dark text="LISTEN  →  INVERT  →  CANCEL" y={1245} />
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: finalReveal, transform: `translateY(${(1 - finalReveal) * 18}px)` }}>
          <TitleBlock dark eyebrow="Now you know" lines={['Silence,', 'made with', 'sound.']} accentIndex={2} subtitle="A carefully timed copy, played in reverse." y={255} size={91} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            <Headphones x={540} y={1040} scale={0.8} t={t} active dark />
            <line x1={280} y1={1440} x2={800} y2={1440} stroke={C.mint} strokeWidth={7} strokeLinecap="round" opacity={0.7} />
            <circle cx={540} cy={1440} r={13} fill={C.mint} />
          </svg>
        </AbsoluteFill>
      </Scene>

      <CalmCaptions />
      <Sound />
    </AbsoluteFill>
  );
};

export default Short15NoiseCancelling;
