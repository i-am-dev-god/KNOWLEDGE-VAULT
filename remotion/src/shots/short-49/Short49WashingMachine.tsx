import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, MovingDots } from '../../lib/focus';
import { CinematicBackground, DeviceStage, SceneHeading, SvgStage, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short49WashingMachine', durationInSeconds: 40, fps: 30, width: 1080, height: 1920 };

const Cloth: React.FC<{ x: number; y: number; rotation?: number; color?: string; scale?: number }> = ({ x, y, rotation = 0, color = X.violet, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    <path d="M -48 -62 L -92 -34 L -65 10 L -42 -4 V 72 H 42 V -4 L 65 10 L 92 -34 L 48 -62 L 20 -48 Q 0 -26 -20 -48 Z" fill={color} stroke={X.white} strokeWidth={5} strokeLinejoin="round" opacity={0.92} />
    <path d="M -30 45 H 30 M -20 -48 Q 0 -30 20 -48" fill="none" stroke={X.white} strokeWidth={4} opacity={0.45} />
  </g>
);

const Pump: React.FC<{ x: number; y: number; t: number; active?: number; scale?: number }> = ({ x, y, t, active = 1, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -125 0 H -70 M 70 0 H 135" stroke={X.steel} strokeWidth={50} strokeLinecap="round" />
    <path d="M -125 0 H -70 M 70 0 H 135" stroke={X.night} strokeWidth={30} strokeLinecap="round" />
    <circle r={82} fill="#142b3a" stroke={X.green} strokeWidth={7} />
    <g transform={`rotate(${t * 160 * active})`}>
      {[0, 1, 2, 3].map((i) => <path key={i} d="M 0 0 Q 15 -55 55 -48 Q 62 -8 18 18 Z" fill={X.green} opacity={0.65} transform={`rotate(${i * 90})`} />)}
      <circle r={14} fill={X.white} />
    </g>
  </g>
);

const DrumFront: React.FC<{ cx: number; cy: number; r: number; t: number; water: number }> = ({ cx, cy, r, t, water }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 48} fill="#142a3b" stroke={X.steel} strokeWidth={15} />
    <circle cx={cx} cy={cy} r={r} fill="#0b1d2c" stroke={X.cyan} strokeWidth={6} />
    {Array.from({ length: 16 }, (_, i) => {
      const a = i * Math.PI * 2 / 16;
      return <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r={7} fill={X.night} stroke={X.cyan} strokeWidth={3} />;
    })}
    <g transform={`rotate(${t * 68} ${cx} ${cy})`}>
      {[0, 1, 2].map((i) => {
        const a = i * Math.PI * 2 / 3;
        return <Cloth key={i} x={cx + Math.cos(a) * r * 0.73} y={cy + Math.sin(a) * r * 0.73} rotation={a * 180 / Math.PI + 90} color={[X.violet, X.coral, X.blue][i]} scale={r / 310} />;
      })}
    </g>
    {Array.from({ length: 8 }, (_, i) => {
      const p = (t * 0.20 + i / 8) % 1; const a = i * Math.PI * 2 / 8;
      const rr = r * (0.82 + p * 0.30);
      return <circle key={i} cx={cx + Math.cos(a) * rr} cy={cy + Math.sin(a) * rr} r={7} fill={X.cyan} opacity={water * (1 - p * 0.55)} />;
    })}
  </g>
);

const Short49WashingMachine: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const retain = prog(t, line(VO, 'hook-retain').start - 0.08, line(VO, 'hook-retain').start + 0.60);
  const inward = prog(t, line(VO, 'spin-inward').start - 0.08, line(VO, 'spin-inward').start + 0.60);
  const water = prog(t, line(VO, 'spin-water').start - 0.08, line(VO, 'spin-water').start + 0.60);
  const holes = prog(t, line(VO, 'drain-holes').start - 0.08, line(VO, 'drain-holes').start + 0.60);
  const pump = prog(t, line(VO, 'drain-pump').start - 0.08, line(VO, 'drain-pump').start + 0.60);
  const balance = prog(t, line(VO, 'balance-load').start - 0.08, line(VO, 'balance-load').start + 0.70);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A front-loading washer with the door cut away" lines={['Clothes stay at the drum wall', 'water passes through the holes']} accent={X.cyan} size={55} />
      <SvgStage>
        <PanelLabel text="CLOTHES INSIDE · WATER MOVES TO THE OUTER TUB" color={X.cyan} />
        <rect x={175} y={555} width={730} height={680} rx={55} fill="#263b4d" stroke={X.steel} strokeWidth={9} />
        <rect x={235} y={590} width={610} height={80} rx={20} fill="#142637" />
        <rect x={275} y={612} width={190} height={34} rx={10} fill="#0a1825" stroke={X.cyan} strokeWidth={3} />
        <circle cx={780} cy={630} r={20} fill={X.green} />
        <DrumFront cx={540} cy={900} r={235} t={t} water={0.35 + retain * 0.65} />
        <ClearLabel x={240} y={1165} targetX={390} targetY={1030} text="Clothes stay inside" color={X.violet} />
        <ClearLabel x={845} y={1165} targetX={760} targetY={1030} text="Water exits" color={X.cyan} opacity={retain} />
        <StageNote y={1325} text="The perforated drum retains fabrics while allowing water to escape" color={X.cyan} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="spin" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="One cloth, one wall, two different motions" lines={['The wall guides the cloth', 'water moves through the wall']} accent={X.violet} size={56} />
      <SvgStage>
        <PanelLabel text="DRUM CROSS-SECTION · RIGHT WALL MAGNIFIED" color={X.violet} />
        <circle cx={535} cy={850} r={335} fill="#142a3b" stroke={X.steel} strokeWidth={13} />
        <circle cx={535} cy={850} r={280} fill="#0b1d2c" stroke={X.cyan} strokeWidth={6} />
        {[-55, -28, 0, 28, 55].map((degrees) => {
          const a = degrees * Math.PI / 180;
          return <circle key={degrees} cx={535 + Math.cos(a) * 280} cy={850 + Math.sin(a) * 280} r={10} fill={X.night} stroke={X.cyan} strokeWidth={4} />;
        })}
        <Cloth x={748} y={850} rotation={90} color={X.violet} scale={1.05} />
        <g opacity={inward}>
          <Arrow x1={865} y1={850} x2={675} y2={850} color={X.amber} width={10} />
          <ClearLabel x={610} y={700} targetX={720} targetY={820} text="Wall pushes cloth inward" color={X.amber} />
        </g>
        <path d="M 380 625 Q 535 525 690 625" fill="none" stroke={X.violet} strokeWidth={8} />
        <path d="M 690 625 L 650 620 L 675 585 Z" fill={X.violet} />
        <ClearLabel x={535} y={580} text="Drum rotation" color={X.violet} />
        {[745, 850, 955].map((y, i) => <g key={y} opacity={water}>
          <MovingDots x1={790} y1={y} x2={860} y2={y} t={t} count={3} color={X.cyan} radius={8} speed={0.20 + i * 0.02} />
          <Arrow x1={825} y1={y} x2={862} y2={y} color={X.cyan} width={7} />
        </g>)}
        <ClearLabel x={710} y={1110} targetX={760} targetY={910} text="Cloth against the wall" color={X.violet} />
        <ClearLabel x={875} y={1180} targetX={835} targetY={955} text="Water through perforations" color={X.cyan} opacity={water} />
        {water > 0.05 && <HighlightPart x={770} y={690} width={115} height={330} color={X.cyan} opacity={water * 0.25} />}
        <StageNote text="Fabric follows the drum; water continues outward through the holes" color={X.violet} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="drain" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A connected drainage path, not floating parts" lines={['Through the perforations', 'down to the pump and drain']} accent={X.cyan} size={56} />
      <SvgStage>
        <PanelLabel text="INNER DRUM → OUTER TUB → SUMP → PUMP" color={X.cyan} />
        <rect x={120} y={610} width={840} height={500} rx={120} fill="#1a3042" stroke={X.steel} strokeWidth={10} />
        <rect x={210} y={680} width={650} height={350} rx={95} fill="#0b2030" stroke={X.cyan} strokeWidth={7} />
        <Cloth x={715} y={855} rotation={90} color={X.violet} scale={0.95} />
        {[735, 790, 845, 900, 955].map((y) => <circle key={y} cx={840} cy={y} r={10} fill={X.night} stroke={X.cyan} strokeWidth={4} />)}
        {[735, 845, 955].map((y) => <g key={y} opacity={0.20 + holes * 0.80}>
          <MovingDots x1={770} y1={y} x2={910} y2={y} t={t} count={3} color={X.cyan} radius={8} speed={0.20} />
          <Arrow x1={855} y1={y} x2={910} y2={y} color={X.cyan} width={6} />
        </g>)}
        <MovingDots x1={900} y1={950} x2={700} y2={1080} t={t} count={4} color={X.cyan} radius={8} speed={0.18} opacity={holes} />
        <path d="M 620 1070 H 760 L 730 1130 H 650 Z" fill="#153448" stroke={X.cyan} strokeWidth={6} />
        <ClearLabel x={690} y={1190} text="Sump" color={X.cyan} size={20} />
        <path d="M 700 1120 V 1190 H 770 M 890 1190 H 1010" fill="none" stroke={X.steel} strokeWidth={42} strokeLinejoin="round" />
        <path d="M 700 1120 V 1190 H 770 M 890 1190 H 1010" fill="none" stroke={X.night} strokeWidth={24} strokeLinejoin="round" />
        <Pump x={830} y={1190} t={t} active={pump} scale={0.72} />
        <MovingDots x1={700} y1={1120} x2={700} y2={1190} t={t} count={2} color={X.cyan} radius={7} speed={0.22} opacity={pump} />
        <MovingDots x1={720} y1={1190} x2={1000} y2={1190} t={t} count={5} color={X.cyan} radius={7} speed={0.22} opacity={pump} />
        <Arrow x1={940} y1={1190} x2={1010} y2={1190} color={X.green} width={7} opacity={pump} />
        <ClearLabel x={280} y={595} targetX={300} targetY={680} text="Inner perforated drum" color={X.cyan} />
        <ClearLabel x={195} y={1155} targetX={165} targetY={1030} text="Outer tub" color={X.steel} />
        <ClearLabel x={875} y={1100} text="Drain pump" color={X.green} opacity={pump} />
        <StageNote y={1330} text="Water reaches the outer tub, collects in the sump, then gets pumped out" color={X.cyan} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="balance" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Two loads compared in the same drum view" lines={['One-sided load wobbles', 'evenly spread load spins steadily']} accent={X.amber} size={54} />
      <SvgStage>
        <PanelLabel text="LOAD DISTRIBUTION · CENTER OF MASS" color={X.amber} />
        <g transform={`translate(${290 + Math.sin(t * 11) * 9} 835) rotate(${Math.sin(t * 10) * 2.5})`}>
          <circle r={205} fill="#142a3b" stroke={X.coral} strokeWidth={10} />
          <circle r={155} fill="#0b1d2c" stroke={X.steel} strokeWidth={5} />
          <Cloth x={80} y={45} rotation={25} color={X.coral} scale={1.15} />
          <circle cx={65} cy={35} r={13} fill={X.coral} stroke={X.white} strokeWidth={4} />
          <path d="M 0 -25 V 25 M -25 0 H 25" stroke={X.white} strokeWidth={4} opacity={0.55} />
          <ClearLabel x={0} y={275} text="Unbalanced · off-center mass" color={X.coral} size={21} />
        </g>
        <g transform="translate(790 835)">
          <circle r={205} fill="#142a3b" stroke={X.green} strokeWidth={10} />
          <circle r={155} fill="#0b1d2c" stroke={X.steel} strokeWidth={5} />
          <Cloth x={0} y={-90} rotation={0} color={X.violet} scale={0.70} />
          <Cloth x={85} y={55} rotation={120} color={X.blue} scale={0.70} />
          <Cloth x={-85} y={55} rotation={240} color={X.coral} scale={0.70} />
          <circle r={13} fill={X.green} stroke={X.white} strokeWidth={4} />
          <path d="M 0 -25 V 25 M -25 0 H 25" stroke={X.white} strokeWidth={4} opacity={0.55} />
          {balance > 0.05 && <HighlightPart x={-220} y={-220} width={440} height={440} color={X.green} rx={220} opacity={balance * 0.35} />}
          <ClearLabel x={0} y={275} text="Balanced · centered mass" color={X.green} size={21} />
        </g>
        <StageNote text="The right-hand load keeps its mass close to the rotation axis" color={X.amber} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The complete water-extraction path" lines={['Rotate and perforate', 'then pump the water away']} accent={X.green} size={57} />
      <SvgStage>
        <PanelLabel text="DRUM → PERFORATIONS → CONNECTED DRAIN PUMP" color={X.green} />
        <g transform="translate(190 825)">
          <rect x={-125} y={-165} width={250} height={330} rx={30} fill="#112236" stroke={X.violet} strokeWidth={4} />
          <circle r={105} fill="#0b1d2c" stroke={X.cyan} strokeWidth={6} />
          <Cloth x={45} y={0} rotation={90} color={X.violet} scale={0.65} />
          <ClearLabel x={0} y={235} text="1 · Clothes rotate" color={X.violet} size={21} />
        </g>
        <Arrow x1={330} y1={825} x2={405} y2={825} color={X.green} width={8} />
        <g transform="translate(540 825)">
          <rect x={-125} y={-165} width={250} height={330} rx={30} fill="#112236" stroke={X.cyan} strokeWidth={4} />
          <rect x={-70} y={-110} width={140} height={220} rx={35} fill="#0b2030" stroke={X.cyan} strokeWidth={6} />
          {[-65, 0, 65].map((y) => <g key={y}><circle cx={65} cy={y} r={9} fill={X.night} stroke={X.cyan} strokeWidth={3} /><Arrow x1={15} y1={y} x2={100} y2={y} color={X.cyan} width={5} /></g>)}
          <ClearLabel x={0} y={235} text="2 · Water exits" color={X.cyan} size={21} />
        </g>
        <Arrow x1={675} y1={825} x2={750} y2={825} color={X.green} width={8} />
        <g transform="translate(885 825)">
          <rect x={-125} y={-165} width={250} height={330} rx={30} fill="#112236" stroke={X.green} strokeWidth={4} />
          <Pump x={0} y={0} t={t} scale={0.75} />
          <ClearLabel x={0} y={235} text="3 · Pump drains" color={X.green} size={21} />
        </g>
        <StageNote text="Water leaves through connected passages; clothes remain in the drum" color={X.green} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['washing machine', 'spinning the drum', 'clothes', 'water escapes', 'pushes inward', 'moving in a circle', 'move outward', 'small holes', 'outer tub', 'pump', 'perforated drum', 'balanced load', 'rotation, perforations, and drainage']} />
    <CalmSound narration="voiceovers/washing-machine/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={40} />
  </AbsoluteFill>;
};
export default Short49WashingMachine;
