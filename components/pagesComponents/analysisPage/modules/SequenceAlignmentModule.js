import { Stack } from "@mui/system"
import ActionButtonGroup from "@/components/pagesComponents/analysisPage/shared/ActionButtonGroup"
import { AnalysisBasicAlert } from "@/components/pagesComponents/analysisPage/shared/AnalysisAlert"
import AnalysisSubmitCard from "@/components/pagesComponents/analysisPage/shared/AnalysisSubmitCard"
import { Typography } from "antd"
import { Span } from "@/components/styledComponents/styledHTMLTags"

const { Title, Paragraph, Text, Link } = Typography

const SequenceAlignmentModule = ({}) => {
    const onRunDemo = () => {
        console.log('Run Demo!')
    }

    const onViewResult = () => {
        console.log('View Result!')
    }

    const onHelp = () => {
        console.log('Help!')
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
                Sequence Alignment
            </Title>
            <ActionButtonGroup
                onRunDemo={onRunDemo}
                onViewResult={onViewResult}
                onHelp={onHelp}
            />
            <AnalysisBasicAlert/>
            <AnalysisSubmitCard uploadTip={<UploadTip/>}/>
        </Stack>
    )
}

const UploadTip = () => (
    <AnalysisBasicAlert
        info={
            <Span sx={{ fontSize: '16px' }}>
                The number of sequences uploaded to perform sequence alignment must be <Span sx={{ color: 'red' }}>at least two</Span>.
            </Span>
        }
    />
)

export default SequenceAlignmentModule
