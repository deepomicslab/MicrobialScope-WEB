import { useMemo } from "react"
import { extractAntiCRISPRArrowData } from "@/components/Visualization/vizD3/utils/antiCRISPRUtils"
import { buildArrowPath, buildCircularPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import { AntiCRISPRTooltipTemplate } from "@/components/Visualization/tooltip/AntiCRISPRTooltipTemplate"

const AntiCRISPRArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    antiCRISPR,
    arrowWidth,
    toolTipRef
}) => {
    const processedAntiCRISPR = useMemo(() => {
        return extractAntiCRISPRArrowData(antiCRISPR)
    }, [antiCRISPR])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleAntiCRISPR = processedAntiCRISPR
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, antiCRISPR) => {
        toolTipRef.current.showTooltip(event, AntiCRISPRTooltipTemplate(antiCRISPR))
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
                    visibleAntiCRISPR.map(
                        antiCRISPR => (
                            <path
                                key={antiCRISPR.id}
                                stroke='#818181'
                                fill={antiCRISPR.color}
                                d={buildArrowPath(antiCRISPR, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, antiCRISPR)}
                                onPointerMove={(event) => showTooltip(event, antiCRISPR)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default AntiCRISPRArc
