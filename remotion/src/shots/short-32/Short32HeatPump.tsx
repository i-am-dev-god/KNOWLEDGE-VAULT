import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, DemoPanel, Scene, TitleBlock, line } from '../../lib/next-calm';
import { Arrow, FocusLabel, FocusRing, MovingDots } from '../../lib/focus';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short32HeatPump', durationInSeconds: 55, fps: 30, width: 1080, height: 1920 };
const W = 1080; const H = 1920;

const Coil: React.FC<{ x: number; y: number; color: string; label: string }> = ({ x, y, color, label }) => (
  <g transform={`translate(${x} ${y})`} fontFamily={FONT_MONO}>
    <rect x={-190} y={-150} width={380} height={300} rx={28} fill={C.paper} stroke={color} strokeWidth={5} />
    {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M -135 ${-95 + i * 48} L 135 ${-95 + i * 48}`} stroke={color} strokeWidth={13} strokeLinecap="round" />)}
    <text x={0} y={195} textAnchor="middle" fill={color} fontWeight={700} fontSize={22}>{label}</text>
  </g>
);
const Fan: React.FC<{ x: number; y: number; t: number; active?: number }> = ({ x, y, t, active = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${t * 150 * active})`} opacity={0.3 + active * 0.7}>
    {[0, 90, 180, 270].map((r) => <path key={r} d="M 0 0 Q 75 -85 105 -20 Q 65 20 0 0" transform={`rotate(${r})`} fill={C.teal} opacity={0.75} />)}<circle r={22} fill={C.dark} stroke={C.mint} strokeWidth={5} />
  </g>
);
const House: React.FC<{ x: number; y: number }> = ({ x, y }) => <g transform={`translate(${x} ${y})`}><path d="M -170 -20 L 0 -155 L 170 -20 L 170 170 L -170 170 Z" fill="#e7f2ef" stroke={C.teal} strokeWidth={6} /><rect x={-45} y={55} width={90} height={115} fill={C.indigo} opacity={0.65} /></g>;

const Short32HeatPump: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const existing = prog(t, line(VO, 'hook-existing').start - 0.1, line(VO, 'hook-existing').start + 0.7);
  const absorb = prog(t, line(VO, 'outside-absorb').start - 0.1, line(VO, 'outside-absorb').start + 0.8);
  const compress = prog(t, line(VO, 'compress-raise').start - 0.1, line(VO, 'compress-raise').start + 0.8);
  const release = prog(t, line(VO, 'inside-release').start - 0.1, line(VO, 'inside-release').start + 0.7);
  const fan = prog(t, line(VO, 'inside-fan').start - 0.1, line(VO, 'inside-fan').start + 0.7);
  const condense = prog(t, line(VO, 'valve-condense').start - 0.1, line(VO, 'valve-condense').start + 0.6);
  const valve = prog(t, line(VO, 'valve-cool').start - 0.1, line(VO, 'valve-cool').start + 0.7);
  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="A heat pump is a heat mover" lines={['Warm your home', 'with outdoor heat']} accentIndex={1} size={61} />
      <svg width={W} height={H} fontFamily={FONT_MONO}>
        <rect x={95} y={690} width={290} height={310} rx={30} fill="#e5f1fb" stroke={C.blue} strokeWidth={4} /><text x={240} y={745} textAnchor="middle" fill={C.blue} fontWeight={700} fontSize={22}>COLD OUTDOOR AIR</text>
        <g opacity={0.35 + existing * 0.65}>{[150, 230, 310].map((x, i) => <circle key={x} cx={x} cy={835 + (i % 2) * 65} r={18} fill={C.amber} />)}<text x={240} y={955} textAnchor="middle" fill={C.amber} fontWeight={700} fontSize={20}>HEAT IS STILL PRESENT</text></g>
        <House x={790} y={865} />
        <MovingDots x1={390} y1={840} x2={610} y2={840} t={t} color={C.amber} count={6} radius={13} /><Arrow x1={390} y1={840} x2={620} y2={840} color={C.amber} width={5} opacity={0.4} />
        <FocusRing x={500} y={840} rx={155} ry={100} t={t} opacity={existing} color={C.amber} /><FocusLabel x={525} y={1160} text="MOVE HEAT · DO NOT CREATE IT" color={C.teal} opacity={existing} />
      </svg>
    </Scene>
    <Scene t={t} id="outside" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="At the heat pump's outdoor coil" lines={['Cold refrigerant', 'collects heat']} accentIndex={1} size={62} />
      <svg width={W} height={H} fontFamily={FONT_MONO}>
        <g opacity={0.35 + absorb * 0.65}><Coil x={540} y={860} color={C.blue} label="OUTDOOR COIL" /><FocusRing x={540} y={860} rx={240} ry={205} t={t} opacity={absorb} color={C.blue} /></g>
        <MovingDots x1={110} y1={720} x2={330} y2={790} t={t} color={C.amber} opacity={absorb} count={6} radius={12} /><MovingDots x1={970} y1={720} x2={750} y2={790} t={t} color={C.amber} opacity={absorb} count={6} radius={12} />
        <text x={180} y={650} fill={C.amber} fontWeight={700} fontSize={22} opacity={absorb}>HEAT FROM AIR</text><text x={760} y={650} fill={C.amber} fontWeight={700} fontSize={22} opacity={absorb}>HEAT FROM AIR</text>
        <g opacity={absorb}>{[440, 540, 640].map((x, i) => <g key={x}><circle cx={x} cy={900 - i * 30} r={22 + i * 4} fill={C.blue} opacity={0.35 + i * 0.2} /><text x={x} y={910 - i * 30} textAnchor="middle" fill={C.paper} fontSize={18}>GAS</text></g>)}<FocusLabel x={540} y={1190} text="REFRIGERANT EVAPORATES" color={C.mint} dark /></g>
      </svg>
    </Scene>
    <Scene t={t} id="compress" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="The heat pump raises the temperature" lines={['The compressor', 'squeezes the gas']} accentIndex={1} size={62} />
      <svg width={W} height={H} fontFamily={FONT_MONO}>
        <rect x={250} y={660} width={580} height={390} rx={60} fill="#edf0f5" stroke={C.indigo} strokeWidth={7} /><rect x={330} y={730} width={420} height={210} rx={35} fill="#d5f0e9" stroke={C.teal} strokeWidth={4} />
        <g transform={`translate(0 ${Math.sin(t * 5) * 18 * compress})`}><rect x={390} y={610} width={300} height={95} rx={20} fill={C.indigo} /><text x={540} y={670} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={23}>PISTON</text></g>
        {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={390 + (i % 5) * (75 - compress * 18)} cy={800 + Math.floor(i / 5) * 80} r={18} fill={compress > 0.55 ? C.coral : C.blue} opacity={0.4 + compress * 0.6} />)}
        <FocusRing x={540} y={830} rx={340} ry={245} t={t} opacity={compress} color={C.coral} />
        <Arrow x1={900} y1={980} x2={900} y2={720} color={C.coral} width={8} opacity={compress} /><text x={900} y={1040} textAnchor="middle" fill={C.coral} fontWeight={700} fontSize={22} opacity={compress}>TEMPERATURE RISES</text>
        <FocusLabel x={540} y={1180} text="PRESSURE ↑ · TEMPERATURE ↑" color={C.coral} opacity={compress} />
      </svg>
    </Scene>
    <Scene t={t} id="inside" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="Inside your home" lines={['The indoor coil', 'releases the heat']} accentIndex={1} size={62} />
      <svg width={W} height={H} fontFamily={FONT_MONO}>
        <Coil x={370} y={850} color={C.coral} label="HOT INDOOR COIL" /><FocusRing x={370} y={850} rx={235} ry={205} t={t} opacity={release} color={C.coral} />
        <g opacity={0.3 + fan * 0.7}><Fan x={780} y={850} t={t} active={fan} /><FocusRing x={780} y={850} rx={145} ry={145} t={t} opacity={fan} /><text x={780} y={1050} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={22}>FAN</text></g>
        <MovingDots x1={535} y1={750} x2={700} y2={700} t={t} color={C.amber} opacity={release} count={5} radius={12} /><MovingDots x1={820} y1={700} x2={960} y2={650} t={t} color={C.amber} opacity={fan} count={4} radius={12} />
        <FocusLabel x={690} y={1190} text="WARM AIR ENTERS YOUR ROOMS" color={C.amber} dark opacity={fan} />
      </svg>
    </Scene>
    <Scene t={t} id="valve" scenes={SCENES}>
      <Background t={t} /><DemoPanel top={470} height={830} />
      <TitleBlock y={90} eyebrow="The heat pump resets the refrigerant" lines={['Condense. Expand.', 'Repeat the cycle.']} accentIndex={2} size={61} />
      <svg width={W} height={H} fontFamily={FONT_MONO}>
        <path d="M 260 720 L 790 720 L 790 1070 L 260 1070 Z" fill="none" stroke={C.muted} strokeWidth={12} opacity={0.45} />
        <Coil x={270} y={720} color={C.blue} label="OUTDOOR" /><g opacity={0.45 + condense * 0.55}><Coil x={790} y={720} color={C.coral} label="INDOOR" />{[710, 790, 870].map((x) => <path key={x} d={`M ${x} 825 Q ${x - 22} 860 ${x} 875 Q ${x + 22} 860 ${x} 825`} fill={C.blue} opacity={condense} />)}</g>
        <rect x={205} y={1010} width={110} height={120} rx={25} fill={C.indigo} /><text x={260} y={1080} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={18}>COMP.</text>
        <g opacity={0.25 + valve * 0.75}><path d="M 720 1040 L 860 1100 M 720 1100 L 860 1040" stroke={C.amber} strokeWidth={12} /><FocusRing x={790} y={1070} rx={125} ry={95} t={t} opacity={valve} color={C.amber} /><text x={790} y={1200} textAnchor="middle" fill={C.amber} fontWeight={700} fontSize={21}>EXPANSION VALVE</text></g>
        <MovingDots x1={330} y1={720} x2={650} y2={720} t={t} color={C.coral} opacity={condense} /><MovingDots x1={790} y1={830} x2={790} y2={960} t={t} color={C.blue} opacity={condense} /><MovingDots x1={710} y1={1070} x2={360} y2={1070} t={t} color={C.blue} opacity={valve} />
        <FocusLabel x={440} y={1210} text="COLD AGAIN FOR OUTDOORS" color={C.blue} opacity={valve} />
      </svg>
    </Scene>
    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><DemoPanel dark top={470} height={830} />
      <TitleBlock dark y={90} eyebrow="One refrigerant loop moves the heat" lines={['Absorb. Compress.', 'Release. Repeat.']} accentIndex={1} size={62} />
      <svg width={W} height={H} fontFamily={FONT_MONO} textAnchor="middle">
        {[['OUTDOOR COIL ABSORBS HEAT', C.blue], ['COMPRESSOR RAISES TEMPERATURE', C.coral], ['INDOOR COIL HEATS YOUR HOME', C.amber], ['VALVE RESETS THE CYCLE', C.mint]].map(([label, color], i) => <g key={label} transform={`translate(540 ${640 + i * 155})`}><rect x={-350} y={-52} width={700} height={104} rx={24} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} /><text y={8} fill={color as string} fontWeight={700} fontSize={21}>{label}</text>{i < 3 && <Arrow x1={0} y1={60} x2={0} y2={95} color={C.mint} width={4} />}</g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['heat pump', 'moving heat', 'existing heat', 'refrigerant', 'evaporates', 'compressor', 'indoor coil', 'fan', 'condenses', 'expansion valve']} />
    <CalmSound narration="voiceovers/heat-pump/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={55} />
  </AbsoluteFill>;
};
export default Short32HeatPump;
