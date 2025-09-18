import { useMemo } from "react";
import { buildLinearArrowPath } from "@/components/Visualization/vizD3/utils/linearPathUtils";
import { extractTRNAArrowData } from "@/components/Visualization/vizD3/utils/tRNAsUtils";
import { TRNATooltipTemplate } from "@/components/Visualization/tooltip/TRNATooltipTemplate";

const LinearTRNATrack = ({
    xScale,
    yCenter,
    arrowHeight,
    tRNAs,
    toolTipRef,
    stroke = "#818181",
    showBaseline = true,
}) => {
    const processedTRNAs = useMemo(() => extractTRNAArrowData(tRNAs), [tRNAs]);

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleTRNAs = useMemo(
        () =>
            processedTRNAs
                .filter((t) => !(t.end < d0 || t.start > d1))
                .map((t) => ({
                    ...t,
                    startViz: Math.max(t.start, d0),
                    endViz: Math.min(t.end, d1),
                })),
        [processedTRNAs, d0, d1]
    );

    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, trna) => {
        toolTipRef?.current?.showTooltip(event, TRNATooltipTemplate(trna));
    };
    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="TRNAsLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="TRNAs">
                {visibleTRNAs.map((tRNA) => (
                    <path
                        key={tRNA.id}
                        stroke={stroke}
                        fill={tRNA.color}
                        d={buildLinearArrowPath(tRNA, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, tRNA)}
                        onPointerMove={(e) => showTooltip(e, tRNA)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
        </g>
    );
};

export default LinearTRNATrack;
