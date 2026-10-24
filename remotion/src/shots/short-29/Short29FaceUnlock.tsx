import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, DemoPanel, Header, PhoneFrame, Scene, TitleBlock, line } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short29FaceUnlock', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const Face: React.FC<{ id: string; x: number; y: number; scale?: number; dots?: number; depth?: number; opacity?: number }> = ({ id, x, y, scale = 1, dots = 0, depth = 0, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <defs>
      <clipPath id={`face-${id}`}><ellipse cx={0} cy={0} rx={135} ry={180} /></clipPath>
      <linearGradient id={`depth-${id}`} x1={0} y1={0} x2={1} y2={1}><stop offset={0} stopColor={C.blue} /><stop offset={0.55} stopColor={C.indigo} /><stop offset={1} stopColor={C.coral} /></linearGradient>
    </defs>
    <path d="M -190 265 Q -165 165 -70 150 L 70 150 Q 165 165 190 265 Z" fill={depth > 0.4 ? C.indigo : C.pale} stroke={C.ink} strokeWidth={5} opacity={0.9} />
    <ellipse cx={0} cy={0} rx={135} ry={180} fill={depth > 0.05 ? `url(#depth-${id})` : C.paper} stroke={C.ink} strokeWidth={6} />
    <g clipPath={`url(#face-${id})`} opacity={dots}>
      {Array.from({ length: 99 }, (_, i) => {
        const col = i % 9;
        const row = Math.floor(i / 9);
        return <circle key={i} cx={-120 + col * 30 + Math.sin(row * 1.3) * 5} cy={-155 + row * 30} r={4.5} fill={C.mint} />;
      })}
    </g>
    <g opacity={depth} clipPath={`url(#face-${id})`} fill="none" stroke={C.paper} strokeWidth={3}>
      {[-120, -75, -30, 15, 60, 105].map((yy, i) => <path key={yy} d={`M -140 ${yy} Q 0 ${yy + 35 + i * 3} 140 ${yy}`} opacity={0.35 + i * 0.07} />)}
    </g>
    <g fill="none" stroke={depth > 0.5 ? C.paper : C.ink} strokeWidth={6} strokeLinecap="round">
      <path d="M -75 -45 Q -50 -60 -28 -45 M 28 -45 Q 50 -60 75 -45" />
      <path d="M 0 -25 L -12 35 L 12 35" /><path d="M -45 85 Q 0 110 45 85" />
    </g>
  </g>
);

const NODES = [[-85, -90], [0, -120], [85, -90], [-55, -10], [55, -10], [0, 35], [-70, 95], [0, 130], [70, 95]] as const;
const EDGES = [[0, 1], [1, 2], [0, 3], [2, 4], [3, 5], [4, 5], [3, 6], [4, 8], [5, 7], [6, 7], [7, 8]] as const;
const TemplateGraph: React.FC<{ x: number; y: number; scale?: number; opacity?: number; align?: number; color?: string }> = ({ x, y, scale = 1, opacity = 1, align = 1, color = C.teal }) => (
  <g transform={`translate(${x + (1 - align) * 35} ${y - (1 - align) * 20}) scale(${scale}) rotate(${(1 - align) * 8})`} opacity={opacity} fontFamily={FONT_MONO}>
    {EDGES.map(([a, b], i) => <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} stroke={color} strokeWidth={4} opacity={0.55} />)}
    {NODES.map(([xx, yy], i) => <g key={i}><circle cx={xx} cy={yy} r={14} fill={C.paper} stroke={color} strokeWidth={5} /><text x={xx} y={yy + 5} textAnchor="middle" fill={C.ink} fontSize={11}>{i + 1}</text></g>)}
  </g>
);

const Lock: React.FC<{ x: number; y: number; open?: number }> = ({ x, y, open = 0 }) => (
  <g transform={`translate(${x} ${y})`} fontFamily={FONT_MONO}>
    <path d={open > 0.5 ? 'M -42 -25 L -42 -65 Q -42 -110 5 -110 Q 45 -110 45 -75' : 'M -42 -25 L -42 -65 Q -42 -110 0 -110 Q 42 -110 42 -65 L 42 -25'} fill="none" stroke={open > 0.5 ? C.teal : C.coral} strokeWidth={14} />
    <rect x={-75} y={-30} width={150} height={125} rx={25} fill={open > 0.5 ? C.teal : C.ink} />
    <text x={0} y={45} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={22}>{open > 0.5 ? 'OPEN' : 'LOCK'}</text>
  </g>
);

const Short29FaceUnlock: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const how = prog(t, line(VO, 'hook-how').start - 0.1, line(VO, 'hook-how').start + 0.6);
  const dots = prog(t, line(VO, 'illuminate-dots').start - 0.1, line(VO, 'illuminate-dots').start + 0.8);
  const camera = prog(t, line(VO, 'illuminate-camera').start - 0.1, line(VO, 'illuminate-camera').start + 0.6);
  const depth = prog(t, line(VO, 'depth-map').start - 0.1, line(VO, 'depth-map').start + 0.9);
  const build = prog(t, line(VO, 'template-build').start - 0.1, line(VO, 'template-build').start + 0.9);
  const compare = prog(t, line(VO, 'match-compare').start - 0.1, line(VO, 'match-compare').start + 1.0);
  const decision = prog(t, line(VO, 'match-decision').start - 0.1, line(VO, 'match-decision').start + 0.7);

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="A comparison, not a magic glance" lines={['Your face.', 'A stored template.']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <PhoneFrame x={360} y={875} scale={0.75}><Face id="hook-phone" x={0} y={-20} scale={0.55} /></PhoneFrame>
        <g opacity={how}>
          <TemplateGraph x={745} y={840} scale={0.9} />
          <text x={745} y={1090} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>ENROLLED REPRESENTATION</text>
          <path d="M 520 875 L 590 875" stroke={C.teal} strokeWidth={5} strokeDasharray="8 8" />
        </g>
        <Lock x={765} y={1170} open={0} />
      </svg>
    </Scene>

    <Scene t={t} id="illuminate" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · IDENTITY" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Measure shape with infrared" lines={['Dots reveal', 'surface shape']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g fontFamily={FONT_MONO}>
          <rect x={115} y={740} width={150} height={220} rx={28} fill={C.ink} stroke={C.mint} strokeWidth={4} />
          <circle cx={190} cy={805} r={25} fill={C.mint} opacity={0.3 + dots * 0.7} />
          <text x={190} y={1010} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={19}>IR PROJECTOR</text>
          <circle cx={190} cy={900} r={18} fill={C.blue} opacity={camera} />
          <text x={190} y={1060} textAnchor="middle" fill={C.blue} fontWeight={700} fontSize={19}>IR CAMERA</text>
        </g>
        <Face id="illuminate" x={690} y={845} scale={0.9} dots={dots} />
        <g opacity={dots} fill="none" stroke={C.mint} strokeWidth={4} strokeDasharray="6 9" strokeDashoffset={-t * 30}>
          <path d="M 245 805 L 490 700" /><path d="M 245 805 L 500 850" /><path d="M 245 805 L 490 990" />
        </g>
        <g opacity={camera} fill="none" stroke={C.blue} strokeWidth={4} strokeDasharray="6 9">
          <path d="M 510 960 Q 360 1040 230 910" />
        </g>
        <text x={540} y={1240} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={21} opacity={camera}>THE CAMERA READS THE DISTORTED PATTERN</text>
      </svg>
    </Scene>

    <Scene t={t} id="depth" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Distances become a new representation" lines={['Pattern becomes', 'depth map']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Face id="depth-source" x={285} y={850} scale={0.72} dots={1} opacity={1 - depth * 0.55} />
        <path d="M 465 850 L 590 850" stroke={C.teal} strokeWidth={6} strokeDasharray="8 8" opacity={depth} />
        <Face id="depth-result" x={795} y={850} scale={0.72} depth={depth} opacity={0.25 + depth * 0.75} />
        <text x={795} y={1180} textAnchor="middle" fill={C.indigo} fontFamily={FONT_MONO} fontWeight={700} fontSize={22} opacity={depth}>SHAPE + DISTANCE</text>
      </svg>
    </Scene>

    <Scene t={t} id="template" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · IDENTITY" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Convert geometry into features" lines={['Depth becomes', 'a template']} accentIndex={1} size={65} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Face id="template-source" x={285} y={850} scale={0.72} depth={1} opacity={1 - build * 0.55} />
        <path d="M 465 850 L 590 850" stroke={C.mint} strokeWidth={6} strokeDasharray="8 8" opacity={build} />
        <TemplateGraph x={775} y={850} scale={1.05} opacity={build} color={C.mint} />
        <text x={775} y={1140} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={21} opacity={build}>FEATURES + RELATIVE DISTANCES</text>
      </svg>
    </Scene>

    <Scene t={t} id="match" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Compare with enrollment" lines={['Align. Compare.', 'Then decide.']} accentIndex={2} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <TemplateGraph x={290} y={820} scale={0.75} color={C.indigo} />
        <TemplateGraph x={745} y={820} scale={0.75} align={compare} color={C.teal} />
        <text x={290} y={1040} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={20}>ENROLLED</text>
        <text x={745} y={1040} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={20}>NEW SAMPLE</text>
        <rect x={230} y={1100} width={500} height={35} rx={17} fill={C.pale} />
        <rect x={230} y={1100} width={500 * compare} height={35} rx={17} fill={C.teal} />
        <text x={480} y={1190} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={21}>TEMPLATE SIMILARITY</text>
        <g opacity={decision}>
          <Lock x={850} y={1150} open={decision} />
          <text x={790} y={1270} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={20}>LIVENESS ✓</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · IDENTITY" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="A representation, not a simple photo match" lines={['Shape. Template.', 'Secure decision.']} accentIndex={2} size={60} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['INFRARED PATTERN', C.mint], ['DEPTH + TEMPLATE', C.indigo], ['COMPARE + LIVENESS', C.coral], ['UNLOCK', C.teal]].map(([label, color], i) => <g key={label} transform={`translate(540 ${630 + i * 165})`}>
          <rect x={-300} y={-57} width={600} height={114} rx={25} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} />
          <text y={10} fill={color as string} fontWeight={700} fontSize={24}>{label}</text>
          {i < 3 && <path d="M 0 65 L 0 100" stroke={C.mint} strokeWidth={4} strokeDasharray="7 7" />}
        </g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['stored representation', 'infrared dots', 'infrared camera', 'depth map', 'mathematical face template', 'created during enrollment', 'liveness checks', 'secure representation']} />
    <CalmSound narration="voiceovers/face-unlock/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short29FaceUnlock;
