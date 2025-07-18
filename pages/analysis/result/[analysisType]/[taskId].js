import { useRouter } from "next/router"
import { Box } from "@mui/system"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import ORFResult from "@/components/pagesComponents/analysisPage/results/ORFResult"

const TaskDetail = ({}) => {
    const router = useRouter()
    const { analysisType, taskId } = router.query

    const renderContent = () => {
        switch (analysisType) {
            case "orf":
                return <ORFResult taskId={taskId}/>
            case "trna":
                return <></>
            case "vf":
                return <></>
            case "transmembrane":
                return <></>
            case "alignment":
                return <></>
            case "comparative":
                return <></>
            default:
                return null
        }
    }

    return(
        <Box>
            {renderContent()}
        </Box>
    )
}

export default TaskDetail
