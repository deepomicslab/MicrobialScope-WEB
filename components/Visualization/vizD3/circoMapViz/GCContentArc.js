import { buildCircularPath, buildGCContentPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"

const GCContentArc = ({
    cx,
    cy,
    radicalScale,
    gcContent,
    bandWidth,
    pathFillColor,
    gcContentRadiusBase,
    gcContentRadiusMid
}) => {
    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleContent = gcContent.filter(([mid]) => mid >= domain[0] && mid <= domain[1])

    const d = buildCircularPath(cx, cy, startAngle, endAngle, gcContentRadiusMid)
    const gcContentPath = buildGCContentPath(
        cx,
        cy,
        startAngle,
        endAngle,
        visibleContent,
        radicalScale,
        gcContentRadiusBase,
        gcContentRadiusMid,
        bandWidth
    )

    return (
        <g className='GCContentArc'>
            <path
                fill="none"
                stroke='gray'
                d={d}
            ></path>
            <path
                fill={pathFillColor}
                stroke='none'
                d={gcContentPath}
            ></path>
        </g>
    )
}

export default GCContentArc
