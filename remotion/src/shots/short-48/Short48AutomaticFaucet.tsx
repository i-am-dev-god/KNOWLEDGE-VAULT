import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, DeviceStage, FlowPath, Glow, Leader, QuadraticPulse,
  SceneHeading, StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short48AutomaticFaucet', durationInSeconds: 39.5, fps: 30, width: 1080, height: 1920 };

const Hands: React.FC<{ x: number; y: number; opacity?: number; scale?: number }> = ({ x, y, opacity = 1, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fill="#b98265" stroke="#e0ae91" strokeWidth={6}>
    {[-1, 1].map((side) => <g key={side} transform={`translate(${side * 105} 0) rotate(${side * -14})`}>
      <rect x={-65} y={-20} width={130} height={190} rx={55} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={-59 + i * 31} y={-125 - (i === 1 || i === 2 ? 24 : 0)} width={27} height={145 + (i === 1 || i === 2 ? 24 : 0)} rx={14} />)}
      <rect x={side * 48 - 15} y={15} width={32} height={105} rx={16} transform={`rotate(${side * 38})`} />
    </g>)}
  </g>
);

const SensorPanel: React.FC<{ active?: number }> = ({ active = 1 }) => (
  <g>
    <rect x={220} y={535} width={640} height={140} rx={45} fill="#20364a" stroke={X.steel} strokeWidth={8} />
    <circle cx={360} cy={605} r={43} fill="#281f42" stroke={X.violet} strokeWidth={7} />
    <circle cx={360} cy={605} r={18 + Math.sin(active * 6) * 3} fill={X.violet} />
    <circle cx={720} cy={605} r={43} fill="#142f39" stroke={X.cyan} strokeWidth={7} />
    <circle cx={720} cy={605} r={17} fill={X.cyan} opacity={0.55} />
    <TinyLabel x={360} y={730} text="INFRARED LED" color={X.violet} />
    <TinyLabel x={720} y={730} text="RECEIVER" color={X.cyan} />
  </g>
);

const Short48AutomaticFaucet: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const on = prog(t, 0.20, 1.10);
  const sensor = prog(t, line(VO, 'hook-sensor').start - 0.08, line(VO, 'hook-sensor').start + 0.60);
  const pulses = prog(t, line(VO, 'emit-pulses').start - 0.08, line(VO, 'emit-pulses').start + 0.55);
  const clear = prog(t, line(VO, 'emit-clear').start - 0.08, line(VO, 'emit-clear').start + 0.55);
  const reflect = prog(t, line(VO, 'reflect-hands').start - 0.08, line(VO, 'reflect-hands').start + 0.60);
  const valve = prog(t, line(VO, 'reflect-valve').start - 0.08, line(VO, 'reflect-valve').start + 0.60);
  const remove = prog(t, line(VO, 'valve-remove').start + 0.25, line(VO, 'valve-remove').start + 1.45);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="The hands-free result comes first" lines={['Hands below', 'water starts']} accent={X.cyan} />
      <SvgStage>
        <path d="M 285 1110 V 655 Q 285 570 375 570 H 715 Q 795 570 795 650 V 720" fill="none" stroke={X.steel} strokeWidth={92} strokeLinecap="round" />
        <path d="M 285 1110 V 655 Q 285 570 375 570 H 715 Q 795 570 795 650 V 720" fill="none" stroke="#314b60" strokeWidth={62} strokeLinecap="round" />
        <rect x={195} y={1080} width={180} height={85} rx={30} fill="#425a6e" stroke={X.steel} strokeWidth={8} />
        <rect x={735} y={705} width={120} height={65} rx={25} fill="#142736" stroke={sensor > 0.4 ? X.violet : X.steel} strokeWidth={6} />
        <circle cx={795} cy={738} r={15} fill={X.violet} opacity={0.5 + on * 0.5} />
        <g opacity={on}>
          <Glow x={795} y={960} r={155} color={X.cyan} opacity={0.45} />
          <FlowPath d="M 795 790 V 1120" t={t} color={X.cyan} width={26} speed={150} dash="24 20" />
          <MovingDots x1={795} y1={790} x2={795} y2={1120} t={t} count={8} color={X.white} radius={7} speed={0.42} />
        </g>
        <Hands x={680} y={1120 + (1 - on) * 90} scale={0.78} opacity={0.55 + on * 0.45} />
        <FocusRing x={795} y={738} rx={120} ry={95} t={t} color={X.violet} opacity={sensor} />
        <Leader x={895} y={610} tx={825} ty={720} text="INFRARED SENSOR" color={X.violet} opacity={sensor} anchor="end" />
        <StatusPill x={540} y={1330} text={on > 0.55 ? 'HANDS DETECTED · WATER ON' : 'HANDS APPROACH THE SENSOR'} color={on > 0.55 ? X.green : X.cyan} width={560} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="emit" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The sensor sends an invisible signal" lines={['Infrared pulses', 'travel outward']} accent={X.violet} />
      <SvgStage>
        <SensorPanel active={t} />
        {[0, 1, 2].map((i) => <g key={i} opacity={0.25 + pulses * 0.75}>
          <QuadraticPulse x1={360} y1={660} cx={320 + i * 80} cy={820} x2={250 + i * 220} y2={1110} t={t} count={4} color={X.violet} radius={10} speed={0.30} />
          <FlowPath d={`M 360 660 Q ${320 + i * 80} 820 ${250 + i * 220} 1110`} t={t} color={X.violet} width={5} speed={70} opacity={0.45} />
        </g>)}
        <g opacity={clear}>
          <path d="M 250 1110 Q 420 960 690 660" fill="none" stroke={X.cyan} strokeWidth={5} strokeDasharray="9 15" opacity={0.16} />
          <TinyLabel x={550} y={1210} text="NO HANDS · LITTLE LIGHT RETURNS" color={X.cyan} />
          <FocusRing x={720} y={605} rx={95} ry={90} t={t} color={X.cyan} opacity={0.35} />
        </g>
        <StatusPill x={540} y={1320} text="INFRARED IS LIGHT WE CANNOT SEE" color={X.violet} opacity={pulses} width={620} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="reflect" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="Hands change the returning signal" lines={['Reflected light', 'opens the valve']} accent={X.cyan} />
      <SvgStage>
        <SensorPanel active={t} />
        <Hands x={535} y={1080} scale={0.72} />
        <g opacity={0.25 + reflect * 0.75}>
          <QuadraticPulse x1={360} y1={660} cx={330} cy={820} x2={480} y2={940} t={t} count={5} color={X.violet} radius={10} speed={0.32} />
          <QuadraticPulse x1={480} y1={940} cx={670} cy={850} x2={720} y2={660} t={t} count={5} color={X.cyan} radius={10} speed={0.32} />
          <FocusRing x={540} y={970} rx={245} ry={210} t={t} color={X.cyan} opacity={reflect} />
        </g>
        <g transform="translate(905 800)" opacity={0.30 + valve * 0.70}>
          <rect x={-105} y={-90} width={210} height={165} rx={28} fill={X.panel2} stroke={X.violet} strokeWidth={6} />
          <TinyLabel x={0} y={0} text="CONTROLLER" color={X.violet} />
          <Arrow x1={0} y1={90} x2={0} y2={190} color={X.violet} width={7} />
          <rect x={-120} y={200} width={240} height={190} rx={35} fill="#183244" stroke={valve > 0.45 ? X.green : X.steel} strokeWidth={7} />
          <path d={`M 0 225 V ${290 - valve * 50}`} stroke={X.amber} strokeWidth={22} />
          <TinyLabel x={0} y={445} text="SOLENOID VALVE" color={valve > 0.45 ? X.green : X.steel} />
          <FocusRing x={0} y={295} rx={155} ry={140} t={t} color={X.green} opacity={valve} />
        </g>
        <StatusPill x={540} y={1360} text={valve > 0.45 ? 'STRONG RETURN SIGNAL · VALVE OPENS' : 'HANDS REFLECT LIGHT TO THE RECEIVER'} color={valve > 0.45 ? X.green : X.cyan} width={700} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="valve" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The signal disappears too" lines={['Hands move away', 'the water stops']} accent={X.green} />
      <SvgStage>
        <Hands x={220 - remove * 180} y={720} scale={0.55} opacity={1 - remove * 0.75} />
        <path d="M 300 730 Q 390 620 480 610" fill="none" stroke={X.cyan} strokeWidth={7} strokeDasharray="10 14" opacity={1 - remove} />
        <g transform="translate(650 790)">
          <rect x={-260} y={-190} width={520} height={390} rx={55} fill="#142b3d" stroke={X.steel} strokeWidth={9} />
          <rect x={-225} y={-150} width={115} height={250} rx={25} fill="#3c3557" stroke={X.violet} strokeWidth={7} />
          <rect x={110} y={-150} width={115} height={250} rx={25} fill="#3c3557" stroke={X.violet} strokeWidth={7} />
          <path d={`M 0 -145 V ${35 + remove * 95}`} stroke={X.amber} strokeWidth={34} strokeLinecap="round" />
          <circle cy={-145} r={34} fill={X.steel} />
          <path d="M -260 130 H 260" stroke={X.cyan} strokeWidth={65} opacity={0.22 + (1 - remove) * 0.30} />
          <path d={`M 0 ${35 + remove * 95} V 130`} stroke={remove > 0.5 ? X.coral : X.green} strokeWidth={20} />
          <FocusRing x={0} y={0} rx={300} ry={240} t={t} color={remove > 0.5 ? X.green : X.amber} opacity={0.8} />
        </g>
        <g opacity={1 - remove}>
          <MovingDots x1={390} y1={920} x2={910} y2={920} t={t} count={8} color={X.cyan} radius={11} speed={0.30} />
        </g>
        <StatusPill x={540} y={1270} text={remove > 0.5 ? 'NO REFLECTION · VALVE CLOSED · WATER OFF' : 'RETURN SIGNAL FALLS · VALVE CLOSES'} color={remove > 0.5 ? X.green : X.amber} width={720} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="One touch-free control chain" lines={['Reflected infrared', 'controls the water']} accent={X.green} />
      <SvgStage>
        <g transform="translate(180 800)">
          <circle r={75} fill={X.panel2} stroke={X.violet} strokeWidth={8} /><circle r={25} fill={X.violet} />
          {[0, 1, 2].map((i) => <path key={i} d={`M ${-45 + i * 45} 95 Q ${-80 + i * 70} 170 ${-100 + i * 90} 220`} fill="none" stroke={X.violet} strokeWidth={6} strokeDasharray="9 12" strokeDashoffset={-t * 35} />)}
          <TinyLabel x={0} y={310} text="INFRARED PULSES" color={X.violet} />
        </g>
        <Arrow x1={290} y1={800} x2={375} y2={800} color={X.green} width={8} />
        <Hands x={500} y={835} scale={0.42} />
        <FocusRing x={500} y={820} rx={135} ry={170} t={t} color={X.cyan} opacity={0.7} />
        <TinyLabel x={500} y={1110} text="HANDS REFLECT" color={X.cyan} />
        <Arrow x1={635} y1={800} x2={725} y2={800} color={X.green} width={8} />
        <g transform="translate(850 800)">
          <rect x={-105} y={-115} width={210} height={230} rx={40} fill={X.panel2} stroke={X.green} strokeWidth={8} />
          <FlowPath d="M 0 -85 V 200" t={t} color={X.cyan} width={18} speed={110} dash="20 18" />
          <TinyLabel x={0} y={310} text="WATER FLOWS" color={X.green} />
        </g>
        <StatusPill x={540} y={1320} text="EMIT → REFLECT → DETECT → OPEN VALVE" color={X.green} width={680} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['automatic faucet', 'without a touch', 'infrared sensor', 'infrared LED', 'pulses of light', 'receiver', 'reflect', 'solenoid valve', 'reflection disappears', 'water flow']} />
    <CalmSound narration="voiceovers/automatic-faucet/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={39.5} />
  </AbsoluteFill>;
};
export default Short48AutomaticFaucet;
