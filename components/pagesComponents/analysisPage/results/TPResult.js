import useSWR from "swr"
import {
    fetcher, getAnalysisSequenceFASTAURL,
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
import { Card, Descriptions, Progress, Skeleton } from "antd"
import SubmittedMicrobialSequences from "@/components/pagesComponents/analysisPage/shared/SubmittedMicrobialSequences"
import { useEffect, useMemo, useState } from "react"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import SequenceSelectorCard from "@/components/pagesComponents/analysisPage/shared/SequenceSelectorCard"
import AnnotationDetailSkeleton from "@/components/pagesComponents/analysisPage/shared/AnnotationDetailSkeleton"
import {
    BasicChip,
    DetailButton,
    StrandChip
} from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import {
    TRNAModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TRNAModalDetailDescriptionsComponents"
import {
    AnalysisTransmembraneHelicesModalDetailDescriptions, TransmembraneHelicesModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TransmembraneHelicesModalDetailComponents"
import DraggableModal from "@/components/feedbackComponents/modals/DraggableModal"

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
                    Annotated TRNA List
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

const SequenceDetailCard = ({ selectedSequenceObject, taskId, tps }) => {
    const {
        data: fasta,
        isLoading: fastaIsLoading,
        error: fastaError
    } = useSWR(`${getAnalysisSequenceFASTAURL}?phageid=${selectedSequenceObject['Acession_ID']}&taskid=${taskId}`, fetcher)

    if (fastaIsLoading) {
        return <AnnotationDetailSkeleton annotationItem='Transmembrane Protein'/>
    }

    if (fastaError) {
        return <ErrorView containerSx={{ height: '40vh', marginTop: '40px' }}/>
    }

    const fastaDetail = {
        contig: selectedSequenceObject['Acession_ID'],
        sequence: fasta,
        length: fasta.length
    }

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
