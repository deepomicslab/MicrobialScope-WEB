import { useRouter } from "next/router"
import { Box } from "@mui/system"
import ORFResult from "@/components/pagesComponents/analysisPage/results/ORFResult"
import TRNAResult from "@/components/pagesComponents/analysisPage/results/TRNAResult"
import VFandARGResult from "@/components/pagesComponents/analysisPage/results/VFandARGResult"
import TPResult from "@/components/pagesComponents/analysisPage/results/TPResult"

const TaskDetail = ({}) => {
    const router = useRouter()
    const { analysisType, taskId } = router.query

    const renderContent = () => {
        switch (analysisType) {
            case "orf":
                return <ORFResult taskId={taskId}/>
            case "trna":
                return <TRNAResult taskId={taskId}/>
            case "vf":
                return <VFandARGResult taskId={taskId}/>
            case "transmembrane":
                return <TPResult taskId={taskId}/>
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
