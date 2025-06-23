import { useMemo } from "react"
import { extractCRISPRCasInfo } from "@/components/Visualization/vizD3/utils/CRISRPCasUtils"
import { buildCircularPath, buildSegmentPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import { CRISPRCasTooltipTemplate } from "@/components/Visualization/tooltip/CRISPRCasTooltipTemplate"

const CRISPRCasArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    CRISRPCas,
    arrowWidth,
    toolTipRef
}) => {
    const processedCRISPRCas = useMemo(() => {
        return extractCRISPRCasInfo(CRISRPCas)
    }, [CRISRPCas])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleCRISPR = processedCRISPRCas.crispr_info_list
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))
    const visibleCas = processedCRISPRCas.cas_info_list
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, CRISPR) => {
        toolTipRef.current.showTooltip(event, CRISPRCasTooltipTemplate(CRISPR))
    }

    const hideTooltip = () => {
        toolTipRef.current.hideTooltip()
    }

    return (
        <g className='CRISPRCasArc'>
            <path
                fill="none"
                stroke='gray'
                d={d}
            ></path>
            <g className='Cas'>
                {
                    visibleCas.map(
                        Cas => (
                            <path
                                key={Cas.id}
                                fill='#FFE3BB'
                                d={buildSegmentPath(Cas, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, Cas)}
                                onPointerMove={(event) => showTooltip(event, Cas)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
            <g className='CRISPR'>
                {
                    visibleCRISPR.map(
                        CRISPR => (
                            <path
                                key={CRISPR.id}
                                fill='#03A6A1'
                                d={buildSegmentPath(CRISPR, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, CRISPR)}
                                onPointerMove={(event) => showTooltip(event, CRISPR)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default CRISPRCasArc
