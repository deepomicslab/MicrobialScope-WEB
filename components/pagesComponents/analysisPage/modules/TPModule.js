import { Stack } from "@mui/system"
import ActionButtonGroup from "@/components/pagesComponents/analysisPage/shared/ActionButtonGroup"
import { AnalysisBasicAlert } from "@/components/pagesComponents/analysisPage/shared/AnalysisAlert"
import AnalysisSubmitCard from "@/components/pagesComponents/analysisPage/shared/AnalysisSubmitCard"
import { Typography } from "antd"
import { useGlobalMessage } from "@/components/context/MessageContext"
import { useRouter } from "next/router"
import axios from "axios"
import { postAnalysisAnnotationTaskURL } from "@/dataFetch/post"
import { getOrCreateUserId } from "@/components/utils/UserIdUtils"

const { Title } = Typography

const TPModule = ({}) => {
    const messageApi = useGlobalMessage()
    const router = useRouter()

    const onRunDemo = () => {
        axios.post(postAnalysisAnnotationTaskURL, {
            modulelist: '{"annotation":true,"quality":false,"host":false,"lifestyle":false,"trna":false,"anticrispr":false,"transmembrane":true,"terminator":false}',
            rundemo: 'true',
            analysistype: 'Transmembrane Protein Annotation',
            userid: getOrCreateUserId(),
            inputtype: 'upload',
            microbialtype: 'Archaea'
        }).then(({ data }) => {
            if (data.status === 'Success') {
                messageApi.open({
                    type: 'success',
                    content: data.message
                })

                router.push('/workspace')
            } else {
                messageApi.open({
                    type: 'error',
                    content: data.message,
                })
            }
        })
    }

    const onViewResult = () => {
        router.push('/analysis/result/transmembrane/11')
    }

    const onHelp = () => {
        console.log('Help!')
    }

    const onSubmit = (microbialType, fileList) => {
        const formData = new FormData()

        formData.append('modulelist', '{"annotation":true,"quality":false,"host":false,"lifestyle":false,"trna":false,"anticrispr":false,"transmembrane":true,"terminator":false}')
        formData.append('rundemo', 'false')
        formData.append('analysistype', 'Transmembrane Protein Annotation')
        formData.append('userid', getOrCreateUserId())
        formData.append('inputtype', 'upload')
        formData.append('microbialtype', microbialType)
        formData.append('submitfile', fileList[0].originFileObj)

        axios.post(postAnalysisAnnotationTaskURL, formData).then(({ data }) => {
            if (data.status === 'Success') {
                messageApi.open({
                    type: 'success',
                    content: data.message
                })

                router.push('/workspace')
            } else {
                messageApi.open({
                    type: 'error',
                    content: data.message,
                })
            }
        })
    }

    return (
        <Stack
            sx={{
                px: '12px'
            }}
            spacing={2}
        >
            <Title
                level={2}
                style={{
                    marginTop: '12px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgb(211, 211, 211)'
                }}
            >
                Transmembrane Protein Annotation
            </Title>
            <ActionButtonGroup
                onRunDemo={onRunDemo}
                onViewResult={onViewResult}
                onHelp={onHelp}
            />
            <AnalysisBasicAlert/>
            <AnalysisSubmitCard
                onSubmit={onSubmit}
            />
        </Stack>
    )
}

export default TPModule
