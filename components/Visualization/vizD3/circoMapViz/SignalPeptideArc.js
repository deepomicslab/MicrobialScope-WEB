import { useMemo } from "react"
import { extractSPArrowData } from "@/components/Visualization/vizD3/utils/signalPeptidesUtils"
import { buildArrowPath, buildCircularPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import { SignalPeptideTooltipTemplate } from "@/components/Visualization/tooltip/SignalPeptideTooltipTemplate"

const SignalPeptideArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    signalPeptides,
    arrowWidth,
    toolTipRef
}) => {
    const processedSignalPeptides = useMemo(() => {
        return extractSPArrowData(signalPeptides)
    }, [signalPeptides])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleSignalPeptides = processedSignalPeptides
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, signalPeptide) => {
        toolTipRef.current.showTooltip(event, SignalPeptideTooltipTemplate(signalPeptide))
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
                    visibleSignalPeptides.map(
                        signalPeptide => (
                            <path
                                key={signalPeptide.id}
                                stroke='#818181'
                                fill={signalPeptide.color}
                                d={buildArrowPath(signalPeptide, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, signalPeptide)}
                                onPointerMove={(event) => showTooltip(event, signalPeptide)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default SignalPeptideArc
