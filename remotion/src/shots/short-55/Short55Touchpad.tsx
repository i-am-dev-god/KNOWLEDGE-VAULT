import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { CinematicBackground, DeviceStage, SceneHeading, SvgStage, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short55Touchpad', durationInSeconds: 42, fps: 30, width: 1080, height: 1920 };

const Short55Touchpad: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const senseGrid = prog(t, line(VO, 'sense-grid').start - 0.08, line(VO, 'sense-grid').start + 0.55);
  const trackPos = prog(t, line(VO, 'track-position').start - 0.08, line(VO, 'track-position').start + 0.55);
  const gestureVel = prog(t, line(VO, 'gesture-velocity').start - 0.08, line(VO, 'gesture-velocity').start + 0.5);
  const gestureSwipe = prog(t, line(VO, 'gesture-swipe').start - 0.08, line(VO, 'gesture-swipe').start + 0.55);
  const hardwareClick = prog(t, line(VO, 'hardware-click').start - 0.08, line(VO, 'hardware-click').start + 0.5);

  return (
    <AbsoluteFill style={{ background: X.night }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="No buttons, still precise" lines={['Touch once,', 'knows your intent']} accent={X.cyan} size={60} />
        <SvgStage>
          <PanelLabel text="LAPTOP TOUCHPAD · CUTAWAY" color={X.cyan} />
          <g transform="translate(540 880)">
            <rect x={-420} y={-180} width={840} height={340} rx={32} fill="#1b2e45" stroke={X.steel} strokeWidth={8} />
            <rect x={-400} y={-160} width={800} height={300} rx={22} fill="#0f2135" stroke={X.steel} strokeWidth={4} />
            {/* Finger pad seated flush on surface - no floating */}
            <g transform="translate(0 -40)">
              <ellipse cx={0} cy={0} rx={52} ry={68} fill="#c9b8a6" stroke="#8d7e6e" strokeWidth={4} />
              <path d="M -18 22 L -6 38" stroke="#8d7e6e" strokeWidth={3} strokeLinecap="round" />
              <circle cx={0} cy={-12} r={6} fill="#8d7e6e" opacity={0.7} />
            </g>
            <rect x={-400} y={140} width={800} height={14} rx={7} fill="#2a3b52" />
            <text x={-380} y={-140} fill={X.steel} fontFamily="monospace" fontSize={15}>58 × 42mm sensing area</text>
          </g>
          <ClearLabel x={540} y={620} text="Glass top, grid underneath" color={X.cyan} />
          <g transform="translate(260 1050)">
            <rect x={-70} y={-22} width={140} height={44} rx={12} fill={X.cyan} stroke={X.white} strokeWidth={2} />
            <text x={0} y={8} textAnchor="middle" fill={X.night} fontFamily="monospace" fontWeight={700} fontSize={16}>TAP → click</text>
          </g>
          <g transform="translate(820 1050)">
            <rect x={-80} y={-22} width={160} height={44} rx={12} fill={X.amber} stroke={X.white} strokeWidth={2} />
            <text x={0} y={8} textAnchor="middle" fill={X.night} fontFamily="monospace" fontWeight={700} fontSize={16}>SWIPE → scroll</text>
          </g>
          <StageNote text="Same finger, different motion, different action" color={X.cyan} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="sense" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Grid under glass" lines={['Rows and columns,', 'every crossing']} accent={X.cyan} size={58} />
        <SvgStage>
          <PanelLabel text="CAPACITIVE GRID · ROWS × COLUMNS" color={X.cyan} />
          <g transform="translate(540 880)">
            <rect x={-380} y={-200} width={760} height={400} rx={24} fill="#0f2135" stroke={X.cyan} strokeWidth={6} />
            {/* Rows - seated horizontal lines */}
            {Array.from({length:7},(_,i)=><path key={`r${i}`} d={`M -340 ${-160+i*53} H 340`} stroke={X.cyan} strokeWidth={5} opacity={0.45} />)}
            {/* Columns - seated vertical lines */}
            {Array.from({length:9},(_,i)=><path key={`c${i}`} d={`M ${-340+i*85} -160 V 160`} stroke={X.violet} strokeWidth={5} opacity={0.45} />)}
            {/* Crossing highlight - steady square, not rotating circle */}
            <rect x={-28} y={-28} width={56} height={56} rx={10} fill={X.cyan} opacity={0.14+senseGrid*0.22} stroke={X.cyan} strokeWidth={4} />
            <circle cx={0} cy={0} r={12} fill={X.amber} opacity={senseGrid} stroke={X.white} strokeWidth={3} />
            {/* Finger press point precisely snapped */}
            <g transform="translate(0 -160)">
              <ellipse cx={0} cy={0} rx={42} ry={36} fill="#c9b8a6" opacity={0.9} />
            </g>
            <text x={0} y={190} textAnchor="middle" fill={X.amber} fontFamily="monospace" fontWeight={700} fontSize={18}>Signal peaks at fingertip</text>
          </g>
          {senseGrid>0.05 && <HighlightPart x={160} y={680} width={760} height={400} color={X.cyan} opacity={senseGrid*0.35} />}
          <StageNote text="Finger disturbs electric field at its grid location" color={X.cyan} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="track" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.violet} />
        <DeviceStage accent={X.violet} />
        <SceneHeading eyebrow="Scanned hundreds of times a second" lines={['Always', 'watching position']} accent={X.violet} size={60} />
        <SvgStage>
          <PanelLabel text="SCAN RATE 240 Hz · X,Y REPORT" color={X.violet} />
          <g transform="translate(540 880)">
            <rect x={-380} y={-200} width={760} height={400} rx={24} fill="#0f2135" stroke={X.violet} strokeWidth={6} />
            {/* Scan line - steady horizontal bar, not dancing */}
            <rect x={-360} y={-200+trackPos*340} width={720} height={10} rx={5} fill={X.violet} opacity={0.7} />
            {/* Tracked point - snapped to grid intersection */}
            <circle cx={40} cy={20} r={18} fill={X.amber} stroke={X.white} strokeWidth={4} opacity={trackPos} />
            <path d="M 40 20 L 140  -80" stroke={X.amber} strokeWidth={4} strokeDasharray="8 8" opacity={trackPos*0.7} />
            <rect x={80} y={-110} width={160} height={52} rx={12} fill={X.night} stroke={X.amber} strokeWidth={3} opacity={trackPos} />
            <text x={160} y={-80} textAnchor="middle" fill={X.amber} fontFamily="monospace" fontWeight={700} fontSize={16}>X=412, Y=238</text>
          </g>
          <ClearLabel x={540} y={1120} text={trackPos>0.2? "Position updated 240× per second":"Scanning..."} color={X.violet} size={18} />
          {trackPos>0.05 && <HighlightPart x={160} y={680} width={760} height={400} color={X.violet} opacity={trackPos*0.4} />}
          <StageNote text="Controller converts field change into coordinates" color={X.violet} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="gesture" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.amber} />
        <DeviceStage accent={X.amber} />
        <SceneHeading eyebrow="Time tells the intent" lines={['Short hold = tap', 'slide = swipe']} accent={X.amber} size={56} />
        <SvgStage>
          <PanelLabel text="TAP  < 150ms STATIONARY  vs  SWIPE  > 30mm" color={X.amber} />
          <g transform="translate(320 880)">
            <rect x={-200} y={-160} width={400} height={320} rx={22} fill="#12263a" stroke={X.steel} strokeWidth={6} />
            <rect x={-180} y={-140} width={360} height={260} rx={16} fill="#0f2135" />
            <circle cx={0} cy={-20} r={18} fill={X.green} opacity={0.35+gestureVel*0.65} stroke={X.green} strokeWidth={3} />
            <path d="M 0 30 L 0 80" stroke={X.steel} strokeWidth={3} opacity={0.3} />
            <text x={0} y={-90} textAnchor="middle" fill={X.steel} fontFamily="monospace" fontSize={14}>0 mm move</text>
            <text x={0} y={140} textAnchor="middle" fill={X.green} fontFamily="monospace" fontWeight={700} fontSize={16}>TAP</text>
            <text x={0} y={170} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={14}>120 ms hold → click</text>
            {gestureVel>0.1 && <HighlightPart x={120} y={720} width={400} height={320} color={X.green} opacity={gestureVel*0.4} />}
          </g>
          <g transform="translate(760 880)">
            <rect x={-200} y={-160} width={400} height={320} rx={22} fill="#12263a" stroke={X.amber} strokeWidth={6} opacity={0.35+gestureSwipe*0.65} />
            <rect x={-180} y={-140} width={360} height={260} rx={16} fill="#0f2135" />
            <circle cx={-60} cy={-20} r={16} fill={X.amber} opacity={0.9} />
            <path d="M -60 -20 H 80" stroke={X.amber} strokeWidth={8} strokeLinecap="round" opacity={0.6+gestureSwipe*0.4} />
            <circle cx={80} cy={-20} r={16} fill={X.amber} />
            {[ -30,0,30 ].map((x)=><circle key={x} cx={x} cy={-20} r={4} fill={X.white} opacity={gestureSwipe} />)}
            <text x={0} y={140} textAnchor="middle" fill={X.amber} fontFamily="monospace" fontWeight={700} fontSize={16}>SWIPE</text>
            <text x={0} y={170} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={14}>68 mm → scroll 3 lines</text>
            {gestureSwipe>0.1 && <HighlightPart x={560} y={720} width={400} height={320} color={X.amber} opacity={gestureSwipe*0.45} />}
          </g>
          <StageNote text={gestureSwipe>0.2? "Movement length and time classify gesture":"Still vs moving decides tap vs swipe"} color={X.amber} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="hardware" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.steel} />
        <DeviceStage accent={X.steel} />
        <SceneHeading eyebrow="Firm press gives feedback" lines={['Pad flexes,', 'switch clicks']} accent={X.steel} size={60} />
        <SvgStage>
          <PanelLabel text="PHYSICAL SWITCH UNDER PAD" color={X.steel} />
          <g transform="translate(540 860)">
            {/* Pad layer - seated with precise gap to switch */}
            <rect x={-380} y={-100} width={760} height={18} rx={9} fill={hardwareClick>0.1? "#22364e":"#1b2e45"} stroke={X.steel} strokeWidth={6} />
            <rect x={-40} y={-98} width={80} height={18} rx={6} fill={hardwareClick>0.1? X.green:"#2a3b52"} opacity={0.9} />
            {/* Switch dome - snaps shut */}
            <g transform={`translate(0 ${hardwareClick>0.1? 16: 28})`}>
              <path d="M -30 0 Q 0 -22 30 0" fill={hardwareClick>0.1? X.green:"#2a3b52"} stroke={X.steel} strokeWidth={4} />
              <circle cx={0} cy={6} r={8} fill={hardwareClick>0.1? X.white: "#5a6b82"} />
            </g>
            <rect x={-220} y={60} width={440} height={22} rx={8} fill="#0f2135" stroke={X.steel} strokeWidth={3} />
            <text x={0} y={100} textAnchor="middle" fill={hardwareClick>0.1? X.green: X.steel} fontFamily="monospace" fontWeight={700} fontSize={18}>{hardwareClick>0.1? "CLICK — 1.2 N force":"Press down → click (55g)"}</text>
          </g>
          {hardwareClick>0.05 && <HighlightPart x={160} y={760} width={760} height={100} color={X.steel} opacity={hardwareClick*0.45} />}
          <StageNote text="Flex + tactile dome gives physical click feel" color={X.steel} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Whole touchpad chain" lines={['Grid, motion,', 'click']} accent={X.cyan} size={62} />
        <SvgStage>
          <PanelLabel text="GRID → TRACK → GESTURE → CLICK" color={X.cyan} />
          <g transform="translate(540 860)">
            {[
              {x:-320,label:"Grid scan"},
              {x:-100,label:"X,Y track"},
              {x:110,label:"Tap/Swipe"},
              {x:320,label:"Press click"},
            ].map(s=>(
              <g key={s.label} transform={`translate(${s.x} 0)`}>
                <rect x={-78} y={-58} width={156} height={116} rx={18} fill="#12263a" stroke={X.cyan} strokeWidth={4} />
                <text x={0} y={10} textAnchor="middle" fill={X.white} fontFamily="monospace" fontWeight={700} fontSize={14}>{s.label}</text>
                {s.x!==320 && <line x1={78} y1={0} x2={122} y2={0} stroke={X.steel} strokeWidth={4} strokeDasharray="7 7" />}
              </g>
            ))}
          </g>
          <StageNote text="Field change → position → timing → action" color={X.cyan} />
        </SvgStage>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['tap clicks','swipe scrolls','capacitive electrodes','electrical signal','many times per second','where you touch','short stationary','continued movement','pressing harder','physical switch','timing turn']} />
      <CalmSound narration="voiceovers/touchpad/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO,'closing-summary').end} duration={42} />
    </AbsoluteFill>
  );
};
export default Short55Touchpad;
