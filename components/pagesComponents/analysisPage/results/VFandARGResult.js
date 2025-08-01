import useSWR from "swr"
import {
    fetcher, getAnalysisSequenceFASTAURL, getAnalysisSequenceProteinsURL,
    getAnalysisTaskDetailURL,
    getAnalysisTaskLogURL,
    getAnalysisTaskModuleResultURL,
    getAnalysisTaskResultURL
} from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { Box, Stack } from "@mui/system"
import DataDetailDescription from "@/components/pagesComponents/analysisPage/shared/AnalysisResultTaskDetail"
import BoldLabel from "@/components/pagesComponents/analysisPage/shared/BoldLabel"
import DownloadOutputResult, {
    TaskOutputDownloadButton
} from "@/components/pagesComponents/analysisPage/shared/DownloadOutputResult"
import { Button, Card, Descriptions, Progress, Skeleton } from "antd"
import SubmittedMicrobialSequences from "@/components/pagesComponents/analysisPage/shared/SubmittedMicrobialSequences"
import { forwardRef, Fragment, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import SequenceSelectorCard from "@/components/pagesComponents/analysisPage/shared/SequenceSelectorCard"
import { SequenceProteinsTable } from "@/components/pagesComponents/analysisPage/results/ORFResult"
import {
    BasicChip,
    DetailButton,
    StrandChip
} from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import ResponsiveVisualizationContainer, {
    useContainerSize
} from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
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
import AnalysisVirulenceFactorsArc from "@/components/Visualization/vizD3/circoMapViz/AnalysisVirulenceFactorsArc"
import AntibioticResistanceArc from "@/components/Visualization/vizD3/circoMapViz/AntibioticResistanceArc"
import AnalysisAntibioticResistanceArc
    from "@/components/Visualization/vizD3/circoMapViz/AnalysisAntibioticResistanceArc"

const getVFAndARGOutputItems = (uploadPath) => [
    {
        key: '1',
        label: <BoldLabel text='antimicrobial_resistance_gene_results.tsv'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath}
                                            filePath='/rawdata/arvf/antimicrobial_resistance_gene_result/antimicrobial_resistance_gene_results.tsv'/>
    },
    {
        key: '2',
        label: <BoldLabel text='virulent_factor_results.tsv'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath}
                                            filePath='/rawdata/arvf/virulence_factor_result/virulent_factor_results.tsv'/>
    }
]

const submittedMicrobialSequenceColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
        align: 'center',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Microbial ID',
        dataIndex: 'Acession_ID',
        align: 'center',
        sorter: (a, b) => a['Acession_ID'].localeCompare(b['Acession_ID']),
    },
    {
        title: 'GC Content(%)',
        dataIndex: 'gc_content',
        align: 'center',
        sorter: (a, b) => parseFloat(a['gc_content']) - parseFloat(b['gc_content']),
        render: value => (
            <Box
                sx={{
                    pl: '16px'
                }}
            >
                <Progress
                    percent={value}
                    size="small"
                    format={(percent) => Number(percent).toFixed(4) + '%'}
                    strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }}
                />
            </Box>
        )
    },
    {
        title: 'Genes',
        dataIndex: 'genes',
        align: 'center',
        sorter: (a, b) => parseInt(a['genes']) - parseInt(b['genes']),
    },
    {
        title: 'VFs',
        dataIndex: 'vfCount',
        align: 'center',
        sorter: (a, b) => parseInt(a['genes']) - parseInt(b['genes']),
    },
    {
        title: 'ARGs',
        dataIndex: 'argCount',
        align: 'center',
        sorter: (a, b) => parseInt(a['genes']) - parseInt(b['genes']),
    },
    {
        title: 'Length(bp)',
        dataIndex: 'length',
        align: 'center',
        sorter: (a, b) => parseInt(a.length) - parseInt(b.length),
    }
]

const AnnotationDetailSkeleton = () => (
    <Card
        style={{ width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        title={
            <H6 sx={{ fontSize: '28px', mt: '12px', mb: '12px', fontWeight: 600 }}>
                Sequence Detail
            </H6>
        }
    >
        <Stack>
            <H6 sx={{
                fontSize: '24px',
                m: '0px',
                paddingBottom: '32px',
                fontWeight: 500
            }}>
                Sequence Information
            </H6>
            <Skeleton active paragraph={{ rows: 6 }}/>
        </Stack>
        {
            ['Protein', 'Antibiotic Resistance Gene', 'Virulence Factor'].map(
                item => (
                    <Fragment key={item}>
                        <Stack>
                            <H6 sx={{
                                fontSize: '24px',
                                m: '0px',
                                paddingBottom: '32px',
                                fontWeight: 500
                            }}>
                                Annotated {item} List
                            </H6>
                            <Skeleton active paragraph={{ rows: 6 }}/>
                        </Stack>
                        <Stack>
                            <H6 sx={{
                                fontSize: '24px',
                                m: '0px',
                                paddingBottom: '32px',
                                fontWeight: 500
                            }}>
                                Annotated {item} Map
                            </H6>
                            <Skeleton active paragraph={{ rows: 6 }}/>
                        </Stack>
                    </Fragment>
                )
            )
        }
    </Card>
)

const getSequenceDetailDescriptionItems = (sequence) => [
    {
        key: 'id',
        label: <BoldLabel text={'Microbial ID'}/>,
        children: sequence['Acession_ID']
    },
    {
        key: 'gcContent',
        label: <BoldLabel text={'GC Content(%)'}/>,
        children: (
            <Progress
                percent={sequence['gc_content']}
                size="small"
                format={(percent) => Number(percent).toFixed(4) + '%'}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }}
            />
        )
    },
    {
        key: 'length',
        label: <BoldLabel text='Genome Length(bp)'/>,
        children: sequence['length']
    },
    {
        key: 'genes',
        label: <BoldLabel text='Genes'/>,
        children: sequence['genes']
    },
    {
        key: 'vfs',
        label: <BoldLabel text='VFs'/>,
        children: sequence['vfCount']
    },
    {
        key: 'trnas',
        label: <BoldLabel text='ARGs'/>,
        children: sequence['argCount']
    }
]

const SequenceDetailDescription = ({ selectedSequenceObject }) => {
    const items = getSequenceDetailDescriptionItems(selectedSequenceObject)

    return (
        <Stack spacing={2}>
            <Stack>
                <H6 sx={{
                    fontSize: '24px',
                    m: '0px',
                    paddingBottom: '32px',
                    fontWeight: 500
                }}>
                    Sequence Information
                </H6>
                <Descriptions
                    bordered
                    column={2}
                    items={items}
                />
            </Stack>
        </Stack>
    )
}

const sequenceVFTableColumns = [
    {
        title: 'Microbial ID',
        dataIndex: 'Phage_id',
        align: 'center',
        sorter: (a, b) => a['Phage_id'].localeCompare(b['Phage_id']),
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'Protein_id',
        align: 'center',
        sorter: (a, b) => a['Protein_id'].localeCompare(b['Protein_id']),
        render: (value) => <BasicChip value={value} color='purple'/>
    },
    {
        title: 'Aligned Protein in VFDB',
        dataIndex: 'Aligned Protein in VFDB',
        sorter: (a, b) => a['Aligned Protein in VFDB'].localeCompare(b['Aligned Protein in VFDB']),
        align: 'center'
    }
]

const SequenceVFsTable = ({vfs}) => (
    <Stack>
        <H6 sx={{
            fontSize: '24px',
            m: '0px',
            paddingBottom: '32px',
            fontWeight: 500
        }}>
            Annotated Virulence Factor List
        </H6>
        <StyledTable
            columns={sequenceVFTableColumns}
            rowKey={(record) => record['Protein_id']}
            dataSource={vfs}
            scroll={{ y: 55 * 12 }}
        />
    </Stack>
)

const addStartAndEndToVF = (spList, proteinList) => {
    const proteinMap = new Map()
    proteinList.forEach(protein => {
        proteinMap.set(protein['Protein_id'], { start: protein.start, end: protein.end, strand: protein.strand })
    })

    return spList.map(sp => {
        const proteinData = proteinMap.get(sp['Protein_id'])
        if (proteinData) {
            return { ...sp, start: proteinData.start, end: proteinData.end, strand: proteinData.strand }
        }
        return sp
    })
}

const AnnotatedVirulenceFactorMapViz = forwardRef(({ fastaDetail, proteins, virulenceFactors }, ref) => {
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
        virulenceFactor: {
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
    const virulenceFactorsViz = useMemo(() => {
        return addStartAndEndToVF(virulenceFactors, proteins)
    }, [proteins, virulenceFactors])

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
                    <AnalysisVirulenceFactorsArc
                        cx={cx}
                        cy={cy}
                        radicalScale={radicalScale}
                        radius={MapVizConfig.virulenceFactor.radius}
                        virulenceFactors={virulenceFactorsViz}
                        arrowWidth={MapVizConfig.virulenceFactor.arrowWidth}
                        toolTipRef={toolTipRef}
                    />
                    <AreaPlot
                        width={MapVizConfig.areaPlot.width}
                        height={MapVizConfig.areaPlot.height}
                        transform={areaPlotTransform}
                        totalAxisLength={fastaDetail.length}
                        onDomainChange={setRadicalDomain}
                        data={virulenceFactorsViz}
                        windowSize={MapVizConfig.areaPlotWindowSize}
                        title='Virulence Factors/5kb'
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

AnnotatedVirulenceFactorMapViz.displayName = "AnnotatedVirulenceFactorMapViz"

const SequenceVFsMap = ({ fastaDetail, proteins, vfs }) => {
    const vizRef = useRef(null)

    return (
        <Stack spacing={2}>
            <Stack direction='row' spacing={2} alignItems="center" sx={{ paddingBottom: '32px', }}>
                <H6 sx={{
                    fontSize: '24px',
                    m: '0px',
                    fontWeight: 500
                }}>
                    Annotated Virulence Factor Map
                </H6>
                <Stack direction='row' spacing={2}>
                    <Button
                        type="primary"
                        onClick={() => vizRef.current?.downloadSvg()}
                    >
                        Download SVG Chart
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => vizRef.current?.downloadPng()}
                    >
                        Download PNG Chart
                    </Button>
                </Stack>
            </Stack>
            <ResponsiveVisualizationContainer
                containerSx={{
                    minHeight: '920px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    overflowX: 'auto',
                    scrollbarColor: '#eaeaea transparent',
                    '&::-webkit-scrollbar': {
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#eaeaea',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <AnnotatedVirulenceFactorMapViz
                    key={fastaDetail['contig']}
                    ref={vizRef}
                    fastaDetail={fastaDetail}
                    proteins={proteins}
                    virulenceFactors={vfs}
                />
            </ResponsiveVisualizationContainer>
            <Box></Box>
        </Stack>
    )
}

const sequenceARGsTableColumns = [
    {
        title: 'Microbial ID',
        dataIndex: 'Phage_id',
        align: 'center',
        sorter: (a, b) => a['Phage_id'].localeCompare(b['Phage_id']),
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'Protein_id',
        align: 'center',
        sorter: (a, b) => a['Protein_id'].localeCompare(b['Protein_id']),
        render: (value) => <BasicChip value={value} color='purple'/>
    },
    {
        title: 'Aligned Protein in CARD',
        dataIndex: 'Aligned Protein in CARD',
        sorter: (a, b) => a['Aligned Protein in CARD'].localeCompare(b['Aligned Protein in CARD']),
        align: 'center'
    }
]

const SequenceARGTable = ({args}) => (
    <Stack>
        <H6 sx={{
            fontSize: '24px',
            m: '0px',
            paddingBottom: '32px',
            fontWeight: 500
        }}>
            Annotated Antibiotic Resistance Gene List
        </H6>
        <StyledTable
            columns={sequenceARGsTableColumns}
            rowKey={(record) => record['Protein_id']}
            dataSource={args}
            scroll={{ y: 55 * 12 }}
        />
    </Stack>
)

const addStartAndEndToARG = (spList, proteinList) => {
    const proteinMap = new Map()
    proteinList.forEach(protein => {
        proteinMap.set(protein['Protein_id'], { start: protein.start, end: protein.end, strand: protein.strand })
    })

    return spList.map(sp => {
        const proteinData = proteinMap.get(sp['Protein_id'])
        if (proteinData) {
            return { ...sp, start: proteinData.start, end: proteinData.end, strand: proteinData.strand }
        }
        return sp
    })
}

const AnnotatedAntibioticResistanceMapViz = forwardRef(({ fastaDetail, proteins, antibioticResistance }, ref) => {
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
        antibioticResistanceGene: {
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
    const antibioticResistanceViz = useMemo(() => {
        return addStartAndEndToARG(antibioticResistance, proteins)
    }, [antibioticResistance, proteins])

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
                    <AnalysisAntibioticResistanceArc
                        cx={cx}
                        cy={cy}
                        radicalScale={radicalScale}
                        radius={MapVizConfig.antibioticResistanceGene.radius}
                        antibioticResistance={antibioticResistanceViz}
                        arrowWidth={MapVizConfig.antibioticResistanceGene.arrowWidth}
                        toolTipRef={toolTipRef}
                    />
                    <AreaPlot
                        width={MapVizConfig.areaPlot.width}
                        height={MapVizConfig.areaPlot.height}
                        transform={areaPlotTransform}
                        totalAxisLength={fastaDetail.length}
                        onDomainChange={setRadicalDomain}
                        data={antibioticResistanceViz}
                        windowSize={MapVizConfig.areaPlotWindowSize}
                        title='Antibiotic Resistance Genes/5kb'
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

AnnotatedAntibioticResistanceMapViz.displayName = "AnnotatedAntibioticResistanceMapViz"

const SequenceARGsMap = ({ fastaDetail, proteins, args }) => {
    const vizRef = useRef(null)

    return (
        <Stack spacing={2}>
            <Stack direction='row' spacing={2} alignItems="center" sx={{ paddingBottom: '32px', }}>
                <H6 sx={{
                    fontSize: '24px',
                    m: '0px',
                    fontWeight: 500
                }}>
                    Annotated Antibiotic Resistance Gene Map
                </H6>
                <Stack direction='row' spacing={2}>
                    <Button
                        type="primary"
                        onClick={() => vizRef.current?.downloadSvg()}
                    >
                        Download SVG Chart
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => vizRef.current?.downloadPng()}
                    >
                        Download PNG Chart
                    </Button>
                </Stack>
            </Stack>
            <ResponsiveVisualizationContainer
                containerSx={{
                    minHeight: '920px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    overflowX: 'auto',
                    scrollbarColor: '#eaeaea transparent',
                    '&::-webkit-scrollbar': {
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#eaeaea',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <AnnotatedAntibioticResistanceMapViz
                    key={fastaDetail['contig']}
                    ref={vizRef}
                    fastaDetail={fastaDetail}
                    proteins={proteins}
                    antibioticResistance={args}
                />
            </ResponsiveVisualizationContainer>
            <Box></Box>
        </Stack>
    )
}

const SequenceDetailCard = ({ selectedSequenceObject, taskId, vfs, args }) => {
    const {
        data: proteins,
        isLoading: proteinsIsLoading,
        error: proteinsError
    } = useSWR(`${getAnalysisSequenceProteinsURL}?phageid=${selectedSequenceObject['Acession_ID']}&taskid=${taskId}`, fetcher)

    const {
        data: fasta,
        isLoading: fastaIsLoading,
        error: fastaError
    } = useSWR(`${getAnalysisSequenceFASTAURL}?phageid=${selectedSequenceObject['Acession_ID']}&taskid=${taskId}`, fetcher)

    if (proteinsIsLoading || fastaIsLoading) {
        return <AnnotationDetailSkeleton/>
    }

    if (proteinsError || fastaError) {
        return <ErrorView containerSx={{ height: '40vh', marginTop: '40px' }}/>
    }

    const fastaDetail = {
        contig: selectedSequenceObject['Acession_ID'],
        sequence: fasta,
        length: fasta.length
    }

    const processedProteins = proteins?.results?.map((protein, index) => ({
        ...protein,
        id: index,
        strand: protein.strand === '+' ? 1 : 0,
        cog_category: typeof protein.cog_category === 'string'
            ? protein.cog_category.split('')
            : [],
    })) || []

    const processedVFs = vfs.filter(vf =>
        vf['Phage_id'] === selectedSequenceObject['Acession_ID']
    ).map((vf, index) => ({
        ...vf,
        id: index
    }))

    const processedARGs = args.filter(arg =>
        arg['Phage_id'] === selectedSequenceObject['Acession_ID']
    ).map((arg, index) => ({
        ...arg,
        id: index
    }))

    return (
        <Card
            style={{ width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            title={
                <H6 sx={{ fontSize: '28px', mt: '12px', mb: '12px', fontWeight: 600 }}>
                    Sequence Detail
                </H6>
            }
        >
            <Stack spacing={3}>
                <SequenceDetailDescription selectedSequenceObject={selectedSequenceObject}/>
                <SequenceProteinsTable proteins={processedProteins}/>
                <SequenceVFsTable vfs={processedVFs}/>
                <SequenceVFsMap fastaDetail={fastaDetail} proteins={processedProteins} vfs={processedVFs}/>
                <SequenceARGTable args={processedARGs}/>
                <SequenceARGsMap fastaDetail={fastaDetail} proteins={processedProteins} args={args}/>
            </Stack>
        </Card>
    )
}

const AnnotatedResultVisualization = ({ sequences, taskId, vfs, args }) => {
    const [selectedSequence, setSelectedSequence] = useState(null)

    const sortedSequences = useMemo(() => {
        return [...sequences].sort((a, b) => Number(b.length) - Number(a.length))
    }, [sequences])

    const selectedSequenceObject = sequences.find(seq => seq['Acession_ID'] === selectedSequence)

    const handleSequenceChange = (newSequence) => {
        setSelectedSequence(newSequence)
    }

    useEffect(() => {
        if (sortedSequences.length > 0) {
            setSelectedSequence(sortedSequences[0]?.['Acession_ID'])
        }
    }, [sortedSequences])

    return (
        <Stack>
            <H6 sx={{
                fontSize: '36px',
                mt: '12px',
                mb: '36px',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '12px',
            }}>
                Annotated Result Visualization
            </H6>
            <Stack
                spacing={4}
            >
                <SequenceSelectorCard
                    sequences={sequences}
                    selectedSequence={selectedSequence}
                    handleSequenceChange={handleSequenceChange}
                />
                {
                    selectedSequenceObject ? (
                        <SequenceDetailCard
                            selectedSequenceObject={selectedSequenceObject}
                            taskId={taskId}
                            vfs={vfs}
                            args={args}
                        />
                    ) : (
                        <Card
                            style={{ width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                            title={
                                <H6 sx={{ fontSize: '28px', mt: '12px', mb: '12px', fontWeight: 600 }}>
                                    Sequence Detail
                                </H6>
                            }
                        >
                            <Skeleton active paragraph={{ rows: 6 }}/>
                        </Card>
                    )
                }
            </Stack>
        </Stack>
    )
}

const VFandARGResult = ({ taskId }) => {
    const {
        data: taskDetail,
        isLoading: isLoadingTaskDetail,
        error: errorTaskDetail
    } = useSWR(`${getAnalysisTaskDetailURL}?taskid=${taskId}`, fetcher)

    const {
        data: taskResult,
        isLoading: isLoadingTaskResult,
        error: errorTaskResult
    } = useSWR(`${getAnalysisTaskResultURL}?taskid=${taskId}`, fetcher)

    const {
        data: taskLog,
        isLoading: isLoadingTaskLog,
        error: errorTaskLog
    } = useSWR(`${getAnalysisTaskLogURL}?taskid=${taskId}&moudlename=arvf`, fetcher)

    const {
        data: vfAndArg,
        isLoading: vfAndArgIsLoading,
        error: vfAndArgError
    } = useSWR(`${getAnalysisTaskModuleResultURL}?module=arvf&taskid=${taskId}`, fetcher)

    if (isLoadingTaskDetail || isLoadingTaskResult || isLoadingTaskLog || vfAndArgIsLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (errorTaskDetail || errorTaskResult || errorTaskLog || vfAndArgError) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    const vfs = vfAndArg['results']['arvg_vfr']
    const args = vfAndArg['results']['arvg_arg']

    const downloadOutputResultItems = getVFAndARGOutputItems(taskDetail?.results?.['uploadpath'])
    const processedTaskResult = taskResult?.results.map(
        sequence => {
            const vfCount = vfs.filter(vf => vf['Phage_id'] === sequence['Acession_ID']).length
            const argCount = args.filter(arg => arg['Phage_id'] === sequence['Acession_ID']).length

            return {
                ...sequence,
                vfCount: vfCount,
                argCount: argCount,
            }
        }
    )

    return (
        <Stack spacing={4}>
            <DataDetailDescription
                title='Virulent Factor & Antibiotic Resistance Gene Detection'
                taskDetail={taskDetail?.results}
                sequenceNum={taskResult?.results?.length}
                taskLog={taskLog}
            />
            <DownloadOutputResult items={downloadOutputResultItems}/>
            <SubmittedMicrobialSequences sequences={processedTaskResult} columns={submittedMicrobialSequenceColumns}/>
            <AnnotatedResultVisualization sequences={processedTaskResult} taskId={taskId} vfs={vfs} args={args}/>
        </Stack>
    )
}

export default VFandARGResult
