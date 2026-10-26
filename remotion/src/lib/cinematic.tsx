import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../fonts';

export const X = {
  night: '#07101d', panel: '#0d1929', panel2: '#122238', white: '#f4f8ff',
  muted: '#8b9bb3', cyan: '#64e6df', blue: '#65a7ff', violet: '#a78bfa',
  amber: '#ffc968', coral: '#ff839b', green: '#79e2a6', steel: '#b8c6d9',
};

export const CinematicBackground: React.FC<{ t: number; accent?: string; secondary?: string }> = ({
  t, accent = X.blue, secondary = X.cyan,
}) => (
  <AbsoluteFill style={{ background: `linear-gradient(155deg, ${X.night} 0%, #0a1626 54%, #07101d 100%)` }}>
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.18,
      backgroundImage: 'linear-gradient(rgba(139,155,179,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(139,155,179,0.13) 1px, transparent 1px)',
      backgroundSize: '54px 54px', maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
    }} />
    <div style={{
      position: 'absolute', width: 850, height: 850, borderRadius: '50%', left: -390, top: 180,
      background: accent, opacity: 0.12, filter: 'blur(125px)',
      transform: `translate(${Math.sin(t * 0.11) * 30}px, ${Math.cos(t * 0.09) * 24}px)`,
    }} />
    <div style={{
      position: 'absolute', width: 760, height: 760, borderRadius: '50%', right: -360, top: 890,
      background: secondary, opacity: 0.09, filter: 'blur(120px)',
      transform: `translate(${Math.cos(t * 0.08) * 28}px, ${Math.sin(t * 0.1) * 24}px)`,
    }} />
    <div style={{
      position: 'absolute', left: 60, right: 60, top: 34, height: 2,
      background: `linear-gradient(90deg, transparent, ${accent}99, transparent)`, opacity: 0.65,
    }} />
  </AbsoluteFill>
);

export const SceneHeading: React.FC<{
  eyebrow: string; lines: string[]; accentIndex?: number; accent?: string; y?: number; size?: number;
}> = ({ eyebrow, lines, accentIndex = 1, accent = X.cyan, y = 76, size = 62 }) => (
  <div style={{ position: 'absolute', top: y, left: 50, right: 50, textAlign: 'center' }}>
    <div style={{
      fontFamily: FONT_MONO, fontSize: 20, fontWeight: 600, letterSpacing: 4.2,
      textTransform: 'uppercase', color: accent, marginBottom: 20,
    }}>{eyebrow}</div>
    {lines.map((text, index) => (
      <div key={text} style={{
        fontFamily: FONT_DISPLAY, fontSize: size, fontWeight: 700, lineHeight: 1.04,
        letterSpacing: -1.25, textTransform: 'uppercase', color: index === accentIndex ? accent : X.white,
        textShadow: index === accentIndex ? `0 0 32px ${accent}24` : 'none',
      }}>{text}</div>
    ))}
  </div>
);

export const DeviceStage: React.FC<{ top?: number; height?: number; accent?: string }> = ({
  top = 430, height = 920, accent = X.blue,
}) => (
  <div style={{
    position: 'absolute', left: 46, right: 46, top, height, borderRadius: 42,
    background: 'linear-gradient(145deg, rgba(20,37,60,0.93), rgba(8,18,31,0.96))',
    border: '1px solid rgba(184,198,217,0.16)',
    boxShadow: `0 32px 100px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 90px ${accent}08`,
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', left: 34, right: 34, top: 26, height: 1,
      background: `linear-gradient(90deg, transparent, ${accent}70, transparent)`,
    }} />
    <div style={{
      position: 'absolute', width: 420, height: 420, borderRadius: '50%', right: -180, bottom: -200,
      background: accent, opacity: 0.07, filter: 'blur(65px)',
    }} />
  </div>
);

export const SvgStage: React.FC<{ children: React.ReactNode; fontFamily?: string }> = ({ children, fontFamily = FONT_MONO }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }} fontFamily={fontFamily}>{children}</svg>
);

export const Glow: React.FC<{ x: number; y: number; r: number; color: string; opacity?: number }> = ({
  x, y, r, color, opacity = 1,
}) => (
  <g opacity={opacity} pointerEvents="none">
    <circle cx={x} cy={y} r={r * 2.1} fill={color} opacity={0.035} />
    <circle cx={x} cy={y} r={r * 1.55} fill={color} opacity={0.055} />
    <circle cx={x} cy={y} r={r} fill={color} opacity={0.11} />
  </g>
);

export const Leader: React.FC<{
  x: number; y: number; tx: number; ty: number; text: string; color?: string; anchor?: 'start' | 'middle' | 'end'; opacity?: number;
}> = ({ x, y, tx, ty, text, color = X.cyan, anchor = 'middle', opacity = 1 }) => (
  <g opacity={opacity} fontFamily={FONT_MONO} fontSize={20} fontWeight={700} letterSpacing={1.1}>
    <path d={`M ${x} ${y + 13} L ${tx} ${ty}`} stroke={color} strokeWidth={2.5} strokeDasharray="5 7" opacity={0.75} />
    <circle cx={tx} cy={ty} r={5} fill={color} />
    <text x={x} y={y} textAnchor={anchor} fill={color}>{text}</text>
  </g>
);

export const FlowPath: React.FC<{
  d: string; t: number; color?: string; width?: number; opacity?: number; speed?: number; dash?: string;
}> = ({ d, t, color = X.cyan, width = 7, opacity = 1, speed = 80, dash = '4 24' }) => (
  <g opacity={opacity} fill="none" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
    <path d={d} stroke={color} strokeWidth={width} opacity={0.16} />
    <path d={d} stroke={color} strokeWidth={width} strokeDasharray={dash} strokeDashoffset={-t * speed} />
  </g>
);

export const QuadraticPulse: React.FC<{
  x1: number; y1: number; cx: number; cy: number; x2: number; y2: number;
  t: number; count?: number; color?: string; radius?: number; opacity?: number; speed?: number; reverse?: boolean;
}> = ({ x1, y1, cx, cy, x2, y2, t, count = 5, color = X.cyan, radius = 10, opacity = 1, speed = 0.28, reverse = false }) => (
  <g opacity={opacity} fill={color} pointerEvents="none">
    {Array.from({ length: count }, (_, i) => {
      let p = (t * speed + i / count) % 1;
      if (reverse) p = 1 - p;
      const q = 1 - p;
      const x = q * q * x1 + 2 * q * p * cx + p * p * x2;
      const y = q * q * y1 + 2 * q * p * cy + p * p * y2;
      return <g key={i}>
        <circle cx={x} cy={y} r={radius * 2.2} opacity={0.09} />
        <circle cx={x} cy={y} r={radius} opacity={0.95} />
        <circle cx={x - radius * 0.25} cy={y - radius * 0.25} r={radius * 0.3} fill={X.white} opacity={0.75} />
      </g>;
    })}
  </g>
);

export const CircularFlow: React.FC<{
  cx: number; cy: number; r: number; t: number; count?: number; color?: string; opacity?: number; speed?: number; reverse?: boolean;
}> = ({ cx, cy, r, t, count = 7, color = X.cyan, opacity = 1, speed = 0.18, reverse = false }) => (
  <g opacity={opacity} fill={color} pointerEvents="none">
    {Array.from({ length: count }, (_, i) => {
      let p = (t * speed + i / count) % 1;
      if (reverse) p = 1 - p;
      const a = p * Math.PI * 2 - Math.PI / 2;
      return <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r={8 + Math.sin(p * Math.PI) * 3} />;
    })}
  </g>
);

export const StatusPill: React.FC<{
  x: number; y: number; text: string; color?: string; opacity?: number; width?: number;
}> = ({ x, y, text, color = X.cyan, opacity = 1, width }) => {
  const w = width ?? Math.max(280, Math.min(820, text.length * 12.2 + 64));
  return <g opacity={opacity} fontFamily={FONT_MONO} textAnchor="middle">
    <rect x={x - w / 2} y={y - 36} width={w} height={60} rx={22} fill="rgba(7,16,29,0.90)" stroke={color} strokeWidth={2.5} />
    <text x={x} y={y + 4} fill={color} fontSize={text.length > 46 ? 18 : 20} fontWeight={700} letterSpacing={0.7}>{text}</text>
  </g>;
};

export const Gear: React.FC<{
  x: number; y: number; r: number; teeth?: number; rotation?: number; color?: string; opacity?: number; spokes?: number;
}> = ({ x, y, r, teeth = 16, rotation = 0, color = X.amber, opacity = 1, spokes = 6 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation})`} opacity={opacity}>
    {Array.from({ length: teeth }, (_, i) => (
      <rect key={i} x={-r * 0.095} y={-r * 1.14} width={r * 0.19} height={r * 0.28} rx={r * 0.035} fill={color} transform={`rotate(${i * 360 / teeth})`} />
    ))}
    <circle r={r} fill="rgba(7,16,29,0.88)" stroke={color} strokeWidth={Math.max(5, r * 0.07)} />
    <circle r={r * 0.72} fill="none" stroke={color} strokeWidth={Math.max(3, r * 0.035)} opacity={0.6} />
    {Array.from({ length: spokes }, (_, i) => (
      <path key={i} d={`M 0 0 L 0 ${-r * 0.72}`} stroke={color} strokeWidth={Math.max(5, r * 0.075)} strokeLinecap="round" transform={`rotate(${i * 360 / spokes})`} opacity={0.85} />
    ))}
    <circle r={r * 0.17} fill={color} />
    <circle r={r * 0.07} fill={X.night} />
  </g>
);

export const TinyLabel: React.FC<{ x: number; y: number; text: string; color?: string; anchor?: 'start' | 'middle' | 'end'; opacity?: number }> = ({
  x, y, text, color = X.muted, anchor = 'middle', opacity = 1,
}) => <text x={x} y={y} textAnchor={anchor} fill={color} opacity={opacity} fontFamily={FONT_MONO} fontWeight={700} fontSize={19} letterSpacing={1.1}>{text}</text>;

export const BodyText: React.FC<{ x: number; y: number; text: string; color?: string; anchor?: 'start' | 'middle' | 'end'; size?: number }> = ({
  x, y, text, color = X.white, anchor = 'middle', size = 25,
}) => <text x={x} y={y} textAnchor={anchor} fill={color} fontFamily={FONT_BODY} fontWeight={600} fontSize={size}>{text}</text>;
