import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, MovingDots } from '../../lib/focus';
import { CinematicBackground, DeviceStage, SceneHeading, SvgStage, X } from '../../lib/cinematic';
import { ClearLabel, CubicDots, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short46VacuumCleaner', durationInSeconds: 42, fps: 30, width: 1080, height: 1920 };

const FanRotor: React.FC<{ x: number; y: number; r: number; t: number; spinning?: number }> = ({ x, y, r, t, spinning = 1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r + 22} fill="#102438" stroke={X.steel} strokeWidth={8} />
    <g transform={`rotate(${t * 190 * spinning})`}>
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M 0 0 Q ${r * 0.15} ${-r * 0.72} ${r * 0.62} ${-r * 0.66} Q ${r * 0.82} ${-r * 0.20} ${r * 0.24} ${r * 0.16} Z`} fill={X.cyan} opacity={0.65} transform={`rotate(${i * 60})`} />)}
      <circle r={r * 0.18} fill={X.amber} stroke={X.white} strokeWidth={4} />
    </g>
  </g>
);

const DustBin: React.FC<{ x: number; y: number; width?: number; height?: number; t: number }> = ({ x, y, width = 210, height = 270, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-width / 2} y={-height / 2} width={width} height={height} rx={32} fill="#10283a" fillOpacity={0.88} stroke={X.cyan} strokeWidth={5} />
    {Array.from({ length: 7 }, (_, i) => <circle key={i} cx={-65 + (i % 4) * 43} cy={height / 2 - 42 - Math.floor(i / 4) * 42 + Math.sin(t * 1.5 + i) * 3} r={11 + (i % 2) * 3} fill={X.amber} />)}
  </g>
);

const FilterCard: React.FC<{ x: number; clogged: boolean; active: number; t: number }> = ({ x, clogged, active, t }) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-190} y={650} width={380} height={440} rx={30} fill="#112236" stroke={clogged ? X.coral : X.green} strokeWidth={4 + active * 3} />
    <ClearLabel x={0} y={610} text={clogged ? 'Before · clogged' : 'After · cleaned'} color={clogged ? X.coral : X.green} />
    <rect x={-85} y={715} width={170} height={280} rx={20} fill="#182d40" stroke={X.steel} strokeWidth={6} />
    {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${-65 + i * 22} 740 V 970`} stroke={X.steel} strokeWidth={12} opacity={0.72} />)}
    {clogged && Array.from({ length: 12 }, (_, i) => <circle key={i} cx={-112 - (i % 2) * 22} cy={745 + Math.floor(i / 2) * 43} r={12 + (i % 3) * 2} fill={X.amber} opacity={0.85} />)}
    {clogged ? <>
      <Arrow x1={-165} y1={855} x2={-120} y2={855} color={X.coral} width={7} />
      <path d="M 110 825 L 150 865 M 150 825 L 110 865" stroke={X.coral} strokeWidth={9} strokeLinecap="round" />
      <ClearLabel x={0} y={1150} text="Dust blocks the passage" color={X.coral} size={21} />
    </> : <>
      <MovingDots x1={-155} y1={855} x2={155} y2={855} t={t} count={5} color={X.green} radius={8} speed={0.24} opacity={0.35 + active * 0.65} />
      <Arrow x1={105} y1={855} x2={165} y2={855} color={X.green} width={8} opacity={0.35 + active * 0.65} />
      <ClearLabel x={0} y={1150} text="Air passes freely again" color={X.green} size={21} />
    </>}
  </g>
);

const Short46VacuumCleaner: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const pickup = prog(t, 0.10, 1.35);
  const airflow = prog(t, line(VO, 'hook-airflow').start - 0.08, line(VO, 'hook-airflow').start + 0.65);
  const motor = prog(t, line(VO, 'fan-motor').start - 0.08, line(VO, 'fan-motor').start + 0.60);
  const pressure = prog(t, line(VO, 'fan-pressure').start - 0.08, line(VO, 'fan-pressure').start + 0.60);
  const carry = prog(t, line(VO, 'path-carry').start - 0.08, line(VO, 'path-carry').start + 0.55);
  const separate = prog(t, line(VO, 'path-separate').start - 0.08, line(VO, 'path-separate').start + 0.65);
  const clean = prog(t, line(VO, 'filter-maintenance').start + 0.8, line(VO, 'filter-maintenance').end - 0.25);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A complete vacuum cleaner, cut open" lines={['Air follows one path', 'dirt ends in the bin']} accent={X.cyan} size={58} />
      <SvgStage>
        <PanelLabel text="NOZZLE → HOSE → COLLECTION BIN" color={X.cyan} />
        <rect x={65} y={1080} width={930} height={28} rx={12} fill="#34485a" />
        <path d="M 105 920 H 330 L 390 1055 H 70 Z" fill="#263b50" stroke={X.steel} strokeWidth={9} />
        <rect x={120} y={1025} width={230} height={32} rx={12} fill={X.night} stroke={X.cyan} strokeWidth={4} />
        <path d="M 320 950 C 445 875 390 710 535 720" fill="none" stroke={X.steel} strokeWidth={60} strokeLinecap="round" />
        <path d="M 320 950 C 445 875 390 710 535 720" fill="none" stroke={X.night} strokeWidth={38} strokeLinecap="round" />
        <rect x={500} y={590} width={440} height={450} rx={75} fill="#20364a" stroke={X.steel} strokeWidth={9} />
        <DustBin x={650} y={800} t={t} />
        <FanRotor x={835} y={805} r={72} t={t} spinning={pickup} />
        <circle cx={590} cy={1040} r={38} fill={X.night} stroke={X.steel} strokeWidth={11} /><circle cx={855} cy={1040} r={38} fill={X.night} stroke={X.steel} strokeWidth={11} />
        <CubicDots x1={190} y1={1038} cx1={380} cy1={1000} cx2={375} cy2={740} x2={590} y2={770} t={t} count={5} color={X.cyan} radius={8} speed={0.20} opacity={0.30 + airflow * 0.70} />
        <CubicDots x1={160} y1={1060} cx1={370} cy1={1020} cx2={380} cy2={770} x2={610} y2={820} t={t} count={4} color={X.amber} radius={10} speed={0.16} opacity={0.35 + pickup * 0.65} />
        <Arrow x1={735} y1={805} x2={765} y2={805} color={X.cyan} width={7} opacity={airflow} />
        <Arrow x1={910} y1={805} x2={985} y2={805} color={X.cyan} width={8} opacity={airflow} />
        <ClearLabel x={185} y={885} targetX={205} targetY={1015} text="Floor nozzle" color={X.white} />
        <ClearLabel x={655} y={580} targetX={650} targetY={665} text="Transparent dust bin" color={X.amber} />
        <ClearLabel x={925} y={750} text="Exhaust" color={X.cyan} anchor="end" opacity={airflow} />
        {airflow > 0.05 && <HighlightPart x={525} y={645} width={250} height={320} color={X.cyan} opacity={airflow * 0.45} />}
        <StageNote text="Moving air carries loose dirt into the collection bin" color={X.cyan} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="fan" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="Inside the same vacuum body" lines={['The fan exhausts air', 'room air enters to replace it']} accent={X.violet} size={56} />
      <SvgStage>
        <PanelLabel text="INLET → BIN → FILTER → FAN → EXHAUST" color={X.violet} />
        <rect x={85} y={625} width={910} height={480} rx={65} fill="#102235" stroke={X.steel} strokeWidth={8} />
        <path d="M 40 820 H 170" stroke={X.steel} strokeWidth={70} strokeLinecap="round" /><path d="M 40 820 H 170" stroke={X.night} strokeWidth={42} strokeLinecap="round" />
        <DustBin x={280} y={830} width={210} height={270} t={t} />
        <rect x={435} y={700} width={55} height={270} rx={14} fill="#263b4d" stroke={X.amber} strokeWidth={5} />
        {[725, 770, 815, 860, 905, 950].map((y) => <path key={y} d={`M 442 ${y} H 483`} stroke={X.amber} strokeWidth={5} />)}
        <rect x={540} y={755} width={150} height={150} rx={25} fill="#35485c" stroke={X.amber} strokeWidth={6} />
        <path d="M 690 830 H 735" stroke={X.steel} strokeWidth={24} />
        <FanRotor x={825} y={830} r={105} t={t} spinning={motor} />
        <Arrow x1={920} y1={830} x2={1030} y2={830} color={X.violet} width={10} opacity={0.25 + motor * 0.75} />
        <Arrow x1={65} y1={820} x2={155} y2={820} color={X.cyan} width={9} opacity={pressure} />
        <Arrow x1={395} y1={830} x2={425} y2={830} color={X.cyan} width={7} opacity={pressure} />
        <Arrow x1={500} y1={830} x2={530} y2={830} color={X.cyan} width={7} opacity={pressure} />
        <ClearLabel x={280} y={1160} text="Dust bin" color={X.cyan} />
        <ClearLabel x={462} y={1035} text="Filter" color={X.amber} />
        <ClearLabel x={615} y={970} text="Motor" color={X.amber} />
        <ClearLabel x={825} y={1160} text="Fan" color={X.cyan} />
        <ClearLabel x={965} y={750} text="Air out" color={X.violet} />
        <ClearLabel x={85} y={705} text="Room air in" color={X.cyan} opacity={pressure} />
        {motor > 0.05 && <HighlightPart x={525} y={690} width={430} height={290} color={X.violet} opacity={motor * 0.35} />}
        <StageNote text={pressure > 0.4 ? 'Air exhausted on the right is replaced through the inlet on the left' : 'The motor turns the fan and establishes the airflow'} color={X.violet} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="path" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A labeled dirt-separation chamber" lines={['Air and dirt enter together', 'only cleaner air leaves']} accent={X.cyan} size={56} />
      <SvgStage>
        <PanelLabel text="CYCLONE OR FILTER SEPARATOR · CUTAWAY" color={X.cyan} />
        <path d="M 70 790 H 465" stroke={X.steel} strokeWidth={84} strokeLinecap="round" opacity={0.45} />
        <path d="M 70 790 H 465" stroke={X.night} strokeWidth={54} strokeLinecap="round" />
        <path d="M 440 625 H 800 L 735 960 L 680 1050 H 560 L 505 960 Z" fill="#122a3d" stroke={X.steel} strokeWidth={8} />
        <rect x={545} y={1000} width={150} height={150} rx={25} fill="#182f40" stroke={X.amber} strokeWidth={6} />
        <path d="M 520 820 C 520 680 745 680 745 810 C 745 920 575 935 560 825" fill="none" stroke={X.cyan} strokeWidth={8} opacity={0.25 + carry * 0.75} />
        <path d="M 560 825 L 555 775 L 600 800 Z" fill={X.cyan} opacity={0.25 + carry * 0.75} />
        <CubicDots x1={110} y1={790} cx1={450} cy1={790} cx2={760} cy2={720} x2={625} y2={1015} t={t} count={5} color={X.amber} radius={10} speed={0.15} opacity={0.30 + carry * 0.70} />
        <MovingDots x1={620} y1={850} x2={620} y2={570} t={t} count={4} color={X.cyan} radius={8} speed={0.22} opacity={separate} />
        <Arrow x1={620} y1={635} x2={620} y2={555} color={X.cyan} width={9} opacity={separate} />
        {Array.from({ length: 5 }, (_, i) => <circle key={i} cx={575 + (i % 3) * 42} cy={1105 - Math.floor(i / 3) * 35} r={11} fill={X.amber} opacity={separate} />)}
        <ClearLabel x={215} y={680} targetX={260} targetY={755} text="Air + dirt enters" color={X.amber} />
        <ClearLabel x={800} y={580} targetX={630} targetY={570} text="Cleaner air leaves" color={X.cyan} opacity={separate} />
        <ClearLabel x={820} y={1100} targetX={695} targetY={1080} text="Dirt collects in bin" color={X.amber} opacity={separate} />
        <StageNote text="The air continues onward; heavier dirt is retained in the bin" color={X.cyan} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="filter" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="One filter, two directly compared states" lines={['Clogged blocks airflow', 'cleaning restores the passage']} accent={X.amber} size={56} />
      <SvgStage>
        <PanelLabel text="FILTER MAINTENANCE · BEFORE / AFTER" color={X.amber} />
        <FilterCard x={295} clogged active={1 - clean} t={t} />
        <FilterCard x={785} clogged={false} active={clean} t={t} />
        <StageNote text={clean > 0.55 ? 'Clean pleats leave open paths for strong airflow' : 'Dust on the intake side restricts air through the pleats'} color={clean > 0.55 ? X.green : X.amber} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The complete cleaning chain" lines={['Fan moves air', 'moving air transports dirt']} accent={X.green} size={58} />
      <SvgStage>
        <PanelLabel text="THREE PARTS · ONE CONTINUOUS PATH" color={X.green} />
        <g transform="translate(190 825)">
          <rect x={-125} y={-165} width={250} height={330} rx={30} fill="#112236" stroke={X.violet} strokeWidth={4} />
          <FanRotor x={0} y={0} r={80} t={t} />
          <ClearLabel x={0} y={235} text="1 · Fan runs" color={X.violet} />
        </g>
        <Arrow x1={330} y1={825} x2={405} y2={825} color={X.green} width={9} />
        <g transform="translate(540 825)">
          <rect x={-125} y={-165} width={250} height={330} rx={30} fill="#112236" stroke={X.cyan} strokeWidth={4} />
          <path d="M -85 0 H 85" stroke={X.steel} strokeWidth={60} strokeLinecap="round" opacity={0.4} />
          <MovingDots x1={-85} y1={0} x2={85} y2={0} t={t} count={4} color={X.cyan} radius={8} speed={0.23} />
          <Arrow x1={45} y1={0} x2={90} y2={0} color={X.cyan} width={7} />
          <ClearLabel x={0} y={235} text="2 · Air flows" color={X.cyan} />
        </g>
        <Arrow x1={675} y1={825} x2={750} y2={825} color={X.green} width={9} />
        <g transform="translate(885 825)">
          <rect x={-125} y={-165} width={250} height={330} rx={30} fill="#112236" stroke={X.amber} strokeWidth={4} />
          <DustBin x={0} y={0} width={170} height={240} t={t} />
          <ClearLabel x={0} y={235} text="3 · Dirt collects" color={X.amber} />
        </g>
        <StageNote text="Pressure difference → directed airflow → dirt pickup" color={X.green} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['vacuum cleaner', 'continuous airflow', 'electric motor', 'fan', 'air pressure', 'nozzle', 'moving air', 'cyclone or filter', 'clogged filter', 'transports dirt']} />
    <CalmSound narration="voiceovers/vacuum-cleaner/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={42} />
  </AbsoluteFill>;
};
export default Short46VacuumCleaner;
