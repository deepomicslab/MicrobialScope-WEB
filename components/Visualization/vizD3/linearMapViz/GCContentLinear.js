import * as d3 from "d3"
import { buildLinearGCContentPath } from "@/components/Visualization/vizD3/utils/linearPathUtils"

const LinearGCContent = ({
    xScale,
    gcContent,
    yBase,
    bandWidth,
    pathFillColor,
    tickLineY,
    xOffset
}) => {
    const domain = xScale.domain();
    const [d0, d1] = domain;

    // 只渲染当前可视范围
    const visible = gcContent.filter(([mid]) => mid >= d0 && mid <= d1);

    const midY = tickLineY ?? (yBase + bandWidth / 2);
    const xStart = xScale(d0);
    const xEnd = xScale(d1);

    // 生成中线（对应圆形里的灰色中弧）
    const midLineD = `M ${xStart} ${yBase} L ${xEnd} ${yBase}`;

    // 生成填充区域路径（曲线 -> 右边中线 -> 左边中线 -> 关闭）
    const areaD = buildLinearGCContentPath(
        visible,
        xScale,
        yBase,
        bandWidth,
        midY
    );

    // 没有可见数据时，仅画中线
    if (!visible.length) {
        return (
            <g className="GCContentLinear">
                <path fill="none" stroke="gray" d={midLineD} />
            </g>
        );
    }

    return (
        <g className="GCContentLinear">
            <path fill="none" stroke="gray" d={midLineD} />
            <path fill={pathFillColor} stroke="none" d={areaD} />
        </g>
    );
};

export default LinearGCContent;
