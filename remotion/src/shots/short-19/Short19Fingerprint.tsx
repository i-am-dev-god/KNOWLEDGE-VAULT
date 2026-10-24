import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, DemoPanel, Header, Scene, TitleBlock, line, spoken } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short19Fingerprint', durationInSeconds: 50, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

type RidgeFocus = 'none' | 'ending' | 'split' | 'both';
const RidgeCrop: React.FC<{ x: number; y: number; scale?: number; focus?: RidgeFocus; opacity?: number }> = ({ x, y, scale = 1, focus = 'none', opacity = 1 }) => {
  const ending = focus === 'ending' || focus === 'both';
  const split = focus === 'split' || focus === 'both';
  return <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <rect x={-25} y={-25} width={650} height={570} rx={35} fill={C.paper} stroke={C.line} strokeWidth={3} />
    <g fill="none" stroke={C.indigo} strokeWidth={17} strokeLinecap="round">
      <path d="M 35 475 C 85 350 120 210 190 45" opacity={focus === 'none' ? 0.55 : 0.13} />
      <path d="M 85 495 C 150 350 195 220 260 85" stroke={ending ? C.coral : C.indigo} opacity={focus === 'none' || ending ? 1 : 0.15} />
      <path d="M 175 500 C 225 380 265 265 315 150" opacity={focus === 'none' ? 0.55 : 0.13} />
      <g stroke={split ? C.teal : C.indigo} opacity={focus === 'none' || split ? 1 : 0.15}>
        <path d="M 355 500 C 365 390 390 300 420 215" />
        <path d="M 420 215 C 405 155 385 110 365 65" />
        <path d="M 420 215 C 460 160 490 115 515 60" />
      </g>
      <path d="M 475 505 C 520 390 550 270 565 150" opacity={focus === 'none' ? 0.55 : 0.13} />
    </g>
    {ending && <circle cx={260} cy={85} r={30} fill="none" stroke={C.coral} strokeWidth={7} />}
    {split && <circle cx={420} cy={215} r={30} fill="none" stroke={C.teal} strokeWidth={7} />}
  </g>;
};

const NODES = [[-120, -100], [0, -150], [120, -80], [-85, 25], [65, 25], [-20, 135]];
const EDGES = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 5], [4, 5], [3, 4]];
const TemplateGraph: React.FC<{
  x: number; y: number; scale?: number; color?: string; opacity?: number; shiftX?: number; shiftY?: number; card?: boolean;
}> = ({ x, y, scale = 1, color = C.teal, opacity = 1, shiftX = 0, shiftY = 0, card = true }) => (
  <g transform={`translate(${x + shiftX} ${y + shiftY}) scale(${scale})`} opacity={opacity}>
    {card && <><rect x={-190} y={-220} width={380} height={430} rx={30} fill={C.paper} stroke={C.line} strokeWidth={3} /><text x={0} y={-180} textAnchor="middle" fill={color} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>FEATURE TEMPLATE</text></>}
    <g stroke={color} strokeWidth={4} opacity={0.5}>{EDGES.map(([a, b], i) => <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />)}</g>
    {NODES.map(([nx, ny], i) => <g key={i}><circle cx={nx} cy={ny} r={14} fill={C.paper} stroke={color} strokeWidth={5} /><circle cx={nx} cy={ny} r={4} fill={color} /></g>)}
    {card && <text x={0} y={180} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={18}>TYPE + RELATIVE POSITION</text>}
  </g>
);

const Short19Fingerprint: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const ending = prog(t, line(VO, 'ridges-ending').start - 0.1, line(VO, 'ridges-ending').start + 0.4);
  const split = prog(t, line(VO, 'ridges-split').start - 0.1, line(VO, 'ridges-split').start + 0.4);
  const minutiae = prog(t, line(VO, 'ridges-minutiae').start - 0.1, line(VO, 'ridges-minutiae').start + 0.4);
  const scan = spoken(t, VO, 'sensor-map');
  const template = prog(t, line(VO, 'template-position').start - 0.1, line(VO, 'template-position').start + 0.7);
  const notPhoto = prog(t, line(VO, 'template-notphoto').start - 0.1, line(VO, 'template-notphoto').start + 0.5);
  const newScan = prog(t, line(VO, 'match-new').start - 0.1, line(VO, 'match-new').start + 0.6);
  const compare = prog(t, line(VO, 'match-compare').start - 0.1, line(VO, 'match-compare').start + 0.8);
  const result = prog(t, line(VO, 'match-result').start - 0.25, line(VO, 'match-result').start + 0.2);
  const ridgeFocus: RidgeFocus = minutiae > 0 ? 'both' : split > 0 ? 'split' : ending > 0 ? 'ending' : 'none';

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="ridges" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow="Magnify one small patch" lines={['Look at', 'the details']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <RidgeCrop x={240} y={620} focus={ridgeFocus} />
        <Callout x={240} y={590} targetX={500} targetY={705} text="RIDGE ENDS HERE" color={C.coral} opacity={ending * (1 - split)} />
        <Callout x={825} y={590} targetX={660} targetY={835} text="RIDGE SPLITS" color={C.teal} opacity={split} />
        <text x={540} y={1240} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={28} opacity={minutiae}>THESE DETAILS ARE MINUTIAE</text>
      </svg>
    </Scene>

    <Scene t={t} id="sensor" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow="Same ridges, measured electrically" lines={['Map the', 'ridges']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <RidgeCrop x={295} y={565} scale={0.78} focus="both" opacity={0.85} />
        <g transform="translate(0 0)">
          {Array.from({ length: 9 }, (_, i) => {
            const active = scan * 10 > i;
            return <g key={i} opacity={active ? 1 : 0.18}>
              <rect x={225 + i * 72} y={1060} width={54} height={120} rx={10} fill={i % 2 === 0 ? C.teal : C.indigo} opacity={i % 2 === 0 ? 0.9 : 0.45} />
              <path d={`M ${252 + i * 72} 1060 L ${252 + i * 72} ${1000 - (i % 2) * 35}`} stroke={i % 2 === 0 ? C.teal : C.indigo} strokeWidth={4} strokeDasharray="6 7" />
            </g>;
          })}
        </g>
        <text x={540} y={1240} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={22}>RIDGES + VALLEYS → DIFFERENT ELECTRICAL RESPONSES</text>
      </svg>
    </Scene>

    <Scene t={t} id="template" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow="Keep relationships, not a picture" lines={['Record relative', 'positions']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <RidgeCrop x={105} y={700} scale={0.62} focus="both" opacity={1 - notPhoto * 0.72} />
        <path d="M 480 875 L 585 875" stroke={C.teal} strokeWidth={6} strokeDasharray="9 10" opacity={template} />
        <TemplateGraph x={760} y={875} scale={0.85} opacity={template} />
        <text x={540} y={1240} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={23} opacity={notPhoto}>FEATURES + POSITIONS, NOT A PHOTOGRAPH</text>
      </svg>
    </Scene>

    <Scene t={t} id="match" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · IDENTITY" seconds={50} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="A second touch can be slightly different" lines={['Compare two', 'templates']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={1 - result * 0.75}>
          <TemplateGraph x={300 + compare * 240} y={820} scale={0.9} color={C.mint} card={false} />
          <TemplateGraph x={780 - compare * 240} y={820} scale={0.9} color={C.coral} card={false} opacity={newScan} shiftX={12} shiftY={-8} />
          <text x={300} y={1120} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontSize={22} opacity={1 - compare}>STORED TEMPLATE</text>
          <text x={780} y={1120} textAnchor="middle" fill={C.coral} fontFamily={FONT_MONO} fontSize={22} opacity={newScan * (1 - compare)}>NEW TOUCH</text>
          <text x={540} y={1120} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={23} opacity={compare}>CORRESPONDING DETAILS + POSITIONS</text>
        </g>
        <g opacity={result} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={110} y={620} width={400} height={480} rx={30} fill="rgba(255,255,255,0.06)" stroke={C.mint} strokeWidth={3} />
          <rect x={570} y={620} width={400} height={480} rx={30} fill="rgba(255,255,255,0.06)" stroke={C.coral} strokeWidth={3} />
          <text x={310} y={760} fill={C.mint} fontSize={25}>ENOUGH MATCHES</text>
          <text x={310} y={900} fill={C.paper} fontSize={42} fontWeight={700}>UNLOCK</text>
          <path d="M 260 820 L 290 850 L 350 790" fill="none" stroke={C.mint} strokeWidth={10} />
          <text x={770} y={760} fill={C.coral} fontSize={25}>TOO FEW MATCHES</text>
          <text x={770} y={900} fill={C.paper} fontSize={42} fontWeight={700}>NO UNLOCK</text>
          <path d="M 720 800 L 820 860 M 820 800 L 720 860" stroke={C.coral} strokeWidth={9} />
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow="The key distinction" lines={['Patterns, not', 'identical pictures']} accentIndex={1} size={58} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <TemplateGraph x={360} y={850} scale={0.85} color={C.indigo} card={false} />
        <TemplateGraph x={720} y={850} scale={0.85} color={C.teal} card={false} shiftX={10} shiftY={-6} />
        <text x={360} y={1100} textAnchor="middle" fill={C.indigo} fontFamily={FONT_MONO} fontSize={21}>FIRST TOUCH</text>
        <text x={720} y={1100} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontSize={21}>SECOND TOUCH</text>
        <text x={540} y={1215} textAnchor="middle" fill={C.ink} fontFamily={FONT_MONO} fontWeight={700} fontSize={26}>DIFFERENT SAMPLES · COMPARABLE PATTERNS</text>
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['ridge ends', 'splits into two', 'minutiae', 'electrical differences', 'relative to one another', 'mathematical template', 'matching features']} />
    <CalmSound narration="voiceovers/fingerprint/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={50} />
  </AbsoluteFill>;
};
export default Short19Fingerprint;
