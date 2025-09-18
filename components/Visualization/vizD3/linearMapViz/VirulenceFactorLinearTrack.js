import { useMemo } from "react";
import { buildLinearArrowPath } from "@/components/Visualization/vizD3/utils/linearPathUtils";
import { extractVirulenceFactorData } from "@/components/Visualization/vizD3/utils/virulenceFactorsUtils";
import { VirulenceFactorTooltipTemplate } from "@/components/Visualization/tooltip/VirulenceFactorTooltipTemplate";

const LinearVirulenceFactorsTrack = ({
    xScale,
    yCenter,
    arrowHeight,
    virulenceFactors,
    toolTipRef,
    stroke = "#818181",
    showBaseline = true,
}) => {
    const processedVirulenceFactors = useMemo(
        () => extractVirulenceFactorData(virulenceFactors),
        [virulenceFactors]
    );

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleVirulenceFactors = useMemo(
        () =>
            processedVirulenceFactors
                .filter((v) => !(v.end < d0 || v.start > d1))
                .map((v) => ({
                    ...v,
                    startViz: Math.max(v.start, d0),
                    endViz: Math.min(v.end, d1),
                })),
        [processedVirulenceFactors, d0, d1]
    );

    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, vf) => {
        toolTipRef?.current?.showTooltip(event, VirulenceFactorTooltipTemplate(vf));
    };
    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="VirulenceFactorsLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="VirulenceFactors">
                {visibleVirulenceFactors.map((vf) => (
                    <path
                        key={vf.id}
                        stroke={stroke}
                        fill={vf.color}
                        d={buildLinearArrowPath(vf, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, vf)}
                        onPointerMove={(e) => showTooltip(e, vf)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
        </g>
    );
};

export default LinearVirulenceFactorsTrack;
