import { useEffect, useRef } from "react"
import * as d3 from "d3"

const LinearAxis = ({ xOffset, yOffset, scale }) => {
    const gAxisRef = useRef(null)

    useEffect(() => {
        const gAxis = d3.select(gAxisRef.current)
        gAxis.call(d3.axisBottom(scale).ticks(8, "~s").tickSizeOuter(0))
    }, [scale])

    return (
        <g ref={gAxisRef} transform={`translate(${xOffset}, ${yOffset})`}></g>
    );
};

export default LinearAxis;
