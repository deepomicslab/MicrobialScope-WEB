import useSWR from "swr"
import {
    fetcher, getAnalysisTaskDetailURL, getAnalysisTaskLogURL, getAnalysisTaskModuleResultURL, getAnalysisTaskResultURL
} from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { Box, Stack } from "@mui/system"
import DataDetailDescription from "@/components/pagesComponents/analysisPage/shared/AnalysisResultTaskDetail"
import BoldLabel from "@/components/pagesComponents/analysisPage/shared/BoldLabel"
import DownloadOutputResult, {
    TaskOutputDownloadButton
} from "@/components/pagesComponents/analysisPage/shared/DownloadOutputResult"
import SubmittedMicrobialSequences from "@/components/pagesComponents/analysisPage/shared/SubmittedMicrobialSequences"
import { Progress } from "antd"
import { BasicChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import { SequenceProteinsTable } from "@/components/pagesComponents/analysisPage/results/ORFResult"

const getSequenceAlignmentOutputItems = (uploadPath) => [
    {
        key: '1',
        label: <BoldLabel text='Blast Result (blast_result.txt)'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath} filePath='/rawdata/alignment/blast_result.txt'/>
    },
    {
        key: '2',
        label: <BoldLabel text='Alignment Result (comparison_link.csv)'/>,
        children: <TaskOutputDownloadButton uploadPath={uploadPath}
                                            filePath='/rawdata/alignment/comparison_link_circle.csv'/>
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
        title: 'Length(bp)',
        dataIndex: 'length',
        align: 'center',
        sorter: (a, b) => parseInt(a.length) - parseInt(b.length),
    }
]

const alignmentSequenceColumns = [
    {
        title: 'Source Microbial ID',
        dataIndex: 'Source_Phage_ID',
        key: 'sourcePhageId',
        align: 'center',
        render: (value) => <BasicChip value={value} color='purple'/>
    },
    {
        title: 'Target Microbial ID',
        dataIndex: 'Target_Phage_ID',
        key: 'targetPhageId',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Source Protein ID',
        dataIndex: 'Source_protein_id',
        key: 'sourceProteinId',
        align: 'center',
        ellipsis: true,
        render: (value) => <BasicChip value={value} color='purple'/>
    },
    {
        title: 'Target Protein ID',
        dataIndex: 'Target_protein_id',
        key: 'targetProteinId',
        align: 'center',
        ellipsis: true,
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Identity (%)',
        dataIndex: 'Identity',
        key: 'identity',
        align: 'center',
        sorter: (a, b) => parseFloat(a.Identity) - parseFloat(b.Identity),
        render: (value) => <BasicChip value={Number(value).toFixed(2) + '%'} color='cyan'/>,
    },
    {
        title: 'Coverage (%)',
        dataIndex: 'Coverage',
        key: 'coverage',
        align: 'center',
        sorter: (a, b) => parseFloat(a.Coverage) - parseFloat(b.Coverage),
        render: (value) => <BasicChip value={Number(value).toFixed(2) + '%'} color='cyan'/>,
    },
];

const AlignmentSequenceResultTable = ({ alignmentResult }) => {

    return (
        <Stack>
            <H6 sx={{
                fontSize: '24px',
                m: '0px',
                paddingBottom: '32px',
                fontWeight: 500
            }}>
                Alignment Result List
            </H6>
            <StyledTable
                columns={alignmentSequenceColumns}
                rowKey={(record) => record['id']}
                dataSource={alignmentResult}
                scroll={{ y: 55 * 12 }}
            />
        </Stack>
    )
}

const AnnotationResult = ({ alignmentResult }) => {
    const processedProteins = alignmentResult?.results?.['proteins'].map((protein, index) => ({
        ...protein,
        id: index,
        strand: protein.strand === '+' ? 1 : 0,
        cog_category: typeof protein.cog_category === 'string'
            ? protein.cog_category.split('')
            : [],
    })) || []

    return (
        <Stack>
            <H6 sx={{
                fontSize: '36px',
                mt: '12px',
                mb: '36px',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '12px',
            }}>
                Annotation Result
            </H6>
            <SequenceProteinsTable proteins={processedProteins}/>
            <AlignmentSequenceResultTable alignmentResult={alignmentResult?.results?.['circlealignment']}/>
        </Stack>
    )
}

const SequenceAlignmentResult = ({ taskId }) => {
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
    } = useSWR(`${getAnalysisTaskLogURL}?taskid=${taskId}&moudlename=alignment`, fetcher)

    const {
        data: alignmentResult,
        isLoading: alignmentIsLoading,
        error: alignmentError
    } = useSWR(`${getAnalysisTaskModuleResultURL}?module=alignment&taskid=${taskId}`, fetcher)

    if (isLoadingTaskDetail || isLoadingTaskResult || isLoadingTaskLog || alignmentIsLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (errorTaskDetail || errorTaskResult || errorTaskLog || alignmentError) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    const downloadOutputResultItems = getSequenceAlignmentOutputItems(taskDetail?.results?.['uploadpath'])

    return (
        <Stack spacing={4}>
            <DataDetailDescription
                title='Sequence Alignment'
                taskDetail={taskDetail?.results}
                sequenceNum={taskResult?.results?.length}
                taskLog={taskLog}
            />
            <DownloadOutputResult items={downloadOutputResultItems}/>
            <SubmittedMicrobialSequences sequences={taskResult?.results} columns={submittedMicrobialSequenceColumns}/>
            <AnnotationResult alignmentResult={alignmentResult}/>
        </Stack>
    )
}

export default SequenceAlignmentResult
