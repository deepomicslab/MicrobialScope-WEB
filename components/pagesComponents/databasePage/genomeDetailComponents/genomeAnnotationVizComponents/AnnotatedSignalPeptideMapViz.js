import { forwardRef, useImperativeHandle, useRef } from "react"
import { useContainerSize } from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import { downloadSvg, downloadSvgAsPng } from "@/components/Visualization/vizD3/utils/svgExportUtils"
import { Box } from "@mui/system"
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
import SignalPeptideArc from "@/components/Visualization/vizD3/circoMapViz/SignalPeptideArc"
import useGenomeMapVizModel
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/useGenomeMapVizModel"
import { buildAnnularSectorClipPath } from "@/components/Visualization/vizD3/utils/cicularPathUtils"
import LinearAxis from "@/components/Visualization/vizD3/linearMapViz/LinearAxis"
import GCContentLinear from "@/components/Visualization/vizD3/linearMapViz/GCContentLinear"
import GCSkewLinear from "@/components/Visualization/vizD3/linearMapViz/GCSkewLinear"
import LinearProteinTrack from "@/components/Visualization/vizD3/linearMapViz/ProteinLinearTrack"
import LinearSignalPeptideTrack from "@/components/Visualization/vizD3/linearMapViz/SignalPeptideLinearTrack"

const AnnotatedSignalPeptideMapViz = forwardRef(({ fastaDetail, proteins, signalPeptides, mode }, ref) => {
    const { width } = useContainerSize()

    const svgRef = useRef(null)
    const toolTipRef = useRef(null)

    const model = useGenomeMapVizModel('signalPeptide', mode, fastaDetail, proteins, width, signalPeptides)

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

    const renderers = {
        circular: CircularSignalPeptideMap,
        linear: LinearSignalPeptideMap
    }

    const Renderer = renderers[mode]

    return (
        <>
            <Box
                sx={{
                    width: 'fit-content',
                    margin: '0 auto',
                }}
            >
                <svg ref={svgRef} width={model.svgWidth} height={model.layout.svgHeight} id='test-svg'>
                    <Renderer model={model} toolTipRef={toolTipRef}/>
                </svg>
            </Box>
            {createPortal(<CustomTooltip ref={toolTipRef}/>, document.body)}
        </>
    )
})

AnnotatedSignalPeptideMapViz.displayName = "AnnotatedSignalPeptideMapViz"

const CircularSignalPeptideMap = ({ model, toolTipRef }) => {
    const {
        config,
        svgWidth,
        domain,
        domainEnd,
        setDomain,
        gcResult,
        COGCategories,
        contigLength,
        contigName,
        proteins,
        entities: signalPeptides,
        layout
    } = model
    const {
        cx,
        cy,
        angleScale,
        vizConfig,
        gcContentRadiusBase,
        gcContentRadiusMid,
        gcSkewRadiusBase,
        gcSkewRadiusMid
    } = layout

    const proteinsClipPath = buildAnnularSectorClipPath(
        cx,
        cy,
        0,
        350 * (Math.PI / 180),
        vizConfig.protein.radius,
        vizConfig.protein.radius + vizConfig.protein.arrowWidth
    )

    const GCLegendTransform = [svgWidth - 140, 20]
    const areaPlotTransform = [
        (svgWidth - vizConfig.areaPlot.width) / 2,
        vizConfig.circular.height
    ]
    const COGCategoryLegendTransform = [
        (svgWidth - vizConfig.areaPlot.width) / 2,
        vizConfig.areaPlot.height + vizConfig.circular.height + vizConfig.COGCategoryLegend.mt
    ]

    return (
        <>
            <defs>
                <clipPath id="gcSkewClip">
                    <path d={proteinsClipPath}></path>
                </clipPath>
                <clipPath id="areaPlotClip">
                    <rect
                        width={vizConfig.areaPlot.width}
                        height={vizConfig.areaPlot.height}
                    ></rect>
                </clipPath>
            </defs>
            <GCLegend
                transform={GCLegendTransform}
                legendGap={vizConfig.GCLegend.gap}
            />
            <ContigVizInfos
                contigName={contigName}
                contigLength={contigLength}
                displayRange={domain}
                maxRange={domainEnd}
            />
            <CircularAxis
                radicalScale={angleScale}
                cx={cx}
                cy={cy}
                radius={vizConfig.axis.radius}
            />
            <GCContentArc
                cx={cx}
                cy={cy}
                radicalScale={angleScale}
                gcContent={gcResult.gcContent}
                bandWidth={vizConfig.gcSkew.bandWidth}
                pathFillColor={vizConfig.gcSkew.gcContentStyle.color}
                gcContentRadiusBase={gcContentRadiusBase}
                gcContentRadiusMid={gcContentRadiusMid}
            />
            <GCSkewArc
                cx={cx}
                cy={cy}
                radicalScale={angleScale}
                skewMinus={gcResult.skewMinus}
                skewPlus={gcResult.skewPlus}
                bandWidth={vizConfig.gcSkew.bandWidth}
                skewMinusColor={vizConfig.gcSkew.skewMinusStyle.color}
                skewPlusColor={vizConfig.gcSkew.skewPlusStyle.color}
                gcSkewRadiusBase={gcSkewRadiusBase}
                gcSkewRadiusMid={gcSkewRadiusMid}
            />
            <ProteinArc
                cx={cx}
                cy={cy}
                radicalScale={angleScale}
                radius={vizConfig.protein.radius}
                proteins={proteins}
                arrowWidth={vizConfig.protein.arrowWidth}
                toolTipRef={toolTipRef}
            />
            <SignalPeptideArc
                cx={cx}
                cy={cy}
                radicalScale={angleScale}
                radius={vizConfig.signalPeptide.radius}
                signalPeptides={signalPeptides}
                arrowWidth={vizConfig.signalPeptide.arrowWidth}
                toolTipRef={toolTipRef}
            />
            <AreaPlot
                width={vizConfig.areaPlot.width}
                height={vizConfig.areaPlot.height}
                transform={areaPlotTransform}
                totalAxisLength={contigLength}
                onDomainChange={setDomain}
                data={signalPeptides}
                windowSize={config.areaPlotWindowSize}
                title='Signal Peptides/5kb'
                toolTipRef={toolTipRef}
            />
            <COGCategoryLegend
                COGCategories={COGCategories}
                transform={COGCategoryLegendTransform}
                toolTipRef={toolTipRef}
            />
        </>
    )
}

const LinearSignalPeptideMap = ({ model, toolTipRef }) => {
    const {
        svgWidth,
        domain,
        domainEnd,
        setDomain,
        config,
        gcResult,
        COGCategories,
        contigLength,
        contigName,
        proteins,
        entities: signalPeptides,
        layout
    } = model
    const {
        svgHeight,
        linearScale,
        vizConfig,
        xOffset,
        gcContentYBase,
        gcSkewYBase,
        proteinsYBase,
        signalPeptideYBase,
    } = layout

    const GCLegendTransform = [svgWidth - 140, 20]
    const areaPlotTransform = [
        (svgWidth - vizConfig.areaPlot.width) / 2,
        vizConfig.linear.height
    ]
    const COGCategoryLegendTransform = [
        (svgWidth - vizConfig.areaPlot.width) / 2,
        vizConfig.areaPlot.height + vizConfig.linear.height + vizConfig.COGCategoryLegend.mt
    ]

    return (
        <>
            <defs>
                <clipPath id="areaPlotClip">
                    <rect
                        width={vizConfig.areaPlot.width}
                        height={vizConfig.areaPlot.height}
                    ></rect>
                </clipPath>
            </defs>
            <GCLegend
                transform={GCLegendTransform}
                legendGap={vizConfig.GCLegend.gap}
            />
            <LinearAxis
                xOffset={xOffset}
                yOffset={vizConfig.axis.y}
                scale={linearScale}
            />
            <g transform={`translate(${xOffset}, 0)`}>
                <GCContentLinear
                    xScale={linearScale}
                    gcContent={gcResult.gcContent}
                    yBase={gcContentYBase}
                    bandWidth={vizConfig.gcSkew.bandWidth}
                    pathFillColor={vizConfig.gcSkew.gcContentStyle.color}
                />
                <GCSkewLinear
                    xScale={linearScale}
                    skewMinus={gcResult.skewMinus}
                    skewPlus={gcResult.skewPlus}
                    bandWidth={vizConfig.gcSkew.bandWidth}
                    skewMinusColor={vizConfig.gcSkew.skewMinusStyle.color}
                    skewPlusColor={vizConfig.gcSkew.skewPlusStyle.color}
                    yTop={gcSkewYBase}
                />
                <LinearProteinTrack
                    xScale={linearScale}
                    yCenter={proteinsYBase}
                    arrowHeight={vizConfig.protein.arrowWidth}
                    proteins={proteins}
                    toolTipRef={toolTipRef}
                />
                <LinearSignalPeptideTrack
                    xScale={linearScale}
                    yCenter={signalPeptideYBase}
                    arrowHeight={vizConfig.signalPeptide.arrowWidth}
                    signalPeptides={signalPeptides}
                    toolTipRef={toolTipRef}
                />
            </g>
            <ContigVizInfos
                contigName={contigName}
                contigLength={contigLength}
                displayRange={domain}
                maxRange={domainEnd}
            />
            <AreaPlot
                width={vizConfig.areaPlot.width}
                height={vizConfig.areaPlot.height}
                transform={areaPlotTransform}
                totalAxisLength={contigLength}
                onDomainChange={setDomain}
                data={signalPeptides}
                windowSize={config.areaPlotWindowSize}
                title='tRNAs & tmRNAs/5kb'
                toolTipRef={toolTipRef}
            />
            <COGCategoryLegend
                COGCategories={COGCategories}
                transform={COGCategoryLegendTransform}
                toolTipRef={toolTipRef}
            />
        </>
    )
}

export default AnnotatedSignalPeptideMapViz
