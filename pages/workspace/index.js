import { Button, Input, Space, Table, Tag, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { useState } from "react"

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
        dataIndex: 'taskId',
        key: 'taskId',
        align: 'center',
    },
    {
        title: 'Task Name',
        dataIndex: 'taskName',
        key: 'taskName',
        align: 'center',
    },
    {
        title: 'Analysis Type',
        dataIndex: 'analysisType',
        key: 'analysisType',
        align: 'center',
    },
    {
        title: 'Microbial Type',
        dataIndex: 'microbialType',
        key: 'microbialType',
        align: 'center',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        sorter: true,
        render: (text) => (
            <Tag color={text === 'Success' ? 'blue' : 'orange'}>{text}</Tag>
        ),
    },
    {
        title: 'Created Time',
        dataIndex: 'createdTime',
        key: 'createdTime',
        align: 'center',
        sorter: true,
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
        ),
    },
]

const Workspace = ({}) => {
    const [taskId, setTaskId] = useState('')
    const [tableData, setTableData] = useState(mockData)

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
                    <Button type="primary">
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
                    pagination={{
                        pageSize: 30,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                />
            </Box>
        </Box>
    )
}

export default Workspace
