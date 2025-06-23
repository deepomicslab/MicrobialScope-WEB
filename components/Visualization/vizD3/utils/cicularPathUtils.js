import * as d3 from 'd3'
import { arcTo, lineTo, moveTo } from "@/components/Visualization/vizD3/utils/basicPathUtils"

export const getPointPosition = (cx, cy, angle, radius) => {
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
}

const defaultFormatter = (tick) => {
    if (tick >= 1_000_000) return `${tick / 1_000_000}M`
    if (tick >= 1_000) return `${tick / 1_000}k`
    return `${tick}`
}

export const buildCircularPath = (cx, cy, startAngle, endAngle, radius) => {
    const [x1, y1] = getPointPosition(cx, cy, startAngle, radius)
    const [x2, y2] = getPointPosition(cx, cy, endAngle, radius)

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

    return `M ${x1} ${y1}
           A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
}

export const computeCircularAxisTicks = (
    cx,
    cy,
    start,
    end,
    radius,
    radicalScale,
    tickCount = 40,
    labelFormatter = defaultFormatter,
) => {
    const visibleLength = end - start
    let gap = Math.round(visibleLength / tickCount)
    const digitLen = gap.toString().length
    const division = Math.pow(10, digitLen - 1)
    gap = Math.round(gap / division) * division

    const ticks = []

    for (let tick = Math.ceil(start / gap) * gap; tick <= end; tick += gap) {
        const isBig = tick % (gap * 5) === 0
        const offset = isBig ? -23 : -13
        const rad = radicalScale(tick)

        const startPos = getPointPosition(cx, cy, rad, radius)
        const endPos = getPointPosition(cx, cy, rad, radius + offset)

        let label = undefined
        if (isBig) {
            let rotate = 0
            let offset_r = -0.07 * radius

            if (rad < Math.PI / 2 || rad > Math.PI * 1.5) {
                rotate = rad * (180 / Math.PI) + 90
            } else {
                rotate = rad * (180 / Math.PI) - 90
            }

            if (rad > Math.PI) {
                offset_r = -0.1 * radius
            }

            const labelPos = [
                endPos[0] + offset_r * Math.cos(rad),
                endPos[1] + offset_r * Math.sin(rad),
            ]

            label = {
                text: labelFormatter(tick),
                position: labelPos,
                rotate,
            }
        }

        ticks.push({
            value: tick,
            isBig,
            rad,
            start: startPos,
            end: endPos,
            label,
        })
    }

    return ticks
}

export const buildGCContentPath = (
    cx,
    cy,
    startAngle,
    endAngle,
    content,
    radicalScale,
    gcContentRadiusBase,
    gcContentRadiusMid,
    gcContentBandWidth,
) => {
    const points = content.map((ele) => {
        const angle = radicalScale(ele[0])
        const height = ele[1] * gcContentBandWidth
        return getPointPosition(cx, cy, angle, gcContentRadiusBase + height)
    })
    const startPoint = getPointPosition(cx, cy, startAngle, gcContentRadiusMid)
    const endPoint = getPointPosition(cx, cy, endAngle, gcContentRadiusMid)

    const path = d3.path()
    path.moveTo(points[0][0], points[0][1])
    points.forEach(p => path.lineTo(p[0], p[1]))

    const arcSegment = ` L ${endPoint[0]} ${endPoint[1]} A ${gcContentRadiusMid} ${gcContentRadiusMid}
    0 1 0 ${startPoint[0]} ${startPoint[1]}`

    return path.toString() + arcSegment
}

export const buildGCSkewPath = (
    cx,
    cy,
    startAngle,
    endAngle,
    skew,
    radicalScale,
    gcSkewRadiusBase,
    gcSkewRadiusMid,
    gcSkewBandWidth,
) => {
    const points = skew.flatMap((ele) => {
        const segmentPoints = []

        const startAngle = radicalScale(ele.start)
        segmentPoints.push(getPointPosition(cx, cy, startAngle, gcSkewRadiusMid))

        ele.mid.forEach((m) => {
            const midAngle = radicalScale(m[0])
            const height = m[1] * gcSkewBandWidth / 2
            segmentPoints.push(getPointPosition(cx, cy, midAngle, gcSkewRadiusMid + height))
        })

        const endAngle = radicalScale(ele.end)
        segmentPoints.push(getPointPosition(cx, cy, endAngle, gcSkewRadiusMid))

        return segmentPoints
    })
    const startPoint = getPointPosition(cx, cy, startAngle, gcSkewRadiusMid)
    const endPoint = getPointPosition(cx, cy, endAngle, gcSkewRadiusMid)

    const path = d3.path()
    path.moveTo(points[0][0], points[0][1])
    points.forEach(p => path.lineTo(p[0], p[1]))

    const arcSegment = ` L ${endPoint[0]} ${endPoint[1]} A ${gcSkewRadiusMid} ${gcSkewRadiusMid}
    0 1 0 ${startPoint[0]} ${startPoint[1]}`

    return path.toString() + arcSegment
}

export const buildAnnularSectorClipPath = (
    cx,
    cy,
    startAngle,
    endAngle,
    innerR,
    outerR,
    largeArcFlag = 1
) => {
    const innerStartPoint = getPointPosition(cx, cy, startAngle, innerR)
    const innerEndPoint = getPointPosition(cx, cy, endAngle, innerR)
    const outerStartPoint = getPointPosition(cx, cy, startAngle, outerR)
    const outerEndPoint = getPointPosition(cx, cy, endAngle, outerR)

    const moveToA = `M ${innerStartPoint[0]},${innerStartPoint[1]}`
    const arcInner = `A ${innerR},${innerR} 0 ${largeArcFlag} 1 ${innerEndPoint[0]},${innerEndPoint[1]}`
    const lineToC = `L ${outerEndPoint[0]},${outerEndPoint[1]}`
    const arcOuter = `A ${outerR},${outerR} 0 ${largeArcFlag} 0 ${outerStartPoint[0]},${outerStartPoint[1]}`
    const close = 'Z'

    return [moveToA, arcInner, lineToC, arcOuter, close].join(' ')
}

export const buildSegmentPath = (
    item,
    cx,
    cy,
    radius,
    radicalScale,
    arrowWidth
) => {
    const startAngle = radicalScale(item.startViz)
    const endAngle = radicalScale(item.endViz)

    const startOuter = getPointPosition(cx, cy, startAngle, radius + arrowWidth / 2)
    const startInner = getPointPosition(cx, cy, startAngle, radius - arrowWidth / 2)

    const endOuter = getPointPosition(cx, cy, endAngle, radius + arrowWidth / 2)
    const endInner = getPointPosition(cx, cy, endAngle, radius - arrowWidth / 2)

    const outerArcR = radius + arrowWidth / 2
    const innerArcR = radius - arrowWidth / 2

    return [
        moveTo(startOuter[0], startOuter[1]),
        lineTo(startOuter[0], startOuter[1]),
        arcTo(
            outerArcR,
            0,
            1,
            endOuter[0],
            endOuter[1]
        ),
        lineTo(endInner[0], endInner[1]),
        arcTo(
            innerArcR,
            0,
            0,
            startInner[0],
            startInner[1]
        ),
        'Z'
    ].join(' ')
}

export const buildArrowPath = (
    item,
    cx,
    cy,
    radius,
    radicalScale,
    arrowWidth,
    minDiffRad = 1.5 * (Math.PI / 180)
) => {
    const startAngle = radicalScale(item.startViz)
    const endAngle = radicalScale(item.endViz)

    const start = getPointPosition(cx, cy, startAngle, radius)
    const end = getPointPosition(cx, cy, endAngle, radius)

    const startOuter = getPointPosition(cx, cy, startAngle, radius + arrowWidth / 2)
    const startInner = getPointPosition(cx, cy, startAngle, radius - arrowWidth / 2)

    const endOuter = getPointPosition(cx, cy, endAngle, radius + arrowWidth / 2)
    const endInner = getPointPosition(cx, cy, endAngle, radius - arrowWidth / 2)

    let head, arrowOuter, arrowInner, tailOuter, tailInner

    const arrowRad = (endAngle - startAngle < minDiffRad) ? (
        endAngle - startAngle
    ) : (
        minDiffRad
    )

    if (item.strand === 1) {
        head = start
        arrowOuter = getPointPosition(cx, cy, startAngle + arrowRad, radius + arrowWidth / 2)
        arrowInner = getPointPosition(cx, cy, startAngle + arrowRad, radius - arrowWidth / 2)
        tailOuter = endOuter
        tailInner = endInner
    } else {
        head = end
        arrowOuter = getPointPosition(cx, cy, endAngle - arrowRad, radius + arrowWidth / 2)
        arrowInner = getPointPosition(cx, cy, endAngle - arrowRad, radius - arrowWidth / 2)
        tailOuter = startOuter
        tailInner = startInner
    }

    const outerArcR = radius + arrowWidth / 2
    const innerArcR = radius - arrowWidth / 2

    return item.strand === 1 ? (
        [
            moveTo(head[0], head[1]),
            lineTo(arrowOuter[0], arrowOuter[1]),
            arcTo(
                outerArcR,
                0,
                1,
                tailOuter[0],
                tailOuter[1]
            ),
            lineTo(tailInner[0], tailInner[1]),
            arcTo(
                innerArcR,
                0,
                0,
                arrowInner[0],
                arrowInner[1]
            ),
            'Z'
        ].join(' ')
    ) : (
        [
            moveTo(head[0], head[1]),
            lineTo(arrowOuter[0], arrowOuter[1]),
            arcTo(
                outerArcR,
                0,
                0,
                tailOuter[0],
                tailOuter[1]
            ),
            lineTo(tailInner[0], tailInner[1]),
            arcTo(
                innerArcR,
                0,
                1,
                arrowInner[0],
                arrowInner[1]
            ),
            'Z'
        ].join(' ')
    )
}

