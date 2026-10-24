import React from 'react';
import { C } from './next-calm';

export const FocusRing: React.FC<{
  x: number; y: number; rx: number; ry?: number; t: number; opacity?: number; color?: string;
}> = ({ x, y, rx, ry = rx, t, opacity = 1, color = C.mint }) => {
  const pulse = 1 + Math.sin(t * 4.2) * 0.025;
  return <g opacity={opacity} transform={`translate(${x} ${y}) scale(${pulse}) translate(${-x} ${-y})`} pointerEvents="none">
    <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={color} opacity={0.07} />
    <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth={5} strokeDasharray="14 10" strokeDashoffset={-t * 22} />
  </g>;
};

export const MovingDots: React.FC<{
  x1: number; y1: number; x2: number; y2: number; t: number; count?: number;
  color?: string; opacity?: number; radius?: number; speed?: number; reverse?: boolean;
}> = ({ x1, y1, x2, y2, t, count = 5, color = C.mint, opacity = 1, radius = 8, speed = 0.32, reverse = false }) => (
  <g opacity={opacity} fill={color} pointerEvents="none">
    {Array.from({ length: count }, (_, i) => {
      let p = (t * speed + i / count) % 1;
      if (reverse) p = 1 - p;
      return <circle key={i} cx={x1 + (x2 - x1) * p} cy={y1 + (y2 - y1) * p} r={radius * (0.75 + 0.25 * Math.sin(p * Math.PI))} />;
    })}
  </g>
);

export const FocusLabel: React.FC<{
  x: number; y: number; text: string; color?: string; opacity?: number; dark?: boolean;
}> = ({ x, y, text, color = C.teal, opacity = 1, dark = false }) => {
  const width = Math.max(300, Math.min(860, text.length * 12.5 + 64));
  const fontSize = text.length > 52 ? 18 : 20;
  return <g opacity={opacity} fontFamily="JetBrains Mono, monospace" textAnchor="middle">
    <rect x={x - width / 2} y={y - 34} width={width} height={58} rx={20} fill={dark ? 'rgba(16,24,39,0.92)' : C.paper} stroke={color} strokeWidth={3} />
    <text x={x} y={y + 5} fill={color} fontWeight={700} fontSize={fontSize}>{text}</text>
  </g>;
};

export const Arrow: React.FC<{
  x1: number; y1: number; x2: number; y2: number; color?: string; opacity?: number; width?: number;
}> = ({ x1, y1, x2, y2, color = C.teal, opacity = 1, width = 5 }) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const left = { x: x2 - 20 * Math.cos(angle - 0.55), y: y2 - 20 * Math.sin(angle - 0.55) };
  const right = { x: x2 - 20 * Math.cos(angle + 0.55), y: y2 - 20 * Math.sin(angle + 0.55) };
  return <g opacity={opacity} stroke={color} fill={color} strokeWidth={width} strokeLinecap="round">
    <line x1={x1} y1={y1} x2={x2} y2={y2} />
    <path d={`M ${x2} ${y2} L ${left.x} ${left.y} L ${right.x} ${right.y} Z`} stroke="none" />
  </g>;
};
