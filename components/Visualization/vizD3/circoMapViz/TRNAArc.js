import { useMemo } from "react"
import { extractTRNAArrowData } from "@/components/Visualization/vizD3/utils/tRNAsUtils"
import { buildArrowPath, buildCircularPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import { TRNATooltipTemplate } from "@/components/Visualization/tooltip/TRNATooltipTemplate"

const TRNAArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    tRNAs,
    arrowWidth,
    toolTipRef
}) => {
    const processedTRNAs = useMemo(() => {
        return extractTRNAArrowData(tRNAs)
    }, [tRNAs])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleTRNAs = processedTRNAs
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, tRNA) => {
        toolTipRef.current.showTooltip(event, TRNATooltipTemplate(tRNA))
    }

    const hideTooltip = () => {
        toolTipRef.current.hideTooltip()
    }

    return (
        <g className='TRNAsArc'>
            <path
                fill="none"
                stroke='gray'
                d={d}
            ></path>
            <g className='TRNAs'>
                {
                    visibleTRNAs.map(
                        tRNA => (
                            <path
                                key={tRNA.id}
                                stroke='#818181'
                                fill={tRNA.color}
                                d={buildArrowPath(tRNA, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, tRNA)}
                                onPointerMove={(event) => showTooltip(event, tRNA)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default TRNAArc
