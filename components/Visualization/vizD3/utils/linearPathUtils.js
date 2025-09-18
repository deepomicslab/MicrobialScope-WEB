import * as d3 from 'd3'

export const buildLinearGCContentPath = (
    content,
    xScale,
    yBase,
    bandWidth,
    midY
) => {
    if (!content.length) return ""

    // 将 [mid, value] -> [x, y]
    // y = yBase + bandWidth * (1 - value)，value 越大越靠近顶部
    const pts = content.map(([mid, v]) => [
        xScale(mid),
        yBase + bandWidth * (1 - v),
    ])

    const path = d3.path()
    path.moveTo(pts[0][0], pts[0][1])
    for (let i = 1; i < pts.length; i++) {
        path.lineTo(pts[i][0], pts[i][1])
    }

    // 右侧落到中线 -> 回到左侧中线 -> 关闭
    const last = pts[pts.length - 1]
    const first = pts[0]

    path.lineTo(last[0], midY)
    path.lineTo(first[0], midY)
    path.closePath()

    return path.toString()
}

export function buildLinearGCSkewPath(skewGroups, xScale, midY, bandWidth) {
    if (!skewGroups || !skewGroups.length) return "";

    // 将各组展开为连续的点序列： baseline(start) -> mids -> baseline(end)
    const points = skewGroups.flatMap((g) => {
        const seg = [];
        seg.push([xScale(g.start), midY]); // 起点落在基准线
        g.mid.forEach(([x, v]) => {
            const delta = (v * bandWidth) / 2; // v ∈ [-1, 1]
            seg.push([xScale(x), midY - delta]); // 正值向上、负值向下
        });
        seg.push([xScale(g.end), midY]); // 终点回到基准线
        return seg;
    });

    if (!points.length) return "";

    const path = d3.path();
    path.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        path.lineTo(points[i][0], points[i][1]);
    }
    // 闭合：最后一个点与第一个点都在 midY，因此 closePath 会回到起点（沿基准线）
    path.closePath();

    return path.toString();
}

export const buildLinearSegmentPath = (
    item,
    xScale,
    yCenter,
    arrowHeight
) => {
    // 将数据区间映射到像素
    let x0 = xScale(item.startViz);
    let x1 = xScale(item.endViz);

    // 防御：若比例尺是反向的，确保 x0 <= x1
    if (x1 < x0) [x0, x1] = [x1, x0];

    const half = arrowHeight / 2;
    const yTop = yCenter - half;
    const yBot = yCenter + half;

    // 如果你已有 moveTo/lineTo，可以用它们；下面给出两种写法：

    // 写法 A：使用已有的工具函数
    // return [
    //   moveTo(x0, yTop),
    //   lineTo(x1, yTop),
    //   lineTo(x1, yBot),
    //   lineTo(x0, yBot),
    //   'Z'
    // ].join(' ');

    // 写法 B：直接拼接 SVG path 字符串
    return `M ${x0} ${yTop} L ${x1} ${yTop} L ${x1} ${yBot} L ${x0} ${yBot} Z`;
};

export function buildLinearArrowPath(
    item,
    xScale,
    yCenter,
    arrowHeight,
    minHeadPx = 8
) {
    const xStart = xScale(item.startViz);
    const xEnd = xScale(item.endViz);
    const yTop = yCenter - arrowHeight / 2;
    const yBot = yCenter + arrowHeight / 2;

    const len = Math.max(0, Math.abs(xEnd - xStart));
    if (len === 0) {
        // 长度为 0，画一个小菱形代替
        const half = Math.max(2, arrowHeight * 0.3);
        return [
            `M ${xStart - half} ${yCenter}`,
            `L ${xStart} ${yTop}`,
            `L ${xStart + half} ${yCenter}`,
            `L ${xStart} ${yBot}`,
            "Z",
        ].join(" ");
    }

    const headW = Math.min(len, Math.max(minHeadPx, arrowHeight));

    if (item.strand === 0) {
        // forward: 小bp → 大bp，箭头朝右
        const tailEnd = xEnd - headW;
        return [
            `M ${xStart} ${yTop}`,     // 左上
            `L ${tailEnd} ${yTop}`,    // 头部左上
            `L ${xEnd} ${yCenter}`,    // 尖
            `L ${tailEnd} ${yBot}`,    // 头部左下
            `L ${xStart} ${yBot}`,     // 左下
            "Z",
        ].join(" ");
    } else {
        // reverse: 大bp → 小bp，箭头朝左
        const tailStart = xStart + headW;
        return [
            `M ${xEnd} ${yTop}`,       // 右上
            `L ${tailStart} ${yTop}`,  // 头部右上
            `L ${xStart} ${yCenter}`,  // 尖
            `L ${tailStart} ${yBot}`,  // 头部右下
            `L ${xEnd} ${yBot}`,       // 右下
            "Z",
        ].join(" ");
    }
}
