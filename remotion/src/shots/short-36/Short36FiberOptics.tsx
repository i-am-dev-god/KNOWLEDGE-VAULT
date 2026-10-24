import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line, wavePath } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, DeviceStage, FlowPath, Glow, Leader, QuadraticPulse,
  SceneHeading, StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short36FiberOptics', durationInSeconds: 56, fps: 30, width: 1080, height: 1920 };

const FiberConnector: React.FC<{ x: number; y: number; label: string; active?: number }> = ({ x, y, label, active = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={0.35 + active * 0.65}>
    <rect x={-85} y={-105} width={170} height={210} rx={28} fill={X.panel2} stroke={X.steel} strokeWidth={4} />
    <rect x={-58} y={-75} width={116} height={150} rx={20} fill={X.night} stroke={X.blue} strokeWidth={3} />
    <circle r={35} fill="#142d46" stroke={X.cyan} strokeWidth={5} />
    <circle r={12} fill={X.cyan} style={{ filter: `drop-shadow(0 0 12px ${X.cyan})` }} />
    <TinyLabel x={0} y={145} text={label} color={X.steel} />
  </g>
);

const BitBlocks: React.FC<{ x: number; y: number; bits?: string; color?: string; opacity?: number }> = ({ x, y, bits = '10110', color = X.cyan, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity} fontFamily="JetBrains Mono, monospace" textAnchor="middle">
    {bits.split('').map((bit, i) => <g key={i} transform={`translate(${i * 66} 0)`}>
      <rect x={-25} y={-30} width={50} height={60} rx={12} fill={bit === '1' ? color : X.panel2} stroke={color} strokeWidth={2} opacity={bit === '1' ? 0.9 : 0.65} />
      <text y={10} fill={bit === '1' ? X.night : X.steel} fontSize={27} fontWeight={800}>{bit}</text>
    </g>)}
  </g>
);

const Short36FiberOptics: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const copper = prog(t, line(VO, 'hook-copper').start - 0.1, line(VO, 'hook-copper').start + 0.7);
  const encode = prog(t, line(VO, 'transmit-encode').start - 0.1, line(VO, 'transmit-encode').start + 0.8);
  const enter = prog(t, line(VO, 'core-enter').start - 0.1, line(VO, 'core-enter').start + 0.8);
  const boundary = prog(t, line(VO, 'reflect-boundary').start - 0.1, line(VO, 'reflect-boundary').start + 0.7);
  const zigzag = prog(t, line(VO, 'reflect-zigzag').start - 0.1, line(VO, 'reflect-zigzag').start + 0.7);
  const detect = prog(t, line(VO, 'receive-detect').start - 0.1, line(VO, 'receive-detect').start + 0.7);
  const restore = prog(t, line(VO, 'receive-data').start - 0.1, line(VO, 'receive-data').start + 0.7);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.blue} /><DeviceStage accent={X.blue} />
      <SceneHeading eyebrow="Inside a fiber-optic internet link" lines={['Internet data', 'travels as light']} accent={X.cyan} />
      <SvgStage>
        <Glow x={540} y={805} r={250} color={X.cyan} opacity={0.55} />
        <FiberConnector x={170} y={810} label="TRANSMITTER" /><FiberConnector x={910} y={810} label="RECEIVER" />
        <path d="M 255 810 H 825" stroke="#263c5c" strokeWidth={104} strokeLinecap="round" />
        <path d="M 255 810 H 825" stroke="#9ed5e4" strokeWidth={62} strokeLinecap="round" opacity={0.42} />
        <path d="M 255 810 H 825" stroke={X.cyan} strokeWidth={17} strokeLinecap="round" opacity={0.75} />
        <FlowPath d="M 260 810 H 820" t={t} color={X.amber} width={12} speed={125} dash="8 34" />
        <FocusRing x={540} y={810} rx={340} ry={100} t={t} color={X.cyan} opacity={0.8} />
        <Leader x={540} y={620} tx={540} ty={753} text="GLASS FIBER · CODED LIGHT" color={X.cyan} />
        <g opacity={0.18 + copper * 0.32}>
          <path d="M 265 1080 H 815" stroke={X.coral} strokeWidth={24} strokeLinecap="round" />
          <MovingDots x1={280} y1={1080} x2={800} y2={1080} t={t} color={X.coral} count={7} radius={7} />
          <TinyLabel x={540} y={1150} text="COPPER CARRIES ELECTRICAL PULSES" color={X.coral} />
        </g>
        <StatusPill x={540} y={1260} text="FIBER GUIDES LIGHT · NOT ELECTRICITY" color={X.cyan} opacity={copper} width={650} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="transmit" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The fiber transmitter encodes the data" lines={['Digital bits', 'become light pulses']} accent={X.violet} />
      <SvgStage>
        <BitBlocks x={180} y={620} color={X.blue} /><TinyLabel x={310} y={700} text="DIGITAL DATA" color={X.blue} />
        <path d={wavePath(135, 815, 275, 60, 2.5, 0)} fill="none" stroke={X.blue} strokeWidth={7} />
        <TinyLabel x={275} y={920} text="ELECTRICAL INPUT" color={X.muted} />
        <Arrow x1={350} y1={815} x2={445} y2={815} color={X.blue} width={6} />
        <g opacity={0.4 + encode * 0.6}>
          <rect x={455} y={705} width={205} height={220} rx={30} fill={X.panel2} stroke={X.violet} strokeWidth={4} />
          <TinyLabel x={557} y={755} text="LASER / LED" color={X.violet} />
          <path d="M 500 835 L 555 775 L 610 835 L 555 895 Z" fill={X.violet} opacity={0.35} />
          <circle cx={555} cy={835} r={25} fill={X.amber} /><Glow x={555} y={835} r={55} color={X.amber} opacity={encode} />
          <FocusRing x={557} y={815} rx={145} ry={160} t={t} color={X.violet} opacity={encode} />
        </g>
        <path d="M 660 835 H 950" stroke="#9ed5e4" strokeWidth={50} opacity={0.35} />
        <path d="M 660 835 H 950" stroke={X.cyan} strokeWidth={14} opacity={0.7} />
        <MovingDots x1={680} y1={835} x2={940} y2={835} t={t} color={X.amber} count={5} radius={12} opacity={encode} speed={0.42} />
        <path d={wavePath(700, 1045, 235, 70, 3.5, 0)} fill="none" stroke={X.amber} strokeWidth={7} opacity={encode} />
        <TinyLabel x={815} y={1160} text="RAPID OPTICAL PULSES" color={X.amber} opacity={encode} />
        <StatusPill x={365} y={1215} text="BITS CONTROL THE FLASHES" color={X.violet} opacity={encode} width={530} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="core" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A precision glass pathway" lines={['Light enters', 'the narrow core']} accent={X.cyan} />
      <SvgStage>
        <g transform={`translate(540 ${845 - enter * 25})`}>
          <circle r={300} fill="#101d31" stroke="#3b5371" strokeWidth={14} />
          <circle r={235} fill="#23405a" stroke="#7093ac" strokeWidth={8} opacity={0.85} />
          <circle r={155} fill="#8fc5d4" stroke="#c4f4f2" strokeWidth={6} opacity={0.38 + enter * 0.25} />
          <circle r={72} fill={X.cyan} opacity={0.25 + enter * 0.35} style={{ filter: `drop-shadow(0 0 22px ${X.cyan})` }} />
          <circle r={27} fill={X.white} opacity={0.75 + enter * 0.25} />
          <FocusRing x={0} y={0} rx={105} ry={105} t={t} color={X.cyan} opacity={enter} />
        </g>
        <Leader x={245} y={590} tx={375} ty={650} text="PROTECTIVE JACKET" color={X.steel} />
        <Leader x={815} y={700} tx={670} ty={735} text="CLADDING" color={X.blue} />
        <Leader x={815} y={1010} tx={610} ty={890} text="LIGHT-CARRYING CORE" color={X.cyan} />
        <g opacity={enter}>
          <QuadraticPulse x1={110} y1={1160} cx={260} cy={1160} x2={455} y2={955} t={t} count={4} color={X.amber} radius={12} speed={0.34} />
          <Arrow x1={155} y1={1190} x2={365} y2={1050} color={X.amber} width={5} opacity={0.5} />
        </g>
        <StatusPill x={540} y={1260} text="THE CORE IS THE LIGHT'S PATH" color={X.cyan} opacity={enter} width={570} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="reflect" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.blue} /><DeviceStage accent={X.blue} />
      <SceneHeading eyebrow="The fiber traps and guides each flash" lines={['Reflection keeps', 'light inside']} accent={X.blue} />
      <SvgStage>
        <path d="M 145 760 C 330 760 315 555 540 555 C 760 555 745 835 935 835" fill="none" stroke="#20354f" strokeWidth={126} strokeLinecap="round" />
        <path d="M 145 760 C 330 760 315 555 540 555 C 760 555 745 835 935 835" fill="none" stroke="#8fc5d4" strokeWidth={82} strokeLinecap="round" opacity={0.38} />
        <FlowPath d="M 145 760 C 330 760 315 555 540 555 C 760 555 745 835 935 835" t={t} color={X.cyan} width={18} speed={105} dash="10 34" opacity={0.45 + boundary * 0.55} />
        <TinyLabel x={540} y={490} text="LIGHT FOLLOWS A BENDING FIBER" color={X.cyan} opacity={boundary} />
        <g opacity={0.25 + zigzag * 0.75}>
          <rect x={140} y={970} width={800} height={210} rx={90} fill="#132a40" stroke="#6e94ac" strokeWidth={5} />
          <rect x={165} y={1000} width={750} height={150} rx={70} fill="#8fc5d4" opacity={0.22} />
          <path d="M 205 1075 L 305 1015 L 405 1135 L 505 1015 L 605 1135 L 705 1015 L 805 1135 L 875 1075" fill="none" stroke={X.amber} strokeWidth={11} strokeLinejoin="round" />
          <FlowPath d="M 205 1075 L 305 1015 L 405 1135 L 505 1015 L 605 1135 L 705 1015 L 805 1135 L 875 1075" t={t} color={X.white} width={5} speed={90} dash="3 28" />
          <FocusRing x={505} y={1020} rx={90} ry={70} t={t} color={X.amber} opacity={zigzag} />
        </g>
        <Leader x={720} y={945} tx={505} ty={1015} text="REFLECT AT THE BOUNDARY" color={X.amber} opacity={zigzag} />
        <StatusPill x={540} y={1280} text="TOTAL INTERNAL REFLECTION" color={X.amber} opacity={zigzag} width={540} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="receive" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The far end decodes the light" lines={['Flashes become', 'data again']} accent={X.green} />
      <SvgStage>
        <path d="M 100 790 H 335" stroke="#8fc5d4" strokeWidth={54} opacity={0.35} />
        <MovingDots x1={115} y1={790} x2={325} y2={790} t={t} color={X.amber} count={4} radius={12} speed={0.40} />
        <g opacity={0.35 + detect * 0.65}>
          <rect x={335} y={650} width={240} height={280} rx={32} fill={X.panel2} stroke={X.green} strokeWidth={4} />
          <TinyLabel x={455} y={700} text="PHOTODETECTOR" color={X.green} />
          <path d="M 390 790 L 455 725 L 520 790 L 455 855 Z" fill={X.green} opacity={0.3} />
          <circle cx={455} cy={790} r={28} fill={X.amber} opacity={0.5 + detect * 0.5} />
          <FocusRing x={455} y={790} rx={165} ry={185} t={t} color={X.green} opacity={detect} />
        </g>
        <Arrow x1={580} y1={790} x2={665} y2={790} color={X.green} width={6} opacity={restore} />
        <path d={wavePath(665, 790, 260, 85, 3, t * 0.3)} fill="none" stroke={X.blue} strokeWidth={8} opacity={restore} />
        <TinyLabel x={795} y={935} text="ELECTRICAL DATA" color={X.blue} opacity={restore} />
        <BitBlocks x={650} y={1080} color={X.green} opacity={restore} />
        <TinyLabel x={790} y={1185} text="TO YOUR COMPUTER / ROUTER" color={X.green} opacity={restore} />
        <StatusPill x={540} y={1280} text="LIGHT + DARKNESS → DIGITAL BITS" color={X.green} opacity={restore} width={650} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A complete fiber-optic link" lines={['Encode. Guide.', 'Detect. Decode.']} accent={X.cyan} />
      <SvgStage>
        <BitBlocks x={120} y={690} bits="1011" color={X.blue} /><Arrow x1={390} y1={690} x2={465} y2={690} color={X.blue} width={5} />
        <circle cx={535} cy={690} r={55} fill={X.panel2} stroke={X.violet} strokeWidth={4} /><Glow x={535} y={690} r={60} color={X.amber} /><circle cx={535} cy={690} r={18} fill={X.amber} />
        <path d="M 595 690 C 720 690 690 950 830 950" fill="none" stroke="#8fc5d4" strokeWidth={55} opacity={0.35} />
        <FlowPath d="M 595 690 C 720 690 690 950 830 950" t={t} color={X.cyan} width={13} speed={110} />
        <rect x={825} y={875} width={150} height={150} rx={30} fill={X.panel2} stroke={X.green} strokeWidth={4} /><TinyLabel x={900} y={965} text="DETECT" color={X.green} />
        <BitBlocks x={690} y={1130} bits="1011" color={X.green} />
        <Leader x={300} y={540} tx={300} ty={640} text="DIGITAL DATA" color={X.blue} />
        <Leader x={540} y={540} tx={535} ty={625} text="LIGHT PULSES" color={X.amber} />
        <Leader x={540} y={1190} tx={660} ty={900} text="GUIDED THROUGH GLASS" color={X.cyan} />
        <StatusPill x={360} y={1280} text="THE FAR END RESTORES THE DATA" color={X.green} width={600} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['fiber-optic cable', 'internet data', 'light', 'laser', 'LED', 'core', 'cladding', 'total internal reflection', 'photodetector', 'electrical data']} />
    <CalmSound narration="voiceovers/fiber-optics/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={56} />
  </AbsoluteFill>;
};
export default Short36FiberOptics;
