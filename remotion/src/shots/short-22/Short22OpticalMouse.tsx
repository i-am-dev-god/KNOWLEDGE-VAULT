import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, Chip, DemoPanel, Header, Scene, TitleBlock, line, reached, seeded } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short22OpticalMouse', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;
const DOTS = Array.from({ length: 32 }, (_, i) => ({
  x: -245 + seeded(i + 2) * 490,
  y: -135 + seeded(i + 51) * 270,
  r: 4 + seeded(i + 91) * 7,
  color: i % 7 === 0 ? C.coral : i % 3 === 0 ? C.teal : C.indigo,
}));

const TextureFrame: React.FC<{
  id: string; x: number; y: number; shift?: number; opacity?: number; label?: string; blank?: boolean;
}> = ({ id, x, y, shift = 0, opacity = 1, label, blank = false }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <defs><clipPath id={`texture-${id}`}><rect x={-165} y={-165} width={330} height={330} rx={24} /></clipPath></defs>
    <rect x={-165} y={-165} width={330} height={330} rx={24} fill={blank ? '#edf0f4' : C.paper} stroke={blank ? C.muted : C.ink} strokeWidth={4} />
    <g clipPath={`url(#texture-${id})`}>
      <g transform={`translate(${shift} 0)`}>
        {!blank && DOTS.map((dot, i) => <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill={dot.color} opacity={0.8} />)}
      </g>
      {blank && <path d="M -220 80 L 40 -180 L 120 -180 L -140 80 Z" fill={C.paper} opacity={0.75} />}
    </g>
    {label && <text x={0} y={215} textAnchor="middle" fill={blank ? C.coral : C.muted} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>{label}</text>}
  </g>
);

const MouseTop: React.FC<{ x: number; y: number; opacity?: number }> = ({ x, y, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <rect x={-90} y={-135} width={180} height={270} rx={85} fill={C.paper} stroke={C.ink} strokeWidth={6} />
    <path d="M 0 -132 L 0 -20" stroke={C.line} strokeWidth={4} />
    <rect x={-10} y={-88} width={20} height={58} rx={10} fill={C.indigo} />
    <text x={0} y={175} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20}>OPTICAL MOUSE</text>
  </g>
);

const Cursor: React.FC<{ x: number; y: number; opacity?: number; color?: string }> = ({ x, y, opacity = 1, color = C.ink }) => (
  <path d={`M ${x} ${y} L ${x + 10} ${y + 105} L ${x + 38} ${y + 75} L ${x + 68} ${y + 118} L ${x + 91} ${y + 102} L ${x + 62} ${y + 62} L ${x + 103} ${y + 55} Z`} fill={color} stroke={C.paper} strokeWidth={3} opacity={opacity} />
);

const Short22OpticalMouse: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const move = prog(t, line(VO, 'hook-move').start, line(VO, 'hook-move').start + 1.0);
  const cursor = prog(t, line(VO, 'hook-cursor').start - 0.1, line(VO, 'hook-cursor').start + 0.8);
  const led = prog(t, line(VO, 'sensor-led').start - 0.1, line(VO, 'sensor-led').start + 0.5);
  const camera = prog(t, line(VO, 'sensor-camera').start - 0.1, line(VO, 'sensor-camera').start + 0.5);
  const shift = prog(t, line(VO, 'compare-shift').start - 0.1, line(VO, 'compare-shift').start + 0.9);
  const measure = prog(t, line(VO, 'compare-measure').start - 0.1, line(VO, 'compare-measure').start + 0.6);
  const direction = prog(t, line(VO, 'motion-direction').start - 0.1, line(VO, 'motion-direction').start + 1.0);
  const cursorMotion = prog(t, line(VO, 'motion-cursor').start - 0.1, line(VO, 'motion-cursor').start + 0.8);
  const glossy = prog(t, line(VO, 'surface-gloss').start - 0.1, line(VO, 'surface-gloss').start + 0.6);
  const failed = prog(t, line(VO, 'surface-fail').start - 0.1, line(VO, 'surface-fail').start + 0.4);
  const frameNumber = 1 + Math.floor(Math.max(0, t - line(VO, 'sensor-camera').start) * 3) % 3;

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · INPUT" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="A movement you can see" lines={['Mouse moves.', 'Cursor follows.']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <MouseTop x={300 + move * 65} y={850} />
        <g transform="translate(650 680)">
          <rect width={300} height={390} rx={28} fill="#e8edf5" stroke={C.ink} strokeWidth={5} />
          <path d="M 55 300 L 225 175" stroke={C.teal} strokeWidth={5} strokeDasharray="8 9" opacity={cursor} />
          <Cursor x={45 + cursor * 145} y={245 - cursor * 115} opacity={0.25 + cursor * 0.75} color={C.teal} />
        </g>
        <text x={540} y={1200} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={24} opacity={cursor}>PHYSICAL MOVEMENT → CURSOR MOVEMENT</text>
      </svg>
    </Scene>

    <Scene t={t} id="sensor" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · INPUT" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Look underneath" lines={['Light. Snapshots.', 'Texture.']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <path d="M 350 650 Q 540 565 730 650 L 690 940 Q 540 1010 390 940 Z" fill={C.paper} stroke={C.ink} strokeWidth={6} />
        <circle cx={455} cy={855} r={37} fill={C.coral} opacity={0.25 + led * 0.75} />
        <rect x={590} y={815} width={90} height={80} rx={18} fill={C.ink} stroke={C.indigo} strokeWidth={5} opacity={0.3 + camera * 0.7} />
        <circle cx={635} cy={855} r={23} fill={C.indigo} opacity={0.35 + camera * 0.65} />
        <path d="M 455 890 L 335 1080 L 575 1080 Z" fill={C.coral} opacity={led * 0.18} />
        <path d="M 635 895 L 570 1080 L 700 1080 Z" fill={C.indigo} opacity={camera * 0.15} />
        <rect x={235} y={1080} width={610} height={75} rx={18} fill="#d7dde7" />
        {DOTS.slice(0, 18).map((dot, i) => <circle key={i} cx={290 + (i % 9) * 60} cy={1100 + Math.floor(i / 9) * 32} r={5 + (i % 3)} fill={dot.color} />)}
        <Callout x={250} y={700} targetX={455} targetY={855} text="LED" color={C.coral} opacity={led} />
        <Callout x={815} y={700} targetX={635} targetY={855} text="TINY CAMERA" color={C.indigo} opacity={camera} />
        <g transform="translate(835 930) scale(0.36)" opacity={camera}><TextureFrame id="sensor-live" x={0} y={0} shift={-frameNumber * 12} /></g>
        <text x={835} y={1035} textAnchor="middle" fill={C.indigo} fontFamily={FONT_MONO} fontWeight={700} fontSize={21} opacity={camera}>FRAME 0{frameNumber}</text>
        <text x={540} y={1230} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={22}>RAPID IMAGES OF THE SAME SURFACE</text>
      </svg>
    </Scene>

    <Scene t={t} id="compare" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · INPUT" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Compare, do not guess" lines={['Same dots.', 'New positions.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <TextureFrame id="frame-a" x={315} y={790} label="SNAPSHOT A" />
        <TextureFrame id="frame-b" x={765} y={790} shift={-65 * shift} label="SNAPSHOT B" />
        <g opacity={measure}>
          <path d="M 225 1140 L 405 1140 M 675 1140 L 855 1140" stroke={C.mint} strokeWidth={5} strokeDasharray="8 8" />
          <Chip x={540} y={1140} scale={0.48} label="DSP" />
          <path d="M 695 1040 L 625 1040 L 647 1018 M 625 1040 L 647 1062" stroke={C.mint} strokeWidth={7} fill="none" />
          <text x={700} y={1100} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>SHIFT = −65 px</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="motion" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · INPUT" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Account for the camera's viewpoint" lines={['Image left.', 'Mouse right.']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={1 - cursorMotion * 0.55}>
          <g transform="translate(310 770) scale(0.65)"><TextureFrame id="direction" x={0} y={0} shift={-110 * direction} /></g>
          <text x={310} y={1010} textAnchor="middle" fill={C.indigo} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>TEXTURE: ← LEFT</text>
          <MouseTop x={720 + direction * 65} y={790} />
          <text x={720} y={1010} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>MOUSE: RIGHT →</text>
          <path d="M 490 850 L 580 850" stroke={C.muted} strokeWidth={5} strokeDasharray="8 8" />
        </g>
        <g opacity={cursorMotion}>
          <rect x={295} y={1080} width={490} height={150} rx={28} fill="#e7edf5" stroke={C.teal} strokeWidth={3} />
          <path d="M 380 1190 L 680 1120" stroke={C.teal} strokeWidth={5} strokeDasharray="8 8" />
          <Cursor x={365 + cursorMotion * 265} y={1140 - cursorMotion * 55} color={C.teal} />
          <text x={540} y={1280} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>MEASURED SHIFT → CURSOR MOTION</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="surface" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · INPUT" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="The camera needs usable detail" lines={['When tracking', 'fails']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={1 - glossy * 0.75}><TextureFrame id="matte" x={300} y={820} label="TEXTURE: TRACK OK" /></g>
        <g opacity={0.2 + glossy * 0.8}><TextureFrame id="glossy" x={780} y={820} label="GLOSS: TOO LITTLE DETAIL" blank /></g>
        <g opacity={failed} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={500} y={1120} width={500} height={105} rx={25} fill={C.ink} stroke={C.coral} strokeWidth={3} />
          <text x={750} y={1185} fill={C.coral} fontWeight={700} fontSize={23}>NO RELIABLE SHIFT TO MEASURE</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · INPUT" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The complete measurement" lines={['Pictures become', 'direction']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g transform="translate(290 800) scale(0.62)"><TextureFrame id="closing-a" x={0} y={0} /></g>
        <g transform="translate(650 800) scale(0.62)"><TextureFrame id="closing-b" x={0} y={0} shift={-55} /></g>
        <path d="M 410 1040 L 540 1040 L 670 1040" stroke={C.mint} strokeWidth={6} strokeDasharray="9 9" />
        <text x={540} y={1140} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={27}>COMPARE → MEASURE SHIFT → MOVE CURSOR</text>
        <text x={540} y={1210} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={22}>CHANGING PICTURES, NOT A DIRECTION SENSOR</text>
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['LED', 'tiny camera', 'two snapshots', 'positions have shifted', 'measures that shift', 'moved right', 'glossy surface', 'changing pictures']} />
    <CalmSound narration="voiceovers/optical-mouse/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short22OpticalMouse;
