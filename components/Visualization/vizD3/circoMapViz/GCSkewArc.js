import { buildCircularPath, buildGCSkewPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"

const GCSkewArc = ({
    cx,
    cy,
    radicalScale,
    skewMinus,
    skewPlus,
    bandWidth,
    skewMinusColor,
    skewPlusColor,
    gcSkewRadiusBase,
    gcSkewRadiusMid
}) => {
    const domain = radicalScale.domain()

    const startAngle = radicalScale(domain[0])
    const endAngle = radicalScale(domain[1])
    const visibleSkewMinus = filterSkewGroupsByDomain_Binary(skewMinus, domain[0], domain[1])
    const visibleSkewPlus = filterSkewGroupsByDomain_Binary(skewPlus, domain[0], domain[1])


    const d = buildCircularPath(cx, cy, startAngle, endAngle, gcSkewRadiusMid)
    const gcSkewMinusPath = buildGCSkewPath(
        cx,
        cy,
        startAngle,
        endAngle,
        visibleSkewMinus,
        radicalScale,
        gcSkewRadiusBase,
        gcSkewRadiusMid,
        bandWidth
    )
    const gcSkewPlusPath = buildGCSkewPath(
        cx,
        cy,
        startAngle,
        endAngle,
        visibleSkewPlus,
        radicalScale,
        gcSkewRadiusBase,
        gcSkewRadiusMid,
        bandWidth
    )

    return (
        <g className='gcSkewArc'>
            <circle
                cx={cx}
                cy={cy}
                r={gcSkewRadiusBase}
                stroke='gray'
                fill='none'
            ></circle>
            <path
                fill="none"
                stroke='gray'
                d={d}
            ></path>
            <path
                fill={skewMinusColor}
                stroke='none'
                d={gcSkewMinusPath}
            ></path>
            <path
                fill={skewPlusColor}
                stroke='none'
                d={gcSkewPlusPath}
            ></path>
        </g>
    )
}

function filterSkewGroupsByDomain_Binary(groups, domainStart, domainEnd) {
    if (!groups.length) return []

    let left = 0
    let right = groups.length - 1
    let startIdx = -1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (groups[mid].end >= domainStart) {
            startIdx = mid
            right = mid - 1
        } else {
            left = mid + 1
        }
    }

    left = 0
    right = groups.length - 1
    let endIdx = -1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (groups[mid].start <= domainEnd) {
            endIdx = mid
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    if (startIdx === -1 || endIdx === -1 || startIdx > endIdx) {
        return []
    }

    const visibleGroups = []
    for (let i = startIdx; i <= endIdx; i++) {
        const group = groups[i]
        const filteredMid = group.mid.filter(([x]) => x >= domainStart && x <= domainEnd)

        if (filteredMid.length > 0) {
            visibleGroups.push({
                start: Math.max(group.start, domainStart),
                mid: filteredMid,
                end: Math.min(group.end, domainEnd),
            })
        }
    }

    return visibleGroups
}

export default GCSkewArc
