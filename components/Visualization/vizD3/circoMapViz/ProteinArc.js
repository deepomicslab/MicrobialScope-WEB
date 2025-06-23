import { buildArrowPath, buildCircularPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import { useMemo } from "react"
import { extractProteinsArrowData } from "@/components/Visualization/vizD3/utils/proteinsUtils"
import { ProteinTooltipTemplate } from "@/components/Visualization/tooltip/ProteinTooltipTemplate"

const ProteinArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    proteins,
    arrowWidth,
    toolTipRef
}) => {
    const processedProteins = useMemo(() => {
        return extractProteinsArrowData(proteins)
    }, [proteins])

    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleProteins = processedProteins
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1])
        }))

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)

    const showTooltip = (event, protein) => {
        toolTipRef.current.showTooltip(event, ProteinTooltipTemplate(protein))
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
            <g className='Proteins'>
                {
                    visibleProteins.map(
                        protein => (
                            <path
                                key={protein.id}
                                stroke='#818181'
                                fill={protein.color}
                                d={buildArrowPath(protein, cx, cy, radius, radicalScale, arrowWidth)}
                                onPointerEnter={(event) => showTooltip(event, protein)}
                                onPointerMove={(event) => showTooltip(event, protein)}
                                onPointerLeave={hideTooltip}
                            ></path>
                        )
                    )
                }
            </g>
        </g>
    )
}

export default ProteinArc
