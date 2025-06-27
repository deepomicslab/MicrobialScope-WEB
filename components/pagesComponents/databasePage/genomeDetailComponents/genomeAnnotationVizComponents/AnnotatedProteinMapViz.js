import { useContainerSize } from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import { Box } from "@mui/system"
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import * as d3 from 'd3'
import CircularAxis from "@/components/Visualization/vizD3/circoMapViz/CircularAxis"
import { analyzeGCSkew } from "@/components/Visualization/vizD3/utils/gcContentUtils"
import GCContentArc from "@/components/Visualization/vizD3/circoMapViz/GCContentArc"
import GCSkewArc from "@/components/Visualization/vizD3/circoMapViz/GCSkewArc"
import ProteinArc from "@/components/Visualization/vizD3/circoMapViz/ProteinArc"
import AreaPlot from "@/components/Visualization/vizD3/circoMapViz/AreaPlot"
import { buildAnnularSectorClipPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import CustomTooltip from "@/components/Visualization/tooltip/Tooltip"
import { downloadSvg, downloadSvgAsPng } from "@/components/Visualization/vizD3/utils/svgExportUtils"
import ContigVizInfos
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationVizComponents/ContigVizInfos"
import GCLegend from "@/components/Visualization/vizD3/circoMapViz/GCLegend"
import COGCategoryLegend from "@/components/Visualization/vizD3/circoMapViz/COGCategoryLegend"
import ProteinProductLabelArc from "@/components/Visualization/vizD3/circoMapViz/ProteinProductLabelArc"

const AnnotatedProteinMapViz = forwardRef(({ fastaDetail, proteins }, ref)=> {
    const { width } = useContainerSize()
    const domainEnd = fastaDetail.length > 500000 ? 500000 : fastaDetail.length
    const [radicalDomain, setRadicalDomain] = useState([0, domainEnd])

    const svgRef = useRef(null)
    const toolTipRef = useRef(null)

    const svgWidth = width < 1280 ? 1280 : width

    const AnnotatedProteinsMapVizConfig = useMemo(() => ({
        areaPlotWindowSize: 5000,
        circular: {
            height: 720
        },
        areaPlot: {
            height: 160,
            width: 900
        },
        axis: {
            radius: 120
        },
        gcSkew: {
            windowSize: fastaDetail?.length > 200000 ? 500 : 20,
            bandWidth: 80,
            gcContentStyle: { color: '#367dd6', name: 'GC Content' },
            skewPlusStyle: { color: '#fb475e', name: 'GC Skew+' },
            skewMinusStyle: { color: '#019992', name: 'GC Skew-' },
        },
        protein: {
            radius: 290,
            arrowWidth: 20
        },
        GCLegend: {
            gap: 30
        },
        COGCategoryLegend: {
            mt: 20
        },
        productLabel: {
            radius: 335
        },
    }), [fastaDetail?.length])
    const [cx, cy] = useMemo(
        () => [svgWidth / 2, AnnotatedProteinsMapVizConfig.circular.height / 2],
        [AnnotatedProteinsMapVizConfig.circular.height, svgWidth]
    )
    const radicalScale = useMemo(() => {
        return d3.scaleLinear()
            .range([0, 350 * (Math.PI / 180)])
            .domain(radicalDomain)
    }, [radicalDomain])
    const GCSkew = useMemo(() => {
        return analyzeGCSkew(fastaDetail.sequence, AnnotatedProteinsMapVizConfig.gcSkew.windowSize);
    }, [AnnotatedProteinsMapVizConfig.gcSkew.windowSize, fastaDetail.sequence])
    const COGCategories = useMemo(() => {
        const uniqueCogs = new Set()

        proteins.forEach(protein => {
            [...protein['cog_category']].forEach(cog => uniqueCogs.add(cog))
        })

        return Array.from(uniqueCogs).sort()
    }, [proteins])

    const svgHeight =
        AnnotatedProteinsMapVizConfig.circular.height + AnnotatedProteinsMapVizConfig.areaPlot.height +
        AnnotatedProteinsMapVizConfig.COGCategoryLegend.mt + 6 * 30 + 35

    const gcContentRadiusBase = AnnotatedProteinsMapVizConfig.axis.radius
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

    const GCLegendTransform = [svgWidth - 140, 20]
    const areaPlotTransform = [
        (svgWidth - AnnotatedProteinsMapVizConfig.areaPlot.width) / 2,
        AnnotatedProteinsMapVizConfig.circular.height
    ]
    const COGCategoryLegendTransform = [
        (svgWidth - AnnotatedProteinsMapVizConfig.areaPlot.width) / 2,
        AnnotatedProteinsMapVizConfig.areaPlot.height + AnnotatedProteinsMapVizConfig.circular.height +
        AnnotatedProteinsMapVizConfig.COGCategoryLegend.mt
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
                                width={AnnotatedProteinsMapVizConfig.areaPlot.width}
                                height={AnnotatedProteinsMapVizConfig.areaPlot.height}
                            ></rect>
                        </clipPath>
                    </defs>
                    <GCLegend
                        transform={GCLegendTransform}
                        legendGap={AnnotatedProteinsMapVizConfig.GCLegend.gap}
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
                    <ProteinArc
                        cx={cx}
                        cy={cy}
                        radicalScale={radicalScale}
                        radius={AnnotatedProteinsMapVizConfig.protein.radius}
                        proteins={proteins}
                        arrowWidth={AnnotatedProteinsMapVizConfig.protein.arrowWidth}
                        toolTipRef={toolTipRef}
                    />
                    {
                        radicalDomain[1] - radicalDomain[0] < 25000 ? (
                            <ProteinProductLabelArc
                                cx={cx}
                                cy={cy}
                                radicalScale={radicalScale}
                                radius={AnnotatedProteinsMapVizConfig.productLabel.radius}
                                proteinRadius={AnnotatedProteinsMapVizConfig.protein.radius}
                                proteins={proteins}
                                toolTipRef={toolTipRef}
                            />
                        ) : (
                            <></>
                        )
                    }
                    <AreaPlot
                        width={AnnotatedProteinsMapVizConfig.areaPlot.width}
                        height={AnnotatedProteinsMapVizConfig.areaPlot.height}
                        transform={areaPlotTransform}
                        totalAxisLength={fastaDetail.length}
                        onDomainChange={setRadicalDomain}
                        data={proteins}
                        windowSize={AnnotatedProteinsMapVizConfig.areaPlotWindowSize}
                        title='Proteins/5kb'
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

AnnotatedProteinMapViz.displayName = "AnnotatedProteinMapViz"

export default AnnotatedProteinMapViz
