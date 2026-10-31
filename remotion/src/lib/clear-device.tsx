import React from 'react';
import { FONT_BODY, FONT_MONO } from '../fonts';
import { X } from './cinematic';

/** Large, steady labels with solid leaders; no decorative pulsing rings. */
export const ClearLabel: React.FC<{
  x: number; y: number; text: string; color?: string;
  anchor?: 'start' | 'middle' | 'end'; targetX?: number; targetY?: number;
  opacity?: number; size?: number;
}> = ({ x, y, text, color = X.white, anchor = 'middle', targetX, targetY, opacity = 1, size = 23 }) => (
  <g opacity={opacity}>
    {targetX !== undefined && targetY !== undefined && <>
      <path d={`M ${x} ${y + 12} L ${targetX} ${targetY}`} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" opacity={0.82} />
      <circle cx={targetX} cy={targetY} r={5} fill={color} />
    </>}
    <text
      x={x} y={y} textAnchor={anchor} fill={color} fontFamily={FONT_MONO}
      fontWeight={700} fontSize={size} letterSpacing={0.5}
      stroke={X.night} strokeWidth={7} paintOrder="stroke" strokeLinejoin="round"
    >{text}</text>
  </g>
);

export const PanelLabel: React.FC<{ text: string; color?: string; y?: number }> = ({ text, color = X.muted, y = 520 }) => (
  <text x={540} y={y} textAnchor="middle" fill={color} fontFamily={FONT_MONO} fontSize={22} fontWeight={700} letterSpacing={2.4}>{text}</text>
);

export const StageNote: React.FC<{ text: string; color?: string; y?: number; opacity?: number }> = ({
  text, color = X.cyan, y = 1285, opacity = 1,
}) => (
  <g opacity={opacity}>
    <rect x={145} y={y - 39} width={790} height={72} rx={22} fill="#091522" fillOpacity={0.94} stroke={color} strokeOpacity={0.55} strokeWidth={2} />
    <text x={540} y={y + 7} textAnchor="middle" fill={X.white} fontFamily={FONT_BODY} fontSize={text.length > 72 ? 21 : text.length > 62 ? 23 : text.length > 52 ? 25 : 27} fontWeight={600}>{text}</text>
  </g>
);

/** A steady solid outline identifies the active part without adding another motion system. */
export const HighlightPart: React.FC<{
  x: number; y: number; width: number; height: number; color: string;
  rx?: number; opacity?: number;
}> = ({ x, y, width, height, color, rx = 24, opacity = 1 }) => (
  <rect x={x} y={y} width={width} height={height} rx={rx} fill={color} fillOpacity={0.055 * opacity} stroke={color} strokeWidth={4} strokeOpacity={0.85 * opacity} pointerEvents="none" />
);

export const CubicDots: React.FC<{
  x1: number; y1: number; cx1: number; cy1: number; cx2: number; cy2: number; x2: number; y2: number;
  t: number; count?: number; color?: string; radius?: number; speed?: number; opacity?: number;
}> = ({ x1, y1, cx1, cy1, cx2, cy2, x2, y2, t, count = 5, color = X.cyan, radius = 9, speed = 0.22, opacity = 1 }) => (
  <g fill={color} opacity={opacity}>
    {Array.from({ length: count }, (_, i) => {
      const p = (t * speed + i / count) % 1;
      const q = 1 - p;
      const x = q ** 3 * x1 + 3 * q ** 2 * p * cx1 + 3 * q * p ** 2 * cx2 + p ** 3 * x2;
      const y = q ** 3 * y1 + 3 * q ** 2 * p * cy1 + 3 * q * p ** 2 * cy2 + p ** 3 * y2;
      return <circle key={i} cx={x} cy={y} r={radius} />;
    })}
  </g>
);
