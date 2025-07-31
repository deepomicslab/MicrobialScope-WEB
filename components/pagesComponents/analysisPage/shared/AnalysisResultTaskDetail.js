import BoldLabel from "@/components/pagesComponents/analysisPage/shared/BoldLabel"
import { Button, Descriptions, Modal, Tag } from "antd"
import { useState } from "react"
import { Stack } from "@mui/system"
import { FileTextOutlined } from "@ant-design/icons"
import { H6, Span } from "@/components/styledComponents/styledHTMLTags"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

const getTaskDetailDescriptionItems = (taskDetail, sequenceNum) => [
    {
        key: 'id',
        label: <BoldLabel text={'Task ID'}/>,
        children: taskDetail.id
    },
    {
        key: 'analysis_type',
        label: <BoldLabel text={'Analysis Type'}/>,
        children: taskDetail['analysis_type']
    },
    {
        key: 'name',
        label: <BoldLabel text={'Task Name'}/>,
        span: 2,
        children: taskDetail.name
    },
    {
        key: 'microbial_type',
        label: <BoldLabel text={'Microbial Type'}/>,
        children: taskDetail['microbial_type']
    },
    {
        key: 'status',
        label: <BoldLabel text={'Status'}/>,
        children: (
            <Tag color={taskDetail.status === 'Success' ? 'green' : 'orange'}>
                {taskDetail.status}
            </Tag>
        ),
    },
    {
        key: 'created_at',
        label: <BoldLabel text={'Created At'}/>,
        children: taskDetail['created_at']
    },
    {
        key: 'sequence_num',
        label: <BoldLabel text={'Submitted Sequences'}/>,
        children: sequenceNum
    }
]

const TaskLogButtonWithModal = ({ taskLog }) => {
    const [visible, setVisible] = useState(false)

    const modalTitle = (
        <Stack direction="row" spacing={0.5} alignItems="center">
            <FileTextOutlined style={{ fontSize: 20 }}/>
            <Span sx={{ fontWeight: 'bold', fontSize: 24 }}>Task Log</Span>
        </Stack>
    )

    return (
        <>
            <Button
                type="primary"
                icon={<FileTextOutlined/>}
                onClick={() => setVisible(true)}
            >
                Task Log
            </Button>

            <Modal
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                title={modalTitle}
                width="60%"
                centered
            >
                <LogContentWrapper logContent={taskLog['task_log'] + taskLog['task_error']}/>
            </Modal>
        </>
    )
}

export const LogContentWrapper = ({ logContent }) => {
    const cleanedLog = logContent.replace(/\u001b\[[0-9;]*m/g, '')

    return (
        <SyntaxHighlighter
            language="bash"
            style={coldarkDark}
            customStyle={{
                maxHeight: '65vh',
                overflowY: 'auto',
                marginTop: '16px'
            }}
            showLineNumbers={true}
        >
            {cleanedLog}
        </SyntaxHighlighter>
    )
}

const DataDetailDescription = ({ title, taskDetail, sequenceNum, taskLog }) => {
    const items = getTaskDetailDescriptionItems(taskDetail, sequenceNum)

    return (
        <Stack>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                    borderBottom: '2px solid #e0e0e0',
                    paddingBottom: '12px',
                    marginTop: '12px',
                    marginBottom: '36px'
                }}
            >
                <H6 sx={{ fontSize: '36px', margin: 0, pb: '8px' }}>
                    {title}
                </H6>
                <TaskLogButtonWithModal taskLog={taskLog}/>
            </Stack>
            <Descriptions
                bordered
                column={2}
                items={items}
            />
        </Stack>
    )
}

export default DataDetailDescription
