import { useRouter } from "next/router"
import { LoadingView } from "@/components/stateViews/LoadingView"
import DatabaseContent from "@/components/pagesComponents/databasePage/DatabaseContent"
import { DatabaseContext } from "@/components/context/DatabaseContext"
import { useState } from "react"

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
            field: getSearchField(query.microbe, query.searchField),
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

    const updateSearchContent = (newPartial) => {
        setDataTableStatus((prevState) => ({
            ...prevState,
            searchContent: {
                ...prevState.searchContent,
                ...newPartial,
            },
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

export const getSearchField = (microbe, searchField) => {
    if (searchField === 'microbial_id') {
        return fieldMap[microbe || 'archaea']
    } else {
        return searchField
    }
}

export const fieldMap = {
    archaea: 'archaea_id',
    bacteria: 'bacteria_id',
    fungi: 'fungi_id',
    viruses: 'viruses_id',
}

export default MicrobeDataListWrapper
