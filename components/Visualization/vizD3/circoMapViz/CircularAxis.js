import { buildCircularPath, computeCircularAxisTicks } from "@/components/Visualization/vizD3/utils/cicularPathUtils"

const CircularAxis = ({ radicalScale, cx, cy, radius }) => {
    const axisDomain = radicalScale.domain()
    const startAngle = radicalScale(axisDomain[0])
    const endAngle = radicalScale(axisDomain[1])

    const d = buildCircularPath(cx, cy, startAngle, endAngle, radius)
    const ticks = computeCircularAxisTicks(
        cx,
        cy,
        axisDomain[0],
        axisDomain[1],
        radius,
        radicalScale
    )

    return (
        <g className='Axis'>
            <path
                fill="none"
                stroke='gray'
                d={d}
            ></path>
            <g className='AxisTicks'>
                {ticks.map(tick => (
                    <g key={tick.value}>
                        <line
                            x1={tick.start[0]}
                            y1={tick.start[1]}
                            x2={tick.end[0]}
                            y2={tick.end[1]}
                            stroke="gray"
                        />
                        {tick.label && (
                            <text
                                x={tick.label.position[0]}
                                y={tick.label.position[1]}
                                transform={`rotate(${tick.label.rotate}, ${tick.label.position[0]}, ${tick.label.position[1]})`}
                                textAnchor="middle"
                                fill="black"
                            >
                                {tick.label.text}
                            </text>
                        )}
                    </g>
                ))}
            </g>
        </g>
    )
}

export default CircularAxis
