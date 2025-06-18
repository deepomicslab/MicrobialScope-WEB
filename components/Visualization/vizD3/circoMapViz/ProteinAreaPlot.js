import { useEffect, useMemo, useRef } from "react"
import * as d3 from "d3"

const ProteinAreaPlot = ({
    width,
    height,
    transform,
    totalAxisLength,
    onDomainChange
}) => {
    const xAxisRef = useRef(null)
    const yAxisRef = useRef(null)
    const containerRef = useRef(null)
    const xz = useRef(null)

    const x = useMemo(() => d3.scaleLinear().domain([0, totalAxisLength]).range([0, width]), [totalAxisLength, width])
    const y = useMemo(() => d3.scaleLinear().domain([0, 10]).range([height, 0]), [height])

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
            onDomainChange(xz.current.domain())
        }

        const scaleExtent = totalAxisLength > 500000 ? (
            [totalAxisLength / 500000, 32]
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
    }, [totalAxisLength, height, onDomainChange, width, x])

    return (
        <g
            className='ProteinAreaPlot'
            transform={`translate(${transform[0]}, ${transform[1]})`}
        >
            <rect
                ref={containerRef}
                width={width}
                height={height}
                fill="transparent"
                pointerEvents="all"
            />
            <g ref={xAxisRef} transform={`translate(0, ${height})`}></g>
            <g ref={yAxisRef}></g>
        </g>
    )
}

export default ProteinAreaPlot
