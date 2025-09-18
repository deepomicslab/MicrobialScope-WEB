import { buildLinearGCSkewPath } from "@/components/Visualization/vizD3/utils/linearPathUtils"

const LinearGCSkew = ({
    xScale,
    skewMinus,
    skewPlus,
    bandWidth,
    skewMinusColor,
    skewPlusColor,
    yTop,
    showBaseline = true,
}) => {
    const [d0, d1] = xScale.domain();

    // 只渲染当前可视窗口的分组
    const visibleSkewMinus = filterSkewGroupsByDomain_Binary(skewMinus, d0, d1);
    const visibleSkewPlus = filterSkewGroupsByDomain_Binary(skewPlus, d0, d1);

    const midY = yTop + bandWidth / 2;
    const xStart = xScale(d0);
    const xEnd = xScale(d1);

    const baselineD = `M ${xStart} ${midY} L ${xEnd} ${midY}`;

    const gcSkewMinusPath = buildLinearGCSkewPath(
        visibleSkewMinus,
        xScale,
        midY,
        bandWidth
    );
    const gcSkewPlusPath = buildLinearGCSkewPath(
        visibleSkewPlus,
        xScale,
        midY,
        bandWidth
    );

    return (
        <g className="gcSkewLinear">
            {showBaseline && <path fill="none" stroke="gray" d={baselineD} />}
            {gcSkewMinusPath && (
                <path fill={skewMinusColor} stroke="none" d={gcSkewMinusPath} />
            )}
            {gcSkewPlusPath && (
                <path fill={skewPlusColor} stroke="none" d={gcSkewPlusPath} />
            )}
        </g>
    );
};

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

export default LinearGCSkew;
