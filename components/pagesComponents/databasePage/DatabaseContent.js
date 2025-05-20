import { Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import TableSplitterLayout from "@/components/layout/TableSplitterLayout"
import FilterCollapse from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterCollapse"
import useSWR from "swr"
import {
    fetcher, getArchaeaAntibioticResistancesFilterOptionsURL,
    getArchaeaAntiCRISPRAnnotationsFilterOptionsURL,
    getArchaeaCRISPRCasSystemsFilterOptionsURL,
    getArchaeaGenomesFilterOptionsURL,
    getArchaeaProteinsFilterOptionsURL,
    getArchaeaSecondaryMetabolitesFilterOptionsURL,
    getArchaeaSignalPeptidesFilterOptionsURL, getArchaeaTransmembraneHelicesFilterOptionsURL,
    getArchaeaTRNAsFilterOptionsURL, getArchaeaVirulenceFactorsFilterOptionsURL
} from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { useState } from "react"
import {
    postArchaeaAntibioticResistancesBatchDownloadURL,
    postArchaeaAntibioticResistancesURL,
    postArchaeaAntiCRISPRAnnotationsBatchDownloadURL,
    postArchaeaAntiCRISPRAnnotationsURL,
    postArchaeaCRISPRCasSystemsBatchDownloadURL,
    postArchaeaCRISPRCasSystemsURL,
    postArchaeaGenomesBatchDownloadURL,
    postArchaeaGenomesURL,
    postArchaeaProteinsBatchDownloadURL,
    postArchaeaProteinsURL,
    postArchaeaSecondaryMetabolitesBatchDownloadURL,
    postArchaeaSecondaryMetabolitesURL,
    postArchaeaSignalPeptidesBatchDownloadURL,
    postArchaeaSignalPeptidesURL, postArchaeaTransmembraneHelicesBatchDownloadURL,
    postArchaeaTransmembraneHelicesURL,
    postArchaeaTRNAsBatchDownloadURL,
    postArchaeaTRNAsURL,
    postArchaeaVirulenceFactorsBatchDownloadURL,
    postArchaeaVirulenceFactorsURL
} from "@/dataFetch/post"
import {
    archaeaAntibioticResistanceColumns,
    archaeaAntiCRISPRAnnotationColumns,
    archaeaCRISPRCasColumns,
    archaeaProteinTableColumns, archaeaSecondaryMetaboliteColumns, archaeaSignalPeptideColumns,
    archaeaTableColumns, archaeaTransmembraneHelicesColumns, archaeaTRNATableColumns, archaeaVirulenceFactorColumns
} from "@/components/pagesComponents/databasePage/dataTableComponents/TableColumns"
import {
    getArchaeaAntibioticResistancesFilterItems,
    getArchaeaAntiCRISPRAnnotationsFilterItems,
    getArchaeaCRISPRCasSystemsFilterItems,
    getArchaeaFilterItems,
    getArchaeaProteinsFilterItems,
    getArchaeaSecondaryMetabolitesFilterItems,
    getArchaeaSignalPeptidesFilterItems, getArchaeaTransmembraneHelicesFilterItems,
    getArchaeaTRNAsFilterItems, getArchaeaVirulenceFactorsFilterItems
} from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterItems"
import DataTableContainer from "@/components/pagesComponents/databasePage/dataTableComponents/DataTableContainer"
import { useDatabaseContext } from "@/components/context/DatabaseContext"

const DatabaseContentWrapper = () => {
    const { microbe, dataType } = useDatabaseContext()
    const {
        data: filterOptions,
        isLoading,
        error
    } = useSWR(DATABASECONFIG[microbe][dataType]['endpointFilter'], fetcher)

    if (isLoading) {
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
    const { microbe, dataType } = useDatabaseContext()
    const [selectedFilterOptions, setSelectedFilterOptions] = useState(initSelected(filterOptions))
    const [showLeft, setShowLeft] = useState(true)

    return (
        <Stack spacing={4} sx={{ marginTop: '24px' }}>
            <H6 sx={{ fontSize: '40px' }}>{DATABASECONFIG[microbe][dataType]['title']} Information</H6>
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
                    <DataTableContainer
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
            title: 'Archaea Genomes',
            columns: archaeaTableColumns,
            filterItems: getArchaeaFilterItems,
            endpointList: postArchaeaGenomesURL,
            endpointFilter: getArchaeaGenomesFilterOptionsURL,
            endpointBatchDownload: postArchaeaGenomesBatchDownloadURL,
        },
        'proteins': {
            title: 'Archaea Proteins',
            columns: archaeaProteinTableColumns,
            filterItems: getArchaeaProteinsFilterItems,
            endpointList: postArchaeaProteinsURL,
            endpointFilter: getArchaeaProteinsFilterOptionsURL,
            endpointBatchDownload: postArchaeaProteinsBatchDownloadURL
        },
        'tRNAs': {
            title: 'Archaea tRNAs',
            columns: archaeaTRNATableColumns,
            filterItems: getArchaeaTRNAsFilterItems,
            endpointList: postArchaeaTRNAsURL,
            endpointFilter: getArchaeaTRNAsFilterOptionsURL,
            endpointBatchDownload: postArchaeaTRNAsBatchDownloadURL,
        },
        'CRISPRCasSystems': {
            title: 'CRISPR/Cas Systems',
            columns: archaeaCRISPRCasColumns,
            filterItems: getArchaeaCRISPRCasSystemsFilterItems,
            endpointList: postArchaeaCRISPRCasSystemsURL,
            endpointFilter: getArchaeaCRISPRCasSystemsFilterOptionsURL,
            endpointBatchDownload: postArchaeaCRISPRCasSystemsBatchDownloadURL
        },
        'antiCRISPRProteins': {
            title: 'Anti-CRISPR Proteins',
            columns: archaeaAntiCRISPRAnnotationColumns,
            filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
            endpointList: postArchaeaAntiCRISPRAnnotationsURL,
            endpointFilter: getArchaeaAntiCRISPRAnnotationsFilterOptionsURL,
            endpointBatchDownload: postArchaeaAntiCRISPRAnnotationsBatchDownloadURL
        },
        'secondaryMetabolites': {
            title: 'Secondary Metabolites',
            columns: archaeaSecondaryMetaboliteColumns,
            filterItems: getArchaeaSecondaryMetabolitesFilterItems,
            endpointList: postArchaeaSecondaryMetabolitesURL,
            endpointFilter: getArchaeaSecondaryMetabolitesFilterOptionsURL,
            endpointBatchDownload: postArchaeaSecondaryMetabolitesBatchDownloadURL
        },
        'signalPeptides': {
            title: 'Signal Peptides',
            columns: archaeaSignalPeptideColumns,
            filterItems: getArchaeaSignalPeptidesFilterItems,
            endpointList: postArchaeaSignalPeptidesURL,
            endpointFilter: getArchaeaSignalPeptidesFilterOptionsURL,
            endpointBatchDownload: postArchaeaSignalPeptidesBatchDownloadURL
        },
        'virulenceFactors': {
            title: 'Virulence Factors',
            columns: archaeaVirulenceFactorColumns,
            filterItems: getArchaeaVirulenceFactorsFilterItems,
            endpointList: postArchaeaVirulenceFactorsURL,
            endpointFilter: getArchaeaVirulenceFactorsFilterOptionsURL,
            endpointBatchDownload: postArchaeaVirulenceFactorsBatchDownloadURL
        },
        'antibioticResistanceGenes': {
            title: 'Antibiotic Resistance Genes',
            columns: archaeaAntibioticResistanceColumns,
            filterItems: getArchaeaAntibioticResistancesFilterItems,
            endpointList: postArchaeaAntibioticResistancesURL,
            endpointFilter: getArchaeaAntibioticResistancesFilterOptionsURL,
            endpointBatchDownload: postArchaeaAntibioticResistancesBatchDownloadURL
        },
        'transmembraneHelices': {
            title: 'Transmembrane Helices',
            columns: archaeaTransmembraneHelicesColumns,
            filterItems: getArchaeaTransmembraneHelicesFilterItems,
            endpointList: postArchaeaTransmembraneHelicesURL,
            endpointFilter: getArchaeaTransmembraneHelicesFilterOptionsURL,
            endpointBatchDownload: postArchaeaTransmembraneHelicesBatchDownloadURL
        }
    }
}

export default DatabaseContentWrapper
