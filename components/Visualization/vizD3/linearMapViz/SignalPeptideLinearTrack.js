import { useMemo } from "react";
import { buildLinearArrowPath } from "@/components/Visualization/vizD3/utils/linearPathUtils";
import { extractSPArrowData } from "@/components/Visualization/vizD3/utils/signalPeptidesUtils";
import { SignalPeptideTooltipTemplate } from "@/components/Visualization/tooltip/SignalPeptideTooltipTemplate";

const LinearSignalPeptideTrack = ({
    xScale,
    yCenter,
    arrowHeight,
    signalPeptides,
    toolTipRef,
    stroke = "#818181",
    showBaseline = true,
}) => {
    const processedSignalPeptides = useMemo(
        () => extractSPArrowData(signalPeptides),
        [signalPeptides]
    );

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleSignalPeptides = useMemo(
        () =>
            processedSignalPeptides
                .filter((p) => !(p.end < d0 || p.start > d1))
                .map((p) => ({
                    ...p,
                    startViz: Math.max(p.start, d0),
                    endViz: Math.min(p.end, d1),
                })),
        [processedSignalPeptides, d0, d1]
    );

    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, sp) => {
        toolTipRef?.current?.showTooltip(event, SignalPeptideTooltipTemplate(sp));
    };
    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="SignalPeptidesLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="SignalPeptides">
                {visibleSignalPeptides.map((sp) => (
                    <path
                        key={sp.id}
                        stroke={stroke}
                        fill={sp.color}
                        d={buildLinearArrowPath(sp, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, sp)}
                        onPointerMove={(e) => showTooltip(e, sp)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
        </g>
    );
};

export default LinearSignalPeptideTrack;
