import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, DemoPanel, Header, Scene, TitleBlock, line, reached } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short23LithiumBattery', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const externalPoint = (p: number) => {
  if (p < 1 / 7) return { x: 290, y: 690 - p * 700 };
  if (p < 6 / 7) return { x: 290 + ((p - 1 / 7) / (5 / 7)) * 500, y: 590 };
  return { x: 790, y: 590 + (p - 6 / 7) * 700 };
};

const BatteryCell: React.FC<{
  t: number; direction?: 1 | -1; ionOpacity?: number; electronOpacity?: number;
  separatorFocus?: number; charging?: boolean;
}> = ({ t, direction = 1, ionOpacity = 1, electronOpacity = 1, separatorFocus = 0, charging = false }) => (
  <g>
    <path d="M 290 690 L 290 590 L 790 590 L 790 690" fill="none" stroke={C.amber} strokeWidth={7} opacity={electronOpacity} />
    <g opacity={electronOpacity}>
      <rect x={485} y={535} width={110} height={110} rx={24} fill={C.ink} stroke={charging ? C.coral : C.teal} strokeWidth={4} />
      {charging ? <path d="M 548 550 L 522 592 L 545 592 L 530 625 L 565 578 L 542 578 Z" fill={C.coral} /> : <>
        <rect x={512} y={550} width={56} height={78} rx={9} fill="#e7edf5" />
        <rect x={522} y={561} width={36} height={48} rx={5} fill={C.mint} opacity={0.55 + Math.sin(t * 4) * 0.2} />
      </>}
      <text x={540} y={520} textAnchor="middle" fill={charging ? C.coral : C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={20}>{charging ? 'CHARGER' : 'PHONE'}</text>
    </g>
    {Array.from({ length: 7 }, (_, i) => {
      const cycle = (t * 0.16 + i / 7) % 1;
      const p = direction === 1 ? cycle : 1 - cycle;
      const point = externalPoint(p);
      return <circle key={i} cx={point.x} cy={point.y} r={9} fill={C.amber} stroke={C.paper} strokeWidth={2} opacity={electronOpacity} />;
    })}
    <rect x={180} y={660} width={720} height={480} rx={38} fill="#e9edf2" stroke={C.ink} strokeWidth={5} />
    <rect x={220} y={705} width={150} height={390} rx={25} fill="#4a546b" opacity={0.9 - separatorFocus * 0.45} />
    <rect x={710} y={705} width={150} height={390} rx={25} fill={C.indigo} opacity={0.9 - separatorFocus * 0.45} />
    <text x={295} y={755} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={20}>NEGATIVE</text>
    <text x={295} y={785} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={18}>ELECTRODE</text>
    <text x={785} y={755} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={20}>POSITIVE</text>
    <text x={785} y={785} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={18}>ELECTRODE</text>
    <text x={540} y={1110} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20}>ELECTROLYTE</text>
    <g opacity={0.4 + separatorFocus * 0.6}>
      <rect x={522} y={690} width={36} height={420} rx={14} fill={C.paper} stroke={C.coral} strokeWidth={4} strokeDasharray="9 8" />
      {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={540} cy={725 + i * 48} r={5} fill={C.coral} />)}
    </g>
    {Array.from({ length: 7 }, (_, i) => {
      const cycle = (t * 0.14 + i / 7) % 1;
      const p = direction === 1 ? cycle : 1 - cycle;
      const x = 400 + p * 280;
      const y = 770 + (i % 4) * 82;
      return <g key={i} opacity={ionOpacity} transform={`translate(${x} ${y})`}>
        <circle r={21} fill={C.mint} stroke={C.teal} strokeWidth={3} />
        <text x={0} y={6} textAnchor="middle" fill={C.ink} fontFamily={FONT_MONO} fontWeight={700} fontSize={16}>Li+</text>
      </g>;
    })}
    <text x={540} y={1195} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={22} opacity={ionOpacity}>{direction === 1 ? 'LITHIUM IONS →' : '← LITHIUM IONS'}</text>
    <text x={540} y={1260} textAnchor="middle" fill={C.amber} fontFamily={FONT_MONO} fontWeight={700} fontSize={22} opacity={electronOpacity}>{direction === 1 ? 'ELECTRONS → EXTERNAL CIRCUIT' : 'EXTERNAL CIRCUIT ← ELECTRONS'}</text>
  </g>
);

const Short23LithiumBattery: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const chemical = prog(t, line(VO, 'hook-chemical').start - 0.1, line(VO, 'hook-chemical').start + 0.7);
  const discharge = prog(t, line(VO, 'discharge-leave').start - 0.1, line(VO, 'discharge-leave').start + 0.6);
  const electrons = prog(t, line(VO, 'discharge-electrons').start - 0.1, line(VO, 'discharge-electrons').start + 0.6);
  const separator = prog(t, line(VO, 'separator-pass').start - 0.1, line(VO, 'separator-pass').start + 0.6);
  const external = prog(t, line(VO, 'separator-path').start - 0.1, line(VO, 'separator-path').start + 0.5);
  const charging = prog(t, line(VO, 'charge-reverse').start - 0.1, line(VO, 'charge-reverse').start + 0.7);
  const ready = prog(t, line(VO, 'charge-ready').start - 0.1, line(VO, 'charge-ready').start + 0.5);

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · ENERGY" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="A chemical energy store" lines={['Not a tank', 'of electricity']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <rect x={230} y={680} width={620} height={400} rx={48} fill={C.paper} stroke={C.ink} strokeWidth={7} />
        <rect x={850} y={790} width={45} height={180} rx={14} fill={C.ink} />
        <rect x={270} y={730} width={210} height={300} rx={25} fill="#4a546b" />
        <rect x={600} y={730} width={210} height={300} rx={25} fill={C.indigo} opacity={0.25 + chemical * 0.75} />
        {Array.from({ length: 6 }, (_, i) => <g key={i} transform={`translate(${500 + Math.sin(t * 1.4 + i) * 45 * chemical} ${780 + i * 43})`} opacity={0.2 + chemical * 0.8}>
          <circle r={19} fill={C.mint} stroke={C.teal} strokeWidth={3} /><text y={6} textAnchor="middle" fill={C.ink} fontFamily={FONT_MONO} fontWeight={700} fontSize={15}>Li+</text>
        </g>)}
        <path d="M 505 880 L 575 880" stroke={C.teal} strokeWidth={5} strokeDasharray="8 8" opacity={chemical} />
        <text x={540} y={1190} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={23} opacity={chemical}>IONS BETWEEN TWO MATERIALS = STORED ENERGY</text>
      </svg>
    </Scene>

    <Scene t={t} id="discharge" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · ENERGY" seconds={52} /><DemoPanel height={830} />
      <TitleBlock eyebrow="Discharge: follow both paths" lines={['Ions inside.', 'Electrons outside.']} accentIndex={1} size={58} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <BatteryCell t={t} ionOpacity={(0.25 + discharge * 0.75) * (1 - electrons * 0.55)} electronOpacity={0.10 + electrons * 0.90} />
        <Callout x={165} y={625} targetX={295} targetY={705} text="IONS LEAVE HERE" color={C.teal} anchor="start" opacity={1 - electrons * 0.5} />
      </svg>
    </Scene>

    <Scene t={t} id="separator" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · ENERGY" seconds={52} dark /><DemoPanel dark height={830} />
      <TitleBlock dark eyebrow="A selective barrier" lines={['Ions pass.', 'Electrodes do not touch.']} accentIndex={1} size={55} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <BatteryCell t={t} ionOpacity={1 - external * 0.65} electronOpacity={0.12 + external * 0.88} separatorFocus={separator} />
        <Callout x={760} y={1010} targetX={540} targetY={900} text="SEPARATOR" color={C.coral} opacity={separator} />
        <text x={540} y={1320} textAnchor="middle" fill={external > 0.5 ? C.amber : C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={22}>{external > 0.5 ? 'ELECTRONS MUST GO AROUND' : 'IONS PASS THROUGH THE PORES'}</text>
      </svg>
    </Scene>

    <Scene t={t} id="charge" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · ENERGY" seconds={52} /><DemoPanel height={830} />
      <TitleBlock eyebrow="External energy reverses the shuttle" lines={['Charge:', 'send them back']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <BatteryCell t={t} direction={-1} charging ionOpacity={charging} electronOpacity={charging} />
        <g transform="translate(540 1330)" opacity={ready} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={-260} y={-45} width={520} height={70} rx={22} fill={C.ink} />
          <rect x={-245} y={-30} width={490 * ready} height={40} rx={15} fill={C.mint} />
          <text x={0} y={5} fill={ready > 0.7 ? C.ink : C.paper} fontWeight={700} fontSize={21}>READY TO DISCHARGE AGAIN</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · ENERGY" seconds={52} dark /><DemoPanel dark height={830} />
      <TitleBlock dark eyebrow="One controlled shuttle" lines={['Ions inside.', 'Electrons outside.']} accentIndex={1} size={58} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <BatteryCell t={t} ionOpacity={1} electronOpacity={1} />
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['chemical energy', 'lithium ions', 'negative electrode', 'electrolyte', 'positive electrode', 'electrons', 'outside circuit', 'separator', 'charger']} />
    <CalmSound narration="voiceovers/lithium-battery/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short23LithiumBattery;
