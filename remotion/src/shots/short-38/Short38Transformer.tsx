import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line, wavePath } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, DeviceStage, FlowPath, Glow, Leader, SceneHeading,
  StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short38Transformer', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };

const IronCore: React.FC<{ x?: number; y?: number; scale?: number; opacity?: number }> = ({ x = 540, y = 830, scale = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <rect x={-320} y={-285} width={640} height={570} rx={85} fill="none" stroke="#273648" strokeWidth={94} />
    <rect x={-320} y={-285} width={640} height={570} rx={85} fill="none" stroke="#73859a" strokeWidth={7} opacity={0.75} />
    {[-285, -255, 255, 285].map((yy) => <path key={yy} d={`M -260 ${yy} H 260`} stroke="#a2b0c0" strokeWidth={3} opacity={0.25} />)}
    {[-320, 320].map((xx) => <g key={xx}>{[-180, -90, 0, 90, 180].map((yy) => <path key={yy} d={`M ${xx - 40} ${yy} H ${xx + 40}`} stroke="#a2b0c0" strokeWidth={3} opacity={0.22} />)}</g>)}
  </g>
);

const Winding: React.FC<{ x: number; y: number; turns?: number; color?: string; opacity?: number; scale?: number }> = ({
  x, y, turns = 7, color = X.coral, opacity = 1, scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    {Array.from({ length: turns }, (_, i) => {
      const yy = (i - (turns - 1) / 2) * Math.min(48, 360 / Math.max(1, turns - 1));
      return <g key={i}>
        <ellipse cx={0} cy={yy} rx={82} ry={25} fill="none" stroke="#552c38" strokeWidth={19} />
        <path d={`M -82 ${yy} A 82 25 0 0 1 82 ${yy}`} fill="none" stroke={color} strokeWidth={12} />
        <path d={`M -72 ${yy - 6} A 75 20 0 0 1 72 ${yy - 6}`} fill="none" stroke={X.white} strokeWidth={2.5} opacity={0.28} />
      </g>;
    })}
  </g>
);

const AcSource: React.FC<{ x: number; y: number; label?: string; color?: string; opacity?: number }> = ({ x, y, label = 'AC', color = X.coral, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <circle r={73} fill={X.panel2} stroke={color} strokeWidth={5} />
    <path d="M -43 0 C -25 -48 -10 -48 0 0 C 10 48 25 48 43 0" fill="none" stroke={color} strokeWidth={7} />
    <TinyLabel x={0} y={115} text={label} color={color} />
  </g>
);

const Short38Transformer: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const transfer = prog(t, line(VO, 'hook-transfer').start - 0.1, line(VO, 'hook-transfer').start + 0.7);
  const primary = prog(t, line(VO, 'primary-ac').start - 0.1, line(VO, 'primary-ac').start + 0.8);
  const flux = prog(t, line(VO, 'core-flux').start - 0.1, line(VO, 'core-flux').start + 0.8);
  const linked = prog(t, line(VO, 'core-link').start - 0.1, line(VO, 'core-link').start + 0.7);
  const induced = prog(t, line(VO, 'secondary-induce').start - 0.1, line(VO, 'secondary-induce').start + 0.8);
  const ratio = prog(t, line(VO, 'turns-up-down').start - 0.1, line(VO, 'turns-up-down').start + 0.7);
  const phase = (Math.sin(t * 2.3) + 1) / 2;

  const fluxForward = 'M 290 545 H 790 Q 860 545 860 615 V 1045 Q 860 1115 790 1115 H 290 Q 220 1115 220 1045 V 615 Q 220 545 290 545';
  const fluxReverse = 'M 290 545 Q 220 545 220 615 V 1045 Q 220 1115 290 1115 H 790 Q 860 1115 860 1045 V 615 Q 860 545 790 545 H 290';

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="Inside an AC power transformer" lines={['Change voltage', 'through magnetism']} accent={X.violet} />
      <SvgStage>
        <Glow x={540} y={825} r={310} color={X.violet} opacity={0.55} />
        <IronCore /><Winding x={220} y={830} turns={7} color={X.coral} /><Winding x={860} y={830} turns={7} color={X.blue} />
        <AcSource x={115} y={1160} label="AC INPUT" color={X.coral} /><AcSource x={965} y={1160} label="AC OUTPUT" color={X.blue} />
        <path d="M 145 1080 L 190 1030 M 935 1080 L 890 1030" stroke={X.steel} strokeWidth={5} opacity={0.55} />
        <g opacity={transfer}>
          <rect x={424} y={715} width={232} height={230} rx={35} fill={X.night} stroke={X.violet} strokeWidth={3} strokeDasharray="10 10" />
          <TinyLabel x={540} y={810} text="NO DIRECT" color={X.violet} /><TinyLabel x={540} y={850} text="WIRE CONNECTION" color={X.violet} />
          <FocusRing x={540} y={830} rx={160} ry={205} t={t} color={X.violet} opacity={transfer} />
        </g>
        <StatusPill x={540} y={1320} text="ENERGY CROSSES THROUGH A MAGNETIC FIELD" color={X.violet} opacity={transfer} width={730} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="primary" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.coral} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="The primary winding receives AC" lines={['Changing current', 'starts the process']} accent={X.coral} />
      <SvgStage>
        <IronCore opacity={0.32} /><Winding x={220} y={825} turns={8} color={X.coral} opacity={0.4 + primary * 0.6} /><Winding x={860} y={825} turns={8} color={X.blue} opacity={0.16} />
        <FocusRing x={220} y={825} rx={155} ry={300} t={t} color={X.coral} opacity={primary} />
        <AcSource x={150} y={1160} label="ALTERNATING CURRENT" color={X.coral} />
        <path d="M 150 1085 C 150 1030 135 1010 140 960" fill="none" stroke={X.coral} strokeWidth={7} />
        <MovingDots x1={150} y1={1070} x2={145} y2={970} t={t} color={X.amber} count={3} radius={8} opacity={primary} />
        <path d={wavePath(360, 1190, 560, 72, 2.5, t * 2.3)} fill="none" stroke={X.coral} strokeWidth={8} opacity={primary} />
        <TinyLabel x={640} y={1310} text="CURRENT DIRECTION CONTINUALLY REVERSES" color={X.coral} opacity={primary} />
        <Leader x={540} y={540} tx={255} ty={610} text="PRIMARY COIL" color={X.coral} opacity={primary} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="core" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The laminated iron core links both coils" lines={['Guide the changing', 'magnetic field']} accent={X.violet} />
      <SvgStage>
        <IronCore opacity={0.9} /><Winding x={220} y={830} turns={7} color={X.coral} opacity={0.48} /><Winding x={860} y={830} turns={7} color={X.blue} opacity={0.25 + linked * 0.55} />
        <FlowPath d={fluxForward} t={t} color={X.violet} width={13} speed={105} dash="12 30" opacity={(0.15 + flux * 0.85) * phase} />
        <FlowPath d={fluxReverse} t={t} color={X.cyan} width={13} speed={105} dash="12 30" opacity={(0.15 + flux * 0.85) * (1 - phase)} />
        <FocusRing x={860} y={830} rx={155} ry={295} t={t} color={X.blue} opacity={linked} />
        <Leader x={540} y={500} tx={540} ty={545} text="CHANGING MAGNETIC FLUX" color={X.violet} opacity={flux} />
        <Leader x={540} y={1210} tx={855} ty={1050} text="THE FIELD LINKS THE SECONDARY" color={X.blue} opacity={linked} />
        <StatusPill x={540} y={1320} text="THE CORE PROVIDES A CLOSED MAGNETIC LOOP" color={X.violet} opacity={flux} width={710} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="secondary" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.blue} /><DeviceStage accent={X.blue} />
      <SceneHeading eyebrow="Magnetic induction creates output voltage" lines={['Changing flux induces', 'secondary AC']} accent={X.blue} size={59} />
      <SvgStage>
        <IronCore opacity={0.35} /><Winding x={220} y={825} turns={7} color={X.coral} opacity={0.22} /><Winding x={860} y={825} turns={7} color={X.blue} opacity={0.4 + induced * 0.6} />
        <FlowPath d={fluxForward} t={t} color={X.violet} width={10} speed={100} opacity={0.25 + phase * 0.25} />
        <FocusRing x={860} y={825} rx={160} ry={300} t={t} color={X.blue} opacity={induced} />
        <path d="M 920 1030 C 960 1080 950 1100 950 1130" fill="none" stroke={X.blue} strokeWidth={7} opacity={induced} />
        <path d={wavePath(330, 1180, 590, 82, 2.5, t * 2.3)} fill="none" stroke={X.blue} strokeWidth={9} opacity={induced} />
        <TinyLabel x={625} y={1315} text="INDUCED ALTERNATING OUTPUT VOLTAGE" color={X.blue} opacity={induced} />
        <Leader x={540} y={520} tx={850} ty={600} text="SECONDARY COIL" color={X.blue} opacity={induced} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="turns" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="The winding ratio determines the result" lines={['Count the turns', 'set the voltage']} accent={X.amber} />
      <SvgStage>
        <g transform={`translate(275 800) scale(0.52)`} opacity={0.4 + ratio * 0.6}>
          <IronCore x={0} y={0} /><Winding x={-320} y={0} turns={4} color={X.coral} /><Winding x={320} y={0} turns={8} color={X.blue} />
          <FocusRing x={320} y={0} rx={145} ry={280} t={t} color={X.blue} opacity={ratio} />
        </g>
        <g transform={`translate(805 800) scale(0.52)`} opacity={0.4 + ratio * 0.6}>
          <IronCore x={0} y={0} /><Winding x={-320} y={0} turns={8} color={X.coral} /><Winding x={320} y={0} turns={4} color={X.blue} />
          <FocusRing x={320} y={0} rx={145} ry={280} t={t} color={X.amber} opacity={ratio} />
        </g>
        <TinyLabel x={275} y={510} text="STEP UP · 4 : 8 TURNS" color={X.blue} opacity={ratio} />
        <TinyLabel x={805} y={510} text="STEP DOWN · 8 : 4 TURNS" color={X.amber} opacity={ratio} />
        <StatusPill x={275} y={1130} text="MORE TURNS → HIGHER VOLTAGE" color={X.blue} opacity={ratio} width={420} />
        <StatusPill x={805} y={1130} text="FEWER TURNS → LOWER VOLTAGE" color={X.amber} opacity={ratio} width={400} />
        <TinyLabel x={540} y={1270} text="THE MAGNETIC LINK IS THE SAME; THE TURNS RATIO CHANGES" color={X.steel} opacity={ratio} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A complete transformer energy path" lines={['AC in. Flux links.', 'New voltage out.']} accent={X.cyan} size={58} />
      <SvgStage>
        <IronCore /><Winding x={220} y={830} turns={6} color={X.coral} /><Winding x={860} y={830} turns={9} color={X.blue} />
        <FlowPath d={fluxForward} t={t} color={X.cyan} width={12} speed={110} opacity={0.45 + phase * 0.45} />
        <AcSource x={115} y={1160} label="PRIMARY AC" color={X.coral} /><AcSource x={965} y={1160} label="SECONDARY AC" color={X.blue} />
        <Leader x={540} y={510} tx={540} ty={545} text="MAGNETIC INDUCTION" color={X.cyan} />
        <StatusPill x={540} y={1320} text="CHANGING FIELD + TURNS RATIO = CHANGED VOLTAGE" color={X.cyan} width={740} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['transformer', 'AC voltage', 'two coils', 'Alternating current', 'primary coil', 'magnetic field', 'iron core', 'secondary coil', 'alternating voltage', 'secondary turns', 'magnetic induction']} />
    <CalmSound narration="voiceovers/transformer/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short38Transformer;
