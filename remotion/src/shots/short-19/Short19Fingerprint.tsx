import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Header, Pill, Scene, TitleBlock, line } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short19Fingerprint', durationInSeconds: 45, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const Fingerprint: React.FC<{
  x: number; y: number; scale?: number; color?: string; features?: number; opacity?: number; rotation?: number;
}> = ({ x, y, scale = 1, color = C.indigo, features = 0, opacity = 1, rotation = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity}>
    <path d="M -165 190 C -220 40, -190 -180, 0 -230 C 190 -180, 220 40, 165 190 C 100 245, -100 245, -165 190 Z" fill="rgba(255,254,249,0.75)" stroke={C.line} strokeWidth={4} />
    <g fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" opacity={0.82}>
      {Array.from({ length: 11 }, (_, index) => (
        <ellipse key={index} cx={0} cy={15} rx={28 + index * 14} ry={48 + index * 16} strokeDasharray={index % 3 === 0 ? '230 34 160 28' : index % 3 === 1 ? '170 26 220 38' : undefined} />
      ))}
      <path d="M -20 -215 C -80 -130, 65 -80, 15 10 C -35 90, 40 150, 0 218" />
      <path d="M -115 -145 C -35 -105, -90 -15, -120 45" />
      <path d="M 115 -145 C 35 -105, 90 -15, 120 45" />
    </g>
    {features > 0 && <g opacity={features} fontFamily={FONT_MONO} fontWeight={700} fontSize={20}>
      {[[-82, -65], [72, -15], [-42, 90], [90, 125]].map(([fx, fy], index) => <g key={index}><circle cx={fx} cy={fy} r={15} fill={C.paper} stroke={C.coral} strokeWidth={6} /><circle cx={fx} cy={fy} r={4} fill={C.coral} /></g>)}
      <text x={-180} y={-85} fill={C.coral}>ENDING</text><text x={100} y={-25} fill={C.coral}>SPLIT</text>
    </g>}
  </g>
);

const TemplateGraph: React.FC<{ x: number; y: number; scale?: number; opacity?: number; color?: string; shift?: number }> = ({ x, y, scale = 1, opacity = 1, color = C.teal, shift = 0 }) => {
  const nodes = [[-120, -120], [10, -165], [125, -90], [-145, 20], [0, -15], [145, 55], [-85, 150], [65, 135], [0, 65]];
  const edges = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [4, 8], [5, 7], [6, 8], [7, 8]];
  return (
    <g transform={`translate(${x + shift} ${y}) scale(${scale})`} opacity={opacity}>
      <rect x={-205} y={-225} width={410} height={450} rx={35} fill="rgba(255,254,249,0.88)" stroke={C.line} strokeWidth={3} />
      <text x={0} y={-185} textAnchor="middle" fill={color} fontFamily={FONT_MONO} fontWeight={700} fontSize={23} letterSpacing={2}>TEMPLATE</text>
      <g stroke={color} strokeWidth={4} opacity={0.45}>{edges.map(([a, b], index) => <line key={index} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />)}</g>
      {nodes.map(([nx, ny], index) => <g key={index}><circle cx={nx} cy={ny} r={13} fill={C.paper} stroke={color} strokeWidth={5} /><circle cx={nx} cy={ny} r={4} fill={color} /></g>)}
      <text x={0} y={195} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={21}>FEATURES + POSITIONS</text>
    </g>
  );
};

const Short19Fingerprint: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const pattern = prog(t, line(VO, 'hook-pattern').start - 0.1, line(VO, 'hook-pattern').start + 0.6);
  const charge = prog(t, line(VO, 'sensor-charge').start - 0.1, line(VO, 'sensor-charge').start + 0.7);
  const features = prog(t, line(VO, 'features-minutiae').start - 0.1, line(VO, 'features-template').start + 0.5);
  const rescan = prog(t, line(VO, 'match-rescan').start - 0.1, line(VO, 'match-rescan').start + 0.6);
  const match = prog(t, line(VO, 'match-result').start - 0.1, line(VO, 'match-result').start + 0.5);
  const finalStart = line(VO, 'closing-pattern').end + 0.5;
  const finalReveal = prog(t, finalStart, finalStart + 0.85);
  const closingExit = 1 - prog(t, finalStart - 0.6, finalStart);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={45} />
        <TitleBlock eyebrow="Everyday tech, explained" lines={['More than', 'a photo.']} accentIndex={1} subtitle="Your phone learns distinguishing details." size={79} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <Fingerprint x={540} y={855} scale={1.1} features={pattern} />
        </svg>
        <Pill text={pattern > 0.5 ? 'RIDGE DETAILS  →  PATTERN' : 'FINGERPRINT RECOGNITION'} y={1300} color={C.teal} />
      </Scene>

      <Scene t={t} id="sensor" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={45} />
        <TitleBlock eyebrow="Capacitive sensing" lines={['Reading', 'the ridges.']} accentIndex={1} subtitle="Ridges and valleys couple differently with the sensor." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <Fingerprint x={540} y={750} scale={0.82} color={C.teal} />
          <g transform="translate(540 1120)">
            <rect x={-330} y={-90} width={660} height={180} rx={35} fill={C.ink} />
            {Array.from({ length: 12 }, (_, index) => <rect key={index} x={-295 + index * 50} y={-52} width={34} height={104} rx={7} fill={index % 3 === 0 ? C.mint : C.indigo} opacity={0.35 + charge * (index % 3 === 0 ? 0.6 : 0.25)} />)}
          </g>
          <g fill="none" stroke={C.teal} strokeWidth={5} opacity={charge}>
            {[-180, -90, 0, 90, 180].map((dx, index) => <path key={index} d={`M ${540 + dx} 1010 Q ${540 + dx * 0.8} 950 ${540 + dx * 0.6} 910`} />)}
          </g>
        </svg>
        <Pill text="RIDGES + VALLEYS  →  ELECTRICAL MAP" y={1290} color={C.teal} />
      </Scene>

      <Scene t={t} id="features" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={45} />
        <TitleBlock eyebrow="Feature extraction" lines={['Details become', 'a template.']} accentIndex={1} subtitle="Endings, splits, and their relative positions." size={67} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <Fingerprint x={280} y={845} scale={0.66} features={features} />
          <path d="M 440 850 L 575 850" stroke={C.teal} strokeWidth={7} strokeDasharray="11 14" opacity={features} />
          <TemplateGraph x={770} y={850} scale={0.62} opacity={features} />
        </svg>
        <Pill text="MINUTIAE, NOT AN ORDINARY IMAGE" y={1300} color={C.teal} />
      </Scene>

      <Scene t={t} id="match" scenes={SCENES}>
        <Background t={t} dark /><Header label="TECH EXPLAINED · IDENTITY" seconds={45} dark />
        <TitleBlock dark eyebrow="A second touch" lines={['Compare,', 'not copy.']} accentIndex={1} subtitle="Small shifts are allowed during comparison." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <TemplateGraph x={290} y={820} scale={0.62} color={C.mint} />
          <TemplateGraph x={790} y={820} scale={0.62} color={C.coral} opacity={rescan} shift={rescan * 10} />
          <g transform="translate(540 1220)" opacity={match}>
            <rect x={-190} y={-65} width={380} height={130} rx={30} fill="rgba(120,205,189,0.12)" stroke={C.mint} strokeWidth={4} />
            <path d="M -105 -5 L -70 30 L -15 -35" fill="none" stroke={C.mint} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
            <text x={70} y={18} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={32}>UNLOCK</text>
          </g>
        </svg>
        <Pill dark text={match > 0.5 ? 'CLOSE MATCH  →  UNLOCK' : 'COMPARE FEATURES + POSITIONS'} y={1320} />
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · IDENTITY" seconds={45} />
        <AbsoluteFill style={{ opacity: closingExit }}>
          <TitleBlock eyebrow="The whole idea" lines={['A pattern,', 'not perfection.']} accentIndex={1} size={68} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><Fingerprint x={540} y={850} scale={1.0} features={1} /></svg>
          <Pill text="SCAN  →  TEMPLATE  →  COMPARE" y={1300} color={C.teal} />
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: finalReveal, transform: `translateY(${(1 - finalReveal) * 18}px)` }}>
          <TitleBlock eyebrow="Now you know" lines={['Pattern', 'recognized.']} accentIndex={1} subtitle="Two touches need not be identical to match." y={300} size={88} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><TemplateGraph x={540} y={1030} scale={0.7} /></svg>
        </AbsoluteFill>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['fingerprint', 'capacitive sensor', 'ridges and valleys', 'ridge endings and splits', 'mathematical template', 'compares', 'match']} />
      <CalmSound narration="voiceovers/fingerprint/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-pattern').end} duration={45} />
    </AbsoluteFill>
  );
};

export default Short19Fingerprint;
