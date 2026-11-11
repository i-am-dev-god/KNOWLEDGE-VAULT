import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { CinematicBackground, DeviceStage, SceneHeading, SvgStage, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short53PortraitMode', durationInSeconds: 43, fps: 30, width: 1080, height: 1920 };

const PhoneFrame: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 520, h = 360 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w/2} y={-h/2} width={w} height={h} rx={32} fill="#0f2135" stroke={X.steel} strokeWidth={8} />
    <rect x={-w/2+14} y={-h/2+14} width={w-28} height={h-28} rx={22} fill="#07101d" />
  </g>
);

const Short53PortraitMode: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const captureTwo = prog(t, line(VO, 'capture-two').start - 0.08, line(VO, 'capture-two').start + 0.55);
  const depthMap = prog(t, line(VO, 'depth-map').start - 0.08, line(VO, 'depth-map').start + 0.55);
  const cutPerson = prog(t, line(VO, 'cut-person').start - 0.08, line(VO, 'cut-person').start + 0.5);
  const blurBg = prog(t, line(VO, 'blur-background').start - 0.08, line(VO, 'blur-background').start + 0.55);
  const edgeHair = prog(t, line(VO, 'edge-hair').start - 0.08, line(VO, 'edge-hair').start + 0.5);

  return (
    <AbsoluteFill style={{ background: X.night }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.violet} />
        <DeviceStage accent={X.violet} />
        <SceneHeading eyebrow="Sharp person, soft background" lines={['Not a big lens,', 'software blur']} accent={X.violet} size={58} />
        <SvgStage>
          <PanelLabel text="BEFORE → AFTER (SAME SHOT)" color={X.violet} />
          <g transform="translate(320 880)">
            <rect x={-190} y={-180} width={380} height={360} rx={22} fill="#1b2e45" stroke={X.steel} strokeWidth={6} />
            <circle cx={0} cy={-40} r={56} fill="#d2dced" />
            <rect x={-56} y={16} width={112} height={84} rx={14} fill="#d2dced" />
            <g opacity={0.28}>
              <rect x={-160} y={-150} width={320} height={80} rx={12} fill="#20354d" />
              <circle cx={-90} cy={-110} r={18} fill="#2e445e" />
              <circle cx={90} cy={-110} r={18} fill="#2e445e" />
            </g>
            <text x={0} y={160} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={16}>Before: all sharp</text>
          </g>
          <g transform="translate(760 880)">
            <rect x={-190} y={-180} width={380} height={360} rx={22} fill="#1b2e45" stroke={X.violet} strokeWidth={6} />
            <g opacity={0.18} filter="blur(4px)">
              <rect x={-160} y={-150} width={320} height={80} rx={12} fill="#20354d" />
              <circle cx={-90} cy={-110} r={18} fill="#2e445e" />
              <circle cx={90} cy={-110} r={18} fill="#2e445e" />
            </g>
            {/* Person stays sharp - seated centered */}
            <circle cx={0} cy={-40} r={56} fill="#d2dced" stroke={X.white} strokeWidth={3} />
            <rect x={-56} y={16} width={112} height={84} rx={14} fill="#d2dced" stroke={X.white} strokeWidth={3} />
            <text x={0} y={160} textAnchor="middle" fill={X.violet} fontFamily="monospace" fontWeight={700} fontSize={16}>After: background blurred</text>
          </g>
          <path d="M 510 880 H 570" stroke={X.white} strokeWidth={4} strokeDasharray="8 8" />
          <StageNote text="Phone adds blur after capture" color={X.violet} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="capture" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Two views from slightly apart" lines={['Parallax', 'measures depth']} accent={X.cyan} size={60} />
        <SvgStage>
          <PanelLabel text="DUAL LENS · SAME MOMENT" color={X.cyan} />
          <g transform="translate(540 860)">
            <rect x={-520} y={-200} width={460} height={300} rx={26} fill="#12263a" stroke={X.cyan} strokeWidth={6} />
            <circle cx={-260} cy={-40} r={14} fill={X.cyan} />
            <circle cx={-180} cy={-40} r={14} fill={X.steel} />
            <rect x={-420} y={-60} width={90} height={60} rx={10} fill="#0a1726" stroke={X.cyan} strokeWidth={4} />
            <rect x={-340} y={-60} width={90} height={60} rx={10} fill="#0a1726" stroke={X.steel} strokeWidth={3} />
            <text x={-260} y={40} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={18}>Lens A · Lens B</text>
            <rect x={60} y={-200} width={460} height={300} rx={26} fill="#12263a" stroke={X.steel} strokeWidth={4} />
            <g transform="translate(290 -60)">
              <circle cx={0} cy={0} r={42} fill="#d2dced" />
              <rect x={-36} y={24} width={72} height={52} rx={10} fill="#d2dced" />
              <circle cx={-70} cy={-20} r={16} fill="#20354d" opacity={0.9-captureTwo*0.2} />
              <circle cx={70} cy={-20} r={16} fill="#20354d" opacity={0.9-captureTwo*0.2} />
              {/* Parallax shift shown as 8px vs 18px - precise */}
              <line x1={-70} y1={20} x2={-70+(captureTwo*10)} y2={20} stroke={X.cyan} strokeWidth={5} />
              <line x1={70} y1={20} x2={70+(captureTwo*4)} y2={20} stroke={X.steel} strokeWidth={5} />
              <text x={0} y={110} textAnchor="middle" fill={X.cyan} fontFamily="monospace" fontSize={16}>{captureTwo>0.3? "shift 10px (near)":"shift 4px (far)"}</text>
            </g>
          </g>
          <ClearLabel x={-260} y={700} text="Two lenses, one instant" color={X.cyan} />
          <ClearLabel x={290} y={1050} text={captureTwo>0.3 ? "Near moves more than far" : "Parallax reveals distance"} color={X.cyan} />
          {captureTwo>0.05 && <HighlightPart x={20} y={660} width={1040} height={300} color={X.cyan} opacity={captureTwo*0.35} />}
          <StageNote text="Closer objects shift more between views" color={X.cyan} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="depth" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.violet} />
        <DeviceStage accent={X.violet} />
        <SceneHeading eyebrow="Every pixel gets a distance" lines={['Depth map', 'near vs far']} accent={X.violet} size={62} />
        <SvgStage>
          <PanelLabel text="DEPTH MAP · LIGHT = NEAR" color={X.violet} />
          <g transform="translate(540 880)">
            {Array.from({length:12},(_,r)=>Array.from({length:12},(_,c)=>{
              const cx = -198 + c*36;
              const cy = -108 + r*36;
              const isPerson = (c>=4 && c<=7 && r>=3 && r<=8) || (c===5||c===6)&&r===2;
              const near = isPerson ? 0.92 : (r<2? 0.2 : 0.35 + (c%3)*0.1);
              const alpha = 0.18 + near*0.82;
              return <rect key={`${r}-${c}`} x={cx-14} y={cy-14} width={28} height={28} rx={6} fill={near>0.7? X.violet: near>0.3? X.steel: "#0a1726"} fillOpacity={alpha} stroke={near>0.7? X.white: "#22364e"} strokeWidth={1.5} />
            }))}
            <rect x={-216} y={-126} width={432} height={252} rx={18} fill="none" stroke={X.violet} strokeWidth={5} />
          </g>
          <g transform="translate(200 1160)">
            <rect x={-60} y={-12} width={28} height={28} rx={6} fill={X.violet} />
            <text x={-20} y={10} fill={X.white} fontFamily="monospace" fontSize={16}>Near (person, 1m)</text>
            <rect x={-60} y={26} width={28} height={28} rx={6} fill="#0a1726" stroke="#22364e" strokeWidth={2} />
            <text x={-20} y={48} fill={X.white} fontFamily="monospace" fontSize={16}>Far (wall, 4m)</text>
          </g>
          {depthMap>0.05 && <HighlightPart x={324} y={772} width={432} height={252} color={X.violet} opacity={depthMap*0.45} />}
          <StageNote text="Brighter = closer; darker = farther" color={X.violet} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="cutout" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.green} />
        <DeviceStage accent={X.green} />
        <SceneHeading eyebrow="Keep the person, mark the rest" lines={['Precise', 'cutout first']} accent={X.green} size={60} />
        <SvgStage>
          <PanelLabel text="PERSON MASK · HAIR KEPT SHARP" color={X.green} />
          <g transform="translate(540 880)">
            <rect x={-210} y={-160} width={420} height={320} rx={26} fill="#12263a" stroke={X.steel} strokeWidth={5} />
            {/* Background blurred */}
            <g opacity={0.22}>
              <rect x={-180} y={-120} width={360} height={70} rx={12} fill="#20354d" />
              <circle cx={-80} cy={-90} r={14} fill="#2e445e" />
            </g>
            {/* Person mask - seated exactly centered */}
            <g opacity={0.35+cutPerson*0.65}>
              <circle cx={0} cy={-40} r={52} fill={X.white} stroke={X.green} strokeWidth={4} fillOpacity={0.14} />
              <rect x={-52} y={14} width={104} height={78} rx={12} fill={X.white} fillOpacity={0.14} stroke={X.green} strokeWidth={4} />
              {/* Hair edge detail - tiny strands kept */}
              {Array.from({length:7},(_,i)=><path key={i} d={`M ${-26+i*8} -78 Q ${-22+i*8} -94 ${-18+i*8} -80`} stroke={X.green} strokeWidth={2.5} opacity={cutPerson} />)}
            </g>
            <text x={0} y={200} textAnchor="middle" fill={X.green} fontFamily="monospace" fontSize={18} fontWeight={700}>{cutPerson>0.3? "Mask edges = 1px":"Finding edges..."}</text>
          </g>
          <ClearLabel x={540} y={680} text="AI finds person boundary" color={X.green} />
          {cutPerson>0.05 && <HighlightPart x={330} y={720} width={420} height={320} color={X.green} opacity={cutPerson*0.45} />}
          <StageNote text="Cutout decides what stays sharp" color={X.green} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="blur" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.violet} />
        <DeviceStage accent={X.violet} />
        <SceneHeading eyebrow="Blur only where map says far" lines={['Background', 'turns to bokeh']} accent={X.violet} size={60} />
        <SvgStage>
          <PanelLabel text="BACKGROUND BLUR · BOKEH DISCS" color={X.violet} />
          <g transform="translate(540 880)">
            <rect x={-210} y={-160} width={420} height={320} rx={26} fill="#0f2135" stroke={X.violet} strokeWidth={5} />
            {/* Bokeh discs - seated in grid, no drift */}
            {[
              {x:-90,y:-90,r:14},{x:70,y:-80,r:18},{x:-120,y:60,r:12},{x:100,y:70,r:16},{x:0,y:-110,r:10}
            ].map((d,i)=><circle key={i} cx={d.x} cy={d.y} r={d.r} fill={X.violet} opacity={0.14+blurBg*0.42} />)}
            <circle cx={0} cy={-40} r={52} fill="#d2dced" stroke={X.white} strokeWidth={4} />
            <rect x={-52} y={14} width={104} height={78} rx={12} fill="#d2dced" stroke={X.white} strokeWidth={4} />
            <text x={0} y={200} textAnchor="middle" fill={X.violet} fontFamily="monospace" fontSize={16} fontWeight={700}>Blur radius = depth × 12px</text>
          </g>
          {blurBg>0.05 && <HighlightPart x={330} y={720} width={420} height={320} color={X.violet} opacity={blurBg*0.4} />}
          <StageNote text="Far = strong blur; near = no blur" color={X.violet} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="edge" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.amber} />
        <DeviceStage accent={X.amber} />
        <SceneHeading eyebrow="Hair stays sharp" lines={['Refine edges', 'one pixel at a time']} accent={X.amber} size={58} />
        <SvgStage>
          <PanelLabel text="EDGE REFINEMENT · 1PX FEATHER" color={X.amber} />
          <g transform="translate(540 880)">
            <rect x={-220} y={-160} width={440} height={320} rx={22} fill="#12263a" stroke={X.amber} strokeWidth={5} />
            <circle cx={0} cy={-40} r={52} fill="#d2dced" />
            {/* Magnifier inset - seated at corner */}
            <rect x={110} y={-150} width={110} height={110} rx={14} fill={X.night} stroke={X.amber} strokeWidth={4} />
            <g clipPath="url(#clipEdge)">
              <defs><clipPath id="clipEdge"><rect x={112} y={-148} width={106} height={106} rx={12} /></clipPath></defs>
              <rect x={112} y={-148} width={106} height={106} rx={12} fill="#20354d" />
              <path d="M 150 -110 L 180 -80" stroke={X.white} strokeWidth={3} opacity={edgeHair} />
              <circle cx={165} cy={-95} r={22} fill="#d2dced" stroke={X.amber} strokeWidth={2} opacity={0.95} />
            </g>
            <text x={165} y={-10} textAnchor="middle" fill={X.amber} fontFamily="monospace" fontSize={13}>100% crop</text>
          </g>
          {edgeHair>0.05 && <HighlightPart x={650} y={730} width={110} height={110} color={X.amber} opacity={edgeHair*0.5} rx={14} />}
          <StageNote text="Refinement saves hair from blur bleed" color={X.amber} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.violet} />
        <DeviceStage accent={X.violet} />
        <SceneHeading eyebrow="Whole portrait chain" lines={['Depth decides', 'what blurs']} accent={X.violet} size={60} />
        <SvgStage>
          <PanelLabel text="TWO VIEWS → DEPTH → MASK → BLUR" color={X.violet} />
          <g transform="translate(540 860)">
            {[
              {x:-300,label:"Two shots"},
              {x:-100,label:"Depth map"},
              {x:100,label:"Cutout"},
              {x:300,label:"Blur BG"},
            ].map(s=>(
              <g key={s.label} transform={`translate(${s.x} 0)`}>
                <rect x={-78} y={-58} width={156} height={116} rx={18} fill="#12263a" stroke={X.violet} strokeWidth={4} />
                <text x={0} y={10} textAnchor="middle" fill={X.white} fontFamily="monospace" fontWeight={700} fontSize={14}>{s.label}</text>
                {s.x!==300 && <line x1={78} y1={0} x2={122} y2={0} stroke={X.steel} strokeWidth={4} strokeDasharray="7 7" />}
              </g>
            ))}
          </g>
          <StageNote text="Measure depth, cut person, blur far away" color={X.violet} />
        </SvgStage>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['sharp while the background','not from a large lens','two lenses','depth map','cuts out the person','blurred with bokeh','hair sharp','portrait with blurred background']} />
      <CalmSound narration="voiceovers/portrait-mode/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO,'closing-summary').end} duration={43} />
    </AbsoluteFill>
  );
};
export default Short53PortraitMode;
