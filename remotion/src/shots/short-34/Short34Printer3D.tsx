import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Scene, TitleBlock, line } from '../../lib/next-calm';
import { Arrow, FocusLabel, FocusRing, MovingDots } from '../../lib/focus';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short34Printer3D', durationInSeconds: 55, fps: 30, width: 1080, height: 1920 };
const W = 1080; const H = 1920;
const Nozzle: React.FC<{ x: number; y: number; heat?: number; scale?: number }> = ({ x, y, heat = 1, scale = 1 }) => <g transform={`translate(${x} ${y}) scale(${scale})`} fontFamily={FONT_MONO}>
  <rect x={-22} y={-190} width={44} height={105} rx={15} fill={C.indigo} /><rect x={-95} y={-100} width={190} height={105} rx={25} fill={heat > 0.4 ? C.coral : C.muted} stroke={C.ink} strokeWidth={5} /><path d="M -65 5 L 65 5 L 25 105 L -25 105 Z" fill="#c4ccd8" stroke={C.ink} strokeWidth={5} /><path d="M -25 105 L 25 105 L 9 150 L -9 150 Z" fill={C.amber} /><text x={0} y={-40} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={20}>HEATER</text>
</g>;
const LayerStack: React.FC<{ x: number; y: number; count: number; active?: number; scale?: number }> = ({ x, y, count, active = -1, scale = 1 }) => <g transform={`translate(${x} ${y}) scale(${scale})`}>
  {Array.from({ length: count }, (_, i) => <g key={i} opacity={0.45 + i / Math.max(1, count) * 0.55}><rect x={-150} y={-i * 42} width={300} height={28} rx={12} fill={i === active ? C.mint : C.teal} stroke={C.paper} strokeWidth={2} /><ellipse cx={0} cy={-i * 42} rx={150} ry={28} fill={i === active ? C.mint : '#61bcb1'} opacity={0.85} /></g>)}
</g>;
const pointOnPerimeter = (p: number) => {
  const lengths = [550, 220, 550, 220]; const total = 1540; let d = (p % 1) * total;
  const pts = [[265, 780], [815, 780], [815, 1000], [265, 1000], [265, 780]];
  for (let i = 0; i < 4; i++) { if (d <= lengths[i]) { const q = d / lengths[i]; return { x: pts[i][0] + (pts[i + 1][0] - pts[i][0]) * q, y: pts[i][1] + (pts[i + 1][1] - pts[i][1]) * q }; } d -= lengths[i]; }
  return { x: 265, y: 780 };
};

const Short34Printer3D: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const slice = prog(t, line(VO, 'slice-model').start - 0.1, line(VO, 'slice-model').start + 0.8);
  const path = prog(t, line(VO, 'slice-path').start - 0.1, line(VO, 'slice-path').start + 0.8);
  const heat = prog(t, line(VO, 'heat-filament').start - 0.1, line(VO, 'heat-filament').start + 0.8);
  const extrude = prog(t, line(VO, 'extrude-path').start - 0.1, line(VO, 'extrude-path').end - 0.2);
  const cool = prog(t, line(VO, 'extrude-cool').start - 0.1, line(VO, 'extrude-cool').start + 0.8);
  const next = prog(t, line(VO, 'stack-next').start - 0.1, line(VO, 'stack-next').start + 1.0);
  const bond = prog(t, line(VO, 'stack-bond').start - 0.1, line(VO, 'stack-bond').start + 1.2);
  const nozzlePoint = pointOnPerimeter(extrude);
  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="Inside a 3D printer" lines={['A solid object', 'one layer at a time']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={190} y={1070} width={700} height={65} rx={22} fill={C.dark} /><LayerStack x={540} y={1030} count={7} active={Math.floor(t * 1.2) % 7} />
        <Nozzle x={540} y={620} heat={0.8} scale={0.65} /><Arrow x1={250} y1={1070} x2={250} y2={770} color={C.mint} /><text x={250} y={750} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={20}>THIN LAYERS</text>
        <FocusRing x={540} y={930} rx={205} ry={190} t={t} color={C.mint} /><FocusLabel x={540} y={1240} text="LAYERS BECOME THE OBJECT" color={C.teal} />
      </svg>
    </Scene>
    <Scene t={t} id="slice" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="Before the 3D printer moves" lines={['Software slices', 'the model and path']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <g opacity={0.8 - path * 0.45}><ellipse cx={270} cy={730} rx={125} ry={48} fill="none" stroke={C.indigo} strokeWidth={5} /><path d="M 145 730 L 145 980 Q 270 1070 395 980 L 395 730" fill="none" stroke={C.indigo} strokeWidth={5} /><ellipse cx={270} cy={980} rx={125} ry={48} fill="none" stroke={C.indigo} strokeWidth={5} /><text x={270} y={1110} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={21}>DIGITAL 3D MODEL</text></g>
        <Chip x={540} y={760} scale={0.48} label="SLICE" opacity={slice} /><Arrow x1={410} y1={790} x2={475} y2={790} color={C.mint} opacity={slice} /><Arrow x1={610} y1={790} x2={675} y2={790} color={C.mint} opacity={slice} />
        <g opacity={slice}><LayerStack x={805} y={1000} count={6} active={Math.floor(path * 5)} scale={0.65} /><text x={805} y={1110} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={21}>PRINTABLE LAYERS</text></g>
        <g opacity={path} transform="translate(540 900)">
          <rect x={-210} y={-130} width={420} height={260} rx={35} fill="rgba(16,24,39,0.88)" stroke={C.amber} strokeWidth={5} />
          <rect x={-165} y={-90} width={330} height={180} rx={24} fill="none" stroke={C.mint} strokeWidth={8} strokeDasharray="14 10" strokeDashoffset={-t * 30} />
          {[ -50, 0, 50 ].map((y) => <path key={y} d={`M -120 ${y} L 120 ${y}`} stroke={C.amber} strokeWidth={5} strokeDasharray="10 8" />)}
          <FocusRing x={0} y={0} rx={245} ry={165} t={t} color={C.amber} /><text x={0} y={205} textAnchor="middle" fill={C.amber} fontWeight={700} fontSize={20}>OUTER WALLS + INNER PATH</text>
        </g>
      </svg>
    </Scene>
    <Scene t={t} id="heat" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="The 3D printer prepares the material" lines={['Heat the nozzle.', 'Flow the filament.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <Nozzle x={500} y={850} heat={heat} scale={1.25} /><FocusRing x={500} y={850} rx={190} ry={190} t={t} opacity={heat} color={C.coral} />
        <MovingDots x1={500} y1={580} x2={500} y2={800} t={t} color={C.indigo} opacity={heat} count={5} radius={11} /><text x={500} y={535} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={22}>PLASTIC FILAMENT</text>
        <rect x={745} y={700} width={190} height={250} rx={30} fill={C.paper} stroke={C.coral} strokeWidth={5} /><text x={840} y={775} textAnchor="middle" fill={C.muted} fontWeight={700} fontSize={20}>NOZZLE</text><text x={840} y={875} textAnchor="middle" fill={C.coral} fontWeight={700} fontSize={52}>{Math.round(25 + heat * 180)}°C</text>
        <path d="M 500 1035 L 500 1130" stroke={cool > 0 ? C.teal : C.coral} strokeWidth={12} strokeLinecap="round" opacity={heat} /><FocusLabel x={540} y={1230} text="MELTED PLASTIC CAN FLOW" color={C.coral} opacity={heat} />
      </svg>
    </Scene>
    <Scene t={t} id="extrude" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The 3D printer makes the current layer" lines={['Follow the path.', 'Cool the plastic.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <path d="M 265 780 H 815 V 1000 H 265 Z" fill="none" stroke={C.muted} strokeWidth={5} strokeDasharray="12 12" opacity={0.45} />
        <path d="M 265 780 H 815 V 1000 H 265 Z" fill="none" stroke={cool > 0.4 ? C.teal : C.coral} strokeWidth={18} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - extrude} />
        <rect x={190} y={1050} width={700} height={65} rx={20} fill="#293448" /><text x={540} y={1170} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={22}>PRINT BED</text>
        <Nozzle x={nozzlePoint.x} y={nozzlePoint.y - 82.5} heat={1} scale={0.55} /><FocusRing x={nozzlePoint.x} y={nozzlePoint.y - 20} rx={95} ry={130} t={t} color={C.amber} />
        <g opacity={cool}><FocusRing x={540} y={890} rx={340} ry={180} t={t} color={C.mint} /><FocusLabel x={540} y={1250} text="COOLED PLASTIC FORMS THE LAYER" color={C.mint} dark /></g>
      </svg>
    </Scene>
    <Scene t={t} id="stack" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="The 3D printer repeats and bonds" lines={['Rise. Print again.', 'Fuse the layers.']} accentIndex={2} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={190} y={1080} width={700} height={65} rx={22} fill={C.dark} />
        {Array.from({ length: 7 }, (_, i) => <g key={i} opacity={i < 3 ? 1 : prog(bond, (i - 3) * 0.18, (i - 3) * 0.18 + 0.35)}><rect x={330} y={1000 - i * 55} width={420} height={35} rx={15} fill={i === 6 ? C.mint : C.teal} stroke={C.paper} strokeWidth={2} /><ellipse cx={540} cy={1000 - i * 55} rx={210} ry={35} fill={i === 6 ? C.mint : '#61bcb1'} opacity={0.85} /></g>)}
        <g transform={`translate(0 ${-next * 55})`}><Nozzle x={540} y={590} heat={0.8} scale={0.65} /></g>
        <Arrow x1={825} y1={900} x2={825} y2={720} color={C.indigo} opacity={next} /><text x={825} y={690} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={19} opacity={next}>ONE LAYER HEIGHT</text>
        <FocusRing x={540} y={670} rx={265} ry={100} t={t} opacity={bond} color={C.mint} /><FocusLabel x={540} y={1240} text="NEW LAYERS FUSE INTO A SOLID SHAPE" color={C.teal} opacity={bond} />
      </svg>
    </Scene>
    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The 3D printer's complete process" lines={['Slice. Extrude. Cool.', 'Bond every layer.']} accentIndex={1} size={60} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['DIGITAL MODEL IS SLICED', C.indigo], ['NOZZLE FOLLOWS THE PATH', C.coral], ['PLASTIC COOLS INTO A LAYER', C.mint], ['LAYERS BOND INTO THE OBJECT', C.teal]].map(([label, color], i) => <g key={label} transform={`translate(540 ${640 + i * 155})`}><rect x={-350} y={-52} width={700} height={104} rx={24} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} /><text y={8} fill={color as string} fontWeight={700} fontSize={21}>{label}</text>{i < 3 && <Arrow x1={0} y1={60} x2={0} y2={95} color={C.mint} width={4} />}</g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['3D printer', 'thin layer', 'slicing software', 'nozzle', 'plastic filament', 'extrudes', 'cools and solidifies', 'one layer height', 'fuses', 'layer bonding']} />
    <CalmSound narration="voiceovers/3d-printer/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={55} />
  </AbsoluteFill>;
};
export default Short34Printer3D;
