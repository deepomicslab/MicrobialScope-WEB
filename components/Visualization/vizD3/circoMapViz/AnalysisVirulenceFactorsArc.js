import { useMemo } from "react"
import {
    extractAnalysisVirulenceFactorData,
    extractVirulenceFactorData
} from "@/components/Visualization/vizD3/utils/virulenceFactorsUtils"
import { buildArrowPath, buildCircularPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import {
    AnalysisVirulenceFactorTooltipTemplate,
    VirulenceFactorTooltipTemplate
} from "@/components/Visualization/tooltip/VirulenceFactorTooltipTemplate"

const AnalysisVirulenceFactorsArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    virulenceFactors,
    arrowWidth,
    toolTipRef
}) => {
    const processedVirulenceFactors = useMemo(() => {
        return extractAnalysisVirulenceFactorData(virulenceFactors)
    }, [virulenceFactors])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleVirulenceFactors = processedVirulenceFactors
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, virulenceFactor) => {
        toolTipRef.current.showTooltip(event, AnalysisVirulenceFactorTooltipTemplate(virulenceFactor))
    }

    const hideTooltip = () => {
        toolTipRef.current.hideTooltip()
    }

    return (
        <g className='VirulenceFactorsArc'>
            <path
                fill="none"
                stroke='gray'
                d={d}
            ></path>
            <g className='VirulenceFactors'>
                {
                    visibleVirulenceFactors.map(
                        virulenceFactor => (
                            <path
                                key={virulenceFactor.id}
                                stroke='#818181'
                                fill={virulenceFactor.color}
                                d={buildArrowPath(virulenceFactor, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, virulenceFactor)}
                                onPointerMove={(event) => showTooltip(event, virulenceFactor)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default AnalysisVirulenceFactorsArc
