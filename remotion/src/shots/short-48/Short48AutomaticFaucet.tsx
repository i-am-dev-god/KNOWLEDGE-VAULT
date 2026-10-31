import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, MovingDots } from '../../lib/focus';
import { CinematicBackground, DeviceStage, FlowPath, SceneHeading, SvgStage, TinyLabel, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short48AutomaticFaucet', durationInSeconds: 39.5, fps: 30, width: 1080, height: 1920 };

const Hand: React.FC<{ x: number; y: number; scale?: number; opacity?: number; rotation?: number }> = ({ x, y, scale = 1, opacity = 1, rotation = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} opacity={opacity} fill="#b98265" stroke="#efb294" strokeWidth={6} strokeLinejoin="round">
    <path d="M -48 180 H 48 L 62 105 H -62 Z" />
    <rect x={-76} y={-5} width={152} height={145} rx={58} />
    {[-57, -19, 19, 57].map((fx, i) => <rect key={fx} x={fx - 15} y={-112 - (i === 1 || i === 2 ? 24 : 0)} width={30} height={140 + (i === 1 || i === 2 ? 24 : 0)} rx={15} />)}
    <rect x={58} y={25} width={34} height={105} rx={17} transform="rotate(38 75 80)" />
    <path d="M -45 55 Q 0 85 45 55" fill="none" stroke="#8d5d4b" strokeWidth={5} opacity={0.55} />
  </g>
);

const SensorWindow: React.FC<{ x?: number; y?: number; compact?: boolean; labels?: boolean }> = ({ x = 540, y = 610, compact = false, labels = true }) => (
  <g transform={`translate(${x} ${y}) scale(${compact ? 0.78 : 1})`}>
    <rect x={-300} y={-65} width={600} height={130} rx={38} fill="#1b3246" stroke={X.steel} strokeWidth={7} />
    <circle cx={-150} cy={0} r={42} fill="#251e3d" stroke={X.violet} strokeWidth={6} />
    <circle cx={-150} cy={0} r={17} fill={X.violet} />
    <circle cx={150} cy={0} r={42} fill="#123039" stroke={X.cyan} strokeWidth={6} />
    <circle cx={150} cy={0} r={15} fill={X.cyan} opacity={0.65} />
    {labels && <>
      <ClearLabel x={-150} y={115} text="Infrared LED" color={X.violet} size={22} />
      <ClearLabel x={150} y={115} text="Receiver" color={X.cyan} size={22} />
    </>}
  </g>
);

const SolenoidValve: React.FC<{ x: number; y: number; open: number; scale?: number; t: number; labels?: boolean }> = ({ x, y, open, scale = 1, t, labels = true }) => {
  const closed = 1 - open;
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-205} y={-235} width={410} height={480} rx={32} fill="#102438" stroke={open > 0.5 ? X.green : X.steel} strokeWidth={6} />
    <path d="M -180 125 H 180" stroke={X.steel} strokeWidth={82} strokeLinecap="round" />
    <path d="M -180 125 H 180" stroke={X.night} strokeWidth={52} strokeLinecap="round" />
    <path d="M -45 80 L 0 105 L 45 80" fill="none" stroke={X.amber} strokeWidth={10} strokeLinejoin="round" />
    <rect x={-92} y={-180} width={184} height={170} rx={24} fill="#302b4a" stroke={X.violet} strokeWidth={6} />
    {[-145, -110, -75, -40].map((cy) => <path key={cy} d={`M -75 ${cy} H 75`} stroke={X.violet} strokeWidth={7} opacity={0.75} />)}
    <rect x={-17} y={-155 + closed * 75} width={34} height={185} rx={12} fill={X.amber} stroke={X.white} strokeWidth={4} />
    <path d="M -17 30 L 0 52 L 17 30" fill={X.amber} transform={`translate(0 ${closed * 75})`} />
    <g opacity={open}>
      <MovingDots x1={-150} y1={125} x2={150} y2={125} t={t} count={5} color={X.cyan} radius={8} speed={0.25} />
      <Arrow x1={95} y1={125} x2={155} y2={125} color={X.cyan} width={7} />
    </g>
    {labels && <>
      <ClearLabel x={0} y={-200} text="Solenoid coil" color={X.violet} size={20} />
      <ClearLabel x={145} y={-45} targetX={20} targetY={-35 + closed * 75} text="Plunger" color={X.amber} anchor="start" size={20} />
      <ClearLabel x={-145} y={200} text="Water in" color={X.cyan} size={19} />
      <ClearLabel x={145} y={200} text={open > 0.5 ? 'Water out' : 'Flow blocked'} color={open > 0.5 ? X.cyan : X.coral} size={19} />
    </>}
  </g>;
};

const Short48AutomaticFaucet: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const hands = prog(t, 0.10, 0.80);
  const water = prog(t, 0.75, 1.20);
  const sensor = prog(t, line(VO, 'hook-sensor').start - 0.08, line(VO, 'hook-sensor').start + 0.60);
  const pulses = prog(t, line(VO, 'emit-pulses').start - 0.08, line(VO, 'emit-pulses').start + 0.55);
  const clear = prog(t, line(VO, 'emit-clear').start - 0.08, line(VO, 'emit-clear').start + 0.55);
  const reflect = prog(t, line(VO, 'reflect-hands').start - 0.08, line(VO, 'reflect-hands').start + 0.60);
  const valve = prog(t, line(VO, 'reflect-valve').start - 0.08, line(VO, 'reflect-valve').start + 0.60);
  const remove = prog(t, line(VO, 'valve-remove').start + 0.25, line(VO, 'valve-remove').start + 1.45);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A faucet and sink, not an abstract sensor" lines={['Hands enter the detection zone', 'then the water starts']} accent={X.cyan} size={56} />
      <SvgStage>
        <PanelLabel text="HANDS → SENSOR → WATER STREAM" color={X.cyan} />
        <path d="M 270 1120 V 690 Q 270 580 380 580 H 720 Q 790 580 790 650 V 720" fill="none" stroke={X.steel} strokeWidth={96} strokeLinecap="round" />
        <path d="M 270 1120 V 690 Q 270 580 380 580 H 720 Q 790 580 790 650 V 720" fill="none" stroke="#334e63" strokeWidth={64} strokeLinecap="round" />
        <rect x={185} y={1090} width={170} height={70} rx={25} fill="#435b70" stroke={X.steel} strokeWidth={7} />
        <rect x={735} y={705} width={110} height={58} rx={20} fill="#111f2c" stroke={sensor > 0.3 ? X.violet : X.steel} strokeWidth={5} />
        <circle cx={770} cy={735} r={11} fill={X.violet} /><circle cx={812} cy={735} r={11} fill={X.cyan} />
        <ClearLabel x={920} y={650} targetX={825} targetY={715} text="IR sensor window" color={X.violet} anchor="end" opacity={sensor} />
        <g opacity={water}>
          <FlowPath d="M 790 775 V 1135" t={t} color={X.cyan} width={24} speed={125} dash="25 18" />
          <MovingDots x1={790} y1={785} x2={790} y2={1135} t={t} count={6} color={X.white} radius={6} speed={0.34} />
        </g>
        <Hand x={750} y={1020 + (1 - hands) * 100} scale={0.78} opacity={0.45 + hands * 0.55} />
        <path d="M 120 1160 Q 540 1370 960 1160 L 900 1240 Q 540 1390 180 1240 Z" fill="#1b3245" stroke={X.steel} strokeWidth={8} />
        <ellipse cx={790} cy={1175} rx={95} ry={25} fill="none" stroke={X.cyan} strokeWidth={5} opacity={water * 0.6} />
        <StageNote y={1325} text={water > 0.5 ? 'Hands detected → valve open → water flows into the basin' : 'The hand approaches before the water starts'} color={X.cyan} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="emit" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="Close-up of the faucet’s sensor window" lines={['The LED emits infrared', 'with no hand, little returns']} accent={X.violet} size={56} />
      <SvgStage>
        <PanelLabel text="OUTGOING LIGHT · EMPTY DETECTION ZONE" color={X.violet} />
        <SensorWindow />
        {[0, 1, 2].map((i) => <path key={i} d={`M 390 675 L ${285 + i * 105} 1080`} fill="none" stroke={X.violet} strokeWidth={6} opacity={0.18 + pulses * 0.35} />)}
        <MovingDots x1={390} y1={680} x2={390} y2={1080} t={t} count={5} color={X.violet} radius={8} speed={0.24} opacity={0.25 + pulses * 0.75} />
        <Arrow x1={390} y1={960} x2={390} y2={1060} color={X.violet} width={7} opacity={pulses} />
        <g opacity={clear}>
          <rect x={245} y={940} width={590} height={170} rx={28} fill="#0b1a29" fillOpacity={0.65} stroke={X.muted} strokeWidth={3} />
          <ClearLabel x={540} y={1020} text="No hand in this zone" color={X.white} />
          <ClearLabel x={690} y={835} targetX={690} targetY={675} text="Receiver gets no strong return" color={X.cyan} size={21} />
        </g>
        <StageNote text="Infrared travels outward; an empty zone sends little back" color={X.violet} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="reflect" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="Reflection and valve action, side by side" lines={['Hands return the infrared', 'the controller opens the valve']} accent={X.cyan} size={55} />
      <SvgStage>
        <PanelLabel text="DETECTION ON THE LEFT · WATER CONTROL ON THE RIGHT" color={X.cyan} />
        <g transform="translate(335 650) scale(0.78)">
          <SensorWindow x={0} y={0} labels={false} />
        </g>
        <Hand x={335} y={1080} scale={0.58} />
        <Arrow x1={240} y1={700} x2={310} y2={990} color={X.violet} width={7} opacity={0.25 + reflect * 0.75} />
        <Arrow x1={355} y1={990} x2={430} y2={700} color={X.cyan} width={7} opacity={0.25 + reflect * 0.75} />
        <MovingDots x1={240} y1={700} x2={310} y2={990} t={t} count={3} color={X.violet} radius={7} speed={0.22} opacity={reflect} />
        <MovingDots x1={355} y1={990} x2={430} y2={700} t={t} count={3} color={X.cyan} radius={7} speed={0.22} opacity={reflect} />
        <ClearLabel x={330} y={840} text="Reflected IR" color={X.cyan} opacity={reflect} />
        <rect x={585} y={575} width={150} height={85} rx={20} fill="#182b40" stroke={X.violet} strokeWidth={5} opacity={0.35 + valve * 0.65} />
        <ClearLabel x={660} y={628} text="Controller" color={X.violet} size={20} opacity={0.35 + valve * 0.65} />
        <Arrow x1={450} y1={655} x2={585} y2={620} color={X.violet} width={6} opacity={valve} />
        <Arrow x1={660} y1={665} x2={735} y2={835} color={X.violet} width={6} opacity={valve} />
        <SolenoidValve x={805} y={935} open={valve} scale={0.72} t={t} />
        {valve > 0.05 && <HighlightPart x={655} y={765} width={300} height={350} color={X.green} opacity={valve * 0.35} />}
        <StageNote text={valve > 0.45 ? 'The plunger lifts, opening a continuous path through the pipe' : 'The hand returns a stronger signal to the receiver'} color={X.cyan} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="valve" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The same control chain in reverse" lines={['Hands leave the sensor', 'the plunger blocks the pipe']} accent={X.green} size={56} />
      <SvgStage>
        <PanelLabel text="NO RETURN SIGNAL → VALVE CLOSED → WATER OFF" color={X.green} />
        <g transform="translate(230 615) scale(0.55)"><SensorWindow x={0} y={0} labels={false} /></g>
        <Hand x={145 - remove * 120} y={940} scale={0.45} opacity={1 - remove * 0.85} rotation={-20} />
        <path d="M 215 760 Q 300 700 320 665" fill="none" stroke={X.cyan} strokeWidth={6} opacity={1 - remove} />
        <ClearLabel x={290} y={860} text={remove > 0.5 ? 'No reflected signal' : 'Reflection falling'} color={remove > 0.5 ? X.coral : X.cyan} />
        <SolenoidValve x={675} y={915} open={1 - remove} scale={0.92} t={t} />
        <StageNote text={remove > 0.5 ? 'Plunger down → valve seat blocked → no water can pass' : 'The controller lowers the plunger as the return signal disappears'} color={remove > 0.5 ? X.green : X.amber} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The complete faucet, in three steps" lines={['Reflected infrared', 'controls a real water valve']} accent={X.green} size={57} />
      <SvgStage>
        <PanelLabel text="SENSE → OPEN THE VALVE → DELIVER WATER" color={X.green} />
        <g transform="translate(195 825)">
          <rect x={-130} y={-165} width={260} height={330} rx={30} fill="#112236" stroke={X.violet} strokeWidth={4} />
          <circle cx={-45} cy={-55} r={30} fill="#251e3d" stroke={X.violet} strokeWidth={5} />
          <circle cx={55} cy={-55} r={30} fill="#123039" stroke={X.cyan} strokeWidth={5} />
          <Hand x={5} y={75} scale={0.32} />
          <Arrow x1={-45} y1={-15} x2={-10} y2={45} color={X.violet} width={5} /><Arrow x1={25} y1={45} x2={55} y2={-15} color={X.cyan} width={5} />
          <ClearLabel x={0} y={235} text="1 · Hand reflects IR" color={X.violet} size={21} />
        </g>
        <Arrow x1={340} y1={825} x2={405} y2={825} color={X.green} width={8} />
        <g transform="translate(540 825)">
          <rect x={-130} y={-165} width={260} height={330} rx={30} fill="#112236" stroke={X.green} strokeWidth={4} />
          <SolenoidValve x={0} y={0} open={1} scale={0.52} t={t} labels={false} />
          <ClearLabel x={0} y={235} text="2 · Valve opens" color={X.green} size={21} />
        </g>
        <Arrow x1={675} y1={825} x2={750} y2={825} color={X.green} width={8} />
        <g transform="translate(885 825)">
          <rect x={-130} y={-165} width={260} height={330} rx={30} fill="#112236" stroke={X.cyan} strokeWidth={4} />
          <path d="M -70 -105 H 55 Q 85 -105 85 -65 V -25" fill="none" stroke={X.steel} strokeWidth={34} strokeLinecap="round" />
          <FlowPath d="M 85 -5 V 115" t={t} color={X.cyan} width={16} speed={110} dash="20 16" />
          <ClearLabel x={0} y={235} text="3 · Water flows" color={X.cyan} size={21} />
        </g>
        <StageNote text="Emit → reflect → detect → lift plunger → water flows" color={X.green} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['automatic faucet', 'without a touch', 'infrared sensor', 'infrared LED', 'pulses of light', 'receiver', 'reflect', 'solenoid valve', 'reflection disappears', 'water flow']} />
    <CalmSound narration="voiceovers/automatic-faucet/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={39.5} />
  </AbsoluteFill>;
};
export default Short48AutomaticFaucet;
