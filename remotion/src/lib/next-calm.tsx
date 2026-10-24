import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { prog } from './shorts';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../fonts';

export type NextLine = { id: string; scene: string; text: string; start: number; end: number };
export type NextScene = { id: string; title: string; start: number; end: number };
export type NextCue = { at: number; id: string; gain: number };

export const C = {
  bg: '#f6f6f1', paper: '#fffef9', ink: '#182235', muted: '#68758a',
  indigo: '#6366f1', violet: '#9b7cc4', teal: '#329f96', mint: '#78cdbd',
  coral: '#df7f96', amber: '#c89532', line: '#dfe3e7', pale: '#eceef2',
  red: '#e66767', green: '#55b987', blue: '#5b8cff', dark: '#101827',
};

export const F = (seconds: number) => Math.max(0, Math.round(seconds * 30));
export const line = (lines: NextLine[], id: string) => {
  const found = lines.find((item) => item.id === id);
  if (!found) throw new Error(`Missing narration segment: ${id}`);
  return found;
};
export const sceneTime = (scenes: NextScene[], id: string) => {
  const found = scenes.find((item) => item.id === id);
  if (!found) throw new Error(`Missing scene: ${id}`);
  return found;
};
export const reached = (t: number, lines: NextLine[], id: string) => t >= line(lines, id).start - 0.08;
export const spoken = (t: number, lines: NextLine[], id: string) => {
  const item = line(lines, id);
  return prog(t, item.start, item.end);
};
export const seeded = (seed: number) => {
  const value = Math.sin(seed * 91.731 + 17.17) * 43758.5453;
  return value - Math.floor(value);
};
export const wavePath = (x: number, y: number, width: number, amplitude: number, cycles: number, phase = 0) => (
  Array.from({ length: 101 }, (_, index) => {
    const p = index / 100;
    const envelope = Math.sin(Math.PI * Math.min(1, p * 1.06)) ** 0.35;
    const py = y - Math.sin(p * Math.PI * 2 * cycles + phase) * amplitude * envelope;
    return `${index === 0 ? 'M' : 'L'} ${(x + p * width).toFixed(2)} ${py.toFixed(2)}`;
  }).join(' ')
);

export const Background: React.FC<{ t: number; dark?: boolean; accent?: string }> = ({ t, dark = false, accent = C.indigo }) => (
  <AbsoluteFill style={{ background: dark ? C.dark : C.bg }}>
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `radial-gradient(${dark ? 'rgba(255,255,255,0.10)' : 'rgba(24,34,53,0.10)'} 1px, transparent 1px)`,
      backgroundSize: '38px 38px', opacity: 0.3,
    }} />
    <div style={{
      position: 'absolute', width: 760, height: 760, borderRadius: '50%', left: -280, top: 250,
      background: dark ? `${accent}2e` : `${accent}20`, filter: 'blur(95px)',
      transform: `translate(${Math.sin(t * 0.1) * 32}px, ${Math.cos(t * 0.09) * 26}px)`,
    }} />
    <div style={{
      position: 'absolute', width: 700, height: 700, borderRadius: '50%', right: -300, top: 820,
      background: dark ? 'rgba(50,159,150,0.14)' : 'rgba(50,159,150,0.12)', filter: 'blur(100px)',
      transform: `translate(${Math.cos(t * 0.08) * 30}px, ${Math.sin(t * 0.09) * 28}px)`,
    }} />
  </AbsoluteFill>
);

export const Header: React.FC<{ label: string; seconds: number; dark?: boolean }> = ({ label, seconds, dark = false }) => (
  <div style={{
    position: 'absolute', top: 48, left: 56, right: 56, display: 'flex', justifyContent: 'space-between',
    fontFamily: FONT_MONO, fontSize: 20, fontWeight: 500, letterSpacing: 3.1,
    color: dark ? 'rgba(255,255,255,0.58)' : C.muted,
  }}>
    <span>{label}</span><span>{seconds} SEC</span>
  </div>
);

export const TitleBlock: React.FC<{
  eyebrow: string; lines: string[]; accentIndex?: number; subtitle?: string; y?: number;
  size?: number; opacity?: number; dark?: boolean; accent?: string;
}> = ({ eyebrow, lines, accentIndex = -1, subtitle, y = 145, size = 72, opacity = 1, dark = false, accent = C.teal }) => (
  <div style={{ position: 'absolute', top: y, left: 54, right: 54, textAlign: 'center', opacity }}>
    <div style={{ fontFamily: FONT_MONO, fontWeight: 500, fontSize: 22, letterSpacing: 4, color: dark ? C.mint : C.indigo, textTransform: 'uppercase', marginBottom: 22 }}>{eyebrow}</div>
    {lines.map((text, index) => (
      <div key={text} style={{
        fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: size, lineHeight: 1.06,
        letterSpacing: -1.5, textTransform: 'uppercase',
        color: index === accentIndex ? (dark ? C.mint : accent) : (dark ? C.paper : C.ink),
      }}>{text}</div>
    ))}
    {subtitle && <div style={{ marginTop: 22, fontFamily: FONT_BODY, fontSize: 28, fontWeight: 500, lineHeight: 1.4, color: dark ? 'rgba(255,255,255,0.65)' : C.muted }}>{subtitle}</div>}
  </div>
);

export const Pill: React.FC<{
  text: string; y: number; color?: string; opacity?: number; size?: number; dark?: boolean;
}> = ({ text, y, color = C.indigo, opacity = 1, size = 22, dark = false }) => (
  <div style={{ position: 'absolute', top: y, left: 70, right: 70, display: 'flex', justifyContent: 'center', opacity }}>
    <div style={{
      fontFamily: FONT_MONO, fontSize: size, fontWeight: 500, letterSpacing: 2.1, textTransform: 'uppercase',
      color: dark ? C.mint : color, border: `1px solid ${dark ? 'rgba(120,205,189,0.35)' : `${color}55`}`,
      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,254,249,0.90)', borderRadius: 999,
      padding: '15px 25px', boxShadow: dark ? 'none' : '0 10px 34px rgba(24,34,53,0.07)', textAlign: 'center',
    }}>{text}</div>
  </div>
);

export const DemoPanel: React.FC<{ dark?: boolean; top?: number; height?: number }> = ({ dark = false, top = 500, height = 790 }) => (
  <div style={{
    position: 'absolute', left: 70, right: 70, top, height, borderRadius: 36,
    background: dark ? 'rgba(255,255,255,0.045)' : 'rgba(255,254,249,0.86)',
    border: `1px solid ${dark ? 'rgba(120,205,189,0.20)' : 'rgba(24,34,53,0.10)'}`,
    boxShadow: dark ? 'none' : '0 20px 70px rgba(24,34,53,0.07)',
  }} />
);

export const Callout: React.FC<{
  x: number; y: number; targetX: number; targetY: number; text: string;
  color?: string; anchor?: 'start' | 'middle' | 'end'; opacity?: number;
}> = ({ x, y, targetX, targetY, text, color = C.teal, anchor = 'middle', opacity = 1 }) => (
  <g opacity={opacity} fontFamily={FONT_MONO} fontSize={22} fontWeight={700} letterSpacing={1.2}>
    <path d={`M ${x} ${y + 12} L ${targetX} ${targetY}`} stroke={color} strokeWidth={3} strokeDasharray="7 8" />
    <circle cx={targetX} cy={targetY} r={6} fill={color} />
    <text x={x} y={y} fill={color} textAnchor={anchor}>{text}</text>
  </g>
);

export const Scene: React.FC<{ t: number; id: string; scenes: NextScene[]; children: React.ReactNode }> = ({ t, id, scenes, children }) => {
  const { start, end } = sceneTime(scenes, id);
  if (t < start || t > end + 0.32) return null;
  const enter = id === scenes[0].id ? 1 : prog(t, start, start + 0.65);
  const exit = id === scenes[scenes.length - 1].id ? 1 : 1 - prog(t, end - 0.28, end + 0.28);
  return <AbsoluteFill style={{ opacity: enter * exit, transform: `translateY(${(1 - enter) * 18}px)` }}>{children}</AbsoluteFill>;
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const CaptionText: React.FC<{ text: string; accentWords: string[] }> = ({ text, accentWords }) => {
  if (accentWords.length === 0) return <span style={{ color: C.paper }}>{text}</span>;
  const regex = new RegExp(`(${accentWords.map(escapeRegExp).join('|')})`, 'gi');
  const lookup = new Set(accentWords.map((word) => word.toLowerCase()));
  return <>{text.split(regex).map((part, index) => (
    <span key={index} style={{ color: lookup.has(part.toLowerCase()) ? C.mint : C.paper }}>{part}</span>
  ))}</>;
};

export const CalmCaptions: React.FC<{ lines: NextLine[]; accentWords?: string[] }> = ({ lines, accentWords = [] }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const activeIndex = lines.findIndex((item, index) => {
    const nextStart = lines[index + 1]?.start ?? Number.POSITIVE_INFINITY;
    return t >= item.start && t < Math.min(item.end + 0.24, nextStart);
  });
  if (activeIndex < 0) return null;
  const active = lines[activeIndex];
  const nextStart = lines[activeIndex + 1]?.start ?? Number.POSITIVE_INFINITY;
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
          <CaptionText text={active.text} accentWords={accentWords} />
        </div>
      </div>
    </div>
  );
};

export const CalmSound: React.FC<{
  narration: string; music: string; cues: NextCue[]; narrationEnd: number; duration: number;
}> = ({ narration, music, cues, narrationEnd, duration }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const endFade = 1 - prog(t, duration - 2.6, duration);
  const release = prog(t, narrationEnd + 1.3, narrationEnd + 3.4);
  return (
    <>
      <Audio src={staticFile(narration)} volume={0.94} />
      <Audio src={staticFile(`library/music/clips/${music}.mp3`)} volume={() => {
        const speaking = prog(t, 0.2, 1.2) * (1 - prog(t, narrationEnd - 0.2, narrationEnd + 0.8));
        return (0.20 - speaking * 0.13 + release * 0.02) * endFade;
      }} />
      {cues.map((cue, index) => (
        <Sequence key={index} from={F(cue.at)}>
          <Audio src={staticFile(`library/sfx/clips/${cue.id}.mp3`)} volume={cue.gain * endFade} />
        </Sequence>
      ))}
    </>
  );
};

export const PhoneFrame: React.FC<{
  x: number; y: number; scale?: number; dark?: boolean; children?: React.ReactNode;
}> = ({ x, y, scale = 1, dark = false, children }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-165} y={-310} width={330} height={620} rx={50} fill={dark ? '#e9edf5' : C.ink} />
    <rect x={-145} y={-288} width={290} height={576} rx={38} fill={dark ? '#263249' : '#e9edf2'} />
    <rect x={-45} y={-292} width={90} height={12} rx={6} fill={dark ? C.dark : '#455066'} />
    {children}
    <rect x={-45} y={260} width={90} height={7} rx={4} fill={dark ? '#8993a5' : '#7d8798'} opacity={0.65} />
  </g>
);

export const Chip: React.FC<{ x: number; y: number; scale?: number; opacity?: number; label?: string }> = ({ x, y, scale = 1, opacity = 1, label = 'DSP' }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    {Array.from({ length: 6 }, (_, index) => {
      const px = -110 + index * 44;
      return <g key={index} stroke={C.muted} strokeWidth={7} strokeLinecap="round"><line x1={px} y1={-94} x2={px} y2={-72} /><line x1={px} y1={72} x2={px} y2={94} /></g>;
    })}
    <rect x={-145} y={-75} width={290} height={150} rx={25} fill={C.ink} />
    <rect x={-125} y={-55} width={250} height={110} rx={17} fill="none" stroke={C.indigo} strokeWidth={3} strokeOpacity={0.7} />
    <text x={0} y={17} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={45} letterSpacing={4}>{label}</text>
  </g>
);
