import ActionButtonGroup from "@/components/pagesComponents/analysisPage/shared/ActionButtonGroup"
import { AnalysisBasicAlert } from "@/components/pagesComponents/analysisPage/shared/AnalysisAlert"
import AnalysisSubmitCard from "@/components/pagesComponents/analysisPage/shared/AnalysisSubmitCard"
import { Stack } from "@mui/system"
import { Spin, Typography } from "antd"
import { useGlobalMessage } from "@/components/context/MessageContext"
import { useRouter } from "next/router"
import axios from "axios"
import { postAnalysisAnnotationTaskURL } from "@/dataFetch/post"
import { getOrCreateUserId } from "@/components/utils/UserIdUtils"
import { useState } from "react"

const { Title } = Typography

const TRNAModule = ({}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const messageApi = useGlobalMessage()
    const router = useRouter()

    const onRunDemo = () => {
        setIsSubmitting(true)

        axios.post(postAnalysisAnnotationTaskURL, {
            modulelist: '{"annotation":false,"quality":false,"host":false,"lifestyle":false,"trna":true,"anticrispr":false,"transmembrane":false,"terminator":false}',
            rundemo: 'true',
            analysistype: 'tRNA & tmRNA gene annotation',
            userid: getOrCreateUserId(),
            inputtype: 'upload',
            microbialtype: 'Fungi'
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
        }).finally(() => {
            setIsSubmitting(false)
        })
    }

    const onViewResult = () => {
        router.push('/analysis/result/trna/8')
    }

    const onHelp = () => {
        console.log('Help!')
    }

    const onSubmit = (microbialType, fileList) => {
        setIsSubmitting(true)

        const formData = new FormData()

        formData.append('modulelist', '{"annotation":false,"quality":false,"host":false,"lifestyle":false,"trna":true,"anticrispr":false,"transmembrane":false,"terminator":false}')
        formData.append('rundemo', 'false')
        formData.append('analysistype', 'tRNA & tmRNA gene annotation')
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
        }).finally(() => {
            setIsSubmitting(false)
        })
    }

    return (
        <Spin
            spinning={isSubmitting}
            tip="Submitting, please wait..."
            size="large"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 180px)',
            }}
        >
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
                    tRNA & tmRNA prediction
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
        </Spin>
    )
}

export default TRNAModule
