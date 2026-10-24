import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, DemoPanel, Header, Scene, TitleBlock, line, reached, wavePath } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short21Speaker', durationInSeconds: 48, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const SpeakerAssembly: React.FC<{
  offset?: number; coneOpacity?: number; magnetOpacity?: number; coilOpacity?: number;
  coneColor?: string; dark?: boolean; compact?: boolean;
}> = ({ offset = 0, coneOpacity = 1, magnetOpacity = 1, coilOpacity = 1, coneColor = C.teal, dark = false, compact = false }) => {
  const apex = (compact ? 420 : 500) + offset;
  const edge = compact ? 650 : 790;
  const top = compact ? 690 : 630;
  const bottom = compact ? 1010 : 1070;
  const coilX = (compact ? 370 : 450) + offset;
  return <g>
    <g opacity={magnetOpacity}>
      <rect x={compact ? 160 : 200} y={compact ? 740 : 700} width={compact ? 150 : 180} height={compact ? 220 : 300} rx={24} fill={C.indigo} />
      <rect x={compact ? 185 : 225} y={compact ? 770 : 735} width={compact ? 100 : 130} height={compact ? 160 : 230} rx={18} fill={C.dark} opacity={0.5} />
      <text x={compact ? 235 : 290} y={compact ? 725 : 675} textAnchor="middle" fill={C.indigo} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>PERMANENT MAGNET</text>
      <text x={compact ? 235 : 290} y={compact ? 855 : 850} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={30}>N · S</text>
    </g>
    <g opacity={coilOpacity}>
      <rect x={coilX - 45} y={compact ? 765 : 745} width={90} height={compact ? 170 : 210} rx={18} fill={C.amber} fillOpacity={0.18} stroke={C.amber} strokeWidth={7} />
      {Array.from({ length: 6 }, (_, i) => <line key={i} x1={coilX - 43} y1={(compact ? 790 : 775) + i * (compact ? 24 : 30)} x2={coilX + 43} y2={(compact ? 790 : 775) + i * (compact ? 24 : 30)} stroke={C.amber} strokeWidth={4} />)}
      <text x={coilX} y={compact ? 735 : 715} textAnchor="middle" fill={C.amber} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>VOICE COIL</text>
    </g>
    <g opacity={coneOpacity} fill="none" stroke={coneColor} strokeLinecap="round">
      <path d={`M ${apex} 850 L ${edge} ${top}`} strokeWidth={18} />
      <path d={`M ${apex} 850 L ${edge} ${bottom}`} strokeWidth={18} />
      <path d={`M ${edge} ${top} Q ${edge + 55} 725 ${edge + 22} 790`} strokeWidth={10} opacity={0.65} />
      <path d={`M ${edge} ${bottom} Q ${edge + 55} 975 ${edge + 22} 910`} strokeWidth={10} opacity={0.65} />
      <path d={`M ${coilX + 42} 850 L ${apex} 850`} strokeWidth={10} />
    </g>
    <text x={compact ? 580 : 680} y={compact ? 1090 : 1160} textAnchor="middle" fill={dark ? C.mint : C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={22} opacity={coneOpacity}>FLEXIBLE CONE</text>
  </g>;
};

const AirWaves: React.FC<{ t: number; mode: number; active: number }> = ({ t, mode, active }) => (
  <g opacity={active}>
    {Array.from({ length: 30 }, (_, i) => {
      const column = i % 6;
      const row = Math.floor(i / 6);
      const baseX = 735 + column * 43;
      const squeeze = mode === 1 ? 0.55 : mode === 2 ? 1.15 : 1;
      const x = 700 + (baseX - 700) * squeeze + Math.sin(t * 3 + row) * 4;
      return <circle key={i} cx={x} cy={690 + row * 78} r={8} fill={mode === 2 ? C.indigo : C.amber} opacity={0.45 + (i % 3) * 0.2} />;
    })}
    {mode === 3 && Array.from({ length: 5 }, (_, i) => {
      const travel = ((t * 65 + i * 85) % 340);
      const x = 650 + travel;
      const opacity = Math.sin((travel / 340) * Math.PI) * 0.85;
      return <path key={i} d={`M ${x} 660 Q ${x + 75} 850 ${x} 1040`} fill="none" stroke={i % 2 ? C.indigo : C.mint} strokeWidth={i % 2 ? 5 : 8} opacity={opacity} />;
    })}
    <text x={835} y={1165} textAnchor="middle" fill={mode === 2 ? C.indigo : C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>
      {mode === 1 ? 'COMPRESSION' : mode === 2 ? 'LOWER PRESSURE' : 'PRESSURE VARIATIONS TRAVEL'}
    </text>
  </g>
);

const Short21Speaker: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const signal = prog(t, line(VO, 'hook-signal').start - 0.1, line(VO, 'hook-signal').start + 0.6);
  const current = prog(t, line(VO, 'driver-current').start - 0.1, line(VO, 'driver-current').start + 0.5);
  const force = prog(t, line(VO, 'driver-force').start - 0.1, line(VO, 'driver-force').start + 0.4);
  const moving = prog(t, line(VO, 'motion-inout').start - 0.1, line(VO, 'motion-inout').start + 0.6);
  const air = prog(t, line(VO, 'air-compress').start - 0.1, line(VO, 'air-compress').start + 0.6);
  const traveling = prog(t, line(VO, 'air-travel').start - 0.1, line(VO, 'air-travel').start + 0.6);
  const phase = Math.sin(t * 3.1);
  const coneOffset = phase * 34 * Math.max(signal, moving, air);
  const motionElapsed = Math.max(0, t - line(VO, 'motion-inout').start);
  const motionOffset = -Math.cos(motionElapsed * 1.8) * 34 * moving;
  const direction = phase >= 0 ? 1 : -1;
  const airMode = reached(t, VO, 'air-travel') ? 3 : reached(t, VO, 'air-rarefy') ? 2 : 1;

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · SOUND" seconds={48} /><DemoPanel />
      <TitleBlock eyebrow="One moving surface" lines={['Watch the', 'cone']} accentIndex={1} size={70} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <SpeakerAssembly offset={coneOffset} magnetOpacity={0.25} coilOpacity={0.35} />
        <Callout x={760} y={590} targetX={690} targetY={710} text="THIS CONE MOVES" opacity={signal} />
        <path d={wavePath(260, 1210, 560, 28, 2, t * 3)} fill="none" stroke={C.indigo} strokeWidth={5} opacity={0.25 + signal * 0.75} />
      </svg>
    </Scene>

    <Scene t={t} id="driver" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · SOUND" seconds={48} /><DemoPanel />
      <TitleBlock eyebrow="Current becomes force" lines={['Reverse the', 'force']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <SpeakerAssembly offset={coneOffset * current} coneOpacity={0.22} />
        <g opacity={current} fontFamily={FONT_MONO} fontWeight={700}>
          <path d={direction > 0 ? 'M 410 620 L 520 620 L 500 600 M 520 620 L 500 640' : 'M 520 620 L 410 620 L 430 600 M 410 620 L 430 640'} stroke={C.coral} strokeWidth={7} fill="none" />
          <text x={465} y={580} textAnchor="middle" fill={C.coral} fontSize={22}>CURRENT {direction > 0 ? '→' : '←'}</text>
        </g>
        <g opacity={force} fontFamily={FONT_MONO} fontWeight={700}>
          <path d={direction > 0 ? 'M 510 1110 L 660 1110 L 635 1088 M 660 1110 L 635 1132' : 'M 660 1110 L 510 1110 L 535 1088 M 510 1110 L 535 1132'} stroke={C.teal} strokeWidth={8} fill="none" />
          <text x={585} y={1190} textAnchor="middle" fill={C.teal} fontSize={23}>MAGNETIC FORCE {direction > 0 ? '→' : '←'}</text>
        </g>
        <path d={wavePath(240, 1240, 600, 24, 2, t * 3.1)} fill="none" stroke={C.indigo} strokeWidth={5} opacity={0.55} />
      </svg>
    </Scene>

    <Scene t={t} id="motion" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · SOUND" seconds={48} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Mechanical movement" lines={['Inward.', 'Outward.']} accentIndex={1} size={70} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <SpeakerAssembly offset={motionOffset} magnetOpacity={0.22} coneColor={C.mint} dark />
        <g opacity={moving} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>
          <text x={720} y={580} textAnchor="middle" fill={motionOffset >= 0 ? C.mint : C.coral}>{motionOffset >= 0 ? 'OUTWARD →' : '← INWARD'}</text>
          <path d={motionOffset >= 0 ? 'M 620 1200 L 790 1200' : 'M 790 1200 L 620 1200'} stroke={motionOffset >= 0 ? C.mint : C.coral} strokeWidth={7} />
        </g>
        <path d={wavePath(260, 1260, 560, 18, 2, t * 3)} fill="none" stroke={C.indigo} strokeWidth={4} opacity={reached(t, VO, 'motion-follow') ? 0.12 : 0.55} />
        <text x={540} y={1320} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontSize={21} opacity={reached(t, VO, 'motion-follow') ? 1 : 0}>THE CONE IS THE MECHANISM</text>
      </svg>
    </Scene>

    <Scene t={t} id="air" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · SOUND" seconds={48} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Follow the air in front" lines={['Motion becomes', 'pressure']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g transform="translate(-40 0) scale(0.9)"><SpeakerAssembly offset={coneOffset} magnetOpacity={0.12} coilOpacity={0.25} coneColor={C.mint} dark compact /></g>
        <AirWaves t={t} mode={airMode} active={air} />
        <text x={825} y={1230} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={21} opacity={traveling}>SOUND IS A PRESSURE WAVE</text>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · SOUND" seconds={48} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The complete conversion" lines={['Signal. Motion.', 'Sound.']} accentIndex={2} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[
          ['ELECTRICAL', 'VARIATIONS', C.indigo],
          ['MECHANICAL', 'MOTION', C.amber],
          ['AIR PRESSURE', 'SOUND', C.mint],
        ].map(([a, b, color], i) => <g key={a} transform={`translate(540 ${680 + i * 205})`} opacity={0.45 + prog(t, line(VO, 'closing-summary').start + i * 0.35, line(VO, 'closing-summary').start + i * 0.35 + 0.5) * 0.55}>
          <rect x={-300} y={-70} width={600} height={140} rx={28} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} />
          <text y={-5} fill={color as string} fontSize={25} fontWeight={700}>{a}</text><text y={35} fill={C.paper} fontSize={24}>{b}</text>
          {i < 2 && <path d={`M 0 80 L 0 120`} stroke={C.mint} strokeWidth={5} strokeDasharray="7 8" />}
        </g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['speaker cone', 'alternating current', 'magnetic force', 'inward', 'outward', 'compresses', 'lower pressure', 'sound']} />
    <CalmSound narration="voiceovers/speaker/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={48} />
  </AbsoluteFill>;
};
export default Short21Speaker;
