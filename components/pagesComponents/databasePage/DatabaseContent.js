import { Box, Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import FilterCollapse from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterCollapse"
import useSWR from "swr"
import {
    fetcher,
} from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import DataTableContainer from "@/components/pagesComponents/databasePage/dataTableComponents/DataTableContainer"
import { useDatabaseContext } from "@/components/context/DatabaseContext"
import DraggableModal from "@/components/feedbackComponents/modals/DraggableModal"
import { useRouter } from "next/router"
import MemoTableSplitterLayout from "@/components/layout/TableSplitterLayout"
import { DatabaseDetailModalContext } from "@/components/context/DatabaseDetailModalContext"
import { archaeaConfig } from "@/components/pagesComponents/databasePage/databaseConfigs/archaeaConfig"
import { bacteriaConfig } from "@/components/pagesComponents/databasePage/databaseConfigs/bacteriaConfig"
import { fungiConfig } from "@/components/pagesComponents/databasePage/databaseConfigs/fungiConfig"
import { virusesConfig } from "@/components/pagesComponents/databasePage/databaseConfigs/virusesConfig"

const shouldShowLoading = (microbe, dataType) => {
    const invalidCombinations = [
        { microbe: 'fungi', dataType: 'CRISPRCasSystems' },
        { microbe: 'fungi', dataType: 'antiCRISPRProteins' },
        { microbe: 'viruses', dataType: 'secondaryMetabolites' },
        { microbe: 'viruses', dataType: 'signalPeptides' }
    ];

    return invalidCombinations.some(item => item.microbe === microbe && item.dataType === dataType);
};

const DatabaseContentWrapper = () => {
    const { dataTableState, dataType } = useDatabaseContext()
    const { microbe, magStatus } = dataTableState

    const {
        data: filterOptions,
        isLoading,
        error
    } = useSWR(DATABASECONFIG?.[microbe]?.[magStatus]?.[dataType]?.['endpointFilter'], fetcher)

    if (shouldShowLoading(microbe, dataType) || isLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (error) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <DatabaseContent
            key={`${microbe}-${dataType}`}
            filterOptions={filterOptions}
        />
    )
}

const DatabaseContent = ({ filterOptions }) => {
    const { dataTableState, dataType } = useDatabaseContext()
    const { microbe, magStatus } = dataTableState
    const router = useRouter()
    const [selectedFilterOptions, setSelectedFilterOptions] = useState(initSelected(filterOptions))
    const [showLeft, setShowLeft] = useState(true)
    const [open, setOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)

    const handleDetailClick = useCallback((record) => {
        if (dataType === 'genomes') {
            router.push(`/database/genome/${microbe}/${magStatus}/${record['unique_id']}`)
        } else {
            setSelectedRecord(record)
            setOpen(true)
        }
    }, [dataType, magStatus, microbe, router])

    const handleConfirm = () => {
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <DatabaseDetailModalContext.Provider value={{ handleDetailClick }}>
            <Stack spacing={4} sx={{ marginTop: '24px' }}>
                <H6 sx={{ fontSize: '40px' }}>{DATABASECONFIG[microbe][magStatus][dataType]['title']} Information</H6>
                <MemoTableSplitterLayout
                    isShowLeft={showLeft}
                    leftPanel={
                        <FilterCollapse
                            filterOptions={filterOptions}
                            selectedFilterOptions={selectedFilterOptions}
                            setSelectedFilterOptions={setSelectedFilterOptions}
                        />
                    }
                    rightPanel={
                        <DataTableContainer
                            selectedFilterOptions={selectedFilterOptions}
                            showLeft={showLeft}
                            setShowLeft={setShowLeft}
                        />
                    }
                />
                <DraggableModal
                    open={open}
                    handleConfirm={handleConfirm}
                    handleCancel={handleCancel}
                    title={DATABASECONFIG[microbe][magStatus][dataType].modalTitle}
                >
                    <Box
                        sx={{
                            px: '8px',
                            py: '12px',
                            maxHeight: '75vh',
                            overflowX: 'auto',
                            // scrollbarWidth: 'thin',
                            // scrollbarColor: '#eaeaea transparent',
                            // scrollbarGutter: 'stable'
                        }}
                        key={selectedRecord?.['id']}
                    >
                        {DATABASECONFIG[microbe][magStatus][dataType].modalDetail(selectedRecord, microbe)}
                    </Box>
                </DraggableModal>
            </Stack>
        </DatabaseDetailModalContext.Provider>
    )
}

export const initSelected = (filterOptions, defaultMicrobe = 'Archaea') => {
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
    ...archaeaConfig,
    ...bacteriaConfig,
    ...fungiConfig,
    ...virusesConfig
}

export const annotationToMicrobeMap = {
    'genomes': ['archaea', 'bacteria', 'fungi', 'viruses'],
    'proteins': ['archaea', 'bacteria', 'fungi', 'viruses'],
    'tRNAs': ['archaea', 'bacteria', 'fungi', 'viruses'],
    'CRISPRCasSystems': ['archaea', 'bacteria', 'viruses'],
    'antiCRISPRProteins': ['archaea', 'bacteria', 'viruses'],
    'secondaryMetabolites': ['archaea', 'bacteria', 'fungi'],
    'signalPeptides': ['archaea', 'bacteria', 'fungi'],
    'virulenceFactors': ['archaea', 'bacteria', 'fungi', 'viruses'],
    'antibioticResistanceGenes': ['archaea', 'bacteria', 'fungi', 'viruses'],
    'transmembraneHelices': ['archaea', 'bacteria', 'fungi', 'viruses']
}

export default DatabaseContentWrapper
