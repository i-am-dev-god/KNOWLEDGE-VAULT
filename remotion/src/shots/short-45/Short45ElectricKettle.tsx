import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, DeviceStage, FlowPath, Glow, Leader, SceneHeading,
  StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short45ElectricKettle', durationInSeconds: 36, fps: 30, width: 1080, height: 1920 };

const KettleBody: React.FC<{ x: number; y: number; t: number; off?: number; steam?: number }> = ({ x, y, t, off = 0, steam = 1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <Glow x={0} y={160} r={250} color={X.coral} opacity={(1 - off) * 0.50} />
    <path d="M -245 -210 Q -280 -120 -265 170 Q -250 280 -150 300 H 150 Q 250 280 265 170 Q 280 -120 245 -210 Z" fill="#1b2d3e" stroke={X.steel} strokeWidth={11} />
    <path d="M -205 15 H 205 L 190 190 Q 180 245 125 250 H -125 Q -180 245 -190 190 Z" fill={X.blue} opacity={0.32} />
    <path d="M 245 -140 Q 430 -100 400 90 Q 380 210 270 185" fill="none" stroke={X.steel} strokeWidth={45} />
    <path d="M 250 -135 Q 385 -95 360 75 Q 350 145 285 150" fill="none" stroke={X.night} strokeWidth={24} />
    <path d="M -235 -170 L -390 -120 L -250 -65" fill="#31465a" stroke={X.steel} strokeWidth={9} />
    <rect x={-260} y={-245} width={520} height={65} rx={28} fill="#405468" stroke={X.steel} strokeWidth={8} />
    <rect x={-80} y={-285} width={160} height={48} rx={20} fill={X.panel2} stroke={X.steel} strokeWidth={6} />
    <path d="M -160 215 Q -110 150 -60 215 T 40 215 T 140 215" fill="none" stroke={off > 0.55 ? X.steel : X.coral} strokeWidth={18} strokeLinecap="round" />
    <TinyLabel x={0} y={345} text={off > 0.55 ? 'HEATING ELEMENT OFF' : 'HEATING ELEMENT ON'} color={off > 0.55 ? X.green : X.coral} />
    {Array.from({ length: 13 }, (_, i) => {
      const p = (t * (0.22 + (i % 3) * 0.03) + i / 13) % 1;
      return <circle key={i} cx={-155 + (i % 5) * 75 + Math.sin(t + i) * 12} cy={225 - p * 210} r={7 + p * 10} fill={X.white} opacity={(1 - p) * 0.48 * steam} />;
    })}
    <path d="M 160 15 C 250 -40 250 -180 175 -230" fill="none" stroke={X.cyan} strokeWidth={22} opacity={0.18 + steam * 0.20} />
    <FlowPath d="M 160 15 C 250 -40 250 -180 175 -230" t={t} color={X.cyan} width={8} speed={65} dash="6 24" opacity={steam} />
    <g transform="translate(175 -230)">
      <rect x={-65} y={-50} width={130} height={100} rx={25} fill={X.panel2} stroke={off > 0.55 ? X.green : X.amber} strokeWidth={6} />
      <path d={`M -40 15 Q 0 ${15 - off * 50} 40 ${15 - off * 65}`} fill="none" stroke={X.violet} strokeWidth={10} />
    </g>
  </g>
);

const Short45ElectricKettle: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const off = prog(t, 0.08, 0.85);
  const thermostat = prog(t, line(VO, 'hook-thermostat').start - 0.05, line(VO, 'hook-thermostat').start + 0.60);
  const heat = prog(t, line(VO, 'element-heat').start - 0.05, line(VO, 'element-heat').start + 0.55);
  const steam = prog(t, line(VO, 'steam-travel').start - 0.05, line(VO, 'steam-travel').start + 0.60);
  const bend = prog(t, line(VO, 'steam-bimetal').start - 0.05, line(VO, 'steam-bimetal').start + 0.70);
  const expand = prog(t, line(VO, 'switch-expand').start - 0.05, line(VO, 'switch-expand').start + 0.60);
  const open = prog(t, line(VO, 'switch-open').start - 0.05, line(VO, 'switch-open').start + 0.45);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The automatic result comes first" lines={['Boiling water', 'cuts the power']} accent={X.green} />
      <SvgStage>
        <KettleBody x={510} y={825} t={t} off={off} steam={1} />
        <g transform={`translate(875 850) rotate(${off * 55})`}>
          <rect x={-65} y={-105} width={130} height={210} rx={35} fill={X.panel2} stroke={off > 0.5 ? X.green : X.coral} strokeWidth={7} />
          <path d="M 0 -55 V 35" stroke={X.white} strokeWidth={19} strokeLinecap="round" />
          <circle cy={50} r={17} fill={off > 0.5 ? X.green : X.coral} />
        </g>
        <FocusRing x={685} y={595} rx={135} ry={125} t={t} color={X.cyan} opacity={thermostat} />
        <Leader x={850} y={540} tx={700} ty={580} text="STEAM THERMOSTAT" color={X.cyan} opacity={thermostat} />
        <StatusPill x={540} y={1320} text={off > 0.55 ? 'POWER OFF · AUTOMATICALLY' : 'WATER BOILS · SWITCH TRIPS'} color={off > 0.55 ? X.green : X.amber} width={600} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="steam" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="Boiling creates a physical signal" lines={['Steam travels', 'to the thermostat']} accent={X.cyan} />
      <SvgStage>
        <KettleBody x={440} y={840} t={t} off={0} steam={0.30 + steam * 0.70} />
        <g opacity={heat}>
          <FocusRing x={440} y={1055} rx={240} ry={95} t={t} color={X.coral} opacity={0.75} />
          <Leader x={180} y={1230} tx={350} ty={1080} text="ELECTRIC HEATING ELEMENT" color={X.coral} />
        </g>
        <g opacity={steam}>
          <MovingDots x1={600} y1={855} x2={615} y2={610} t={t} color={X.cyan} count={6} radius={11} speed={0.24} />
          <Leader x={850} y={810} tx={620} ty={760} text="SMALL STEAM CHANNEL" color={X.cyan} />
        </g>
        <g transform="translate(830 1110)" opacity={0.30 + bend * 0.70}>
          <rect x={-160} y={-120} width={320} height={245} rx={35} fill={X.panel2} stroke={X.violet} strokeWidth={6} />
          <path d={`M -105 20 Q 0 ${20 - bend * 75} 105 ${20 - bend * 105}`} fill="none" stroke={X.coral} strokeWidth={17} />
          <path d={`M -105 40 Q 0 ${40 - bend * 65} 105 ${40 - bend * 95}`} fill="none" stroke={X.blue} strokeWidth={17} />
          <TinyLabel x={0} y={-70} text="TWO METALS · ONE STRIP" color={X.violet} />
          <FocusRing x={0} y={0} rx={175} ry={145} t={t} color={X.violet} opacity={bend} />
        </g>
        <StatusPill x={540} y={1370} text="HOT STEAM BENDS THE BIMETALLIC STRIP" color={X.violet} opacity={bend} width={670} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="switch" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="Different expansion creates movement" lines={['The strip bends', 'the contacts open']} accent={X.violet} />
      <SvgStage>
        <rect x={120} y={570} width={840} height={480} rx={55} fill="#101f30" stroke={X.steel} strokeWidth={7} />
        <rect x={170} y={720} width={95} height={180} rx={22} fill="#3d5063" stroke={X.steel} strokeWidth={7} />
        <path d={`M 240 750 Q 480 ${750 - (bend + expand) * 55} 770 ${750 - (bend + expand) * 90}`} fill="none" stroke={X.coral} strokeWidth={28} strokeLinecap="round" />
        <path d={`M 240 795 Q 480 ${795 - (bend + expand) * 45} 770 ${795 - (bend + expand) * 78}`} fill="none" stroke={X.blue} strokeWidth={28} strokeLinecap="round" />
        <g opacity={expand}>
          <Arrow x1={350} y1={650} x2={580} y2={650} color={X.coral} width={7} />
          <Arrow x1={350} y1={900} x2={500} y2={900} color={X.blue} width={7} />
          <TinyLabel x={465} y={610} text="EXPANDS MORE" color={X.coral} />
          <TinyLabel x={425} y={960} text="EXPANDS LESS" color={X.blue} />
        </g>
        <g transform={`translate(790 ${770 - open * 95})`}>
          <circle r={24} fill={X.amber} /><path d="M 0 25 V 115" stroke={X.steel} strokeWidth={14} />
        </g>
        <circle cx={790} cy={885} r={24} fill={open > 0.45 ? X.panel2 : X.amber} stroke={X.amber} strokeWidth={5} />
        <FocusRing x={790} y={830} rx={115} ry={190} t={t} color={open > 0.45 ? X.green : X.amber} opacity={0.8} />
        <path d="M 790 910 V 1040 H 600" fill="none" stroke={open > 0.45 ? X.steel : X.coral} strokeWidth={9} strokeDasharray={open > 0.45 ? '10 12' : undefined} />
        <g transform="translate(480 1130)">
          <path d="M -100 0 Q -50 -70 0 0 T 100 0" fill="none" stroke={open > 0.45 ? X.steel : X.coral} strokeWidth={16} />
          <TinyLabel x={0} y={90} text={open > 0.45 ? 'HEATING ELEMENT DISCONNECTED' : 'HEATING ELEMENT POWERED'} color={open > 0.45 ? X.green : X.coral} />
        </g>
        <StatusPill x={540} y={1360} text={open > 0.45 ? 'CONTACTS OPEN · POWER OFF' : 'BEND → TRIP → DISCONNECT'} color={open > 0.45 ? X.green : X.violet} width={600} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="A mechanical response to boiling" lines={['Steam bends metal', 'metal cuts power']} accent={X.green} />
      <SvgStage>
        <g transform="translate(195 830)">
          {[0, 1, 2, 3, 4].map((i) => {
            const p = (t * 0.25 + i / 5) % 1;
            return <circle key={i} cx={Math.sin(t + i) * 35} cy={80 - p * 220} r={12 + p * 12} fill={X.cyan} opacity={(1 - p) * 0.55} />;
          })}
          <TinyLabel x={0} y={190} text="STEAM SIGNAL" color={X.cyan} />
        </g>
        <Arrow x1={305} y1={830} x2={390} y2={830} color={X.green} width={7} />
        <g transform="translate(540 830)">
          <path d="M -105 45 Q 0 -75 105 -100" fill="none" stroke={X.coral} strokeWidth={20} />
          <path d="M -105 75 Q 0 -45 105 -70" fill="none" stroke={X.blue} strokeWidth={20} />
          <FocusRing x={0} y={0} rx={155} ry={170} t={t} color={X.violet} opacity={0.65} />
          <TinyLabel x={0} y={190} text="STRIP BENDS" color={X.violet} />
        </g>
        <Arrow x1={685} y1={830} x2={770} y2={830} color={X.green} width={7} />
        <g transform="translate(865 830)">
          <circle cx={-45} cy={-65} r={24} fill={X.amber} /><circle cx={45} cy={65} r={24} fill={X.panel2} stroke={X.amber} strokeWidth={5} />
          <path d="M -45 -40 V 10 M 45 90 V 135" stroke={X.steel} strokeWidth={13} />
          <TinyLabel x={0} y={190} text="POWER OFF" color={X.green} />
        </g>
        <StatusPill x={540} y={1270} text="BOILING WATER SWITCHES THE KETTLE OFF" color={X.green} width={680} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['electric kettle', 'switches itself off', 'water boils', 'steam-activated thermostat', 'electric element', 'steam', 'bimetallic strip', 'two metals', 'mechanical switch', 'disconnects', 'cuts the kettle\'s power']} />
    <CalmSound narration="voiceovers/electric-kettle/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={36} />
  </AbsoluteFill>;
};
export default Short45ElectricKettle;
