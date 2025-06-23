import { useMemo } from "react"
import { extractTransmembraneHelixArrowData } from "@/components/Visualization/vizD3/utils/transmembraneHelicesUtils"
import {
    buildArrowPath,
    buildCircularPath,
    buildSegmentPath
} from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import {
    TransmembraneHelicesTooltipTemplate
} from "@/components/Visualization/tooltip/TransmembraneHelicesTooltipTemplate"

const TransmembraneHelicesArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    transmembraneHelices,
    arrowWidth,
    toolTipRef
}) => {
    const processedTransmembraneHelices = useMemo(() => {
        return extractTransmembraneHelixArrowData(transmembraneHelices)
    }, [transmembraneHelices])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleTransmembraneHelices = processedTransmembraneHelices
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, transmembraneHelices) => {
        toolTipRef.current.showTooltip(event, TransmembraneHelicesTooltipTemplate(transmembraneHelices))
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
                    visibleTransmembraneHelices.map(
                        transmembraneHelices => (
                            <path
                                key={transmembraneHelices.id}
                                fill={transmembraneHelices.color}
                                d={buildSegmentPath(transmembraneHelices, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, transmembraneHelices)}
                                onPointerMove={(event) => showTooltip(event, transmembraneHelices)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default TransmembraneHelicesArc
