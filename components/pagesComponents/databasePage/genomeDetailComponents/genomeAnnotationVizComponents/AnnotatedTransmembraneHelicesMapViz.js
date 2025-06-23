import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { useContainerSize } from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import * as d3 from "d3"
import { analyzeGCSkew } from "@/components/Visualization/vizD3/utils/gcContentUtils"
import { buildAnnularSectorClipPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import { downloadSvg, downloadSvgAsPng } from "@/components/Visualization/vizD3/utils/svgExportUtils"
import { Box } from "@mui/system"
import GCLegend from "@/components/Visualization/vizD3/circoMapViz/GCLegend"
import ContigVizInfos
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationVizComponents/ContigVizInfos"
import CircularAxis from "@/components/Visualization/vizD3/circoMapViz/CircularAxis"
import GCContentArc from "@/components/Visualization/vizD3/circoMapViz/GCContentArc"
import GCSkewArc from "@/components/Visualization/vizD3/circoMapViz/GCSkewArc"
import ProteinArc from "@/components/Visualization/vizD3/circoMapViz/ProteinArc"
import SignalPeptideArc from "@/components/Visualization/vizD3/circoMapViz/SignalPeptideArc"
import AreaPlot from "@/components/Visualization/vizD3/circoMapViz/AreaPlot"
import COGCategoryLegend from "@/components/Visualization/vizD3/circoMapViz/COGCategoryLegend"
import { createPortal } from "react-dom"
import CustomTooltip from "@/components/Visualization/tooltip/Tooltip"
import TransmembraneHelicesArc from "@/components/Visualization/vizD3/circoMapViz/TransmembraneHelicesArc"

const MapVizConfig = {
    areaPlotWindowSize: 5000,
    circular: {
        height: 720
    },
    areaPlot: {
        height: 160,
        width: 900
    },
    axis: {
        radius: 140
    },
    gcSkew: {
        windowSize: 500,
        bandWidth: 80,
        gcContentStyle: { color: '#367dd6', name: 'GC Content' },
        skewPlusStyle: { color: '#fb475e', name: 'GC Skew+' },
        skewMinusStyle: { color: '#019992', name: 'GC Skew-' },
    },
    protein: {
        radius: 310,
        arrowWidth: 20
    },
    transmembraneHelices: {
        radius: 335,
        arrowWidth: 20
    },
    GCLegend: {
        gap: 30
    },
    COGCategoryLegend: {
        mt: 20
    }
}

const flattenHelicesWithGenomePosition = (transmembraneHelices, proteinList) => {
    const proteinMap = new Map()
    proteinList.forEach(protein => {
        proteinMap.set(protein.protein_id, {
            start: protein.start,
            end: protein.end,
            strand: protein.strand
        })
    })

    const flattened = []

    transmembraneHelices.forEach(tmh => {
        const proteinInfo = proteinMap.get(tmh.protein_id)

        if (tmh.helices && Array.isArray(tmh.helices) && proteinInfo) {
            const { start: pStart, end: pEnd, strand } = proteinInfo

            tmh.helices.forEach(helix => {
                let genomeStart, genomeEnd

                if (strand === '+') {
                    genomeStart = pStart + helix.start - 1
                    genomeEnd = pStart + helix.end - 1
                } else {
                    genomeStart = pEnd - helix.end + 1
                    genomeEnd = pEnd - helix.start + 1
                }

                flattened.push({
                    ...helix,
                    protein_id: tmh.protein_id,
                    strand,
                    source: tmh.source,
                    predicted_tmh_count: tmh.predicted_tmh_count,
                    protein_start: helix.start,
                    protein_end: helix.end,
                    start: genomeStart,
                    end: genomeEnd
                })
            })
        }
    })

    return flattened
}

const AnnotatedTransmembraneHelicesMapViz = forwardRef(({ fastaDetail, proteins, transmembraneHelices }, ref) => {
    const { width } = useContainerSize()
    const domainEnd = fastaDetail.length > 500000 ? 500000 : fastaDetail.length
    const [radicalDomain, setRadicalDomain] = useState([0, domainEnd])

    const svgRef = useRef(null)
    const toolTipRef = useRef(null)

    const svgWidth = width < 1280 ? 1280 : width

    const [cx, cy] = useMemo(
        () => [svgWidth / 2, MapVizConfig.circular.height / 2],
        [svgWidth]
    )
    const radicalScale = useMemo(() => {
        return d3.scaleLinear()
            .range([0, 350 * (Math.PI / 180)])
            .domain(radicalDomain)
    }, [radicalDomain])
    const GCSkew = useMemo(() => {
        return analyzeGCSkew(fastaDetail.sequence, MapVizConfig.gcSkew.windowSize);
    }, [fastaDetail.sequence])
    const COGCategories = useMemo(() => {
        const uniqueCogs = new Set()

        proteins.forEach(protein => {
            [...protein['cog_category']].forEach(cog => uniqueCogs.add(cog))
        })

        return Array.from(uniqueCogs).sort()
    }, [proteins])
    const transmembraneHelicesViz = useMemo(() => {
        return flattenHelicesWithGenomePosition(transmembraneHelices, proteins)
    }, [proteins, transmembraneHelices])

    const svgHeight =
        MapVizConfig.circular.height + MapVizConfig.areaPlot.height +
        MapVizConfig.COGCategoryLegend.mt + 6 * 30 + 35

    const gcContentRadiusBase = MapVizConfig.axis.radius
    const gcContentRadiusMid = gcContentRadiusBase + MapVizConfig.gcSkew.bandWidth / 2

    const gcSkewRadiusBase = gcContentRadiusBase + MapVizConfig.gcSkew.bandWidth
    const gcSkewRadiusMid = gcSkewRadiusBase + MapVizConfig.gcSkew.bandWidth / 2

    const proteinsClipPath = buildAnnularSectorClipPath(
        cx,
        cy,
        0,
        350 * (Math.PI / 180),
        MapVizConfig.protein.radius,
        MapVizConfig.protein.radius + MapVizConfig.protein.arrowWidth
    )

    const GCLegendTransform = [svgWidth - 140, 20]
    const areaPlotTransform = [
        (svgWidth - MapVizConfig.areaPlot.width) / 2,
        MapVizConfig.circular.height
    ]
    const COGCategoryLegendTransform = [
        (svgWidth - MapVizConfig.areaPlot.width) / 2,
        MapVizConfig.areaPlot.height + MapVizConfig.circular.height +
        MapVizConfig.COGCategoryLegend.mt
    ]

    useEffect(() => {
        setRadicalDomain([0, domainEnd])
    }, [domainEnd])

    useImperativeHandle(ref, () => ({
        downloadSvg: () => {
            if (!svgRef.current) return
            downloadSvg(svgRef.current, `${fastaDetail.contig || 'protein_map'}.svg`)
        },
        downloadPng: () => {
            if (!svgRef.current) return
            downloadSvgAsPng(svgRef.current, `${fastaDetail.contig || 'protein_map'}.png`, 2)
        }
    }))

    return (
        <>
            <Box
                sx={{
                    width: 'fit-content',
                    margin: '0 auto',
                }}
            >
                <svg ref={svgRef} width={svgWidth} height={svgHeight} id='test-svg'>
                    <defs>
                        <clipPath id="gcSkewClip">
                            <path d={proteinsClipPath}></path>
                        </clipPath>
                        <clipPath id="areaPlotClip">
                            <rect
                                width={MapVizConfig.areaPlot.width}
                                height={MapVizConfig.areaPlot.height}
                            ></rect>
                        </clipPath>
                    </defs>
                    <GCLegend
                        transform={GCLegendTransform}
                        legendGap={MapVizConfig.GCLegend.gap}
                    />
                    <ContigVizInfos
                        contigName={fastaDetail['contig']}
                        contigLength={fastaDetail.length}
                        displayRange={radicalDomain}
                        maxRange={domainEnd}
                    />
                    <CircularAxis
                        radicalScale={radicalScale}
                        cx={cx}
                        cy={cy}
                        radius={MapVizConfig.axis.radius}
                    />
                    <GCContentArc
                        cx={cx}
                        cy={cy}
                        radicalScale={radicalScale}
                        gcContent={GCSkew.gcContent}
                        bandWidth={MapVizConfig.gcSkew.bandWidth}
                        pathFillColor={MapVizConfig.gcSkew.gcContentStyle.color}
                        gcContentRadiusBase={gcContentRadiusBase}
                        gcContentRadiusMid={gcContentRadiusMid}
                    />
                    <GCSkewArc
                        cx={cx}
                        cy={cy}
                        radicalScale={radicalScale}
                        skewMinus={GCSkew.skewMinus}
                        skewPlus={GCSkew.skewPlus}
                        bandWidth={MapVizConfig.gcSkew.bandWidth}
                        skewMinusColor={MapVizConfig.gcSkew.skewMinusStyle.color}
                        skewPlusColor={MapVizConfig.gcSkew.skewPlusStyle.color}
                        gcSkewRadiusBase={gcSkewRadiusBase}
                        gcSkewRadiusMid={gcSkewRadiusMid}
                    />
                    <ProteinArc
                        cx={cx}
                        cy={cy}
                        radicalScale={radicalScale}
                        radius={MapVizConfig.protein.radius}
                        proteins={proteins}
                        arrowWidth={MapVizConfig.protein.arrowWidth}
                        toolTipRef={toolTipRef}
                    />
                    <TransmembraneHelicesArc
                        cx={cx}
                        cy={cy}
                        radicalScale={radicalScale}
                        radius={MapVizConfig.transmembraneHelices.radius}
                        transmembraneHelices={transmembraneHelicesViz}
                        arrowWidth={MapVizConfig.transmembraneHelices.arrowWidth}
                        toolTipRef={toolTipRef}
                    />
                    <AreaPlot
                        width={MapVizConfig.areaPlot.width}
                        height={MapVizConfig.areaPlot.height}
                        transform={areaPlotTransform}
                        totalAxisLength={fastaDetail.length}
                        onDomainChange={setRadicalDomain}
                        data={transmembraneHelicesViz}
                        windowSize={MapVizConfig.areaPlotWindowSize}
                        title='Signal Peptides/5kb'
                        toolTipRef={toolTipRef}
                    />
                    <COGCategoryLegend
                        COGCategories={COGCategories}
                        transform={COGCategoryLegendTransform}
                        toolTipRef={toolTipRef}
                    />
                </svg>
            </Box>
            {createPortal(<CustomTooltip ref={toolTipRef}/>, document.body)}
        </>
    )
})

AnnotatedTransmembraneHelicesMapViz.displayName = "AnnotatedTransmembraneHelicesMapViz"

export default AnnotatedTransmembraneHelicesMapViz
