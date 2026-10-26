import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Scene, TitleBlock, line, wavePath } from '../../lib/next-calm';
import { Arrow, FocusLabel, FocusRing, MovingDots } from '../../lib/focus';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short33AccelerometerSteps', durationInSeconds: 55, fps: 30, width: 1080, height: 1920 };
const W = 1080; const H = 1920;
const Spring: React.FC<{ x: number; y: number; flip?: boolean; active?: number }> = ({ x, y, flip = false, active = 1 }) => {
  const direction = flip ? 1 : -1;
  const points = [[0, 0], [25, -32], [50, 32], [75, -32], [100, 32], [125, 0]].map(([dx, dy]) => `${x + dx * direction},${y + dy}`).join(' ');
  return <polyline points={points} fill="none" stroke={active > 0.5 ? C.amber : C.muted} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" opacity={0.35 + active * 0.65} />;
};

const Short33AccelerometerSteps: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const mass = prog(t, line(VO, 'mass-shift').start - 0.1, line(VO, 'mass-shift').start + 0.7);
  const springs = prog(t, line(VO, 'mass-springs').start - 0.1, line(VO, 'mass-springs').start + 0.7);
  const gap = prog(t, line(VO, 'capacitor-gap').start - 0.1, line(VO, 'capacitor-gap').start + 0.7);
  const signal = prog(t, line(VO, 'signal-convert').start - 0.1, line(VO, 'signal-convert').start + 0.7);
  const walk = prog(t, line(VO, 'walk-pattern').start - 0.1, line(VO, 'walk-pattern').start + 0.7);
  const filter = prog(t, line(VO, 'filter-noise').start - 0.1, line(VO, 'filter-noise').start + 0.8);
  const count = prog(t, line(VO, 'filter-count').start - 0.1, line(VO, 'filter-count').start + 1.8);
  const shift = Math.sin(t * 4.2) * 34 * mass;
  const gapShift = Math.sin(t * 3.5) * 24 * gap;
  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="Inside your phone or fitness band" lines={['How your device', 'counts steps']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={260} y={610} width={560} height={570} rx={65} fill={C.paper} stroke={C.ink} strokeWidth={9} /><rect x={310} y={690} width={460} height={340} rx={35} fill="#e6eef9" />
        <text x={540} y={790} textAnchor="middle" fill={C.muted} fontWeight={700} fontSize={23}>STEP COUNTER</text><text x={540} y={920} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={90}>1,284</text>
        <Chip x={540} y={1090} scale={0.48} label="ACC" /><FocusRing x={540} y={1090} rx={120} ry={85} t={t} color={C.mint} /><FocusLabel x={540} y={1240} text="TINY ACCELEROMETER" color={C.teal} />
      </svg>
    </Scene>
    <Scene t={t} id="mass" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="Inside the accelerometer chip" lines={['A proof mass', 'feels the movement']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={180} y={620} width={720} height={500} rx={45} fill="rgba(255,255,255,0.045)" stroke={C.muted} strokeWidth={4} /><text x={540} y={675} textAnchor="middle" fill={C.muted} fontWeight={700} fontSize={21}>MICROSCOPIC SENSOR STRUCTURE</text>
        <g opacity={0.35 + springs * 0.65}><Spring x={365} y={790} active={springs} /><Spring x={365} y={940} active={springs} /><Spring x={715} y={790} flip active={springs} /><Spring x={715} y={940} flip active={springs} /></g>
        <g transform={`translate(0 ${shift})`}><rect x={365} y={750} width={350} height={260} rx={30} fill={C.indigo} stroke={C.mint} strokeWidth={6} /><text x={540} y={875} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={28}>PROOF MASS</text><text x={540} y={920} textAnchor="middle" fill={C.mint} fontSize={20}>MOVES WITH YOU</text></g>
        <FocusRing x={540} y={880 + shift} rx={220} ry={175} t={t} opacity={mass} />
        <Arrow x1={540} y1={1110} x2={540} y2={1030} color={C.mint} opacity={mass} /><Arrow x1={540} y1={1130} x2={540} y2={1210} color={C.mint} opacity={mass} />
        <FocusLabel x={540} y={1260} text={springs > 0.5 ? 'FLEXIBLE SPRINGS ALLOW SMALL MOTION' : 'THE MASS SHIFTS'} color={springs > 0.5 ? C.amber : C.mint} dark />
      </svg>
    </Scene>
    <Scene t={t} id="capacitor" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="The accelerometer measures the shift" lines={['Capacitor gaps', 'change size']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={210} y={650} width={180} height={430} rx={25} fill={C.indigo} /><text x={300} y={1130} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={20}>FIXED FINGERS</text>
        {[720, 800, 880, 960].map((y) => <rect key={y} x={390} y={y} width={210} height={26} rx={10} fill={C.indigo} />)}
        <g transform={`translate(0 ${gapShift})`}><rect x={690} y={650} width={180} height={430} rx={25} fill={C.teal} /><text x={780} y={1130} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={20}>MOVING FINGERS</text>{[760, 840, 920].map((y) => <rect key={y} x={480} y={y} width={210} height={26} rx={10} fill={C.teal} />)}</g>
        <FocusRing x={570} y={850} rx={180} ry={260} t={t} opacity={gap} color={C.amber} />
        <g opacity={gap}><Arrow x1={620} y1={735} x2={620} y2={770} color={C.amber} width={4} /><Arrow x1={620} y1={810} x2={620} y2={845} color={C.amber} width={4} /><FocusLabel x={540} y={1230} text="SPACING CHANGES CAPACITANCE" color={C.amber} /></g>
      </svg>
    </Scene>
    <Scene t={t} id="signal" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The accelerometer creates data" lines={['Movement becomes', 'an acceleration signal']} accentIndex={1} size={59} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <Chip x={255} y={830} scale={0.7} label="ACC" /><FocusRing x={255} y={830} rx={140} ry={140} t={t} opacity={1 - signal * 0.5} />
        <MovingDots x1={380} y1={830} x2={580} y2={830} t={t} color={C.mint} opacity={signal} /><Arrow x1={390} y1={830} x2={600} y2={830} color={C.mint} opacity={signal} />
        <rect x={600} y={640} width={360} height={390} rx={30} fill="rgba(255,255,255,0.05)" stroke={C.teal} strokeWidth={4} opacity={0.3 + signal * 0.7} /><path d={wavePath(635, 825, 290, 100, 2.5, t * 1.5)} fill="none" stroke={C.mint} strokeWidth={7} opacity={signal} />
        <text x={780} y={710} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={21} opacity={signal}>ACCELERATION</text><text x={780} y={970} textAnchor="middle" fill={C.paper} fontSize={20} opacity={signal}>ELECTRICAL SIGNAL</text>
        <FocusLabel x={540} y={1190} text="CAPACITANCE → ELECTRONICS → DATA" color={C.mint} dark opacity={signal} />
      </svg>
    </Scene>
    <Scene t={t} id="walk" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="What the accelerometer senses while walking" lines={['Steps create', 'a repeating pattern']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={110} y={640} width={860} height={420} rx={32} fill={C.paper} stroke={C.indigo} strokeWidth={4} />
        <path d={wavePath(150, 850, 780, 95, 4, t * 0.8)} fill="none" stroke={C.indigo} strokeWidth={6} opacity={0.35 + walk * 0.65} />
        <path d={wavePath(150, 850, 780, 36, 17, t * 2.3)} fill="none" stroke={C.coral} strokeWidth={3} opacity={0.45} />
        {[225, 420, 615, 810].map((x, i) => <g key={x} opacity={walk}><FocusRing x={x} y={760 + (i % 2) * 30} rx={48} ry={65} t={t} color={C.mint} /><path d={`M ${x - 14} 1110 q 14 -35 28 0 l -5 55 l -18 0 Z`} fill={C.teal} opacity={0.7} /></g>)}
        <FocusLabel x={540} y={1230} text="STEP RHYTHM + OTHER BODY MOTION" color={C.teal} opacity={walk} />
      </svg>
    </Scene>
    <Scene t={t} id="filter" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="Software interprets the accelerometer data" lines={['Filter the noise.', 'Count real steps.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <g opacity={0.65 - filter * 0.35}><rect x={95} y={650} width={360} height={320} rx={28} fill="rgba(255,255,255,0.04)" stroke={C.coral} strokeWidth={3} /><text x={275} y={700} textAnchor="middle" fill={C.coral} fontWeight={700} fontSize={20}>RAW SIGNAL</text><path d={wavePath(125, 825, 300, 65, 12, t * 2)} fill="none" stroke={C.coral} strokeWidth={4} /></g>
        <Arrow x1={475} y1={810} x2={580} y2={810} color={C.mint} opacity={filter} /><text x={525} y={770} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={18} opacity={filter}>FILTER</text>
        <g opacity={0.3 + filter * 0.7}><rect x={600} y={650} width={385} height={320} rx={28} fill="rgba(255,255,255,0.05)" stroke={C.mint} strokeWidth={4} /><text x={792} y={700} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={20}>ACCEPTED PATTERN</text><path d={wavePath(635, 825, 310, 70, 3, 0)} fill="none" stroke={C.mint} strokeWidth={6} />{[680, 790, 900].map((x, i) => <circle key={x} cx={x} cy={760} r={17} fill={count > i / 3 ? C.amber : C.muted} />)}</g>
        <rect x={310} y={1060} width={460} height={145} rx={30} fill="rgba(255,255,255,0.06)" stroke={C.amber} strokeWidth={4} /><text x={420} y={1150} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={26}>STEPS</text><text x={650} y={1155} textAnchor="middle" fill={C.amber} fontWeight={700} fontSize={56}>{1281 + Math.min(3, Math.floor(count * 4))}</text>
      </svg>
    </Scene>
    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="How the accelerometer counts your steps" lines={['Motion becomes data.', 'Data becomes steps.']} accentIndex={1} size={59} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['PROOF MASS MOVES', C.indigo], ['CAPACITOR GAPS CHANGE', C.amber], ['CHIP OUTPUTS ACCELERATION', C.mint], ['SOFTWARE COUNTS PATTERNS', C.teal]].map(([label, color], i) => <g key={label} transform={`translate(540 ${640 + i * 155})`}><rect x={-345} y={-52} width={690} height={104} rx={24} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} /><text y={8} fill={color as string} fontWeight={700} fontSize={22}>{label}</text>{i < 3 && <Arrow x1={0} y1={60} x2={0} y2={95} color={C.mint} width={4} />}</g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['accelerometer', 'proof mass', 'springs', 'capacitor fingers', 'acceleration signal', 'repeating pattern', 'filters noise', 'genuine steps', 'step counter']} />
    <CalmSound narration="voiceovers/accelerometer-steps/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={55} />
  </AbsoluteFill>;
};
export default Short33AccelerometerSteps;
