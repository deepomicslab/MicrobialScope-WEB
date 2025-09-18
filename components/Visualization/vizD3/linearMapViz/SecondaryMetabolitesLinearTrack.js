import { buildLinearArrowPath, buildLinearSegmentPath } from "@/components/Visualization/vizD3/utils/linearPathUtils"
import {
    SecondaryMetabolitesTooltipTemplate
} from "@/components/Visualization/tooltip/SecondaryMetabolitesTooltipTemplate"
import { extractMetaboliteArrowData } from "@/components/Visualization/vizD3/utils/secondaryMetabolitesUtils"
import { useMemo } from "react"

const LinearSecondaryMetabolitesTrack = ({
    xScale,
    yCenter,
    arrowHeight,
    secondaryMetabolites,
    toolTipRef,
    stroke = "#818181",
    showBaseline = true,
}) => {
    // 预处理（与圆形版本相同的提取逻辑）
    const processedSecondaryMetabolites = useMemo(
        () => extractMetaboliteArrowData(secondaryMetabolites),
        [secondaryMetabolites]
    );

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleSecondaryMetabolites = useMemo(
        () =>
            processedSecondaryMetabolites
                .filter((p) => !(p.end < d0 || p.start > d1))
                .map((p) => ({
                    ...p,
                    startViz: Math.max(p.start, d0),
                    endViz: Math.min(p.end, d1),
                })),
        [processedSecondaryMetabolites, d0, d1]
    );

    // 基线（可选）
    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, metabolite) => {
        toolTipRef?.current?.showTooltip(
            event,
            SecondaryMetabolitesTooltipTemplate(metabolite)
        );
    };

    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="SecondaryMetabolitesLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="SecondaryMetabolites">
                {visibleSecondaryMetabolites.map((m) => (
                    <path
                        key={m.id}
                        stroke={stroke}
                        fill={m.color}
                        d={buildLinearSegmentPath(m, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, m)}
                        onPointerMove={(e) => showTooltip(e, m)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
        </g>
    );
};

export default LinearSecondaryMetabolitesTrack;
