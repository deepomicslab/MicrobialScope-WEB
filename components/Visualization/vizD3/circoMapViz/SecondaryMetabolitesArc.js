import { useMemo } from "react"
import {
    extractMetaboliteArrowData
} from "@/components/Visualization/vizD3/utils/secondaryMetabolitesUtils"
import { buildCircularPath, buildSegmentPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import {
    SecondaryMetabolitesTooltipTemplate
} from "@/components/Visualization/tooltip/SecondaryMetabolitesTooltipTemplate"

const SecondaryMetabolitesArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    secondaryMetabolites,
    arrowWidth,
    toolTipRef
}) => {
    const processedSecondaryMetabolites = useMemo(() => {
        return extractMetaboliteArrowData(secondaryMetabolites)
    }, [secondaryMetabolites])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])

    const visibleSecondaryMetabolites = processedSecondaryMetabolites
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, secondaryMetabolites) => {
        toolTipRef.current.showTooltip(event, SecondaryMetabolitesTooltipTemplate(secondaryMetabolites))
    }

    const hideTooltip = () => {
        toolTipRef.current.hideTooltip()
    }

    return (
        <g className='ProteinsArc'>
            <path
                fill="none"
                stroke='gray'
                d={d}
            ></path>
            <g className='SecondaryMetabolites'>
                {
                    visibleSecondaryMetabolites.map(
                        secondaryMetabolites => (
                            <path
                                key={secondaryMetabolites.id}
                                stroke='#818181'
                                fill={secondaryMetabolites.color}
                                d={buildSegmentPath(secondaryMetabolites, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, secondaryMetabolites)}
                                onPointerMove={(event) => showTooltip(event, secondaryMetabolites)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default SecondaryMetabolitesArc
