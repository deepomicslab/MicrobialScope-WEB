import useSWR from "swr"
import {
    fetcher, getAnalysisSequenceFASTAURL, getAnalysisSequenceProteinsURL,
    getAnalysisTaskDetailURL,
    getAnalysisTaskLogURL,
    getAnalysisTaskResultURL
} from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { Button, Card, Descriptions, Progress, Select, Skeleton, Tooltip, Typography } from "antd"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { Box, Stack } from "@mui/system"
import { useEffect, useMemo, useRef, useState } from "react"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import {
    BasicChip,
    COGCategoryChips, DetailButton, StrandChip
} from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import ResponsiveVisualizationContainer from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import AnnotatedProteinMapViz
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationVizComponents/AnnotatedProteinMapViz"
import {
    AnalysisProteinModalDetailDescriptions,
    ProteinModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/ProteinModalDetailComponents"
import DraggableModal from "@/components/feedbackComponents/modals/DraggableModal"
import BoldLabel from "@/components/pagesComponents/analysisPage/shared/BoldLabel"
import DataDetailDescription from "@/components/pagesComponents/analysisPage/shared/AnalysisResultTaskDetail"
import DownloadOutputResult, { TaskOutputDownloadButton } from "@/components/pagesComponents/analysisPage/shared/DownloadOutputResult"
import SubmittedMicrobialSequences from "@/components/pagesComponents/analysisPage/shared/SubmittedMicrobialSequences"
import SequenceSelectorCard from "@/components/pagesComponents/analysisPage/shared/SequenceSelectorCard"
import AnnotationDetailSkeleton from "@/components/pagesComponents/analysisPage/shared/AnnotationDetailSkeleton"
import useVisualizationMode from "@/components/pagesComponents/databasePage/hooks/visualization/useVisualizationMode"
import VisualizationDownloadButton
    from "@/components/pagesComponents/databasePage/_shared/button/VisualizationDownloadButton"
import VisualizationModeSwitchButton
    from "@/components/pagesComponents/databasePage/_shared/button/VisualizationModeSwitchButton"

const getORFOutputItems = (uploadPath) => [
    {
        key: '1',
        label: <BoldLabel text='Protein Information (acc_list.txt)'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/rawdata/annotation/acc_list.txt/'/>
    },
    {
        key: '2',
        label: <BoldLabel text='Gene Sequence (gene.fna)'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/rawdata/annotation/gene.fna/'/>
    },
    {
        key: '3',
        label: <BoldLabel text='Protein Sequence (gene.faa)'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/rawdata/annotation/gene.faa/'/>
    },
    {
        key: '4',
        label: <BoldLabel text='GFF3 file (sequence.gff3)'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/rawdata/annotation/sequence.gff3/'/>
    },
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

const getSequenceProteinTableItems = (handleDetailClick) => [
    {
        title: 'Protein ID',
        dataIndex: 'Protein_id',
        sorter: (a, b) => a['Protein_id'].localeCompare(b['Protein_id']),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Function Prediction Source',
        dataIndex: 'protein_function_prediction_source',
        align: 'center'
    },
    {
        title: 'COG Category',
        dataIndex: 'cog_category',
        align: 'center',
        render: (value) => <COGCategoryChips COGCategories={value}/>
    },
    {
        title: 'Product',
        dataIndex: 'Protein_product',
        align: 'center',
        render: (value) => (
            <Tooltip title={value}>
                <Typography.Text
                    ellipsis={true}
                    style={{ width: '200px' }}
                >
                    {value}
                </Typography.Text>
            </Tooltip>
        )
    },
    {
        title: 'Start',
        dataIndex: 'start',
        sorter: (a, b) => a.start - b.start,
        align: 'center'
    },
    {
        title: 'End',
        dataIndex: 'end',
        sorter: (a, b) => a.end - b.end,
        align: 'center'
    },
    {
        title: 'Strand',
        dataIndex: 'strand',
        align: 'center',
        filters: [
            { text: 'Forward', value: 0 },
            { text: 'Reverse', value: 1 },
        ],
        onFilter: (value, record) => record.strand === value,
        render: (value) => <StrandChip strand={value}/>
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
        )
    }
]

export const SequenceProteinsTable = ({ proteins }) => {
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

    const columns = getSequenceProteinTableItems(handleDetailClick)

    return (
        <>
            <Stack>
                <H6 sx={{
                    fontSize: '24px',
                    m: '0px',
                    paddingBottom: '32px',
                    fontWeight: 500
                }}>
                    Annotated Protein List
                </H6>
                <StyledTable
                    columns={columns}
                    rowKey={(record) => record['Protein_id']}
                    dataSource={proteins}
                    scroll={{ y: 55 * 12 }}
                />
            </Stack>
            <DraggableModal
                open={open}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
                title={<ProteinModalDetailTitle/>}
            >
                <Box
                    sx={{
                        px: '8px',
                        py: '12px',
                        maxHeight: '75vh',
                        overflowX: 'auto'
                    }}
                    key={selectedRecord?.['Acession_ID']}
                >
                    <AnalysisProteinModalDetailDescriptions record={selectedRecord}/>
                </Box>
            </DraggableModal>
        </>
    )
}

const SequenceProteinsMap = ({ fastaDetail, proteins }) => {
    const vizRef = useRef(null)
    const { visualizationMode, handleVisualizationModeChange } = useVisualizationMode()

    return (
        <Stack spacing={2}>
            <Stack direction='row' spacing={2} alignItems="center" sx={{ paddingBottom: '32px', }}>
                <H6 sx={{
                    fontSize: '24px',
                    m: '0px',
                    fontWeight: 500
                }}>
                    Annotated Protein Map
                </H6>
                <Stack direction='row' spacing={2}>
                    <VisualizationModeSwitchButton
                        visualizationMode={visualizationMode}
                        handleVisualizationModeChange={handleVisualizationModeChange}
                    />
                    <VisualizationDownloadButton vizRef={vizRef}/>
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
                <AnnotatedProteinMapViz
                    key={fastaDetail['contig']}
                    ref={vizRef}
                    fastaDetail={fastaDetail}
                    proteins={proteins}
                    mode={visualizationMode}
                />
            </ResponsiveVisualizationContainer>
            <Box></Box>
        </Stack>
    )
}

const SequenceDetailCard = ({ selectedSequenceObject, taskId }) => {
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
        return <AnnotationDetailSkeleton annotationItem='Protein'/>
    }

    if (proteinsError || fastaError) {
        return <ErrorView containerSx={{ height: '40vh', marginTop: '40px' }}/>
    }

    const fastaDetail = {
        contig: selectedSequenceObject['Acession_ID'],
        sequence: fasta,
        length: fasta.length
    }

    const processedProteins = proteins?.results?.map(protein => ({
        ...protein,
        strand: protein.strand === '+' ? 1 : 0,
        cog_category: typeof protein.cog_category === 'string'
            ? protein.cog_category.split('')
            : [],
    })) || []

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
                <SequenceProteinsMap fastaDetail={fastaDetail} proteins={processedProteins}/>
            </Stack>
        </Card>
    )
}

const AnnotatedResultVisualization = ({ sequences, taskId }) => {
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
                    sequences={sortedSequences}
                    selectedSequence={selectedSequence}
                    handleSequenceChange={handleSequenceChange}
                />
                {
                    selectedSequenceObject ? (
                        <SequenceDetailCard selectedSequenceObject={selectedSequenceObject} taskId={taskId}/>
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

const ORFResult = ({
    taskId
}) => {
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
    } = useSWR(`${getAnalysisTaskLogURL}?taskid=${taskId}&moudlename=annotation`, fetcher)

    if (isLoadingTaskDetail || isLoadingTaskResult || isLoadingTaskLog) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (errorTaskDetail || errorTaskResult || errorTaskLog) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    const downloadOutputResultItems = getORFOutputItems(taskDetail?.results?.['uploadpath'])

    return (
        <Stack spacing={4}>
            <DataDetailDescription
                title='ORF prediction & Protein Classification'
                taskDetail={taskDetail?.results}
                sequenceNum={taskResult?.results?.length}
                taskLog={taskLog}
            />
            <DownloadOutputResult items={downloadOutputResultItems}/>
            <SubmittedMicrobialSequences sequences={taskResult?.results} columns={submittedMicrobialSequenceColumns}/>
            <AnnotatedResultVisualization sequences={taskResult?.results} taskId={taskId}/>
        </Stack>
    )
}

export default ORFResult
