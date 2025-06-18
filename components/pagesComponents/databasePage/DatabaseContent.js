import { Box, Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import FilterCollapse from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterCollapse"
import useSWR from "swr"
import {
    fetcher,
    getArchaeaAntibioticResistancesFilterOptionsURL,
    getArchaeaAntibioticResistancesSingleFileURL,
    getArchaeaAntiCRISPRAnnotationsFilterOptionsURL,
    getArchaeaAntiCRISPRAnnotationsSingleFileURL,
    getArchaeaCRISPRCasSystemsFilterOptionsURL,
    getArchaeaCRISPRCasSystemsSingleFileURL,
    getArchaeaGenomesFilterOptionsURL,
    getArchaeaGenomesSingleFileURL,
    getArchaeaProteinsFilterOptionsURL,
    getArchaeaProteinsSingleFileURL,
    getArchaeaSecondaryMetabolitesFilterOptionsURL,
    getArchaeaSecondaryMetabolitesSingleFileURL,
    getArchaeaSignalPeptidesFilterOptionsURL,
    getArchaeaSignalPeptidesSingleFileURL,
    getArchaeaTransmembraneHelicesFilterOptionsURL,
    getArchaeaTransmembraneHelicesSingleFileURL,
    getArchaeaTRNAsFilterOptionsURL,
    getArchaeaTRNAsSingleFileURL,
    getArchaeaVirulenceFactorsFilterOptionsURL,
    getArchaeaVirulenceFactorsSingleFileURL,
    getUnMAGArchaeaAntibioticResistancesFilterOptionsURL,
    getUnMAGArchaeaAntibioticResistancesSingleFileURL,
    getUnMAGArchaeaAntiCRISPRAnnotationsFilterOptionsURL,
    getUnMAGArchaeaAntiCRISPRAnnotationsSingleFileURL,
    getUnMAGArchaeaCRISPRCasSystemsFilterOptionsURL,
    getUnMAGArchaeaCRISPRCasSystemsSingleFileURL,
    getUnMAGArchaeaGenomesFilterOptionsURL,
    getUnMAGArchaeaGenomesSingleFileURL,
    getUnMAGArchaeaProteinsFilterOptionsURL,
    getUnMAGArchaeaProteinsSingleFileURL,
    getUnMAGArchaeaSecondaryMetabolitesFilterOptionsURL,
    getUnMAGArchaeaSecondaryMetabolitesSingleFileURL,
    getUnMAGArchaeaSignalPeptidesFilterOptionsURL,
    getUnMAGArchaeaSignalPeptidesSingleFileURL,
    getUnMAGArchaeaTransmembraneHelicesFilterOptionsURL,
    getUnMAGArchaeaTransmembraneHelicesSingleFileURL,
    getUnMAGArchaeaTRNAsFilterOptionsURL,
    getUnMAGArchaeaTRNAsSingleFileURL,
    getUnMAGArchaeaVirulenceFactorsFilterOptionsURL,
    getUnMAGArchaeaVirulenceFactorsSingleFileURL
} from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { useCallback, useState } from "react"
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
    postArchaeaSignalPeptidesURL,
    postArchaeaTransmembraneHelicesBatchDownloadURL,
    postArchaeaTransmembraneHelicesURL,
    postArchaeaTRNAsBatchDownloadURL,
    postArchaeaTRNAsURL,
    postArchaeaVirulenceFactorsBatchDownloadURL,
    postArchaeaVirulenceFactorsURL,
    postUnMAGArchaeaAntibioticResistancesBatchDownloadURL,
    postUnMAGArchaeaAntibioticResistancesURL,
    postUnMAGArchaeaAntiCRISPRAnnotationsBatchDownloadURL,
    postUnMAGArchaeaAntiCRISPRAnnotationsURL,
    postUnMAGArchaeaCRISPRCasSystemsBatchDownloadURL,
    postUnMAGArchaeaCRISPRCasSystemsURL,
    postUnMAGArchaeaGenomesBatchDownloadURL,
    postUnMAGArchaeaGenomesURL,
    postUnMAGArchaeaProteinsBatchDownloadURL,
    postUnMAGArchaeaProteinsURL,
    postUnMAGArchaeaSecondaryMetabolitesBatchDownloadURL,
    postUnMAGArchaeaSecondaryMetabolitesURL,
    postUnMAGArchaeaSignalPeptidesBatchDownloadURL,
    postUnMAGArchaeaSignalPeptidesURL,
    postUnMAGArchaeaTransmembraneHelicesBatchDownloadURL,
    postUnMAGArchaeaTransmembraneHelicesURL,
    postUnMAGArchaeaTRNAsBatchDownloadURL,
    postUnMAGArchaeaTRNAsURL,
    postUnMAGArchaeaVirulenceFactorsBatchDownloadURL,
    postUnMAGArchaeaVirulenceFactorsURL
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
import DraggableModal from "@/components/feedbackComponents/modals/DraggableModal"
import { useRouter } from "next/router"
import MemoTableSplitterLayout from "@/components/layout/TableSplitterLayout"
import {
    TRNAModalDetailDescriptions, TRNAModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TRNAModalDetailDescriptionsComponents"
import {
    CRISPRCasSystemModalDetailDescriptions,
    CRISPRCasSystemModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/CRISPRCasSystemModalDetailComponents"
import {
    AntiCRISPRAnnotationModalDetailDescriptions,
    AntiCRISPRAnnotationModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/AntiCRISPRAnnotationModalDetailComponents"
import {
    SecondaryMetabolitesModalDetailDescriptions,
    SecondaryMetabolitesModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/SecondaryMetabolitesModalDetailComponents"
import {
    SignalPeptideModalDetailDescriptions,
    SignalPeptideModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/SignalPeptideModalDetailComponents"
import {
    VirulenceFactorModalDetailDescriptions, VirulenceFactorModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/VirulenceFactorModalDetailComponents"
import {
    AntibioticResistanceGeneModalDetailDescriptions,
    AntibioticResistanceGeneModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/AntibioticResistanceGeneModalDetailComponents"
import {
    TransmembraneHelicesModalDetailDescriptions,
    TransmembraneHelicesModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TransmembraneHelicesModalDetailComponents"
import {
    ProteinModalDetailDescriptions, ProteinModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/ProteinModalDetailComponents"
import { DatabaseDetailModalContext } from "@/components/context/DatabaseDetailModalContext"

const DatabaseContentWrapper = () => {
    const { microbe, magStatus, dataType } = useDatabaseContext()
    const {
        data: filterOptions,
        isLoading,
        error
    } = useSWR(DATABASECONFIG[microbe][magStatus][dataType]['endpointFilter'], fetcher)

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
    const { microbe, magStatus, dataType } = useDatabaseContext()
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
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#eaeaea transparent',
                            scrollbarGutter: 'stable'
                        }}
                    >
                        {DATABASECONFIG[microbe][magStatus][dataType].modalDetail(selectedRecord)}
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
    'archaea': {
        'MAG': {
            'genomes': {
                title: 'Archaea Genomes',
                columns: archaeaTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postArchaeaGenomesURL,
                endpointFilter: getArchaeaGenomesFilterOptionsURL,
                endpointSingleDownload: getArchaeaGenomesSingleFileURL,
                endpointBatchDownload: postArchaeaGenomesBatchDownloadURL,
                modalDetail: (record) => JSON.stringify(record, null, 2),
                modalTitle: <TransmembraneHelicesModalDetailTitle/>
            },
            'proteins': {
                title: 'Archaea Proteins',
                columns: archaeaProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postArchaeaProteinsURL,
                endpointFilter: getArchaeaProteinsFilterOptionsURL,
                endpointSingleDownload: getArchaeaProteinsSingleFileURL,
                endpointBatchDownload: postArchaeaProteinsBatchDownloadURL,
                modalDetail: (record) => <ProteinModalDetailDescriptions record={record}/>,
                modalTitle: <ProteinModalDetailTitle/>
            },
            'tRNAs': {
                title: 'Archaea tRNAs',
                columns: archaeaTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postArchaeaTRNAsURL,
                endpointFilter: getArchaeaTRNAsFilterOptionsURL,
                endpointSingleDownload: getArchaeaTRNAsSingleFileURL,
                endpointBatchDownload: postArchaeaTRNAsBatchDownloadURL,
                modalDetail: (record) => <TRNAModalDetailDescriptions record={record}/>,
                modalTitle: <TRNAModalDetailTitle/>
            },
            'CRISPRCasSystems': {
                title: 'CRISPR/Cas Systems',
                columns: archaeaCRISPRCasColumns,
                filterItems: getArchaeaCRISPRCasSystemsFilterItems,
                endpointList: postArchaeaCRISPRCasSystemsURL,
                endpointFilter: getArchaeaCRISPRCasSystemsFilterOptionsURL,
                endpointSingleDownload: getArchaeaCRISPRCasSystemsSingleFileURL,
                endpointBatchDownload: postArchaeaCRISPRCasSystemsBatchDownloadURL,
                modalDetail: (record) => <CRISPRCasSystemModalDetailDescriptions record={record}/>,
                modalTitle: <CRISPRCasSystemModalDetailTitle/>
            },
            'antiCRISPRProteins': {
                title: 'Anti-CRISPR Proteins',
                columns: archaeaAntiCRISPRAnnotationColumns,
                filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
                endpointList: postArchaeaAntiCRISPRAnnotationsURL,
                endpointFilter: getArchaeaAntiCRISPRAnnotationsFilterOptionsURL,
                endpointSingleDownload: getArchaeaAntiCRISPRAnnotationsSingleFileURL,
                endpointBatchDownload: postArchaeaAntiCRISPRAnnotationsBatchDownloadURL,
                modalDetail: (record) => <AntiCRISPRAnnotationModalDetailDescriptions record={record}/>,
                modalTitle: <AntiCRISPRAnnotationModalDetailTitle/>
            },
            'secondaryMetabolites': {
                title: 'Secondary Metabolites',
                columns: archaeaSecondaryMetaboliteColumns,
                filterItems: getArchaeaSecondaryMetabolitesFilterItems,
                endpointList: postArchaeaSecondaryMetabolitesURL,
                endpointFilter: getArchaeaSecondaryMetabolitesFilterOptionsURL,
                endpointSingleDownload: getArchaeaSecondaryMetabolitesSingleFileURL,
                endpointBatchDownload: postArchaeaSecondaryMetabolitesBatchDownloadURL,
                modalDetail: (record) => <SecondaryMetabolitesModalDetailDescriptions record={record}/>,
                modalTitle: <SecondaryMetabolitesModalDetailTitle/>
            },
            'signalPeptides': {
                title: 'Signal Peptides',
                columns: archaeaSignalPeptideColumns,
                filterItems: getArchaeaSignalPeptidesFilterItems,
                endpointList: postArchaeaSignalPeptidesURL,
                endpointFilter: getArchaeaSignalPeptidesFilterOptionsURL,
                endpointSingleDownload: getArchaeaSignalPeptidesSingleFileURL,
                endpointBatchDownload: postArchaeaSignalPeptidesBatchDownloadURL,
                modalDetail: (record) => <SignalPeptideModalDetailDescriptions record={record}/>,
                modalTitle: <SignalPeptideModalDetailTitle/>
            },
            'virulenceFactors': {
                title: 'Virulence Factors',
                columns: archaeaVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postArchaeaVirulenceFactorsURL,
                endpointFilter: getArchaeaVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getArchaeaVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postArchaeaVirulenceFactorsBatchDownloadURL,
                modalDetail: (record) => <VirulenceFactorModalDetailDescriptions record={record}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Genes',
                columns: archaeaAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postArchaeaAntibioticResistancesURL,
                endpointFilter: getArchaeaAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getArchaeaAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postArchaeaAntibioticResistancesBatchDownloadURL,
                modalDetail: (record) => <AntibioticResistanceGeneModalDetailDescriptions record={record}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>
            },
            'transmembraneHelices': {
                title: 'Transmembrane Helices',
                columns: archaeaTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postArchaeaTransmembraneHelicesURL,
                endpointFilter: getArchaeaTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getArchaeaTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postArchaeaTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record) => <TransmembraneHelicesModalDetailDescriptions record={record}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>
            }
        },
        'unMAG': {
            'genomes': {
                title: 'Archaea Genomes',
                columns: archaeaTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postUnMAGArchaeaGenomesURL,
                endpointFilter: getUnMAGArchaeaGenomesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaGenomesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaGenomesBatchDownloadURL,
                modalDetail: (record) => JSON.stringify(record, null, 2),
                modalTitle: <TransmembraneHelicesModalDetailTitle/>
            },
            'proteins': {
                title: 'Archaea Proteins',
                columns: archaeaProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postUnMAGArchaeaProteinsURL,
                endpointFilter: getUnMAGArchaeaProteinsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaProteinsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaProteinsBatchDownloadURL,
                modalDetail: (record) => <ProteinModalDetailDescriptions record={record}/>,
                modalTitle: <ProteinModalDetailTitle/>
            },
            'tRNAs': {
                title: 'Archaea tRNAs',
                columns: archaeaTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postUnMAGArchaeaTRNAsURL,
                endpointFilter: getUnMAGArchaeaTRNAsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaTRNAsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaTRNAsBatchDownloadURL,
                modalDetail: (record) => <TRNAModalDetailDescriptions record={record}/>,
                modalTitle: <TRNAModalDetailTitle/>
            },
            'CRISPRCasSystems': {
                title: 'CRISPR/Cas Systems',
                columns: archaeaCRISPRCasColumns,
                filterItems: getArchaeaCRISPRCasSystemsFilterItems,
                endpointList: postUnMAGArchaeaCRISPRCasSystemsURL,
                endpointFilter: getUnMAGArchaeaCRISPRCasSystemsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaCRISPRCasSystemsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaCRISPRCasSystemsBatchDownloadURL,
                modalDetail: (record) => <CRISPRCasSystemModalDetailDescriptions record={record}/>,
                modalTitle: <CRISPRCasSystemModalDetailTitle/>
            },
            'antiCRISPRProteins': {
                title: 'Anti-CRISPR Proteins',
                columns: archaeaAntiCRISPRAnnotationColumns,
                filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
                endpointList: postUnMAGArchaeaAntiCRISPRAnnotationsURL,
                endpointFilter: getUnMAGArchaeaAntiCRISPRAnnotationsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaAntiCRISPRAnnotationsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaAntiCRISPRAnnotationsBatchDownloadURL,
                modalDetail: (record) => <AntiCRISPRAnnotationModalDetailDescriptions record={record}/>,
                modalTitle: <AntiCRISPRAnnotationModalDetailTitle/>
            },
            'secondaryMetabolites': {
                title: 'Secondary Metabolites',
                columns: archaeaSecondaryMetaboliteColumns,
                filterItems: getArchaeaSecondaryMetabolitesFilterItems,
                endpointList: postUnMAGArchaeaSecondaryMetabolitesURL,
                endpointFilter: getUnMAGArchaeaSecondaryMetabolitesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaSecondaryMetabolitesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaSecondaryMetabolitesBatchDownloadURL,
                modalDetail: (record) => <SecondaryMetabolitesModalDetailDescriptions record={record}/>,
                modalTitle: <SecondaryMetabolitesModalDetailTitle/>
            },
            'signalPeptides': {
                title: 'Signal Peptides',
                columns: archaeaSignalPeptideColumns,
                filterItems: getArchaeaSignalPeptidesFilterItems,
                endpointList: postUnMAGArchaeaSignalPeptidesURL,
                endpointFilter: getUnMAGArchaeaSignalPeptidesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaSignalPeptidesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaSignalPeptidesBatchDownloadURL,
                modalDetail: (record) => <SignalPeptideModalDetailDescriptions record={record}/>,
                modalTitle: <SignalPeptideModalDetailTitle/>
            },
            'virulenceFactors': {
                title: 'Virulence Factors',
                columns: archaeaVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postUnMAGArchaeaVirulenceFactorsURL,
                endpointFilter: getUnMAGArchaeaVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaVirulenceFactorsBatchDownloadURL,
                modalDetail: (record) => <VirulenceFactorModalDetailDescriptions record={record}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Genes',
                columns: archaeaAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postUnMAGArchaeaAntibioticResistancesURL,
                endpointFilter: getUnMAGArchaeaAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaAntibioticResistancesBatchDownloadURL,
                modalDetail: (record) => <AntibioticResistanceGeneModalDetailDescriptions record={record}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>
            },
            'transmembraneHelices': {
                title: 'Transmembrane Helices',
                columns: archaeaTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postUnMAGArchaeaTransmembraneHelicesURL,
                endpointFilter: getUnMAGArchaeaTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record) => <TransmembraneHelicesModalDetailDescriptions record={record}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>
            }
        }
    }
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
