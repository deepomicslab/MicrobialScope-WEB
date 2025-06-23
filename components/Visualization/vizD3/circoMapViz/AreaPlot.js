import { useCallback, useEffect, useMemo, useRef } from "react"
import * as d3 from "d3"
import { getDensityPoints } from "@/components/Visualization/vizD3/utils/areaPlotUtils"
import { AreaPlotTooltipTemplate } from "@/components/Visualization/tooltip/AreaPlotTooltipTemplate"

const AreaPlot = ({
    width,
    height,
    transform,
    totalAxisLength,
    onDomainChange,
    data,
    windowSize,
    title,
    toolTipRef
}) => {
    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)
    const containerRef = useRef(null)
    const pathRef = useRef(null)
    const toolTipLineRef = useRef(null)
    const xz = useRef(null)

    const points = useMemo(
        () => getDensityPoints(data, windowSize, totalAxisLength),
        [data, totalAxisLength, windowSize]
    )
    const maxCount = useMemo(() => {
        return d3.max(points, d => d[1]) ?? 1
    }, [points])
    const x = useMemo(
        () => d3.scaleLinear().domain([0, totalAxisLength]).range([0, width]),
        [totalAxisLength, width]
    )
    const y = useMemo(
        () => d3.scaleLinear().domain([0, maxCount + 2]).range([height, 0]),
        [height, maxCount]
    )
    const areaPath = useMemo(() => {
        return (data, x) => {
            return d3.area()
                .curve(d3.curveStepAfter)
                .x(d => x(d[0]))
                .y0(y(0))
                .y1(d => y(d[1]))
                (data)
        }
    }, [y])

    const pointerMoved = useCallback((event) => {
        const pointBisect = d3.bisector(d => d[0]).right
        const xPosition = parseInt(xz.current.invert(d3.pointer(event)[0]))

        const i = Math.max(0, pointBisect(points, xPosition) - 1)

        d3.select(toolTipLineRef.current)
            .selectAll('line')
            .data([1])
            .join('line')
            .attr('x1', xz.current(xPosition))
            .attr('x2', xz.current(xPosition))
            .attr('y1', y(0))
            .attr('y2', y(maxCount + 2))
            .attr('stroke-dasharray', '5, 5')
            .attr('stroke', 'black')
            .attr("stroke-opacity", 0.3)
            .style("pointer-events", "none")

        toolTipRef.current.showTooltip(
            event,
            AreaPlotTooltipTemplate(
                title,
                points[i][0],
                points[i + 1][0],
                points[i][1]
            )
        )
    }, [maxCount, points, title, toolTipRef, y])

    const pointerLeft = useCallback(() => {
        toolTipRef.current.hideTooltip()
        d3.select(toolTipLineRef.current).selectAll('line').remove()
    }, [toolTipRef])

    useEffect(() => {
        const gx = d3.select(xAxisRef.current)
        gx.call(d3.axisBottom(x).ticks(8, "~s").tickSizeOuter(0))
        xz.current = x
    }, [x])

    useEffect(() => {
        const gy = d3.select(yAxisRef.current)
        gy.call(d3.axisLeft(y))
    }, [y])

    useEffect(() => {
        const zoomed = (event) => {
            xz.current = event.transform.rescaleX(x)
            d3.select(xAxisRef.current).call(d3.axisBottom(xz.current).ticks(8, "~s").tickSizeOuter(0))
            d3.select(pathRef.current)
                .attr('d', areaPath(points, xz.current))
            onDomainChange(xz.current.domain())
        }

        const scaleExtent = totalAxisLength > 500000 ? (
            [totalAxisLength / 500000, totalAxisLength / 500000 * 32]
        ) : (
            [1, 32]
        )

        const zoom = d3.zoom()
            .scaleExtent(scaleExtent)
            .extent([[0, 0], [width, height]])
            .translateExtent([[0, -Infinity], [width, Infinity]])
            .on("zoom", zoomed)

        const container = d3.select(containerRef.current)

        container.call(zoom)
        if (totalAxisLength > 500000) {
            container.call(zoom.transform, d3.zoomIdentity.scale(totalAxisLength / 500000).translate(0, 0))
        }
    }, [totalAxisLength, height, onDomainChange, width, x, areaPath, points])

    return (
        <g
            className='ProteinAreaPlot'
            transform={`translate(${transform[0]}, ${transform[1]})`}
        >
            <g ref={xAxisRef} transform={`translate(0, ${height})`}></g>
            <g ref={yAxisRef}></g>
            <path
                ref={pathRef}
                fill="steelblue"
                clipPath='url(#areaPlotClip)'
                d={xz.current ? areaPath(points, xz.current) : null}
            ></path>
            <rect
                ref={containerRef}
                width={width}
                height={height}
                fill="transparent"
                pointerEvents="all"
                onPointerMove={pointerMoved}
                onPointerLeave={pointerLeft}
            />
            <g ref={toolTipLineRef}></g>
        </g>
    )
}

export default AreaPlot
