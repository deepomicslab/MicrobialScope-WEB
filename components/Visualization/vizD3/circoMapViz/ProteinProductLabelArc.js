import { useMemo } from "react"
import { extractProteinsProductLabelData } from "@/components/Visualization/vizD3/utils/proteinProductLabelArcUtils"
import { getPointPosition } from "@/components/Visualization/vizD3/utils/cicularPathUtils"

const ProteinProductLabelArc = ({
    cx,
    cy,
    radicalScale,
    radius,
    proteinRadius,
    proteins,
    toolTipRef
}) => {
    const proteinProductLabel = useMemo(() => {
        return extractProteinsProductLabelData(proteins)
    }, [proteins])

    const domain = radicalScale.domain()

    const visibleLabels = proteinProductLabel
        .filter(p => !(p.end < domain[0] || p.start > domain[1]))
        .map(p => ({
            ...p,
            startViz: Math.max(p.start, domain[0]),
            endViz: Math.min(p.end, domain[1]),
        }))

    return (
        <g>
            {
                visibleLabels.map(
                    label => {
                        const angle = radicalScale((label.startViz + label.endViz) / 2)
                        const pointLabel = getPointPosition(
                            cx,
                            cy,
                            angle,
                            radius
                        )
                        const pointInner = getPointPosition(
                            cx,
                            cy,
                            angle,
                            proteinRadius + 10
                        )

                        return (
                            <g key={label.id}>
                                <line x1={pointInner[0]} y1={pointInner[1]} x2={pointLabel[0]} y2={pointLabel[1]} stroke='black' />
                                <text
                                    x={pointLabel[0]}
                                    y={pointLabel[1]}
                                    textAnchor={getTextAnchor(angle)}
                                >
                                    {shortenText(label.product)}
                                </text>
                            </g>
                        )
                    }
                )
            }
        </g>
    )
}

const getTextAnchor = (angle) => {
    if (angle < Math.PI * (1 / 2) || angle > Math.PI * (3 / 2)) {
        return 'start'
    } else {
        return 'end'
    }
}

const shortenText = (text, maxLen = 20) =>{
    if(text.length<=maxLen){
        return text
    }else{
        const truncated = text.slice(0,maxLen)

        return truncated+'...'
    }
}

export default ProteinProductLabelArc
