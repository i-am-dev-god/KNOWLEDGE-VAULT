import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line, seeded } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, DeviceStage, FlowPath, Glow, Leader, SceneHeading,
  StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short42SmokeDetector', durationInSeconds: 43.5, fps: 30, width: 1080, height: 1920 };

const SmokeCloud: React.FC<{ x: number; y: number; t: number; count?: number; spread?: number; opacity?: number }> = ({ x, y, t, count = 16, spread = 180, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    {Array.from({ length: count }, (_, i) => {
      const drift = (t * (9 + seeded(i) * 8) + i * 23) % 190;
      const px = (seeded(i + 20) - 0.5) * spread + Math.sin(t * 0.8 + i) * 18;
      const py = 80 - drift;
      const r = 12 + seeded(i + 40) * 20;
      return <circle key={i} cx={px} cy={py} r={r} fill={X.steel} opacity={0.10 + seeded(i + 60) * 0.20} />;
    })}
  </g>
);

const AlarmWaves: React.FC<{ x: number; y: number; t: number; opacity?: number }> = ({ x, y, t, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity} fill="none" stroke={X.coral} strokeWidth={9} strokeLinecap="round">
    {[0, 1, 2].map((i) => {
      const phase = (t * 1.8 + i / 3) % 1;
      return <g key={i} opacity={1 - phase}>
        <path d={`M ${-250 - phase * 85} ${-90 - phase * 30} Q ${-320 - phase * 100} 0 ${-250 - phase * 85} ${90 + phase * 30}`} />
        <path d={`M ${250 + phase * 85} ${-90 - phase * 30} Q ${320 + phase * 100} 0 ${250 + phase * 85} ${90 + phase * 30}`} />
      </g>;
    })}
  </g>
);

const Short42SmokeDetector: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const reveal = prog(t, line(VO, 'hook-scatter').start - 0.08, line(VO, 'hook-scatter').start + 0.65);
  const clear = prog(t, line(VO, 'clear-sensor').start - 0.08, line(VO, 'clear-sensor').start + 0.60);
  const smoke = prog(t, line(VO, 'smoke-scatter').start - 0.08, line(VO, 'smoke-scatter').start + 0.65);
  const alarm = prog(t, line(VO, 'smoke-alarm').start - 0.08, line(VO, 'smoke-alarm').start + 0.45);
  const pulse = 0.5 + 0.5 * Math.sin(t * 8);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.coral} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="A warning before visible flames" lines={['Smoke triggers', 'the alarm']} accent={X.coral} />
      <SvgStage>
        <AlarmWaves x={540} y={770} t={t} opacity={0.55 + pulse * 0.40} />
        <Glow x={540} y={770} r={260} color={X.coral} opacity={0.18 + pulse * 0.20} />
        <circle cx={540} cy={770} r={238} fill="#d5dde5" stroke={X.white} strokeWidth={10} />
        <circle cx={540} cy={770} r={190} fill="#182636" stroke="#74879b" strokeWidth={7} />
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={525} y={510} width={30} height={65} rx={13} fill={X.night} transform={`rotate(${i * 30} 540 770)`} opacity={0.80} />)}
        <g opacity={0.30 + reveal * 0.70}>
          <rect x={375} y={700} width={330} height={150} rx={35} fill={X.night} stroke={X.steel} strokeWidth={4} />
          <circle cx={425} cy={780} r={22} fill={X.amber} />
          <path d="M 450 780 H 655" stroke={X.amber} strokeWidth={7} strokeDasharray="12 12" strokeDashoffset={-t * 65} />
          <circle cx={625} cy={725} r={20} fill={reveal > 0.4 ? X.cyan : X.panel2} stroke={X.cyan} strokeWidth={4} />
          <FlowPath d="M 520 780 L 625 725" t={t} color={X.cyan} width={5} speed={70} opacity={reveal} />
        </g>
        <circle cx={540} cy={905} r={17 + pulse * 6} fill={X.coral} />
        <SmokeCloud x={310} y={1110} t={t} count={19} spread={240} opacity={0.95} />
        <FlowPath d="M 220 1080 C 250 990 330 960 405 910" t={t} color={X.steel} width={9} speed={55} dash="5 25" />
        <Leader x={810} y={1090} tx={655} ty={840} text="HIDDEN OPTICAL CHAMBER" color={X.cyan} opacity={reveal} />
        <StatusPill x={540} y={1280} text="SMOKE SCATTERS LIGHT · THE SENSOR RESPONDS" color={X.coral} opacity={reveal} width={720} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="chamber" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.blue} /><DeviceStage accent={X.blue} />
      <SceneHeading eyebrow="Clear air inside the dark chamber" lines={['The straight beam', 'misses the sensor']} accent={X.blue} />
      <SvgStage>
        <rect x={125} y={600} width={830} height={530} rx={90} fill="#09121e" stroke="#5c7188" strokeWidth={10} />
        <path d="M 170 640 H 910 M 170 1090 H 910" stroke={X.steel} strokeWidth={4} opacity={0.25} />
        <g>
          <rect x={175} y={775} width={135} height={150} rx={28} fill={X.panel2} stroke={X.amber} strokeWidth={5} />
          <circle cx={305} cy={850} r={25} fill={X.amber} /><Glow x={305} y={850} r={55} color={X.amber} opacity={0.65} />
          <TinyLabel x={240} y={975} text="LED" color={X.amber} />
        </g>
        <path d="M 330 850 H 875" stroke={X.amber} strokeWidth={11} opacity={0.22} />
        <MovingDots x1={335} y1={850} x2={865} y2={850} t={t} color={X.amber} count={8} radius={10} speed={0.34} />
        <path d="M 835 800 L 910 850 L 835 900" fill={X.panel2} stroke={X.steel} strokeWidth={5} />
        <TinyLabel x={845} y={975} text="LIGHT TRAP" color={X.steel} />
        <g opacity={0.38 + clear * 0.62}>
          <rect x={610} y={630} width={170} height={115} rx={25} fill={X.panel2} stroke={X.blue} strokeWidth={5} />
          <circle cx={695} cy={690} r={27} fill="#101c2b" stroke={X.blue} strokeWidth={5} />
          <FocusRing x={695} y={690} rx={125} ry={100} t={t} color={X.blue} opacity={clear} />
          <TinyLabel x={695} y={590} text="OFFSET SENSOR · DARK" color={X.blue} />
          <path d="M 695 745 V 805" stroke={X.blue} strokeWidth={3} strokeDasharray="5 8" />
          <TinyLabel x={695} y={795} text="BEAM PASSES BELOW" color={X.muted} />
        </g>
        <StatusPill x={540} y={1250} text="CLEAR AIR · NO LIGHT REACHES THE SENSOR" color={X.blue} opacity={clear} width={700} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="smoke" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="Smoke changes the light path" lines={['Scattered light', 'starts the alarm']} accent={X.coral} />
      <SvgStage>
        <rect x={125} y={610} width={830} height={520} rx={90} fill="#09121e" stroke="#5c7188" strokeWidth={10} />
        <rect x={175} y={790} width={130} height={140} rx={28} fill={X.panel2} stroke={X.amber} strokeWidth={5} />
        <circle cx={305} cy={855} r={25} fill={X.amber} />
        <path d="M 330 855 H 875" stroke={X.amber} strokeWidth={9} opacity={0.22} />
        <MovingDots x1={335} y1={855} x2={865} y2={855} t={t} color={X.amber} count={7} radius={9} speed={0.34} />
        <g opacity={0.35 + smoke * 0.65}>
          <SmokeCloud x={545} y={930} t={t} count={25} spread={460} opacity={0.90} />
          {[[470, 820], [565, 900], [655, 815]].map(([x, y], i) => <g key={i}>
            <circle cx={x} cy={y} r={15} fill={X.steel} />
            <FlowPath d={`M ${x - 85} ${y + 35} L ${x} ${y} L 700 690`} t={t + i * 0.2} color={X.cyan} width={6} speed={95} dash="5 20" />
          </g>)}
        </g>
        <g opacity={0.35 + smoke * 0.65}>
          <rect x={610} y={630} width={175} height={115} rx={25} fill={X.panel2} stroke={X.cyan} strokeWidth={5} />
          <circle cx={697} cy={690} r={28 + smoke * 8} fill={X.cyan} opacity={0.25 + smoke * 0.65} />
          <FocusRing x={697} y={690} rx={135} ry={105} t={t} color={X.cyan} opacity={smoke} />
        </g>
        <g opacity={alarm}>
          <path d="M 785 690 H 875" stroke={X.coral} strokeWidth={7} strokeDasharray="8 10" strokeDashoffset={-t * 60} />
          {[0, 1, 2].map((i) => {
            const phase = (t * 1.8 + i / 3) % 1;
            return <circle key={i} cx={875} cy={690} r={45 + phase * 70} fill="none" stroke={X.coral} strokeWidth={7} opacity={(1 - phase) * 0.55} />;
          })}
          <circle cx={875} cy={690} r={25 + pulse * 8} fill={X.coral} />
        </g>
        <StatusPill x={540} y={1260} text={alarm > 0.45 ? 'SENSOR SIGNAL RISES · ALARM ON' : 'SMOKE REDIRECTS LIGHT TO THE SENSOR'} color={alarm > 0.45 ? X.coral : X.cyan} width={700} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="use" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Especially useful for smouldering fires" lines={['Visible smoke', 'before open flames']} accent={X.amber} />
      <SvgStage>
        <g transform="translate(540 680)">
          <circle r={175} fill="#d5dde5" stroke={X.white} strokeWidth={9} />
          <circle r={130} fill="#182636" stroke="#74879b" strokeWidth={6} />
          <circle cy={70} r={17 + pulse * 5} fill={X.coral} />
          <AlarmWaves x={0} y={0} t={t} opacity={0.45 + pulse * 0.35} />
        </g>
        <SmokeCloud x={480} y={1080} t={t} count={24} spread={280} />
        <FlowPath d="M 450 1080 C 430 950 480 890 520 835" t={t} color={X.steel} width={11} speed={55} dash="7 28" />
        <g transform="translate(330 1160)">
          <path d="M -190 45 Q -170 -85 -60 -100 H 170 Q 205 -70 190 45 Z" fill="#3c4858" stroke={X.steel} strokeWidth={7} />
          <path d="M -80 -80 Q -20 -125 40 -75" fill="none" stroke={X.coral} strokeWidth={18} strokeLinecap="round" opacity={0.55 + pulse * 0.35} />
          <Glow x={0} y={-80} r={90} color={X.coral} opacity={0.35} />
          <TinyLabel x={0} y={105} text="SMOULDERING · NO OPEN FLAME" color={X.amber} />
        </g>
        <StatusPill x={540} y={1360} text="SCATTERED LIGHT PROVIDES AN EARLY WARNING" color={X.amber} width={680} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The complete optical warning" lines={['Smoke bends light', 'into the sensor']} accent={X.green} />
      <SvgStage>
        <rect x={160} y={650} width={760} height={430} rx={85} fill="#09121e" stroke="#5c7188" strokeWidth={10} />
        <circle cx={280} cy={865} r={29} fill={X.amber} />
        <MovingDots x1={315} y1={865} x2={790} y2={865} t={t} color={X.amber} count={7} radius={10} speed={0.34} />
        <SmokeCloud x={540} y={970} t={t} count={20} spread={390} />
        <FlowPath d="M 430 865 L 540 820 L 710 715" t={t} color={X.cyan} width={8} speed={90} />
        <circle cx={710} cy={715} r={35} fill={X.cyan} /><Glow x={710} y={715} r={85} color={X.cyan} />
        <Arrow x1={755} y1={715} x2={845} y2={715} color={X.coral} width={7} />
        <circle cx={875} cy={715} r={25 + pulse * 7} fill={X.coral} />
        <AlarmWaves x={540} y={850} t={t} opacity={0.35 + pulse * 0.30} />
        <StatusPill x={540} y={1260} text="SCATTER → SENSE → SOUND THE ALARM" color={X.green} width={650} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['smoke detector', 'alarm', 'photoelectric detector', 'scattering', 'LED', 'light sensor', 'straight beam', 'tiny particles', 'smouldering fires', 'scattering light']} />
    <CalmSound narration="voiceovers/smoke-detector/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={43.5} />
  </AbsoluteFill>;
};
export default Short42SmokeDetector;
