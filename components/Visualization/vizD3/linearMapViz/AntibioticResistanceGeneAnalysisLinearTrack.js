import { useMemo } from "react";
import { buildLinearArrowPath } from "@/components/Visualization/vizD3/utils/linearPathUtils";
import {
    extractAnalysisAntibioticResistanceArrowData,
} from "@/components/Visualization/vizD3/utils/antibioticResistanceUtils";
import {
    AnalysisAntibioticResistanceTooltipTemplate,
} from "@/components/Visualization/tooltip/AntibioticResistanceTooltipTemplate";

const AnalysisLinearAntibioticResistanceTrack = ({
    xScale,
    yCenter,
    arrowHeight,
    antibioticResistance,
    toolTipRef,
    stroke = "#818181",
    showBaseline = true,
}) => {
    const processedAntibioticResistance = useMemo(
        () => extractAnalysisAntibioticResistanceArrowData(antibioticResistance),
        [antibioticResistance]
    );

    const [d0, d1] = xScale.domain();

    // 裁剪到可视窗口并派生可视区间
    const visibleAntibioticResistance = useMemo(
        () =>
            processedAntibioticResistance
                .filter((p) => !(p.end < d0 || p.start > d1))
                .map((p) => ({
                    ...p,
                    startViz: Math.max(p.start, d0),
                    endViz: Math.min(p.end, d1),
                })),
        [processedAntibioticResistance, d0, d1]
    );

    const baselineD = `M ${xScale(d0)} ${yCenter} L ${xScale(d1)} ${yCenter}`;

    const showTooltip = (event, item) => {
        toolTipRef?.current?.showTooltip(
            event,
            AnalysisAntibioticResistanceTooltipTemplate(item)
        );
    };
    const hideTooltip = () => {
        toolTipRef?.current?.hideTooltip();
    };

    return (
        <g className="AntibioticResistanceLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            <g className="AntibioticResistance">
                {visibleAntibioticResistance.map((item) => (
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

export default AnalysisLinearAntibioticResistanceTrack;
