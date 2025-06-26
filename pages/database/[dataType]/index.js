import { useRouter } from "next/router"
import { LoadingView } from "@/components/stateViews/LoadingView"
import DatabaseContent from "@/components/pagesComponents/databasePage/DatabaseContent"
import { DatabaseContext } from "@/components/context/DatabaseContext"
import { useEffect, useState } from "react"
import { fieldMap } from "@/components/pagesComponents/databasePage/dataTableComponents/DataTableSearchBar"

const MicrobeDataListWrapper = () => {
    const router = useRouter()
    const { query, isReady } = router

    if (!isReady) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return <MicrobeDataList query={query}/>
}

const MicrobeDataList = ({ query }) => {
    const dataType = query.dataType || 'genomes'

    const [dataTableState, setDataTableStatus] = useState({
        microbe: query.microbe || 'archaea',
        magStatus: query.mag || 'unMAG',
        searchContent: {
            field: fieldMap[query.microbe || 'archaea'],
            value: query.keyword || ''
        }
    })

    const updateMicrobe = (newMicrobe) => {
        setDataTableStatus((prevState) => ({
            ...prevState,
            microbe: newMicrobe,
            searchContent: {
                ...prevState.searchContent,
                field: fieldMap[newMicrobe]
            }
        }))
    }

    const updateMagStatus = (newMagStatus) => {
        setDataTableStatus((prevState) => ({
            ...prevState,
            magStatus: newMagStatus
        }))
    }

    const updateSearchContent = (newValue) => {
        setDataTableStatus((prevState) => ({
            ...prevState,
            searchContent: {
                ...prevState.searchContent,
                value: newValue
            }
        }))
    }

    return (
        <DatabaseContext.Provider
            value={{
                dataTableState, updateMicrobe, updateMagStatus, updateSearchContent, dataType
            }}
        >
            <DatabaseContent/>
        </DatabaseContext.Provider>
    )
}

export default MicrobeDataListWrapper
