import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { CinematicBackground, DeviceStage, SceneHeading, SvgStage, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short54Autofocus', durationInSeconds: 41, fps: 30, width: 1080, height: 1920 };

const Short54Autofocus: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const splitPair = prog(t, line(VO, 'split-pair').start - 0.08, line(VO, 'split-pair').start + 0.55);
  const splitAlign = prog(t, line(VO, 'split-align').start - 0.08, line(VO, 'split-align').start + 0.5);
  const measureDist = prog(t, line(VO, 'measure-distance').start - 0.08, line(VO, 'measure-distance').start + 0.55);
  const driveLens = prog(t, line(VO, 'drive-lens').start - 0.08, line(VO, 'drive-lens').start + 0.55);
  const contrastRefine = prog(t, line(VO, 'contrast-refine').start - 0.08, line(VO, 'contrast-refine').start + 0.5);

  return (
    <AbsoluteFill style={{ background: X.night }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Tap to sharp" lines={['Blurry', 'then instant snap']} accent={X.cyan} size={64} />
        <SvgStage>
          <PanelLabel text="LENS HUNT vs DIRECT JUMP" color={X.cyan} />
          <g transform="translate(320 880)">
            <rect x={-180} y={-160} width={360} height={320} rx={22} fill="#12263a" stroke={X.steel} strokeWidth={5} />
            <circle cx={0} cy={-20} r={48} fill="#20354d" opacity={0.28} />
            <path d="M -140 0 H 140" stroke={X.steel} strokeWidth={4} strokeDasharray="10 10" opacity={0.45} />
            <circle cx={40} cy={0} r={6} fill={X.coral} />
            <text x={0} y={140} textAnchor="middle" fill={X.coral} fontFamily="monospace" fontSize={16}>Hunting: back & forth</text>
            {Array.from({length:5},(_,i)=><circle key={i} cx={-80+i*40} cy={0} r={5} fill={X.steel} opacity={0.35} />)}
          </g>
          <g transform="translate(760 880)">
            <rect x={-180} y={-160} width={360} height={320} rx={22} fill="#12263a" stroke={X.cyan} strokeWidth={6} />
            <circle cx={0} cy={-20} r={52} fill="#d2dced" stroke={X.cyan} strokeWidth={4} />
            <rect x={-52} y={34} width={104} height={68} rx={12} fill="#d2dced" stroke={X.cyan} strokeWidth={4} />
            <circle cx={0} cy={-20} r={6} fill={X.green} />
            <text x={0} y={140} textAnchor="middle" fill={X.cyan} fontFamily="monospace" fontWeight={700} fontSize={16}>Direct: one jump</text>
          </g>
          <path d="M 500 880 H 580" stroke={X.white} strokeWidth={4} strokeDasharray="8 8" />
          <StageNote text="New autofocus jumps straight to sharp" color={X.cyan} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="split" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Two copies from opposite edges" lines={['Left eye,', 'right eye']} accent={X.cyan} size={60} />
        <SvgStage>
          <PanelLabel text="PHASE DETECT · LEFT/RIGHT PAIR" color={X.cyan} />
          <g transform="translate(540 840)">
            <rect x={-480} y={-160} width={420} height={320} rx={22} fill="#12263a" stroke={X.steel} strokeWidth={5} />
            <rect x={60} y={-160} width={420} height={320} rx={22} fill="#12263a" stroke={X.cyan} strokeWidth={5} opacity={0.35+splitPair*0.65} />
            {/* Left copy - shifted left when defocused */}
            <g transform={`translate(${-210 + (1-splitAlign)* -18} -20)`}>
              <rect x={-70} y={-46} width={140} height={92} rx={12} fill="#d2dced" opacity={0.9} />
              <circle cx={0} cy={-14} r={24} fill="#20354d" />
            </g>
            {/* Right copy - shifted right when defocused */}
            <g transform={`translate(${210 + (1-splitAlign)* 18} -20)`}>
              <rect x={-70} y={-46} width={140} height={92} rx={12} fill="#d2dced" opacity={0.9} />
              <circle cx={0} cy={-14} r={24} fill="#20354d" />
            </g>
            <line x1={-210} y1={80} x2={210} y2={80} stroke={X.steel} strokeWidth={4} opacity={0.35} />
            <line x1={-210} y1={80} x2={-210 + (splitAlign? 0: -18)} y2={80} stroke={X.coral} strokeWidth={6} strokeLinecap="round" opacity={splitPair} />
            <line x1={210} y1={80} x2={210 + (splitAlign? 0: 18)} y2={80} stroke={X.cyan} strokeWidth={6} strokeLinecap="round" opacity={splitPair} />
            <text x={-210} y={140} textAnchor="middle" fill={X.coral} fontFamily="monospace" fontSize={16}>Copy A</text>
            <text x={210} y={140} textAnchor="middle" fill={X.cyan} fontFamily="monospace" fontSize={16}>Copy B</text>
            <text x={0} y={1160-840} textAnchor="middle" fill={splitAlign>0.5? X.green: X.coral} fontFamily="monospace" fontWeight={700} fontSize={18}>{splitAlign>0.5? "Aligned = in focus":"Separated = out of focus"}</text>
          </g>
          {splitAlign>0.05 && <HighlightPart x={60} y={680} width={420} height={320} color={X.cyan} opacity={splitAlign*0.45} />}
          <StageNote text={splitAlign>0.5? "When aligned, focus is perfect":"Gap shows which way focus is off"} color={X.cyan} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="measure" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.amber} />
        <DeviceStage accent={X.amber} />
        <SceneHeading eyebrow="Gap tells distance and direction" lines={['Measure gap,', 'know the move']} accent={X.amber} size={58} />
        <SvgStage>
          <PanelLabel text="GAP → LENS TRAVEL" color={X.amber} />
          <g transform="translate(540 870)">
            <rect x={-420} y={-140} width={840} height={140} rx={18} fill="#12263a" stroke={X.amber} strokeWidth={5} />
            <line x1={-360} y1={0} x2={360} y2={0} stroke={X.steel} strokeWidth={6} />
            {[ -240,-120,0,120,240 ].map((x)=> <line key={x} x1={x} y1={-18} x2={x} y2={18} stroke={X.steel} strokeWidth={3} />)}
            <g transform={`translate(${-80 + measureDist*160} 0)`}>
              <rect x={-56} y={-36} width={112} height={72} rx={12} fill={X.amber} stroke={X.white} strokeWidth={4} />
              <text x={0} y={10} textAnchor="middle" fill={X.night} fontFamily="monospace" fontWeight={800} fontSize={16}>LENS</text>
              <line x1={-40} y1={52} x2={-20} y2={70} stroke={X.amber} strokeWidth={4} />
              <line x1={40} y1={52} x2={20} y2={70} stroke={X.amber} strokeWidth={4} />
            </g>
            <text x={-360} y={50} fill={X.steel} fontFamily="monospace" fontSize={14}>BACK</text>
            <text x={360} y={50} textAnchor="end" fill={X.steel} fontFamily="monospace" fontSize={14}>FRONT</text>
            <ClearLabel x={0} y={-190} text={measureDist>0.3? "Gap = +2.4mm → move lens +2.4mm": "Calculating travel..."} color={X.amber} size={18} />
          </g>
          <g transform="translate(540 1020)">
            <rect x={-180} y={-28} width={360} height={56} rx={12} fill={measureDist>0.2? X.amber : "#20344e"} stroke={X.amber} strokeWidth={3} />
            <text x={0} y={10} textAnchor="middle" fill={measureDist>0.2? X.night: X.white} fontFamily="monospace" fontWeight={700} fontSize={16}>{measureDist>0.2? "→ Move 2.4mm forward":"Measuring..."}</text>
          </g>
          {measureDist>0.05 && <HighlightPart x={120} y={730} width={840} height={140} color={X.amber} opacity={measureDist*0.45} />}
          <StageNote text="Separation directly encodes how far to move" color={X.amber} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="drive" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.green} />
        <DeviceStage accent={X.green} />
        <SceneHeading eyebrow="Motor jumps to target" lines={['No hunting,', 'one motion']} accent={X.green} size={60} />
        <SvgStage>
          <PanelLabel text="VOICE COIL MOTOR · DIRECT DRIVE" color={X.green} />
          <g transform="translate(540 870)">
            <rect x={-420} y={-120} width={840} height={180} rx={20} fill="#12263a" stroke={X.steel} strokeWidth={5} />
            <rect x={-380} y={-60} width={760} height={12} rx={6} fill="#2a3b52" />
            <g transform={`translate(${-260 + driveLens*320} 0)`}>
              <rect x={-54} y={-44} width={108} height={88} rx={14} fill={X.green} stroke={X.white} strokeWidth={4} />
              <circle cx={0} cy={0} r={18} fill={X.white} opacity={0.95} />
              <rect x={-18} y={-70} width={36} height={22} rx={6} fill={X.green} />
              <text x={0} y={8} textAnchor="middle" fill={X.night} fontFamily="monospace" fontWeight={800} fontSize={16}>LENS</text>
            </g>
            <path d="M -380 0 H -314" stroke={X.steel} strokeWidth={4} strokeDasharray="7 7" />
            <path d="M 314 0 H 380" stroke={X.steel} strokeWidth={4} strokeDasharray="7 7" />
            <ClearLabel x={-260} y={-160} text="Start" color={X.steel} size={16} />
            <ClearLabel x={60} y={-160} text="Target" color={X.green} size={16} />
            <line x1={60} y1={-140} x2={60} y2={-80} stroke={X.green} strokeWidth={4} strokeDasharray="6 6" />
          </g>
          {driveLens>0.05 && <HighlightPart x={120} y={750} width={840} height={180} color={X.green} opacity={driveLens*0.45} />}
          <StageNote text="Motor moves lens straight to calculated position" color={X.green} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="refine" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.steel} />
        <DeviceStage accent={X.steel} />
        <SceneHeading eyebrow="Final polish with contrast" lines={['Tiny nudge', 'to peak sharp']} accent={X.steel} size={60} />
        <SvgStage>
          <PanelLabel text="CONTRAST PEAK · FINE TUNE" color={X.steel} />
          <g transform="translate(540 880)">
            <rect x={-400} y={-140} width={800} height={200} rx={18} fill="#12263a" stroke={X.steel} strokeWidth={5} />
            <path d="M -320 20 Q -160 -90 0 -20 Q 160 50 320 -10" fill="none" stroke={X.steel} strokeWidth={6} strokeLinecap="round" opacity={0.35} />
            <path d="M -320 20 Q -160 -90 0 -20 Q 160 50 320 -10" fill="none" stroke={X.green} strokeWidth={6} strokeLinecap="round" strokeDasharray="140 320" strokeDashoffset={-contrastRefine*40} opacity={contrastRefine} />
            <circle cx={0} cy={-20} r={10} fill={contrastRefine>0.3? X.green: X.amber} stroke={X.white} strokeWidth={3} />
            <text x={0} y={-60} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={16} fontWeight={700}>Peak contrast</text>
            <line x1={-280} y1={90} x2={280} y2={90} stroke={X.steel} strokeWidth={3} />
            <text x={-280} y={120} fill={X.steel} fontFamily="monospace" fontSize={14}>LENS POSITION →</text>
          </g>
          {contrastRefine>0.05 && <HighlightPart x={140} y={740} width={800} height={200} color={X.steel} opacity={contrastRefine*0.35} />}
          <StageNote text="One last micro-adjust for maximum sharpness" color={X.steel} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Whole focus chain" lines={['Split, measure,', 'jump sharp']} accent={X.cyan} size={60} />
        <SvgStage>
          <PanelLabel text="SPLIT → MEASURE → DRIVE → REFINE" color={X.cyan} />
          <g transform="translate(540 860)">
            {[
              {x:-320,label:"Split pair"},
              {x:-100,label:"Gap = travel"},
              {x:120,label:"Motor jump"},
              {x:320,label:"Sharp"},
            ].map(s=>(
              <g key={s.label} transform={`translate(${s.x} 0)`}>
                <rect x={-78} y={-58} width={156} height={116} rx={18} fill="#12263a" stroke={X.cyan} strokeWidth={4} />
                <text x={0} y={10} textAnchor="middle" fill={X.white} fontFamily="monospace" fontWeight={700} fontSize={14}>{s.label}</text>
                {s.x!==320 && <line x1={78} y1={0} x2={122} y2={0} stroke={X.steel} strokeWidth={4} strokeDasharray="7 7" />}
              </g>
            ))}
          </g>
          <StageNote text="Two images tell distance, motor moves once" color={X.cyan} />
        </SvgStage>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['fraction of a second','hunt back and forth','two copies','opposite sides','separated','align','how far and which direction','directly to the calculated','tiny adjustment','where to go']} />
      <CalmSound narration="voiceovers/autofocus/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO,'closing-summary').end} duration={41} />
    </AbsoluteFill>
  );
};
export default Short54Autofocus;
