import { useMemo } from "react";
import { buildLinearArrowPath } from "@/components/Visualization/vizD3/utils/linearPathUtils";
import { AntiCRISPRTooltipTemplate } from "@/components/Visualization/tooltip/AntiCRISPRTooltipTemplate";
import { extractAntiCRISPRArrowData } from "@/components/Visualization/vizD3/utils/antiCRISPRUtils";

/**
 * 线性 AntiCRISPR Track（与 LinearProteinTrack 风格一致）
 */
const LinearAntiCRISPRTrack = ({
    xScale,
    yCenter,
    arrowHeight,
    antiCRISPR,
    toolTipRef,
    stroke = "#818181",
    showBaseline = true,
}) => {
    // 预处理为箭头数据
    const processedAntiCRISPR = useMemo(
        () => extractAntiCRISPRArrowData(antiCRISPR),
        [antiCRISPR]
    );

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleAntiCRISPR = useMemo(
        () =>
            processedAntiCRISPR
                .filter((p) => !(p.end < d0 || p.start > d1))
                .map((p) => ({
                    ...p,
                    startViz: Math.max(p.start, d0),
                    endViz: Math.min(p.end, d1),
                })),
        [processedAntiCRISPR, d0, d1]
    );

    // 基线
    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, item) => {
        toolTipRef?.current?.showTooltip(event, AntiCRISPRTooltipTemplate(item));
    };
    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="AntiCRISPRLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="AntiCRISPRs">
                {visibleAntiCRISPR.map((item) => (
                    <path
                        key={item.id}
                        stroke={stroke}
                        fill={item.color}
                        d={buildLinearArrowPath(item, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, item)}
                        onPointerMove={(e) => showTooltip(e, item)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
        </g>
    );
};

export default LinearAntiCRISPRTrack;
