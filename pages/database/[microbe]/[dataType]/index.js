import { useRouter } from "next/router"
import { LoadingView } from "@/components/stateViews/LoadingView"
import DatabaseContent from "@/components/pagesComponents/databasePage/DatabaseContent"

const MicrobeDataList = () => {
    const router = useRouter()

    const { microbe, dataType } = router.query

    if (!router.isReady) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <DatabaseContent microbe={microbe} dataType={dataType} />
    )
}

export default MicrobeDataList
