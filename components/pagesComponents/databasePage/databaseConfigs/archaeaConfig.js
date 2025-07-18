import {
    archaeaAntibioticResistanceColumns,
    archaeaAntiCRISPRAnnotationColumns,
    archaeaCRISPRCasColumns,
    archaeaProteinTableColumns, archaeaSecondaryMetaboliteColumns, archaeaSignalPeptideColumns,
    archaeaTableColumns, archaeaTransmembraneHelicesColumns, archaeaTRNATableColumns, archaeaVirulenceFactorColumns
} from "@/components/pagesComponents/databasePage/dataTableComponents/archaeaTableColumns"
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
import {
    TransmembraneHelicesModalDetailDescriptions,
    TransmembraneHelicesModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TransmembraneHelicesModalDetailComponents"
import {
    ArchaeaAntibioticResistanceSearchBarConfig,
    ArchaeaAntiCRISPRSearchBarConfig,
    ArchaeaCRISPRSearchBarConfig,
    ArchaeaGenomeSearchBarConfig,
    ArchaeaProteinSearchBarConfig,
    ArchaeaSecondaryMetabolitesSearchBarConfig,
    ArchaeaSignalPeptideSearchBarConfig, ArchaeaTransmembraneHelicesSearchBarConfig,
    ArchaeaTRNASearchBarConfig, ArchaeaVirulenceFactorSearchBarConfig
} from "@/components/pagesComponents/databasePage/databaseConfigs/searchBarConfig"
import {
    ProteinModalDetailDescriptions,
    ProteinModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/ProteinModalDetailComponents"
import {
    TRNAModalDetailDescriptions,
    TRNAModalDetailTitle
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
    VirulenceFactorModalDetailDescriptions,
    VirulenceFactorModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/VirulenceFactorModalDetailComponents"
import {
    AntibioticResistanceGeneModalDetailDescriptions,
    AntibioticResistanceGeneModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/AntibioticResistanceGeneModalDetailComponents"

export const archaeaConfig = {
    'archaea': {
        'MAG': {
            'genomes': {
                title: 'Genome',
                columns: archaeaTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postArchaeaGenomesURL,
                endpointFilter: getArchaeaGenomesFilterOptionsURL,
                endpointSingleDownload: getArchaeaGenomesSingleFileURL,
                endpointBatchDownload: postArchaeaGenomesBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: ArchaeaGenomeSearchBarConfig
            },
            'proteins': {
                title: 'Protein',
                columns: archaeaProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postArchaeaProteinsURL,
                endpointFilter: getArchaeaProteinsFilterOptionsURL,
                endpointSingleDownload: getArchaeaProteinsSingleFileURL,
                endpointBatchDownload: postArchaeaProteinsBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: ArchaeaProteinSearchBarConfig
            },
            'tRNAs': {
                title: 'tRNA & tmRNA',
                columns: archaeaTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postArchaeaTRNAsURL,
                endpointFilter: getArchaeaTRNAsFilterOptionsURL,
                endpointSingleDownload: getArchaeaTRNAsSingleFileURL,
                endpointBatchDownload: postArchaeaTRNAsBatchDownloadURL,
                modalDetail: (record, microbe) => <TRNAModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TRNAModalDetailTitle/>,
                searchBarFields: ArchaeaTRNASearchBarConfig
            },
            'CRISPRCasSystems': {
                title: 'CRISPR/Cas System',
                columns: archaeaCRISPRCasColumns,
                filterItems: getArchaeaCRISPRCasSystemsFilterItems,
                endpointList: postArchaeaCRISPRCasSystemsURL,
                endpointFilter: getArchaeaCRISPRCasSystemsFilterOptionsURL,
                endpointSingleDownload: getArchaeaCRISPRCasSystemsSingleFileURL,
                endpointBatchDownload: postArchaeaCRISPRCasSystemsBatchDownloadURL,
                modalDetail: (record, microbe) => <CRISPRCasSystemModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <CRISPRCasSystemModalDetailTitle/>,
                searchBarFields: ArchaeaCRISPRSearchBarConfig
            },
            'antiCRISPRProteins': {
                title: 'Anti-CRISPR Protein',
                columns: archaeaAntiCRISPRAnnotationColumns,
                filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
                endpointList: postArchaeaAntiCRISPRAnnotationsURL,
                endpointFilter: getArchaeaAntiCRISPRAnnotationsFilterOptionsURL,
                endpointSingleDownload: getArchaeaAntiCRISPRAnnotationsSingleFileURL,
                endpointBatchDownload: postArchaeaAntiCRISPRAnnotationsBatchDownloadURL,
                modalDetail: (record, microbe) => <AntiCRISPRAnnotationModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntiCRISPRAnnotationModalDetailTitle/>,
                searchBarFields: ArchaeaAntiCRISPRSearchBarConfig
            },
            'secondaryMetabolites': {
                title: 'Secondary Metabolite',
                columns: archaeaSecondaryMetaboliteColumns,
                filterItems: getArchaeaSecondaryMetabolitesFilterItems,
                endpointList: postArchaeaSecondaryMetabolitesURL,
                endpointFilter: getArchaeaSecondaryMetabolitesFilterOptionsURL,
                endpointSingleDownload: getArchaeaSecondaryMetabolitesSingleFileURL,
                endpointBatchDownload: postArchaeaSecondaryMetabolitesBatchDownloadURL,
                modalDetail: (record, microbe) => <SecondaryMetabolitesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SecondaryMetabolitesModalDetailTitle/>,
                searchBarFields: ArchaeaSecondaryMetabolitesSearchBarConfig
            },
            'signalPeptides': {
                title: 'Signal Peptide',
                columns: archaeaSignalPeptideColumns,
                filterItems: getArchaeaSignalPeptidesFilterItems,
                endpointList: postArchaeaSignalPeptidesURL,
                endpointFilter: getArchaeaSignalPeptidesFilterOptionsURL,
                endpointSingleDownload: getArchaeaSignalPeptidesSingleFileURL,
                endpointBatchDownload: postArchaeaSignalPeptidesBatchDownloadURL,
                modalDetail: (record, microbe) => <SignalPeptideModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SignalPeptideModalDetailTitle/>,
                searchBarFields: ArchaeaSignalPeptideSearchBarConfig
            },
            'virulenceFactors': {
                title: 'Virulence Factor',
                columns: archaeaVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postArchaeaVirulenceFactorsURL,
                endpointFilter: getArchaeaVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getArchaeaVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postArchaeaVirulenceFactorsBatchDownloadURL,
                modalDetail: (record, microbe) => <VirulenceFactorModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>,
                searchBarFields: ArchaeaVirulenceFactorSearchBarConfig
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Gene',
                columns: archaeaAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postArchaeaAntibioticResistancesURL,
                endpointFilter: getArchaeaAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getArchaeaAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postArchaeaAntibioticResistancesBatchDownloadURL,
                modalDetail: (record, microbe) => <AntibioticResistanceGeneModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>,
                searchBarFields: ArchaeaAntibioticResistanceSearchBarConfig
            },
            'transmembraneHelices': {
                title: 'Transmembrane Protein',
                columns: archaeaTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postArchaeaTransmembraneHelicesURL,
                endpointFilter: getArchaeaTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getArchaeaTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postArchaeaTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record, microbe) => <TransmembraneHelicesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: ArchaeaTransmembraneHelicesSearchBarConfig
            }
        },
        'unMAG': {
            'genomes': {
                title: 'Genome',
                columns: archaeaTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postUnMAGArchaeaGenomesURL,
                endpointFilter: getUnMAGArchaeaGenomesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaGenomesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaGenomesBatchDownloadURL,
                modalDetail: (record) => JSON.stringify(record, null, 2),
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: ArchaeaGenomeSearchBarConfig
            },
            'proteins': {
                title: 'Protein',
                columns: archaeaProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postUnMAGArchaeaProteinsURL,
                endpointFilter: getUnMAGArchaeaProteinsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaProteinsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaProteinsBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: ArchaeaProteinSearchBarConfig
            },
            'tRNAs': {
                title: 'tRNA & tmRNA',
                columns: archaeaTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postUnMAGArchaeaTRNAsURL,
                endpointFilter: getUnMAGArchaeaTRNAsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaTRNAsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaTRNAsBatchDownloadURL,
                modalDetail: (record, microbe) => <TRNAModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TRNAModalDetailTitle/>,
                searchBarFields: ArchaeaTRNASearchBarConfig
            },
            'CRISPRCasSystems': {
                title: 'CRISPR/Cas System',
                columns: archaeaCRISPRCasColumns,
                filterItems: getArchaeaCRISPRCasSystemsFilterItems,
                endpointList: postUnMAGArchaeaCRISPRCasSystemsURL,
                endpointFilter: getUnMAGArchaeaCRISPRCasSystemsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaCRISPRCasSystemsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaCRISPRCasSystemsBatchDownloadURL,
                modalDetail: (record, microbe) => <CRISPRCasSystemModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <CRISPRCasSystemModalDetailTitle/>,
                searchBarFields: ArchaeaCRISPRSearchBarConfig
            },
            'antiCRISPRProteins': {
                title: 'Anti-CRISPR Protein',
                columns: archaeaAntiCRISPRAnnotationColumns,
                filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
                endpointList: postUnMAGArchaeaAntiCRISPRAnnotationsURL,
                endpointFilter: getUnMAGArchaeaAntiCRISPRAnnotationsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaAntiCRISPRAnnotationsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaAntiCRISPRAnnotationsBatchDownloadURL,
                modalDetail: (record, microbe) => <AntiCRISPRAnnotationModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntiCRISPRAnnotationModalDetailTitle/>,
                searchBarFields: ArchaeaAntiCRISPRSearchBarConfig
            },
            'secondaryMetabolites': {
                title: 'Secondary Metabolite',
                columns: archaeaSecondaryMetaboliteColumns,
                filterItems: getArchaeaSecondaryMetabolitesFilterItems,
                endpointList: postUnMAGArchaeaSecondaryMetabolitesURL,
                endpointFilter: getUnMAGArchaeaSecondaryMetabolitesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaSecondaryMetabolitesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaSecondaryMetabolitesBatchDownloadURL,
                modalDetail: (record, microbe) => <SecondaryMetabolitesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SecondaryMetabolitesModalDetailTitle/>,
                searchBarFields: ArchaeaSecondaryMetabolitesSearchBarConfig
            },
            'signalPeptides': {
                title: 'Signal Peptide',
                columns: archaeaSignalPeptideColumns,
                filterItems: getArchaeaSignalPeptidesFilterItems,
                endpointList: postUnMAGArchaeaSignalPeptidesURL,
                endpointFilter: getUnMAGArchaeaSignalPeptidesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaSignalPeptidesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaSignalPeptidesBatchDownloadURL,
                modalDetail: (record, microbe) => <SignalPeptideModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SignalPeptideModalDetailTitle/>,
                searchBarFields: ArchaeaSignalPeptideSearchBarConfig
            },
            'virulenceFactors': {
                title: 'Virulence Factor',
                columns: archaeaVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postUnMAGArchaeaVirulenceFactorsURL,
                endpointFilter: getUnMAGArchaeaVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaVirulenceFactorsBatchDownloadURL,
                modalDetail: (record, microbe) => <VirulenceFactorModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>,
                searchBarFields: ArchaeaVirulenceFactorSearchBarConfig
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Gene',
                columns: archaeaAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postUnMAGArchaeaAntibioticResistancesURL,
                endpointFilter: getUnMAGArchaeaAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaAntibioticResistancesBatchDownloadURL,
                modalDetail: (record, microbe) => <AntibioticResistanceGeneModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>,
                searchBarFields: ArchaeaAntibioticResistanceSearchBarConfig
            },
            'transmembraneHelices': {
                title: 'Transmembrane Protein',
                columns: archaeaTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postUnMAGArchaeaTransmembraneHelicesURL,
                endpointFilter: getUnMAGArchaeaTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getUnMAGArchaeaTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postUnMAGArchaeaTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record, microbe) => <TransmembraneHelicesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: ArchaeaTransmembraneHelicesSearchBarConfig,
            }
        }
    },
}
