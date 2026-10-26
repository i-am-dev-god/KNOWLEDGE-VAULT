import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Scene, TitleBlock, line } from '../../lib/next-calm';
import { Arrow, FocusLabel, FocusRing, MovingDots } from '../../lib/focus';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short35Airbag', durationInSeconds: 55, fps: 30, width: 1080, height: 1920 };
const W = 1080; const H = 1920;
const Occupant: React.FC<{ x: number; y: number; move?: number; belt?: number }> = ({ x, y, move = 0, belt = 1 }) => <g transform={`translate(${x + move} ${y})`} fontFamily={FONT_MONO}>
  <circle cx={0} cy={-145} r={62} fill="#dce5f2" stroke={C.ink} strokeWidth={6} /><path d="M -75 -65 Q 0 -110 75 -65 L 105 135 L -105 135 Z" fill="#dce5f2" stroke={C.ink} strokeWidth={6} />
  <path d="M -65 -65 L 70 125" stroke={C.indigo} strokeWidth={22} opacity={0.3 + belt * 0.7} /><rect x={-135} y={125} width={270} height={45} rx={20} fill={C.muted} /><text x={0} y={230} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={20}>SEAT BELT + OCCUPANT</text>
</g>;
const Steering: React.FC<{ x: number; y: number; active?: number }> = ({ x, y, active = 0 }) => <g transform={`translate(${x} ${y})`}><circle r={130} fill="none" stroke={C.ink} strokeWidth={28} /><circle r={55} fill={active > 0.4 ? C.coral : C.dark} stroke={C.mint} strokeWidth={active * 5} /><path d="M -120 0 L -55 0 M 120 0 L 55 0 M 0 120 L 0 55" stroke={C.ink} strokeWidth={22} /></g>;

const Short35Airbag: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const slow = prog(t, line(VO, 'hook-slow').start - 0.1, line(VO, 'hook-slow').start + 0.7);
  const sense = prog(t, line(VO, 'sense-decelerate').start - 0.1, line(VO, 'sense-decelerate').start + 0.7);
  const decide = prog(t, line(VO, 'sense-decide').start - 0.1, line(VO, 'sense-decide').start + 0.7);
  const ignite = prog(t, line(VO, 'trigger-ignite').start - 0.1, line(VO, 'trigger-ignite').start + 0.6);
  const gas = prog(t, line(VO, 'trigger-gas').start - 0.1, line(VO, 'trigger-gas').start + 0.8);
  const spread = prog(t, line(VO, 'cushion-spread').start - 0.1, line(VO, 'cushion-spread').start + 0.9);
  const vent = prog(t, line(VO, 'cushion-vent').start - 0.1, line(VO, 'cushion-vent').start + 0.8);
  const cushionScale = (0.15 + spread * 0.85) * (1 - vent * 0.22);
  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="An airbag works with your seat belt" lines={['A cushion', 'during a severe crash']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <Occupant x={330} y={875} belt={1} /><Steering x={800} y={865} active={0.3} />
        <ellipse cx={590} cy={835} rx={165} ry={205} fill={C.mint} opacity={0.20} stroke={C.teal} strokeWidth={5} strokeDasharray="12 10" /><text x={590} y={835} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={22}>AIRBAG CUSHION</text>
        <FocusRing x={590} y={835} rx={195} ry={235} t={t} color={C.mint} />
        <g opacity={slow}><FocusLabel x={540} y={1190} text="SLOWED FOR EXPLANATION" color={C.amber} /><text x={540} y={1250} textAnchor="middle" fill={C.muted} fontWeight={700} fontSize={20}>REAL RESPONSE: TENS OF MILLISECONDS</text></g>
      </svg>
    </Scene>
    <Scene t={t} id="sense" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The airbag system evaluates the crash" lines={['Sense deceleration.', 'Confirm severe impact.']} accentIndex={1} size={59} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={95} y={650} width={500} height={390} rx={30} fill="rgba(255,255,255,0.045)" stroke={C.coral} strokeWidth={4} /><text x={345} y={705} textAnchor="middle" fill={C.coral} fontWeight={700} fontSize={21}>SUDDEN DECELERATION</text>
        <path d="M 140 950 L 140 760 M 140 950 L 550 950" stroke={C.muted} strokeWidth={3} /><path d="M 150 900 L 240 900 L 285 890 L 320 735 L 355 890 L 430 900 L 540 900" fill="none" stroke={C.coral} strokeWidth={7} />
        <path d="M 140 810 L 550 810" stroke={C.amber} strokeWidth={3} strokeDasharray="9 9" opacity={decide} /><text x={535} y={795} textAnchor="end" fill={C.amber} fontWeight={700} fontSize={18} opacity={decide}>SEVERE CRASH THRESHOLD</text>
        <rect x={160} y={1060} width={170} height={95} rx={25} fill={C.coral} /><text x={245} y={1120} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={19}>CRASH SENSOR</text><FocusRing x={245} y={1108} rx={120} ry={85} t={t} opacity={sense} color={C.coral} />
        <MovingDots x1={350} y1={1100} x2={625} y2={1100} t={t} color={C.mint} opacity={sense} /><Chip x={770} y={1100} scale={0.55} label="ACU" opacity={0.35 + sense * 0.65} /><FocusRing x={770} y={1100} rx={145} ry={105} t={t} opacity={decide} />
        <g opacity={decide}><circle cx={770} cy={800} r={100} fill={C.mint} opacity={0.14} /><path d="M 720 800 L 755 835 L 825 755" fill="none" stroke={C.mint} strokeWidth={14} strokeLinecap="round" /><text x={770} y={950} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={20}>TRIGGER AUTHORIZED</text></g>
      </svg>
    </Scene>
    <Scene t={t} id="trigger" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="Inside the folded airbag module" lines={['Ignite the generator.', 'Fill the cushion.']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={180} y={650} width={720} height={480} rx={45} fill={C.paper} stroke={C.ink} strokeWidth={6} /><text x={540} y={705} textAnchor="middle" fill={C.muted} fontWeight={700} fontSize={20}>AIRBAG MODULE · CUTAWAY</text>
        <g opacity={0.35 + gas * 0.65}><path d="M 350 790 L 730 790 L 680 950 L 400 950 Z" fill="#dce5f2" stroke={C.indigo} strokeWidth={5} /><path d="M 400 820 L 680 920 M 420 900 L 690 830" stroke={C.muted} strokeWidth={4} /><text x={540} y={865} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={21}>FOLDED FABRIC</text></g>
        <rect x={400} y={975} width={280} height={105} rx={40} fill={C.dark} stroke={gas > 0.4 ? C.mint : C.muted} strokeWidth={5} /><text x={540} y={1040} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={20}>GAS GENERATOR</text>
        <rect x={255} y={980} width={100} height={100} rx={20} fill={ignite > 0.3 ? C.amber : C.muted} /><text x={305} y={1115} textAnchor="middle" fill={C.amber} fontWeight={700} fontSize={19}>IGNITER</text><FocusRing x={305} y={1030} rx={90} ry={90} t={t} opacity={ignite} color={C.amber} />
        <MovingDots x1={375} y1={1030} x2={420} y2={1030} t={t} color={C.amber} opacity={ignite} count={3} />
        <MovingDots x1={540} y1={970} x2={540} y2={825} t={t} color={C.mint} opacity={gas} count={6} radius={12} speed={0.5} /><FocusRing x={540} y={1015} rx={190} ry={100} t={t} opacity={gas} />
        <FocusLabel x={540} y={1220} text={gas > 0.4 ? 'GAS FLOWS INTO THE CUSHION' : 'IGNITER ACTIVATES GENERATOR'} color={gas > 0.4 ? C.teal : C.amber} />
      </svg>
    </Scene>
    <Scene t={t} id="cushion" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The airbag manages the occupant's motion" lines={['Spread the force.', 'Vent and yield.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <Occupant x={285} y={875} move={vent * 65} belt={0.8} /><Steering x={865} y={890} active={1} />
        <g transform={`translate(610 835) scale(${cushionScale})`}><ellipse rx={250} ry={270} fill="#dce5f2" stroke={C.mint} strokeWidth={9} /><ellipse rx={220} ry={240} fill="none" stroke={C.muted} strokeWidth={3} strokeDasharray="10 12" /></g>
        <FocusRing x={610} y={835} rx={250 * cushionScale + 30} ry={270 * cushionScale + 30} t={t} opacity={spread} color={C.mint} />
        <g opacity={spread * (1 - vent)}><Arrow x1={610} y1={700} x2={610} y2={625} color={C.amber} /><Arrow x1={500} y1={835} x2={425} y2={835} color={C.amber} /><Arrow x1={720} y1={835} x2={795} y2={835} color={C.amber} /><FocusLabel x={600} y={1210} text="FORCE SPREAD OVER A WIDER AREA" color={C.amber} dark /></g>
        <g opacity={vent}><MovingDots x1={750} y1={700} x2={910} y2={590} t={t} color={C.mint} count={5} /><MovingDots x1={760} y1={970} x2={920} y2={1070} t={t} color={C.mint} count={5} /><circle cx={770} cy={700} r={15} fill={C.dark} stroke={C.mint} strokeWidth={5} /><circle cx={770} cy={970} r={15} fill={C.dark} stroke={C.mint} strokeWidth={5} /><FocusLabel x={600} y={1210} text="VENTS RELEASE GAS AS IT CUSHIONS" color={C.mint} dark /></g>
      </svg>
    </Scene>
    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="The airbag's complete protective sequence" lines={['Sense. Inflate.', 'Cushion and yield.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['SENSOR + CONTROL UNIT', C.coral], ['IGNITER + GAS GENERATOR', C.amber], ['CUSHION SPREADS FORCE', C.mint], ['VENTS ALLOW CONTROLLED YIELD', C.teal]].map(([label, color], i) => <g key={label} transform={`translate(540 ${640 + i * 155})`}><rect x={-350} y={-52} width={700} height={104} rx={24} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} /><text y={8} fill={color as string} fontWeight={700} fontSize={21}>{label}</text>{i < 3 && <Arrow x1={0} y1={60} x2={0} y2={95} color={C.mint} width={4} />}</g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['airbag', 'seat belt', 'tens of milliseconds', 'deceleration', 'control unit', 'severe impact', 'igniter', 'gas generator', 'cushion', 'vents', 'deflating']} />
    <CalmSound narration="voiceovers/airbag/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={55} />
  </AbsoluteFill>;
};
export default Short35Airbag;
