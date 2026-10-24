import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Scene, TitleBlock, line, wavePath } from '../../lib/next-calm';
import { Arrow, FocusLabel, FocusRing, MovingDots } from '../../lib/focus';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short31SolarPanel', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };
const W = 1080; const H = 1920;

const Panel: React.FC<{ x: number; y: number; scale?: number; cellFocus?: number }> = ({ x, y, scale = 1, cellFocus = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fontFamily={FONT_MONO}>
    <rect x={-260} y={-175} width={520} height={350} rx={22} fill="#243d68" stroke={C.ink} strokeWidth={8} />
    {Array.from({ length: 4 }, (_, col) => Array.from({ length: 3 }, (_, row) => <rect key={`${col}-${row}`} x={-240 + col * 122} y={-155 + row * 104} width={108} height={90} rx={8} fill="#416fa8" stroke="#83b9d8" strokeWidth={3} opacity={0.75 + cellFocus * 0.25} />))}
    <rect x={-260} y={-175} width={520} height={350} rx={22} fill="#bfe9ff" opacity={0.10} />
    <text x={0} y={225} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={22}>SOLAR PANEL</text>
  </g>
);

const Short31SolarPanel: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const cell = prog(t, line(VO, 'hook-cell').start - 0.1, line(VO, 'hook-cell').start + 0.6);
  const photon = prog(t, line(VO, 'cell-photon').start - 0.1, line(VO, 'cell-photon').start + 0.7);
  const freed = prog(t, line(VO, 'cell-free').start - 0.1, line(VO, 'cell-free').start + 0.7);
  const field = prog(t, line(VO, 'field-guide').start - 0.1, line(VO, 'field-guide').start + 0.7);
  const dc = prog(t, line(VO, 'circuit-dc').start - 0.1, line(VO, 'circuit-dc').start + 0.7);
  const load = prog(t, line(VO, 'circuit-return').start - 0.1, line(VO, 'circuit-return').start + 0.7);
  const ac = prog(t, line(VO, 'inverter-ac').start - 0.1, line(VO, 'inverter-ac').start + 0.8);
  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="Inside a solar panel" lines={['Sunlight becomes', 'electricity']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <g opacity={1 - cell * 0.55}><circle cx={230} cy={720} r={82} fill={C.amber} /><circle cx={230} cy={720} r={110} fill="none" stroke={C.amber} strokeWidth={5} strokeDasharray="10 14" /></g>
        <MovingDots x1={280} y1={790} x2={430} y2={870} t={t} color={C.amber} count={6} radius={10} />
        <Panel x={650} y={900} scale={0.85} cellFocus={cell} />
        <g opacity={cell}><rect x={555} y={1045} width={190} height={48} rx={8} fill="#355d91" stroke={C.mint} strokeWidth={4} /><FocusRing x={650} y={1069} rx={130} ry={55} t={t} color={C.mint} /><FocusLabel x={650} y={1210} text="THIN SOLAR CELL" color={C.teal} /></g>
      </svg>
    </Scene>
    <Scene t={t} id="cell" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The solar cell absorbs photons" lines={['Light frees', 'electrical charges']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <g opacity={0.35 + photon * 0.65}>
          <rect x={170} y={650} width={740} height={105} rx={18} fill="#a7d8ef" opacity={0.35} stroke={C.blue} strokeWidth={3} /><text x={220} y={715} fill={C.paper} fontSize={21}>GLASS · PROTECTION</text>
          <rect x={170} y={790} width={740} height={220} rx={18} fill="#203f70" stroke={C.mint} strokeWidth={4} /><text x={220} y={835} fill={C.mint} fontWeight={700} fontSize={23}>SILICON SOLAR CELL</text>
          <FocusRing x={540} y={900} rx={390} ry={140} t={t} opacity={photon} />
        </g>
        <g opacity={photon}><Arrow x1={300} y1={610} x2={390} y2={800} color={C.amber} /><Arrow x1={540} y1={610} x2={540} y2={800} color={C.amber} /><Arrow x1={780} y1={610} x2={690} y2={800} color={C.amber} /><text x={540} y={565} textAnchor="middle" fill={C.amber} fontWeight={700} fontSize={24}>PHOTONS FROM SUNLIGHT</text></g>
        <g opacity={freed}>
          {[390, 540, 690].map((x, i) => <g key={x}><circle cx={x} cy={920} r={25} fill={C.mint} /><text x={x} y={930} textAnchor="middle" fill={C.dark} fontWeight={700} fontSize={26}>−</text><circle cx={x + 65} cy={920} r={25} fill="none" stroke={C.coral} strokeWidth={5} /><text x={x + 65} y={930} textAnchor="middle" fill={C.coral} fontWeight={700} fontSize={25}>+</text></g>)}
          <FocusLabel x={365} y={1130} text="FREED ELECTRONS −" color={C.mint} dark /><FocusLabel x={735} y={1130} text="HOLES +" color={C.coral} dark />
        </g>
      </svg>
    </Scene>
    <Scene t={t} id="field" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="The cell provides direction" lines={['A built-in field', 'guides electrons']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={150} y={690} width={360} height={300} rx={25} fill="#d7dafa" stroke={C.indigo} strokeWidth={4} /><rect x={570} y={690} width={360} height={300} rx={25} fill="#d5f0e9" stroke={C.teal} strokeWidth={4} />
        <rect x={465} y={690} width={150} height={300} fill={C.amber} opacity={0.15 + field * 0.2} /><FocusRing x={540} y={840} rx={105} ry={180} t={t} opacity={field} color={C.amber} />
        <text x={330} y={755} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={23}>SILICON REGION</text><text x={750} y={755} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={23}>SILICON REGION</text>
        <text x={540} y={1035} textAnchor="middle" fill={C.amber} fontWeight={700} fontSize={21}>BUILT-IN ELECTRIC FIELD</text>
        <Arrow x1={300} y1={875} x2={820} y2={875} color={C.teal} width={7} opacity={field} /><MovingDots x1={330} y1={875} x2={800} y2={875} t={t} color={C.mint} opacity={field} count={6} radius={13} speed={0.22} />
        <FocusLabel x={540} y={1160} text="ELECTRONS MOVE ONE WAY" color={C.teal} opacity={field} />
      </svg>
    </Scene>
    <Scene t={t} id="circuit" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The solar panel drives a circuit" lines={['Electrons become', 'direct current']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <g opacity={0.35 + dc * 0.65}><Panel x={280} y={850} scale={0.52} /><rect x={700} y={760} width={180} height={180} rx={30} fill="rgba(255,255,255,0.07)" stroke={C.amber} strokeWidth={5} /><text x={790} y={860} textAnchor="middle" fill={C.amber} fontWeight={700} fontSize={26}>LOAD</text></g>
        <path d="M 430 790 L 700 790 M 700 910 L 430 910" stroke={dc > 0.4 ? C.mint : C.muted} strokeWidth={7} opacity={0.4 + dc * 0.6} />
        <MovingDots x1={450} y1={790} x2={680} y2={790} t={t} opacity={dc} count={5} radius={10} /><MovingDots x1={700} y1={910} x2={450} y2={910} t={t} opacity={load} count={5} radius={10} />
        <FocusRing x={790} y={850} rx={130} ry={130} t={t} opacity={load} color={C.amber} />
        <FocusLabel x={565} y={1100} text="DIRECT CURRENT · DC" color={C.mint} dark opacity={dc} /><text x={540} y={1220} textAnchor="middle" fill={C.paper} fontSize={22} opacity={load}>POWER THE LOAD · THEN RETURN TO THE CELL</text>
      </svg>
    </Scene>
    <Scene t={t} id="inverter" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="From solar-panel power to home power" lines={['The inverter', 'changes DC to AC']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <text x={190} y={670} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={23}>SOLAR PANEL · DC</text><path d="M 110 760 L 270 760" stroke={C.indigo} strokeWidth={8} /><MovingDots x1={120} y1={760} x2={390} y2={760} t={t} color={C.indigo} opacity={ac} />
        <Chip x={540} y={790} scale={0.9} label="INV" opacity={0.35 + ac * 0.65} /><FocusRing x={540} y={790} rx={150} ry={150} t={t} opacity={ac} /><text x={540} y={990} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={23}>INVERTER</text>
        <path d={wavePath(690, 790, 270, 65, 2, t * 2)} fill="none" stroke={C.teal} strokeWidth={7} opacity={ac} /><Arrow x1={660} y1={790} x2={700} y2={790} opacity={ac} />
        <path d="M 745 1030 L 745 1140 L 935 1140 L 935 1030 L 840 950 Z" fill="#e4f2ef" stroke={C.teal} strokeWidth={5} opacity={ac} /><text x={840} y={1090} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={22}>HOME · AC</text>
      </svg>
    </Scene>
    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The solar panel's complete job" lines={['Sunlight in.', 'Electricity out.']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['SUNLIGHT FREES CHARGES', C.amber], ['CELL GUIDES ELECTRONS', C.mint], ['DIRECT CURRENT FLOWS', C.indigo], ['INVERTER SUPPLIES HOME', C.teal]].map(([label, color], i) => <g key={label} transform={`translate(540 ${630 + i * 155})`}><rect x={-330} y={-52} width={660} height={104} rx={24} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} /><text y={9} fill={color as string} fontWeight={700} fontSize={23}>{label}</text>{i < 3 && <Arrow x1={0} y1={60} x2={0} y2={95} color={C.mint} width={4} />}</g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['solar panel', 'solar cell', 'photons', 'electrons', 'holes', 'electric field', 'direct current', 'power a load', 'inverter', 'alternating current']} />
    <CalmSound narration="voiceovers/solar-panel/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short31SolarPanel;
