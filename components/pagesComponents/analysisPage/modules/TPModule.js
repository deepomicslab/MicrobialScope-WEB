import { Stack } from "@mui/system"
import ActionButtonGroup from "@/components/pagesComponents/analysisPage/shared/ActionButtonGroup"
import { AnalysisBasicAlert } from "@/components/pagesComponents/analysisPage/shared/AnalysisAlert"
import AnalysisSubmitCard from "@/components/pagesComponents/analysisPage/shared/AnalysisSubmitCard"
import { Typography } from "antd"

const { Title } = Typography

const TPModule = ({}) => {
    const onRunDemo = () => {
        console.log('Run Demo!')
    }

    const onViewResult = () => {
        console.log('View Result!')
    }

    const onHelp = () => {
        console.log('Help!')
    }

    const onReportBug = () => {
        console.log('Report Bug!')
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
            <AnalysisSubmitCard/>
        </Stack>
    )
}

export default TPModule
