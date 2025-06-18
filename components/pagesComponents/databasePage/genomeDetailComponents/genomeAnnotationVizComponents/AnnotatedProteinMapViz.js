import { useContainerSize } from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import { Box } from "@mui/system"
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import * as d3 from 'd3'
import CircularAxis from "@/components/Visualization/vizD3/circoMapViz/CircularAxis"
import { analyzeGCSkew } from "@/components/Visualization/vizD3/utils/gcContentUtils"
import GCContentArc from "@/components/Visualization/vizD3/circoMapViz/GCContentArc"
import GCSkewArc from "@/components/Visualization/vizD3/circoMapViz/GCSkewArc"
import ProteinsArc from "@/components/Visualization/vizD3/circoMapViz/ProteinsArc"
import ProteinAreaPlot from "@/components/Visualization/vizD3/circoMapViz/ProteinAreaPlot"
import { buildAnnularSectorClipPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import CustomTooltip from "@/components/Visualization/tooltip/Tooltip"

const AnnotatedProteinMapViz = ({ fastaDetail, proteins }) => {
    const { width } = useContainerSize()
    const domainEnd = fastaDetail.length > 500000 ? 500000 : fastaDetail.length
    const [radicalDomain, setRadicalDomain] = useState([0, domainEnd])

    const svgRef = useRef(null)
    const toolTipRef = useRef(null)

    const svgWidth = width < 1280 ? 1280 : width
    const svgHeight =
        AnnotatedProteinsMapVizConfig.circular.height + AnnotatedProteinsMapVizConfig.areaPlot.height

    const [cx, cy] = useMemo(
        () => [svgWidth / 2, AnnotatedProteinsMapVizConfig.circular.height / 2],
        [svgWidth]
    )
    const radicalScale = useMemo(() => {
        return d3.scaleLinear()
            .range([0, 350 * (Math.PI / 180)])
            .domain(radicalDomain)
    }, [radicalDomain])
    const GCSkew = useMemo(() => {
        return analyzeGCSkew(fastaDetail.sequence, AnnotatedProteinsMapVizConfig.gcSkew.windowSize);
    }, [fastaDetail.sequence])

    const gcContentRadiusBase = AnnotatedProteinsMapVizConfig.axis.radius + 5
    const gcContentRadiusMid = gcContentRadiusBase + AnnotatedProteinsMapVizConfig.gcSkew.bandWidth / 2

    const gcSkewRadiusBase = gcContentRadiusBase + AnnotatedProteinsMapVizConfig.gcSkew.bandWidth
    const gcSkewRadiusMid = gcSkewRadiusBase + AnnotatedProteinsMapVizConfig.gcSkew.bandWidth / 2

    const proteinsClipPath = buildAnnularSectorClipPath(
        cx,
        cy,
        0,
        350 * (Math.PI / 180),
        AnnotatedProteinsMapVizConfig.protein.radius,
        AnnotatedProteinsMapVizConfig.protein.radius + AnnotatedProteinsMapVizConfig.protein.arrowWidth
    )

    const areaPlotTransform = [
        (svgWidth - AnnotatedProteinsMapVizConfig.areaPlot.width) / 2,
        AnnotatedProteinsMapVizConfig.areaPlot.mt
    ]

    useEffect(() => {
        setRadicalDomain([0, domainEnd])
    }, [domainEnd])

    return (
        <Box
            sx={{
                width: 'fit-content',
                margin: '0 auto',
            }}
        >
            <svg ref={svgRef} width={svgWidth} height={svgHeight}>
                <defs>
                    <clipPath id="gcSkewClip">
                        <path d={proteinsClipPath}></path>
                    </clipPath>
                </defs>
                <CircularAxis
                    radicalScale={radicalScale}
                    cx={cx}
                    cy={cy}
                    radius={AnnotatedProteinsMapVizConfig.axis.radius}
                />
                <GCContentArc
                    cx={cx}
                    cy={cy}
                    radicalScale={radicalScale}
                    gcContent={GCSkew.gcContent}
                    bandWidth={AnnotatedProteinsMapVizConfig.gcSkew.bandWidth}
                    pathFillColor={AnnotatedProteinsMapVizConfig.gcSkew.gcContentStyle.color}
                    gcContentRadiusBase={gcContentRadiusBase}
                    gcContentRadiusMid={gcContentRadiusMid}
                />
                <GCSkewArc
                    cx={cx}
                    cy={cy}
                    radicalScale={radicalScale}
                    skewMinus={GCSkew.skewMinus}
                    skewPlus={GCSkew.skewPlus}
                    bandWidth={AnnotatedProteinsMapVizConfig.gcSkew.bandWidth}
                    skewMinusColor={AnnotatedProteinsMapVizConfig.gcSkew.skewMinusStyle.color}
                    skewPlusColor={AnnotatedProteinsMapVizConfig.gcSkew.skewPlusStyle.color}
                    gcSkewRadiusBase={gcSkewRadiusBase}
                    gcSkewRadiusMid={gcSkewRadiusMid}
                />
                <ProteinsArc
                    cx={cx}
                    cy={cy}
                    radicalScale={radicalScale}
                    radius={AnnotatedProteinsMapVizConfig.protein.radius}
                    proteins={proteins}
                    arrowWidth={AnnotatedProteinsMapVizConfig.protein.arrowWidth}
                    toolTipRef={toolTipRef}
                />
                <ProteinAreaPlot
                    width={AnnotatedProteinsMapVizConfig.areaPlot.width}
                    height={AnnotatedProteinsMapVizConfig.areaPlot.height}
                    transform={areaPlotTransform}
                    totalAxisLength={fastaDetail.length}
                    onDomainChange={setRadicalDomain}
                />
            </svg>
            {createPortal(<CustomTooltip ref={toolTipRef}/>, document.body)}
        </Box>
    )
}

const AnnotatedProteinsMapVizConfig = {
    circular: {
        height: 920
    },
    areaPlot: {
        height: 160,
        width: 900,
        mt: 880
    },
    axis: {
        radius: 180
    },
    gcSkew: {
        windowSize: 500,
        bandWidth: 80,
        gcContentStyle: { color: '#367dd6', name: 'GC Content' },
        skewPlusStyle: { color: '#fb475e', name: 'GC Skew+' },
        skewMinusStyle: { color: '#019992', name: 'GC Skew-' },
    },
    protein: {
        radius: 360,
        arrowWidth: 20
    }
}

export default AnnotatedProteinMapViz
