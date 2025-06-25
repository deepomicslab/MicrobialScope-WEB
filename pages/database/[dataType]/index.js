import { useRouter } from "next/router"
import { LoadingView } from "@/components/stateViews/LoadingView"
import DatabaseContent from "@/components/pagesComponents/databasePage/DatabaseContent"
import { DatabaseContext } from "@/components/context/DatabaseContext"
import { useEffect, useState } from "react"

const MicrobeDataList = () => {
    const router = useRouter()
    const { query, isReady } = router
    const { dataType } = query

    const [microbe, setMicrobe] = useState('archaea')
    const [magStatus, setMagStatus] = useState('unMAG')
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        if (!isReady) return

        if (typeof query.keyword === 'string') {
            setKeyword(query['keyword'])
        } else {
            setKeyword('')
        }
        if (typeof query.microbe === 'string') {
            setMicrobe(query['microbe'])
        } else {
            setMicrobe('archaea')
        }
        if (typeof query.mag === 'string') {
            setMagStatus(query['mag'])
        }
    }, [isReady, query])

    if (!isReady) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <DatabaseContext.Provider
            value={{
                microbe, setMicrobe,
                magStatus, setMagStatus,
                keyword, setKeyword,
                dataType
            }}
        >
            <DatabaseContent key={router.pathname}/>
        </DatabaseContext.Provider>
    )
}

export default MicrobeDataList
