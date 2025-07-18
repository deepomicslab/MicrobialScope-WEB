import useSWR from "swr"
import { fetcher, getAnalysisTaskDetail } from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { Descriptions, Tag } from "antd"

const DataDetailDescription = ({ taskDetail }) => {
    const items = [
        {
            key: 'id',
            label: 'Task ID',
            children: taskDetail.id
        },
        {
            key: 'name',
            label: 'Task Name',
            children: taskDetail.name
        },
        {
            key: 'user',
            label: 'User ID',
            children: taskDetail.user
        },
        {
            key: 'microbial_type',
            label: 'Microbial Type',
            children: taskDetail['microbial_type']
        },
        {
            key: 'uploadpath',
            label: 'Upload Path',
            children: taskDetail['uploadpath']
        },
        {
            key: 'analysis_type',
            label: 'Analysis Type',
            children: taskDetail['analysis_type']
        },
        {
            key: 'modulelist',
            label: 'Module List',
            children: taskDetail.modulelist
        },
        {
            key: 'status',
            label: 'Status',
            children: (
                <Tag color={taskDetail.status === 'Success' ? 'green' : 'orange'}>
                    {taskDetail.status}
                </Tag>
            ),
        },
        {
            key: 'task_log',
            label: 'Task Log',
            children: taskDetail['task_log'] || 'N/A'
        },
        {
            key: 'created_at',
            label: 'Created At',
            children: taskDetail['created_at']
        },
    ]

    return (
        <Descriptions
            bordered
            column={2}
            items={items}
        />
    )
}

const ORFResult = ({
    taskId
}) => {
    const {
        data: taskDetail,
        isLoading: isLoadingTaskDetail,
        error: errorTaskDetail
    } = useSWR(`${getAnalysisTaskDetail}?taskid=${taskId}`, fetcher)

    if (isLoadingTaskDetail) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (errorTaskDetail) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <>
            <DataDetailDescription taskDetail={taskDetail?.results}/>
        </>
    )
}

export default ORFResult
