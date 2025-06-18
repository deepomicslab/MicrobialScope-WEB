import { useRouter } from "next/router"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { Box } from "@mui/system"
import GenomeDetailContent from "@/components/pagesComponents/databasePage/genomeDetailComponents/GenomeDetailContent"
import { DatabaseGenomeDetailContext } from "@/components/context/DatabaseGenomeDetailContext"

const GenomeDetail = () => {
    const router = useRouter()
    const { microbe, magStatus, genomeId } = router.query

    if (!router.isReady) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <DatabaseGenomeDetailContext.Provider value={{ microbe, magStatus, genomeId }}>
            <Box sx={{ px: '32px', pt: '12px' }}>
                <GenomeDetailContent/>
            </Box>
        </DatabaseGenomeDetailContext.Provider>
    )
}

export default GenomeDetail
