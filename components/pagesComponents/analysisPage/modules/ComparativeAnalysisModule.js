import { Stack } from "@mui/system"
import ActionButtonGroup from "@/components/pagesComponents/analysisPage/shared/ActionButtonGroup"
import { AnalysisBasicAlert } from "@/components/pagesComponents/analysisPage/shared/AnalysisAlert"
import AnalysisSubmitCard from "@/components/pagesComponents/analysisPage/shared/AnalysisSubmitCard"
import { Spin, Typography } from "antd"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import { useGlobalMessage } from "@/components/context/MessageContext"
import { useRouter } from "next/router"
import axios from "axios"
import { postAnalysisClusterTaskURL } from "@/dataFetch/post"
import { getOrCreateUserId } from "@/components/utils/UserIdUtils"
import { useState } from "react"

const { Title } = Typography

const ComparativeAnalysisModule = ({}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const messageApi = useGlobalMessage()
    const router = useRouter()

    const onRunDemo = () => {
        setIsSubmitting(true)

        axios.post(postAnalysisClusterTaskURL, {
            modulelist: '{"tree":true}',
            rundemo: 'true',
            analysistype: 'Comparative Tree Construction',
            userid: getOrCreateUserId(),
            inputtype: 'upload',
            microbialtype: 'Viruses'
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
        router.push('/analysis/result/comparative/27')
    }

    const onHelp = () => {
        console.log('Help!')
    }

    const onSubmit = (microbialType, fileList) => {
        setIsSubmitting(true)

        const formData = new FormData()

        formData.append('modulelist', '{"tree":true}')
        formData.append('rundemo', 'false')
        formData.append('analysistype', 'Comparative Tree Construction')
        formData.append('userid', getOrCreateUserId())
        formData.append('inputtype', 'upload')
        formData.append('microbialtype', microbialType)
        formData.append('submitfile', fileList[0].originFileObj)

        axios.post(postAnalysisClusterTaskURL, formData).then(({ data }) => {
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
                    Comparative Analysis
                </Title>
                <ActionButtonGroup
                    onRunDemo={onRunDemo}
                    onViewResult={onViewResult}
                    onHelp={onHelp}
                />
                <AnalysisBasicAlert/>
                <AnalysisSubmitCard
                    uploadTip={<UploadTip/>}
                    onSubmit={onSubmit}
                />
            </Stack>
        </Spin>
    )
}

const UploadTip = () => (
    <AnalysisBasicAlert
        info={
            <Span sx={{ fontSize: '16px' }}>
                The number of sequences uploaded to construct comparative tree must be <Span sx={{ color: 'red' }}>at
                least three</Span>.
            </Span>
        }
    />
)

export default ComparativeAnalysisModule
