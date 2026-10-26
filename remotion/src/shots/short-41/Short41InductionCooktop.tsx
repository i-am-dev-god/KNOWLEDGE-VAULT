import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line, wavePath } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, CircularFlow, DeviceStage, FlowPath, Glow, Leader,
  SceneHeading, StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short41InductionCooktop', durationInSeconds: 39, fps: 30, width: 1080, height: 1920 };

const Steam: React.FC<{ x: number; y: number; t: number; opacity?: number }> = ({ x, y, t, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity} fill="none" stroke={X.white} strokeWidth={7} strokeLinecap="round">
    {[-105, 0, 105].map((dx, i) => {
      const sway = Math.sin(t * 2.2 + i * 1.7) * 24;
      return <path key={dx} d={`M ${dx} 0 C ${dx - 35} -55 ${dx + 42 + sway} -95 ${dx + sway} -155 C ${dx - 28 + sway} -205 ${dx + 25} -230 ${dx + 8} -270`} opacity={0.30 + 0.18 * Math.sin(t * 2.8 + i)} strokeDasharray="32 19" strokeDashoffset={-t * 35 - i * 12} />;
    })}
  </g>
);

const PanSide: React.FC<{ x: number; y: number; t: number; heat?: number; food?: boolean }> = ({ x, y, t, heat = 1, food = true }) => (
  <g transform={`translate(${x} ${y})`}>
    <Glow x={0} y={40} r={240} color={X.amber} opacity={0.25 + heat * 0.45} />
    <path d="M -285 -35 L -245 125 Q -235 165 -190 170 H 190 Q 235 165 245 125 L 285 -35 Z" fill="#1a2736" stroke={heat > 0.55 ? X.amber : X.steel} strokeWidth={9} />
    <path d="M -245 15 H 245 L 220 115 Q 215 130 185 132 H -185 Q -215 130 -220 115 Z" fill={food ? '#b57b43' : X.panel2} opacity={0.35 + heat * 0.40} />
    <rect x={-300} y={-60} width={600} height={38} rx={17} fill="#35485d" stroke={X.steel} strokeWidth={5} />
    <rect x={282} y={-37} width={245} height={52} rx={24} fill="#26374a" stroke={X.steel} strokeWidth={6} />
    {food && [0, 1, 2, 3, 4].map((i) => <circle key={i} cx={-150 + i * 72} cy={65 + Math.sin(t * 3.4 + i) * 22} r={10 + (i % 2) * 4} fill={X.amber} opacity={0.35 + heat * 0.45} />)}
    <Steam x={0} y={-85} t={t} opacity={0.30 + heat * 0.65} />
  </g>
);

const Short41InductionCooktop: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const field = prog(t, line(VO, 'hook-field').start - 0.08, line(VO, 'hook-field').start + 0.65);
  const coil = prog(t, line(VO, 'coil-current').start - 0.08, line(VO, 'coil-current').start + 0.65);
  const currents = prog(t, line(VO, 'pan-currents').start - 0.08, line(VO, 'pan-currents').start + 0.65);
  const resistance = prog(t, line(VO, 'pan-resistance').start - 0.08, line(VO, 'pan-resistance').start + 0.65);
  const food = prog(t, line(VO, 'food-conduction').start - 0.08, line(VO, 'food-conduction').start + 0.60);
  const required = prog(t, line(VO, 'pan-requirement').start - 0.08, line(VO, 'pan-requirement').start + 0.60);
  const alternating = Math.sin(t * 4.2);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="The useful result comes first" lines={['The pan becomes', 'the heater']} accent={X.amber} />
      <SvgStage>
        <PanSide x={475} y={715} t={t} heat={0.72 + 0.20 * Math.sin(t * 1.4)} />
        <rect x={105} y={925} width={850} height={72} rx={25} fill="#23364a" stroke={X.steel} strokeWidth={5} />
        <rect x={125} y={940} width={810} height={22} rx={11} fill={X.cyan} opacity={0.12} />
        <g opacity={0.42 + field * 0.50}>
          {[0, 1, 2].map((i) => <ellipse key={i} cx={475} cy={925} rx={185 - i * 48} ry={35 - i * 6} fill="none" stroke={X.cyan} strokeWidth={9} opacity={0.55 + i * 0.12} />)}
          <CircularFlow cx={475} cy={925} r={135} t={t} count={8} color={X.cyan} speed={0.26 * (alternating > 0 ? 1 : -1)} />
        </g>
        <g opacity={field}>
          {[245, 475, 705].map((x, i) => <path key={x} d={`M ${x} 895 C ${x - 125} 790 ${x - 105} 665 ${x} 610 C ${x + 105} 665 ${x + 125} 790 ${x} 895`} fill="none" stroke={X.violet} strokeWidth={5} strokeDasharray="10 13" strokeDashoffset={(i % 2 ? 1 : -1) * t * 45} />)}
          <FocusRing x={475} y={770} rx={335} ry={220} t={t} color={X.violet} opacity={0.8} />
        </g>
        <Leader x={795} y={570} tx={700} ty={690} text="THE PAN HEATS THE FOOD" color={X.amber} />
        <StatusPill x={540} y={1200} text="NO DIRECTLY HEATED BURNER · ENERGY ENTERS THE PAN" color={X.cyan} opacity={field} width={800} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="coil" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="Beneath the glass cooking zone" lines={['Alternating current', 'drives a copper coil']} accent={X.cyan} size={58} />
      <SvgStage>
        <rect x={140} y={650} width={800} height={55} rx={20} fill="#31485d" stroke={X.steel} strokeWidth={5} />
        <TinyLabel x={540} y={610} text="GLASS SURFACE · NOT THE HEAT SOURCE" color={X.steel} />
        <g opacity={0.40 + coil * 0.60}>
          {[0, 1, 2, 3].map((i) => <ellipse key={i} cx={540} cy={870} rx={315 - i * 62} ry={100 - i * 16} fill="none" stroke="#d58c54" strokeWidth={22} />)}
          <CircularFlow cx={540} cy={870} r={225} t={t} count={10} color={alternating > 0 ? X.cyan : X.violet} reverse={alternating < 0} speed={0.30} />
          <FocusRing x={540} y={870} rx={370} ry={155} t={t} color={X.cyan} opacity={coil} />
        </g>
        <Leader x={195} y={1110} tx={335} ty={940} text="COPPER INDUCTION COIL" color={X.amber} />
        <path d={wavePath(160, 1190, 760, 55, 3, t * 2.2)} fill="none" stroke={alternating > 0 ? X.cyan : X.violet} strokeWidth={8} />
        <TinyLabel x={540} y={1300} text="CURRENT DIRECTION CONTINUOUSLY REVERSES" color={X.cyan} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="currents" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The field acts inside the metal" lines={['Circular currents', 'make the pan hot']} accent={X.amber} />
      <SvgStage>
        <Glow x={540} y={835} r={310} color={X.amber} opacity={0.25 + resistance * 0.50} />
        <circle cx={540} cy={835} r={295} fill="#202e3c" stroke={resistance > 0.4 ? X.amber : X.steel} strokeWidth={15} />
        <circle cx={540} cy={835} r={245} fill="#172738" stroke="#d58c54" strokeWidth={9} />
        {[85, 155, 220].map((r, i) => <g key={r} opacity={0.25 + currents * 0.70}>
          <circle cx={540} cy={835} r={r} fill="none" stroke={i % 2 ? X.violet : X.cyan} strokeWidth={6} strokeDasharray="13 15" strokeDashoffset={(i % 2 ? 1 : -1) * t * 65} />
          <CircularFlow cx={540} cy={835} r={r} t={t} count={5 + i} color={i % 2 ? X.violet : X.cyan} reverse={i % 2 === 1} speed={0.25 + i * 0.04} />
        </g>)}
        <circle cx={540} cy={835} r={35 + resistance * 25} fill={X.amber} opacity={0.30 + resistance * 0.50} />
        <FocusRing x={540} y={835} rx={330} ry={330} t={t} color={X.amber} opacity={resistance} />
        <Leader x={190} y={550} tx={365} ty={680} text="EDDY CURRENTS IN THE PAN" color={X.cyan} opacity={currents} />
        <g opacity={resistance}>
          <path d="M 205 1190 L 255 1140 L 305 1240 L 355 1140 L 405 1240 L 455 1140 L 505 1190" fill="none" stroke={X.coral} strokeWidth={9} />
          <Arrow x1={520} y1={1190} x2={725} y2={1190} color={X.amber} width={8} />
          <TinyLabel x={810} y={1200} text="HEAT" color={X.amber} />
        </g>
        <StatusPill x={540} y={1320} text="RESISTANCE TURNS CURRENT INTO HEAT" color={X.amber} opacity={resistance} width={650} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="control" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Heat the food with the right cookware" lines={['Pan to food', 'by conduction']} accent={X.amber} />
      <SvgStage>
        <g opacity={1 - required * 0.35}><PanSide x={540} y={700} t={t} heat={0.90} /></g>
        {[360, 540, 720].map((x, i) => <g key={x} opacity={food}>
          <Arrow x1={x} y1={800} x2={x} y2={650} color={X.amber} width={6} />
          <TinyLabel x={x} y={610} text={i === 1 ? 'HEAT INTO FOOD' : ''} color={X.amber} />
        </g>)}
        <g opacity={required}>
          {[
            { x: 240, label: 'MAGNETIC STEEL', result: 'WORKS', color: X.green },
            { x: 540, label: 'PLAIN GLASS', result: 'NO', color: X.coral },
            { x: 840, label: 'PLAIN COPPER', result: 'NO', color: X.coral },
          ].map((item) => <g key={item.label} transform={`translate(${item.x} 1130)`}>
            <circle r={92} fill={X.panel2} stroke={item.color} strokeWidth={6} />
            <path d="M -65 -15 H 65 L 48 42 H -48 Z" fill={item.color} opacity={0.32} />
            <TinyLabel x={0} y={130} text={item.label} color={item.color} />
            <StatusPill x={0} y={190} text={item.result} color={item.color} width={160} />
          </g>)}
        </g>
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="One direct energy chain" lines={['Field in the coil', 'heat in the pan']} accent={X.green} />
      <SvgStage>
        <g transform="translate(180 800)">
          {[0, 1, 2].map((i) => <ellipse key={i} rx={115 - i * 28} ry={55 - i * 10} fill="none" stroke="#d58c54" strokeWidth={14} />)}
          <CircularFlow cx={0} cy={0} r={82} t={t} count={6} color={X.cyan} />
          <TinyLabel x={0} y={150} text="COIL" color={X.cyan} />
        </g>
        <Arrow x1={320} y1={800} x2={435} y2={800} color={X.violet} width={7} />
        <g transform="translate(540 800)">
          {[0, 1, 2].map((i) => <ellipse key={i} rx={105 - i * 25} ry={105 - i * 25} fill="none" stroke={X.violet} strokeWidth={6} strokeDasharray="10 12" strokeDashoffset={-t * 50} />)}
          <TinyLabel x={0} y={150} text="CHANGING FIELD" color={X.violet} />
        </g>
        <Arrow x1={650} y1={800} x2={745} y2={800} color={X.amber} width={7} />
        <g transform="translate(855 800)">
          <circle r={118} fill="#253342" stroke={X.amber} strokeWidth={12} /><CircularFlow cx={0} cy={0} r={72} t={t} count={6} color={X.amber} />
          <Steam x={0} y={-125} t={t} opacity={0.7} />
          <TinyLabel x={0} y={150} text="PAN HEATS" color={X.amber} />
        </g>
        <StatusPill x={540} y={1200} text="THE PAN · NOT THE COOKTOP · IS THE HEATER" color={X.green} width={720} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['induction cooktop', 'magnetic field', 'alternating current', 'copper coil', 'circular electric currents', 'resistance', 'pan itself', 'magnetic pan', 'heater']} />
    <CalmSound narration="voiceovers/induction-cooktop/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={39} />
  </AbsoluteFill>;
};
export default Short41InductionCooktop;
