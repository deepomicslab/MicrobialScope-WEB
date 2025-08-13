import { Button, Input, Modal, Space, Table, Tag, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { useEffect, useMemo, useState } from "react"
import useSWR, { mutate } from "swr"
import { fetcher, getAnalysisTaskLogURL, getAnalysisTasksURL } from "@/dataFetch/get"
import { getOrCreateUserId } from "@/components/utils/UserIdUtils"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { FileTextOutlined, ReloadOutlined } from "@ant-design/icons"
import { useRouter } from "next/router"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import { LogContentWrapper } from "@/components/pagesComponents/analysisPage/shared/AnalysisResultTaskDetail"

const { Search } = Input
const { Title, Text } = Typography

const getTaskTableColumns = (handleViewResult, handleOpenLogModal) => [
    {
        title: 'Task ID',
        dataIndex: 'id',
        key: 'taskId',
        align: 'center',
        sorter: (a, b) => a.id - b.id
    },
    {
        title: 'Task Name',
        dataIndex: 'name',
        key: 'taskName',
        align: 'center'
    },
    {
        title: 'Analysis Type',
        dataIndex: 'analysis_type',
        key: 'analysisType',
        align: 'center',
        filters: [
            { text: 'ORF Prediction & Protein Classification', value: 'ORF Prediction & Protein Classification' },
            { text: 'tRNA & tmRNA Prediction', value: 'tRNA & tmRNA Prediction' },
            { text: 'Virulence Factor & Antibiotic Resistance Gene Detection', value: 'Virulence Factor & Antibiotic Resistance Gene Detection' },
            { text: 'Transmembrane Protein Annotation', value: 'Transmembrane Protein Annotation' },
            { text: 'Sequence Alignment', value: 'Sequence Alignment' },
            { text: 'Comparative Analysis', value: 'Comparative Analysis' }
        ],
        onFilter: (value, record) => record['analysis_type'] === value
    },
    {
        title: 'Microbial Type',
        dataIndex: 'microbial_type',
        key: 'microbialType',
        align: 'center',
        filters: [
            { text: 'Archaea', value: 'Archaea' },
            { text: 'Bacteria', value: 'Bacteria' },
            { text: 'Fungi', value: 'Fungi' },
            { text: 'Viruses', value: 'Viruses' },
        ],
        onFilter: (value, record) => record['microbial_type'] === value
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        filters: [
            { text: 'Success', value: 'Success' },
            { text: 'Running', value: 'Running' },
            { text: 'Failed', value: 'Failed' },
        ],
        onFilter: (value, record) => record.status === value,
        render: (text) => (
            <Tag color={text === 'Success' ? 'blue' : 'orange'}>{text}</Tag>
        )
    },
    {
        title: 'Created Time',
        dataIndex: 'created_at',
        key: 'createdTime',
        align: 'center',
        sorter: (a, b) => new Date(a['created_at']) - new Date(b['created_at'])
    },
    {
        title: 'Actions',
        key: 'actions',
        align: 'center',
        render: (_, record) => (
            <Space size='middle'>
                <Button
                    type="primary"
                    disabled={record['status'] !== 'Success'}
                    onClick={() => handleViewResult(record)}
                >
                    view result
                </Button>
                <TaskLogButton record={record} onOpen={handleOpenLogModal} />
            </Space>
        )
    },
]

const moduleNameMap = {
    'ORF Prediction & Protein Classification': 'annotation',
    'tRNA & tmRNA Prediction': 'trna',
    'Virulence Factor & Antibiotic Resistance Gene Detection': 'arvf',
    'Transmembrane Protein Annotation': 'transmembrane',
    'Sequence Alignment': 'alignment',
    'Comparative Tree Construction': 'tree'
}

const TaskLogButton = ({ record, onOpen }) => {
    return (
        <Button
            type="default"
            icon={<FileTextOutlined />}
            onClick={() => onOpen(record)}
        >
            Task Log
        </Button>
    )
}

const LogContentWrapperWithDataFetch = ({ record }) => {
    const {
        data: taskLog,
        isLoading: isLoadingTaskLog,
        error: errorTaskLog
    } = useSWR(`${getAnalysisTaskLogURL}?taskid=${record['id']}&moudlename=${moduleNameMap[record['analysis_type']]}`, fetcher)

    if (isLoadingTaskLog) {
        return <LoadingView containerSx={{ height: '50vh', marginTop: '40px' }}/>
    }

    if (errorTaskLog) {
        return <ErrorView containerSx={{ height: '50vh', marginTop: '40px' }}/>
    }

    return (
        <LogContentWrapper logContent={taskLog['task_log'] + taskLog['task_error']}/>
    )
}

const WorkspaceWrapper = ({}) => {
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const id = getOrCreateUserId()
        setUserId(id)
    }, [])

    const {
        data,
        isLoading,
        error
    } = useSWR(
        userId ? `${getAnalysisTasksURL}?userid=${userId}` : null,
        fetcher
    )

    if (!userId || isLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (error) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return <Workspace tasks={data.results} userId={userId}/>
}

const Workspace = ({ tasks, userId }) => {
    const [taskId, setTaskId] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
    })
    const [logModalVisible, setLogModalVisible] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)

    const tableData = useMemo(() => {
        return tasks.filter(task => task.id.toString().includes(taskId))
    }, [taskId, tasks])

    const router = useRouter()

    const handleRefresh = async () => {
        setRefreshing(true)
        await mutate(`${getAnalysisTasksURL}?userid=${userId}`)
        setRefreshing(false)
    }

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });
    }

    const handleViewResult = (record) => {
        if (record['analysis_type'] === 'ORF Prediction & Protein Classification') {
            router.push(`/analysis/result/orf/${record['id']}`)
        } else if (record['analysis_type'] === 'tRNA & tmRNA Prediction') {
            router.push(`/analysis/result/trna/${record['id']}`)
        } else if (record['analysis_type'] === 'Virulence Factor & Antibiotic Resistance Gene Detection') {
            router.push(`/analysis/result/vf/${record['id']}`)
        } else if (record['analysis_type'] === 'Transmembrane Protein Annotation') {
            router.push(`/analysis/result/transmembrane/${record['id']}`)
        } else if (record['analysis_type'] === 'Sequence Alignment') {
            router.push(`/analysis/result/alignment/${record['id']}`)
        } else if (record['analysis_type'] === 'Comparative Tree Construction') {
            router.push(`/analysis/result/comparative/${record['id']}`)
        }

        return null
    }

    const handleOpenLogModal = (record) => {
        setSelectedRecord(record)
        setLogModalVisible(true)
    }

    const handleCloseLogModal = () => {
        setLogModalVisible(false)
        setSelectedRecord(null)
    }

    const columns = getTaskTableColumns(handleViewResult, handleOpenLogModal)

    return (
        <Box
            sx={{
                pt: '64px'
            }}
        >
            <Stack spacing={1} alignItems="center">
                <Title level={2}>Task Query</Title>
                <Search
                    placeholder="Please enter your task ID"
                    enterButton="Search"
                    size="large"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    style={{ width: 600 }}
                />
                <Text>
                    You could check the submitted task by Task ID.
                </Text>
            </Stack>

            <Stack
                spacing={1}
                alignItems="center"
                sx={{
                    mt: '64px'
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                >
                    <Title level={2}>Submitted Task(s)</Title>
                    <Button type="primary" onClick={handleRefresh} icon={<ReloadOutlined />}>
                        Refresh Status
                    </Button>
                </Stack>
                <Text>
                    You can click refresh button to refresh task status.
                </Text>
            </Stack>
            <Box
                sx={{
                    mt: '32px',
                    width: '100%',
                }}
            >
                <Table
                    columns={columns}
                    dataSource={tableData}
                    loading={refreshing}
                    pagination={pagination}
                    onChange={handleTableChange}
                />
            </Box>

            <Modal
                open={logModalVisible}
                onCancel={handleCloseLogModal}
                footer={null}
                title={
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <FileTextOutlined style={{ fontSize: 20 }} />
                        <Span sx={{ fontWeight: 'bold', fontSize: 24 }}>Task Log</Span>
                    </Stack>
                }
                width="60%"
                centered
            >
                {selectedRecord && (
                    <LogContentWrapperWithDataFetch record={selectedRecord} />
                )}
            </Modal>
        </Box>
    )
}

export default WorkspaceWrapper
