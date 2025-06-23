import { useMemo } from "react"
import { extractAntibioticResistanceArrowData } from "@/components/Visualization/vizD3/utils/antibioticResistanceUtils"
import { buildArrowPath, buildCircularPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import { SignalPeptideTooltipTemplate } from "@/components/Visualization/tooltip/SignalPeptideTooltipTemplate"
import {
    AntibioticResistanceTooltipTemplate
} from "@/components/Visualization/tooltip/AntibioticResistanceTooltipTemplate"

const AntibioticResistanceArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    antibioticResistance,
    arrowWidth,
    toolTipRef
}) => {
    const processedAntibioticResistance = useMemo(() => {
        return extractAntibioticResistanceArrowData(antibioticResistance)
    }, [antibioticResistance])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleAntibioticResistance = processedAntibioticResistance
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, antibioticResistance) => {
        toolTipRef.current.showTooltip(event, AntibioticResistanceTooltipTemplate(antibioticResistance))
    }

    const hideTooltip = () => {
        toolTipRef.current.hideTooltip()
    }

    return (
        <g className='SignalPeptidesArc'>
            <path
                fill="none"
                stroke='gray'
                d={d}
            ></path>
            <g className='SignalPeptides'>
                {
                    visibleAntibioticResistance.map(
                        antibioticResistance => (
                            <path
                                key={antibioticResistance.id}
                                stroke='#818181'
                                fill={antibioticResistance.color}
                                d={buildArrowPath(antibioticResistance, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, antibioticResistance)}
                                onPointerMove={(event) => showTooltip(event, antibioticResistance)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default AntibioticResistanceArc
