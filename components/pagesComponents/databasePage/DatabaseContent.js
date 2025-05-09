import { Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import TableSplitterLayout from "@/components/layout/TableSplitterLayout"
import FilterCollapse from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterCollapse"
import useSWR from "swr"
import { fetcher, getArchaeaGenomesFilterOptionsURL, getArchaeaProteinsFilterOptionsURL } from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { useState } from "react"
import DataTable from "@/components/pagesComponents/databasePage/dataTableComponents/DataTable"
import { postArchaeaGenomesURL, postArchaeaProteinsURL } from "@/dataFetch/post"
import {
    archaeaProteinTableColumns,
    archaeaTableColumns
} from "@/components/pagesComponents/databasePage/dataTableComponents/TableColumns"
import {
    getArchaeaFilterItems,
    getArchaeaProteinsFilterItems
} from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterItems"

const DatabaseContent = ({ microbe, dataType }) => {
    const {
        data: filterOptions,
        isLoading,
        error
    } = useSWR(DATABASECONFIG[microbe][dataType]['endpointFilter'], fetcher)

    const [selectedFilterOptions, setSelectedFilterOptions] = useState(initSelected(filterOptions))
    const [showLeft, setShowLeft] = useState(true)

    if (isLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (error) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <Stack spacing={4} sx={{ marginTop: '24px' }}>
            <H6 sx={{ fontSize: '40px' }}>Archaea Information</H6>
            <TableSplitterLayout
                isShowLeft={showLeft}
                leftPanel={
                    <FilterCollapse
                        microbe={microbe}
                        dataType={dataType}
                        filterOptions={filterOptions}
                        selectedFilterOptions={selectedFilterOptions}
                        setSelectedFilterOptions={setSelectedFilterOptions}
                    />
                }
                rightPanel={
                    <DataTable
                        microbe={microbe}
                        dataType={dataType}
                        selectedFilterOptions={selectedFilterOptions}
                        showLeft={showLeft}
                        setShowLeft={setShowLeft}
                    />
                }
            />
        </Stack>
    )
}

export const initSelected = (filterOptions) => {
    return filterOptions ? (
        Object.keys(filterOptions).reduce((acc, key) => {
            acc[key] = []
            return acc
        }, {})
    ) : (
        {}
    )
}

export const DATABASECONFIG = {
    'archaea': {
        'genomes': {
            columns: archaeaTableColumns,
            filterItems: getArchaeaFilterItems,
            endpointList: postArchaeaGenomesURL,
            endpointFilter: getArchaeaGenomesFilterOptionsURL
        },
        'proteins': {
            columns: archaeaProteinTableColumns,
            filterItems: getArchaeaProteinsFilterItems,
            endpointList: postArchaeaProteinsURL,
            endpointFilter: getArchaeaProteinsFilterOptionsURL
        }
    }
}

export default DatabaseContent
