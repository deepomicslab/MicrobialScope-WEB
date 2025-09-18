import { useMemo } from "react";
import { buildLinearSegmentPath } from "@/components/Visualization/vizD3/utils/linearPathUtils";
import { extractCRISPRCasInfo } from "@/components/Visualization/vizD3/utils/CRISRPCasUtils";
import { CRISPRCasTooltipTemplate } from "@/components/Visualization/tooltip/CRISPRCasTooltipTemplate";

const LinearCRISPRCasTrack = ({
    xScale,
    yCenter,
    arrowHeight,
    CRISRPCas,
    toolTipRef,
    stroke = null,
    showBaseline = true,
}) => {
    const processedCRISPRCas = useMemo(
        () => extractCRISPRCasInfo(CRISRPCas),
        [CRISRPCas]
    );

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleCRISPR = useMemo(
        () =>
            (processedCRISPRCas?.crispr_info_list ?? [])
                .filter((p) => !(p.end < d0 || p.start > d1))
                .map((p) => ({
                    ...p,
                    startViz: Math.max(p.start, d0),
                    endViz: Math.min(p.end, d1),
                })),
        [processedCRISPRCas, d0, d1]
    );

    const visibleCas = useMemo(
        () =>
            (processedCRISPRCas?.cas_info_list ?? [])
                .filter((p) => !(p.end < d0 || p.start > d1))
                .map((p) => ({
                    ...p,
                    startViz: Math.max(p.start, d0),
                    endViz: Math.min(p.end, d1),
                })),
        [processedCRISPRCas, d0, d1]
    );

    // 基线（可选）
    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, datum) => {
        toolTipRef?.current?.showTooltip(event, CRISPRCasTooltipTemplate(datum));
    };
    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="CRISPRCasLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="Cas">
                {visibleCas.map((Cas) => (
                    <path
                        key={Cas.id}
                        stroke={stroke}
                        fill="#FFE3BB"
                        d={buildLinearSegmentPath(Cas, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, Cas)}
                        onPointerMove={(e) => showTooltip(e, Cas)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
            <g className="CRISPR">
                {visibleCRISPR.map((CRISPR) => (
                    <path
                        key={CRISPR.id}
                        stroke={stroke}
                        fill="#03A6A1"
                        d={buildLinearSegmentPath(CRISPR, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, CRISPR)}
                        onPointerMove={(e) => showTooltip(e, CRISPR)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
        </g>
    );
};

export default LinearCRISPRCasTrack;
