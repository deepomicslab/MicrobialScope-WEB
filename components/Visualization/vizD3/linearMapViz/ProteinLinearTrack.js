import { buildLinearArrowPath } from "@/components/Visualization/vizD3/utils/linearPathUtils"
import { ProteinTooltipTemplate } from "@/components/Visualization/tooltip/ProteinTooltipTemplate"
import { useMemo } from "react"
import { extractProteinsArrowData } from "@/components/Visualization/vizD3/utils/proteinsUtils"

const LinearProteinTrack = ({
    xScale,
    yCenter,
    arrowHeight,
    proteins,
    toolTipRef,
    stroke = "#818181",
    showBaseline = true,
}) => {
    const processedProteins = useMemo(() => extractProteinsArrowData(proteins), [proteins]);

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleProteins = useMemo(
        () =>
            processedProteins
                .filter((p) => !(p.end < d0 || p.start > d1))
                .map((p) => ({
                    ...p,
                    startViz: Math.max(p.start, d0),
                    endViz: Math.min(p.end, d1),
                })),
        [processedProteins, d0, d1]
    );

    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, protein) => {
        toolTipRef?.current?.showTooltip(event, ProteinTooltipTemplate(protein));
    };
    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="ProteinsLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="Proteins">
                {visibleProteins.map((protein) => (
                    <path
                        key={protein.id}
                        stroke={stroke}
                        fill={protein.color}
                        d={buildLinearArrowPath(protein, xScale, yCenter, arrowHeight)}
                        onPointerEnter={(e) => showTooltip(e, protein)}
                        onPointerMove={(e) => showTooltip(e, protein)}
                        onPointerLeave={hideTooltip}
                    />
                ))}
            </g>
        </g>
    );
};

export default LinearProteinTrack
