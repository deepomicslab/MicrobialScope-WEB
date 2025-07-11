import ActionButtonGroup from "@/components/pagesComponents/analysisPage/ActionButtonGroup"
import { AnalysisBasicAlert } from "@/components/pagesComponents/analysisPage/AnalysisAlert"
import AnalysisSubmitCard from "@/components/pagesComponents/analysisPage/AnalysisSubmitCard"
import { Stack } from "@mui/system"
import { Typography } from "antd"

const { Title } = Typography

const TRNAModule = ({}) => {
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
                tRNA & tmRNA prediction
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

export default TRNAModule
