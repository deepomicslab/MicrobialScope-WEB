import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { useContainerSize } from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import * as d3 from "d3"
import { analyzeGCSkew } from "@/components/Visualization/vizD3/utils/gcContentUtils"
import { buildAnnularSectorClipPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import { downloadSvg, downloadSvgAsPng } from "@/components/Visualization/vizD3/utils/svgExportUtils"
import GCLegend from "@/components/Visualization/vizD3/circoMapViz/GCLegend"
import ContigVizInfos
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationVizComponents/ContigVizInfos"
import CircularAxis from "@/components/Visualization/vizD3/circoMapViz/CircularAxis"
import GCContentArc from "@/components/Visualization/vizD3/circoMapViz/GCContentArc"
import GCSkewArc from "@/components/Visualization/vizD3/circoMapViz/GCSkewArc"
import ProteinArc from "@/components/Visualization/vizD3/circoMapViz/ProteinArc"
import AreaPlot from "@/components/Visualization/vizD3/circoMapViz/AreaPlot"
import COGCategoryLegend from "@/components/Visualization/vizD3/circoMapViz/COGCategoryLegend"
import { createPortal } from "react-dom"
import CustomTooltip from "@/components/Visualization/tooltip/Tooltip"
import { Box } from "@mui/system"
import SecondaryMetabolitesArc from "@/components/Visualization/vizD3/circoMapViz/SecondaryMetabolitesArc"

const AnnotatedSecondaryMetabolitesMapViz = forwardRef(({ fastaDetail, proteins, secondaryMetabolites }, ref) => {
    const { width } = useContainerSize()
    const domainEnd = fastaDetail.length > 500000 ? 500000 : fastaDetail.length
    const [radicalDomain, setRadicalDomain] = useState([0, domainEnd])

    const svgRef = useRef(null)
    const toolTipRef = useRef(null)

    const svgWidth = width < 1280 ? 1280 : width

    const MapVizConfig = useMemo(() => ({
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
            windowSize: fastaDetail?.length > 200000 ? 500 : 20,
            bandWidth: 80,
            gcContentStyle: { color: '#367dd6', name: 'GC Content' },
            skewPlusStyle: { color: '#fb475e', name: 'GC Skew+' },
            skewMinusStyle: { color: '#019992', name: 'GC Skew-' },
        },
        protein: {
            radius: 310,
            arrowWidth: 20
        },
        secondaryMetabolites: {
            radius: 335,
            arrowWidth: 20
        },
        GCLegend: {
            gap: 30
        },
        COGCategoryLegend: {
            mt: 20
        }
    }), [fastaDetail?.length])
    const [cx, cy] = useMemo(
        () => [svgWidth / 2, MapVizConfig.circular.height / 2],
        [MapVizConfig.circular.height, svgWidth]
    )
    const radicalScale = useMemo(() => {
        return d3.scaleLinear()
            .range([0, 350 * (Math.PI / 180)])
            .domain(radicalDomain)
    }, [radicalDomain])
    const GCSkew = useMemo(() => {
        return analyzeGCSkew(fastaDetail.sequence, MapVizConfig.gcSkew.windowSize);
    }, [MapVizConfig.gcSkew.windowSize, fastaDetail.sequence])
    const COGCategories = useMemo(() => {
        const uniqueCogs = new Set()

        proteins.forEach(protein => {
            [...protein['cog_category']].forEach(cog => uniqueCogs.add(cog))
        })

        return Array.from(uniqueCogs).sort()
    }, [proteins])

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
                    <SecondaryMetabolitesArc
                        cx={cx}
                        cy={cy}
                        radicalScale={radicalScale}
                        radius={MapVizConfig.secondaryMetabolites.radius}
                        secondaryMetabolites={secondaryMetabolites}
                        arrowWidth={MapVizConfig.secondaryMetabolites.arrowWidth}
                        toolTipRef={toolTipRef}
                    />
                    <AreaPlot
                        width={MapVizConfig.areaPlot.width}
                        height={MapVizConfig.areaPlot.height}
                        transform={areaPlotTransform}
                        totalAxisLength={fastaDetail.length}
                        onDomainChange={setRadicalDomain}
                        data={secondaryMetabolites}
                        windowSize={MapVizConfig.areaPlotWindowSize}
                        title='Secondary Metabolites/5kb'
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

AnnotatedSecondaryMetabolitesMapViz.displayName = "AnnotatedSecondaryMetabolitesMapViz"

export default AnnotatedSecondaryMetabolitesMapViz
