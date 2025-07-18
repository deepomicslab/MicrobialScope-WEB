import { Button, Input, Space, Table, Tag, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { useEffect, useState } from "react"
import useSWR, { mutate } from "swr"
import { fetcher, getAnalysisTasks } from "@/dataFetch/get"
import { getOrCreateUserId } from "@/components/utils/UserIdUtils"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { ReloadOutlined } from "@ant-design/icons"

const { Search } = Input
const { Title, Text } = Typography

const mockData = [
    {
        key: '1',
        taskId: '2313',
        taskName: 'ORF prediction & Protein classification 2313',
        analysisType: 'ORF prediction & Protein classification',
        microbialType: 'Archaea',
        status: 'Success',
        createdTime: '2025-07-07 11:42:02',
    },
]

const columns = [
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
            { text: 'ORF prediction & Protein classification', value: 'ORF prediction & Protein classification' },
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
                <Button type="primary" style={{ background: '#3f51b5' }}>
                    view result
                </Button>
                <Button type="primary" style={{ background: '#00838f' }}>
                    task log
                </Button>
            </Space>
        )
    },
]

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
        userId ? `${getAnalysisTasks}?userid=${userId}` : null,
        fetcher
    )

    if (!userId || isLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (error) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return <Workspace tableData={data.results} userId={userId}/>
}

const Workspace = ({ tableData, userId }) => {
    const [taskId, setTaskId] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
    })

    const handleRefresh = async () => {
        setRefreshing(true)
        await mutate(`${getAnalysisTasks}?userid=${userId}`)
        setRefreshing(false)
    }

    const handleTableChange = (pagination) => {
        setPagination({
            ...pagination,
        });
    }

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
                    onSearch={() => {
                        // TODO: implement search logic
                        console.log('Searching for task ID:', taskId);
                    }}
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
        </Box>
    )
}

export default WorkspaceWrapper
