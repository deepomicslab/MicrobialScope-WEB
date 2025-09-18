import { useMemo } from "react";
import { buildLinearSegmentPath } from "@/components/Visualization/vizD3/utils/linearPathUtils";
import { extractTransmembraneHelixArrowData } from "@/components/Visualization/vizD3/utils/transmembraneHelicesUtils";
import { TransmembraneHelicesTooltipTemplate } from "@/components/Visualization/tooltip/TransmembraneHelicesTooltipTemplate";

const LinearTransmembraneHelicesTrack = ({
    xScale,
    yCenter,
    arrowHeight,
    transmembraneHelices,
    toolTipRef,
    stroke = null,
    showBaseline = true,
}) => {
    const processedTransmembraneHelices = useMemo(
        () => extractTransmembraneHelixArrowData(transmembraneHelices),
        [transmembraneHelices]
    );

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleTransmembraneHelices = useMemo(
        () =>
            processedTransmembraneHelices
                .filter((p) => !(p.end < d0 || p.start > d1))
                .map((p) => ({
                    ...p,
                    startViz: Math.max(p.start, d0),
                    endViz: Math.min(p.end, d1),
                })),
        [processedTransmembraneHelices, d0, d1]
    );

    // 基线（可选）
    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, helix) => {
        toolTipRef?.current?.showTooltip(
            event,
            TransmembraneHelicesTooltipTemplate(helix)
        );
    };
    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="TransmembraneHelicesLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="TransmembraneHelices">
                {visibleTransmembraneHelices.map((helix) => (
                    <path
                        key={helix.id}
                        stroke={stroke}
                        fill={helix.color}
                        d={buildLinearSegmentPath(helix, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, helix)}
                        onPointerMove={(e) => showTooltip(e, helix)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
        </g>
    );
};

export default LinearTransmembraneHelicesTrack;
