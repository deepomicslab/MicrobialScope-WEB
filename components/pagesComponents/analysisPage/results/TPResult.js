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
import DownloadOutputResult, { TaskOutputDownloadButton } from "@/components/pagesComponents/analysisPage/shared/DownloadOutputResult"
import { Button, Card, Descriptions, Progress, Skeleton } from "antd"
import SubmittedMicrobialSequences from "@/components/pagesComponents/analysisPage/shared/SubmittedMicrobialSequences"
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import SequenceSelectorCard from "@/components/pagesComponents/analysisPage/shared/SequenceSelectorCard"
import AnnotationDetailSkeleton from "@/components/pagesComponents/analysisPage/shared/AnnotationDetailSkeleton"
import {
    BasicChip,
    DetailButton
} from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import {
    AnalysisTransmembraneHelicesModalDetailDescriptions, TransmembraneHelicesModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TransmembraneHelicesModalDetailComponents"
import DraggableModal from "@/components/feedbackComponents/modals/DraggableModal"
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
import TransmembraneHelicesArc from "@/components/Visualization/vizD3/circoMapViz/TransmembraneHelicesArc"
import AreaPlot from "@/components/Visualization/vizD3/circoMapViz/AreaPlot"
import COGCategoryLegend from "@/components/Visualization/vizD3/circoMapViz/COGCategoryLegend"
import { createPortal } from "react-dom"
import CustomTooltip from "@/components/Visualization/tooltip/Tooltip"

const getTPOutputItems = (uploadPath) => [
    {
        key: '1',
        label: <BoldLabel text='result.txt'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/rawdata/transmembrane/result.txt'/>
    },
    {
        key: '2',
        label: <BoldLabel text='transmembrane.tsv'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/result/transmembrane.tsv'/>
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
        title: 'TPs',
        dataIndex: 'tpCount',
        align: 'center',
        sorter: (a, b) => parseInt(a['tpCount']) - parseInt(b['tpCount']),
    },
    {
        title: 'Length(bp)',
        dataIndex: 'length',
        align: 'center',
        sorter: (a, b) => parseInt(a.length) - parseInt(b.length),
    }
]

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
        key: 'tp',
        label: <BoldLabel text='TPs'/>,
        children: sequence['tpCount']
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

const getSequenceTPTableItems = (handleDetailClick) => [
    {
        title: 'Protein ID',
        dataIndex: 'Protein_id',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Predicted TMHs Number',
        dataIndex: 'predictedTMHsNumber',
        align: 'center',
    },
    {
        title: 'Length',
        dataIndex: 'Length',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        align: 'center',
        render: (_, record) => (
            <Stack direction="row" spacing={2} justifyContent='center'>
                <DetailButton handleClick={() => handleDetailClick(record)}/>
            </Stack>
        ),
    },
]

const SequenceTPTable = ({ tps }) => {
    const [open, setOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)

    const handleDetailClick = (record) => {
        setSelectedRecord(record)
        setOpen(true)
    }

    const handleConfirm = () => {
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const columns = getSequenceTPTableItems(handleDetailClick)

    return (
        <>
            <Stack>
                <H6 sx={{
                    fontSize: '24px',
                    m: '0px',
                    paddingBottom: '32px',
                    fontWeight: 500
                }}>
                    Annotated Transmembrane Protein List
                </H6>
                <StyledTable
                    columns={columns}
                    rowKey={(record) => record['Protein_id']}
                    dataSource={tps}
                    scroll={{ y: 55 * 12 }}
                />
            </Stack>
            <DraggableModal
                open={open}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                title={<TransmembraneHelicesModalDetailTitle/>}
            >
                <Box
                    sx={{
                        px: '8px',
                        py: '12px',
                        maxHeight: '75vh',
                        overflowX: 'auto'
                    }}
                    key={selectedRecord?.['Protein_id']}
                >
                    <AnalysisTransmembraneHelicesModalDetailDescriptions record={selectedRecord}/>
                </Box>
            </DraggableModal>
        </>
    )
}

const flattenHelicesWithGenomePosition = (transmembraneHelices, proteinList) => {
    const proteinMap = new Map()
    proteinList.forEach(protein => {
        proteinMap.set(protein['Protein_id'], {
            start: protein.start,
            end: protein.end,
            strand: protein.strand
        })
    })

    const flattened = []

    transmembraneHelices.forEach(tmh => {
        const proteinInfo = proteinMap.get(tmh['Protein_id'])

        if (tmh.helices && Array.isArray(tmh.helices) && proteinInfo) {
            const { start: pStart, end: pEnd, strand } = proteinInfo

            tmh.helices.forEach(helix => {
                let genomeStart, genomeEnd

                if (strand === 0) {
                    genomeStart = pStart + helix.start - 1
                    genomeEnd = pStart + helix.end - 1
                } else {
                    genomeStart = pEnd - helix.end + 1
                    genomeEnd = pEnd - helix.start + 1
                }

                flattened.push({
                    ...helix,
                    id: `${tmh['Protein_id']}_${helix.id}`,
                    protein_id: tmh['Protein_id'],
                    strand,
                    source: tmh.source,
                    predicted_tmh_count: tmh['predictedTMHsNumber'],
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
                        title='Transmembrane Proteins/5kb'
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

const SequenceTPsMap = ({ fastaDetail, proteins, tps }) => {
    const vizRef = useRef(null)

    return (
        <Stack spacing={2}>
            <Stack direction='row' spacing={2} alignItems="center" sx={{ paddingBottom: '32px', }}>
                <H6 sx={{
                    fontSize: '24px',
                    m: '0px',
                    fontWeight: 500
                }}>
                    Annotated Transmembrane Proteins Map
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
                <AnnotatedTransmembraneHelicesMapViz
                    key={fastaDetail['contig']}
                    ref={vizRef}
                    fastaDetail={fastaDetail}
                    proteins={proteins}
                    transmembraneHelices={tps}
                />
            </ResponsiveVisualizationContainer>
            <Box></Box>
        </Stack>
    )
}

const SequenceDetailCard = ({ selectedSequenceObject, taskId, tps }) => {
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
        return <AnnotationDetailSkeleton annotationItem='Transmembrane Protein'/>
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

    const processedTPs = tps.filter(
        tp => tp['Phage_Acession_ID'] === selectedSequenceObject['Acession_ID'] && tp['predictedTMHsNumber'] !== '0'
    )

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
                <SequenceTPTable tps={processedTPs}/>
                <SequenceTPsMap fastaDetail={fastaDetail} proteins={processedProteins} tps={processedTPs}/>
            </Stack>
        </Card>
    )
}

const AnnotatedResultVisualization = ({ sequences, taskId, tps }) => {
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
                        <SequenceDetailCard selectedSequenceObject={selectedSequenceObject} taskId={taskId} tps={tps}/>
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

const TPResult = ({ taskId }) => {
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
    } = useSWR(`${getAnalysisTaskLogURL}?taskid=${taskId}&moudlename=transmembrane`, fetcher)

    const {
        data: tps,
        isLoading: tpsIsLoading,
        error: tpsError
    } = useSWR(`${getAnalysisTaskModuleResultURL}?module=transmembrane&taskid=${taskId}`, fetcher)

    if (isLoadingTaskDetail || isLoadingTaskResult || isLoadingTaskLog || tpsIsLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (errorTaskDetail || errorTaskResult || errorTaskLog || tpsError) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    const downloadOutputResultItems = getTPOutputItems(taskDetail?.results?.['uploadpath'])
    const processedTaskResult = taskResult?.results.map(
        sequence => {
            const tpCount = tps?.results?.filter(tp => tp['Phage_Acession_ID'] === sequence['Acession_ID'] && tp['predictedTMHsNumber'] !== '0').length

            return {
                ...sequence,
                tpCount: tpCount
            }
        }
    )

    return (
        <Stack spacing={4}>
            <DataDetailDescription
                title='Transmembrane Protein Annotation'
                taskDetail={taskDetail?.results}
                sequenceNum={taskResult?.results?.length}
                taskLog={taskLog}
            />
            <DownloadOutputResult items={downloadOutputResultItems}/>
            <SubmittedMicrobialSequences sequences={processedTaskResult} columns={submittedMicrobialSequenceColumns}/>
            <AnnotatedResultVisualization sequences={processedTaskResult} taskId={taskId} tps={tps?.results}/>
        </Stack>
    )
}

export default TPResult
