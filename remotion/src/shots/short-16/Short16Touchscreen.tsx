import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, DemoPanel, Header, PhoneFrame, Scene, TitleBlock, line, reached, spoken } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short16Touchscreen', durationInSeconds: 45, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;
const XS = [340, 460, 580, 700, 820];
const YS = [620, 740, 860, 980, 1100];

const Finger: React.FC<{ x: number; y: number; opacity?: number }> = ({ x, y, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(12)`} opacity={opacity}>
    <path d="M -34 105 L -48 5 C -54 -52 -24 -91 12 -83 C 45 -75 51 -42 44 2 L 35 105 Z" fill="#e8b99f" stroke={C.ink} strokeWidth={5} />
    <path d="M -22 -43 Q 4 -62 29 -42" fill="none" stroke="#c98e77" strokeWidth={4} strokeLinecap="round" />
  </g>
);

const TouchGrid: React.FC<{
  fields?: number; isolate?: boolean; row?: boolean; column?: boolean; changed?: number;
}> = ({ fields = 0, isolate = false, row = false, column = false, changed = 0 }) => (
  <g>
    {XS.map((x, index) => {
      const active = !isolate || column || index === 2;
      return <line key={`x${x}`} x1={x} y1={580} x2={x} y2={1140} stroke={column && index === 2 ? C.teal : C.indigo} strokeWidth={column && index === 2 ? 10 : 6} opacity={active ? (isolate && index !== 2 ? 0.16 : 0.72) : 0.10} />;
    })}
    {YS.map((y, index) => {
      const active = !isolate || row || index === 2;
      return <line key={`y${y}`} x1={300} y1={y} x2={860} y2={y} stroke={row && index === 2 ? C.coral : C.indigo} strokeWidth={row && index === 2 ? 10 : 6} opacity={active ? (isolate && index !== 2 ? 0.16 : 0.72) : 0.10} />;
    })}
    {YS.map((y, ri) => XS.map((x, ci) => {
      const center = ri === 2 && ci === 2;
      const opacity = isolate && !center ? 0.10 : fields;
      const emphasized = center && isolate;
      return <g key={`${x}-${y}`} opacity={opacity}>
        <circle cx={x} cy={y} r={emphasized ? 18 : 11} fill={emphasized && changed > 0 ? C.mint : C.paper} stroke={emphasized ? C.teal : C.indigo} strokeWidth={emphasized ? 7 : 4} />
        {emphasized && <g opacity={0.35 + changed * 0.65}>
          <ellipse cx={x} cy={y} rx={48 + changed * 12} ry={48 - changed * 8} fill="none" stroke={C.teal} strokeWidth={6} />
          <ellipse cx={x} cy={y} rx={78 + changed * 16} ry={78 - changed * 12} fill="none" stroke={C.teal} strokeWidth={4} opacity={0.55} />
        </g>}
      </g>;
    }))}
  </g>
);

const Readout: React.FC<{ x: number; label: string; value: string; color: string; opacity: number }> = ({ x, label, value, color, opacity }) => (
  <g transform={`translate(${x} 1170)`} opacity={opacity}>
    <rect x={-135} y={-55} width={270} height={110} rx={22} fill={C.ink} stroke={color} strokeWidth={3} />
    <text x={0} y={-8} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={20} letterSpacing={2}>{label}</text>
    <text x={0} y={30} textAnchor="middle" fill={color} fontFamily={FONT_MONO} fontWeight={700} fontSize={34}>{value}</text>
  </g>
);

const GloveTest: React.FC<{ x: number; conductive?: boolean; active: number }> = ({ x, conductive = false, active }) => (
  <g transform={`translate(${x} 0)`} opacity={0.14 + active * 0.86}>
    <rect x={-205} y={585} width={410} height={620} rx={30} fill={C.paper} stroke={conductive ? C.teal : C.line} strokeWidth={3} />
    <text x={0} y={640} textAnchor="middle" fill={conductive ? C.teal : C.muted} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>{conductive ? 'CONDUCTIVE THREAD' : 'NORMAL GLOVE'}</text>
    <line x1={-125} y1={970} x2={125} y2={970} stroke={C.indigo} strokeWidth={7} />
    <line x1={0} y1={900} x2={0} y2={1040} stroke={C.indigo} strokeWidth={7} />
    <circle cy={970} r={22} fill={C.paper} stroke={conductive ? C.teal : C.muted} strokeWidth={7} />
    <ellipse cy={970} rx={85} ry={65} fill="none" stroke={C.teal} strokeWidth={5} opacity={conductive ? active : 0.25} />
    <rect x={-125} y={795} width={250} height={65} rx={28} fill="#d8dde5" stroke={C.ink} strokeWidth={4} />
    {conductive && <path d="M -95 827 L 95 827" stroke={C.teal} strokeWidth={10} strokeDasharray="18 10" />}
    <Finger x={0} y={710} />
    <path d={conductive ? 'M 0 755 L 0 935' : 'M 0 755 L 0 790'} stroke={C.teal} strokeWidth={5} strokeDasharray="8 9" opacity={active} />
    {conductive ? <path d="M -28 1100 L -8 1120 L 32 1078" fill="none" stroke={C.teal} strokeWidth={9} strokeLinecap="round" /> : <g stroke={C.coral} strokeWidth={8}><line x1={-24} y1={1080} x2={24} y2={1128} /><line x1={24} y1={1080} x2={-24} y2={1128} /></g>}
    <text x={0} y={1165} textAnchor="middle" fill={conductive ? C.teal : C.coral} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>{conductive ? 'FIELD CHANGES' : 'FIELD UNCHANGED'}</text>
  </g>
);

const Short16Touchscreen: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const touch = prog(t, line(VO, 'hook-touch').start, line(VO, 'hook-touch').start + 0.5);
  const fields = prog(t, line(VO, 'grid-field').start - 0.1, line(VO, 'grid-field').start + 0.6);
  const changed = prog(t, line(VO, 'disturb-change').start - 0.1, line(VO, 'disturb-change').start + 0.7);
  const locate = spoken(t, VO, 'locate-read');
  const position = prog(t, line(VO, 'locate-position').start - 0.1, line(VO, 'locate-position').start + 0.5);
  const conductive = prog(t, line(VO, 'gloves-conductive').start - 0.1, line(VO, 'gloves-conductive').start + 0.45);
  const summary = spoken(t, VO, 'closing-summary');

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="One touch, one location" lines={['Where did', 'you touch?']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <PhoneFrame x={540} y={855} scale={0.95}>
          <circle cx={55} cy={-35} r={25 + touch * 8} fill={C.mint} opacity={0.35 + touch * 0.65} />
          <circle cx={55} cy={-35} r={55 + touch * 15} fill="none" stroke={C.teal} strokeWidth={6} opacity={touch} />
        </PhoneFrame>
        <Finger x={625} y={710} opacity={touch} />
        <Callout x={540} y={1215} targetX={592} targetY={820} text="THIS EXACT SPOT" opacity={prog(t, line(VO, 'hook-question').start, line(VO, 'hook-question').start + 0.5)} />
      </svg>
    </Scene>

    <Scene t={t} id="grid" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Zoom beneath that spot" lines={['Crossings', 'under glass']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <TouchGrid fields={0.35 + fields * 0.55} />
        <Callout x={185} y={610} targetX={460} targetY={740} text="ROW" anchor="middle" />
        <Callout x={900} y={610} targetX={700} targetY={740} text="COLUMN" anchor="middle" />
        <text x={580} y={1215} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={23} opacity={fields}>EVERY CROSSING: A TINY FIELD</text>
      </svg>
    </Scene>

    <Scene t={t} id="disturb" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Ignore the rest for a moment" lines={['Watch one', 'crossing']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <TouchGrid fields={1} isolate changed={changed} />
        <Finger x={625} y={700} opacity={0.35 + changed * 0.65} />
        <Callout x={190} y={590} targetX={580} targetY={860} text="THIS CROSSING" />
        <text x={580} y={1215} textAnchor="middle" fill={changed > 0.4 ? C.teal : C.muted} fontFamily={FONT_MONO} fontWeight={700} fontSize={25}>{changed > 0.4 ? 'FIELD CHANGED HERE' : 'WAIT FOR THE FINGER'}</text>
        <text x={580} y={1255} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20} opacity={reached(t, VO, 'disturb-others') ? 1 : 0}>OTHER CROSSINGS: NEARLY STEADY</text>
      </svg>
    </Scene>

    <Scene t={t} id="locate" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} /><DemoPanel height={830} />
      <TitleBlock eyebrow="Measure, then locate" lines={['Change becomes', 'a position']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <TouchGrid fields={1} isolate row={locate > 0.05 || position > 0} column={locate > 0.45 || position > 0} changed={1} />
        <Readout x={350} label="CHANGED ROW" value="ROW 3" color={C.coral} opacity={locate > 0.05 ? 1 : 0.12} />
        <Readout x={770} label="CHANGED COLUMN" value="COLUMN 3" color={C.teal} opacity={locate > 0.45 ? 1 : 0.12} />
        <g transform="translate(560 1270)" opacity={position}><rect x={-250} y={-40} width={500} height={80} rx={22} fill={C.ink} /><text x={0} y={12} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={28}>TOUCH = (ROW 3, COLUMN 3)</text></g>
      </svg>
    </Scene>

    <Scene t={t} id="gloves" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Same finger, same crossing" lines={['Test the', 'same field']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <GloveTest x={330} active={1 - conductive} />
        <GloveTest x={750} conductive active={conductive} />
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · TOUCH" seconds={45} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The whole cause-and-effect chain" lines={['A changed field', 'becomes a location']} accentIndex={1} size={57} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['1', 'FINGER DRAWS CHARGE'], ['2', 'ONE CROSSING CHANGES'], ['3', 'ROW + COLUMN = POSITION']].map(([number, text], index) => <g key={text} transform={`translate(540 ${675 + index * 220})`} opacity={summary > index * 0.22 ? 1 : 0.12}>
          <rect x={-350} y={-65} width={700} height={130} rx={28} fill="rgba(255,255,255,0.06)" stroke={index === 2 ? C.mint : C.indigo} strokeWidth={3} />
          <circle cx={-285} r={30} fill={index === 2 ? C.mint : C.indigo} /><text x={-285} y={10} fill={C.dark} fontSize={28} fontWeight={700}>{number}</text>
          <text x={35} y={10} fill={C.paper} fontSize={26} fontWeight={700}>{text}</text>
          {index < 2 && <path d="M 0 80 L 0 125" stroke={C.mint} strokeWidth={5} strokeDasharray="8 10" />}
        </g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['center crossing', 'this field changes', 'changed row and column', 'touch position', 'Conductive thread']} />
    <CalmSound narration="voiceovers/touchscreen/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={45} />
  </AbsoluteFill>;
};
export default Short16Touchscreen;
