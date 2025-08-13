import {
    getArchaeaAntibioticResistancesFilterItems,
    getArchaeaAntiCRISPRAnnotationsFilterItems,
    getArchaeaCRISPRCasSystemsFilterItems, getArchaeaFilterItems,
    getArchaeaProteinsFilterItems,
    getArchaeaTransmembraneHelicesFilterItems,
    getArchaeaTRNAsFilterItems,
    getArchaeaVirulenceFactorsFilterItems
} from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterItems"
import {

    postUnMAGVirusesAntibioticResistancesBatchDownloadURL,
    postUnMAGVirusesAntibioticResistancesURL,
    postUnMAGVirusesAntiCRISPRAnnotationsBatchDownloadURL,
    postUnMAGVirusesAntiCRISPRAnnotationsURL,
    postUnMAGVirusesCRISPRCasSystemsBatchDownloadURL,
    postUnMAGVirusesCRISPRCasSystemsURL, postUnMAGVirusesGenomesBatchDownloadURL, postUnMAGVirusesGenomesURL,
    postUnMAGVirusesProteinsBatchDownloadURL,
    postUnMAGVirusesProteinsURL,
    postUnMAGVirusesTransmembraneHelicesBatchDownloadURL,
    postUnMAGVirusesTransmembraneHelicesURL,
    postUnMAGVirusesTRNAsBatchDownloadURL,
    postUnMAGVirusesTRNAsURL,
    postUnMAGVirusesVirulenceFactorsBatchDownloadURL,
    postUnMAGVirusesVirulenceFactorsURL,
    postVirusesAntibioticResistancesBatchDownloadURL,
    postVirusesAntibioticResistancesURL,
    postVirusesAntiCRISPRAnnotationsBatchDownloadURL,
    postVirusesAntiCRISPRAnnotationsURL,
    postVirusesCRISPRCasSystemsBatchDownloadURL,
    postVirusesCRISPRCasSystemsURL, postVirusesGenomesBatchDownloadURL, postVirusesGenomesURL,
    postVirusesProteinsBatchDownloadURL,
    postVirusesProteinsURL,
    postVirusesTransmembraneHelicesBatchDownloadURL,
    postVirusesTransmembraneHelicesURL,
    postVirusesTRNAsBatchDownloadURL,
    postVirusesTRNAsURL,
    postVirusesVirulenceFactorsBatchDownloadURL,
    postVirusesVirulenceFactorsURL
} from "@/dataFetch/post"
import {
    getUnMAGVirusesAntibioticResistancesFilterOptionsURL,
    getUnMAGVirusesAntibioticResistancesSingleFileURL,
    getUnMAGVirusesAntiCRISPRAnnotationsFilterOptionsURL,
    getUnMAGVirusesAntiCRISPRAnnotationsSingleFileURL,
    getUnMAGVirusesCRISPRCasSystemsFilterOptionsURL,
    getUnMAGVirusesCRISPRCasSystemsSingleFileURL,
    getUnMAGVirusesGenomesFilterOptionsURL,
    getUnMAGVirusesGenomesSingleFileURL,
    getUnMAGVirusesProteinsFilterOptionsURL,
    getUnMAGVirusesProteinsSingleFileURL,
    getUnMAGVirusesTransmembraneHelicesFilterOptionsURL,
    getUnMAGVirusesTransmembraneHelicesSingleFileURL,
    getUnMAGVirusesTRNAsFilterOptionsURL,
    getUnMAGVirusesTRNAsSingleFileURL,
    getUnMAGVirusesVirulenceFactorsFilterOptionsURL,
    getUnMAGVirusesVirulenceFactorsSingleFileURL,
    getVirusesAntibioticResistancesFilterOptionsURL,
    getVirusesAntibioticResistancesSingleFileURL,
    getVirusesAntiCRISPRAnnotationsFilterOptionsURL,
    getVirusesAntiCRISPRAnnotationsSingleFileURL,
    getVirusesCRISPRCasSystemsFilterOptionsURL,
    getVirusesCRISPRCasSystemsSingleFileURL,
    getVirusesGenomesFilterOptionsURL,
    getVirusesGenomesSingleFileURL,
    getVirusesProteinsFilterOptionsURL,
    getVirusesProteinsSingleFileURL,
    getVirusesTransmembraneHelicesFilterOptionsURL,
    getVirusesTransmembraneHelicesSingleFileURL,
    getVirusesTRNAsFilterOptionsURL,
    getVirusesTRNAsSingleFileURL,
    getVirusesVirulenceFactorsFilterOptionsURL,
    getVirusesVirulenceFactorsSingleFileURL
} from "@/dataFetch/get"
import {
    ProteinModalDetailDescriptions,
    ProteinModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/ProteinModalDetailComponents"
import {
    VirusesAntibioticResistanceSearchBarConfig,
    VirusesAntiCRISPRSearchBarConfig,
    VirusesCRISPRSearchBarConfig, VirusesGenomeSearchBarConfig,
    VirusesProteinSearchBarConfig,
    VirusesTransmembraneHelicesSearchBarConfig,
    VirusesTRNASearchBarConfig,
    VirusesVirulenceFactorSearchBarConfig
} from "@/components/pagesComponents/databasePage/databaseConfigs/searchBarConfig"
import {
    virusesAntibioticResistanceColumns,
    virusesAntiCRISPRAnnotationColumns,
    virusesCRISPRCasColumns,
    virusesProteinTableColumns, virusesTableColumns,
    virusesTransmembraneHelicesColumns,
    virusesTRNATableColumns,
    virusesVirulenceFactorColumns
} from "@/components/pagesComponents/databasePage/dataTableComponents/virusesTableColumns"
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
    VirulenceFactorModalDetailDescriptions,
    VirulenceFactorModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/VirulenceFactorModalDetailComponents"
import {
    AntibioticResistanceGeneModalDetailDescriptions,
    AntibioticResistanceGeneModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/AntibioticResistanceGeneModalDetailComponents"
import {
    TransmembraneHelicesModalDetailDescriptions,
    TransmembraneHelicesModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TransmembraneHelicesModalDetailComponents"

export const virusesConfig = {
    'viruses': {
        'MAG': {
            'genomes': {
                title: 'Genome',
                columns: virusesTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postVirusesGenomesURL,
                endpointFilter: getVirusesGenomesFilterOptionsURL,
                endpointSingleDownload: getVirusesGenomesSingleFileURL,
                endpointBatchDownload: postVirusesGenomesBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: VirusesGenomeSearchBarConfig
            },
            'proteins': {
                title: 'Protein',
                columns: virusesProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postVirusesProteinsURL,
                endpointFilter: getVirusesProteinsFilterOptionsURL,
                endpointSingleDownload: getVirusesProteinsSingleFileURL,
                endpointBatchDownload: postVirusesProteinsBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: VirusesProteinSearchBarConfig
            },
            'tRNAs': {
                title: 'tRNA & tmRNA',
                columns: virusesTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postVirusesTRNAsURL,
                endpointFilter: getVirusesTRNAsFilterOptionsURL,
                endpointSingleDownload: getVirusesTRNAsSingleFileURL,
                endpointBatchDownload: postVirusesTRNAsBatchDownloadURL,
                modalDetail: (record, microbe) => <TRNAModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TRNAModalDetailTitle/>,
                searchBarFields: VirusesTRNASearchBarConfig
            },
            'CRISPRCasSystems': {
                title: 'CRISPR/Cas System',
                columns: virusesCRISPRCasColumns,
                filterItems: getArchaeaCRISPRCasSystemsFilterItems,
                endpointList: postVirusesCRISPRCasSystemsURL,
                endpointFilter: getVirusesCRISPRCasSystemsFilterOptionsURL,
                endpointSingleDownload: getVirusesCRISPRCasSystemsSingleFileURL,
                endpointBatchDownload: postVirusesCRISPRCasSystemsBatchDownloadURL,
                modalDetail: (record, microbe) => <CRISPRCasSystemModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <CRISPRCasSystemModalDetailTitle/>,
                searchBarFields: VirusesCRISPRSearchBarConfig
            },
            'antiCRISPRProteins': {
                title: 'Anti-CRISPR Element',
                columns: virusesAntiCRISPRAnnotationColumns,
                filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
                endpointList: postVirusesAntiCRISPRAnnotationsURL,
                endpointFilter: getVirusesAntiCRISPRAnnotationsFilterOptionsURL,
                endpointSingleDownload: getVirusesAntiCRISPRAnnotationsSingleFileURL,
                endpointBatchDownload: postVirusesAntiCRISPRAnnotationsBatchDownloadURL,
                modalDetail: (record, microbe) => <AntiCRISPRAnnotationModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntiCRISPRAnnotationModalDetailTitle/>,
                searchBarFields: VirusesAntiCRISPRSearchBarConfig
            },
            'virulenceFactors': {
                title: 'Virulence Factor',
                columns: virusesVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postVirusesVirulenceFactorsURL,
                endpointFilter: getVirusesVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getVirusesVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postVirusesVirulenceFactorsBatchDownloadURL,
                modalDetail: (record, microbe) => <VirulenceFactorModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>,
                searchBarFields: VirusesVirulenceFactorSearchBarConfig
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Gene',
                columns: virusesAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postVirusesAntibioticResistancesURL,
                endpointFilter: getVirusesAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getVirusesAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postVirusesAntibioticResistancesBatchDownloadURL,
                modalDetail: (record, microbe) => <AntibioticResistanceGeneModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>,
                searchBarFields: VirusesAntibioticResistanceSearchBarConfig
            },
            'transmembraneHelices': {
                title: 'Transmembrane Protein',
                columns: virusesTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postVirusesTransmembraneHelicesURL,
                endpointFilter: getVirusesTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getVirusesTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postVirusesTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record, microbe) => <TransmembraneHelicesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: VirusesTransmembraneHelicesSearchBarConfig
            }
        },
        'unMAG': {
            'genomes': {
                title: 'Genome',
                columns: virusesTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postUnMAGVirusesGenomesURL,
                endpointFilter: getUnMAGVirusesGenomesFilterOptionsURL,
                endpointSingleDownload: getUnMAGVirusesGenomesSingleFileURL,
                endpointBatchDownload: postUnMAGVirusesGenomesBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: VirusesGenomeSearchBarConfig
            },
            'proteins': {
                title: 'Protein',
                columns: virusesProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postUnMAGVirusesProteinsURL,
                endpointFilter: getUnMAGVirusesProteinsFilterOptionsURL,
                endpointSingleDownload: getUnMAGVirusesProteinsSingleFileURL,
                endpointBatchDownload: postUnMAGVirusesProteinsBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: VirusesProteinSearchBarConfig
            },
            'tRNAs': {
                title: 'tRNA & tmRNA',
                columns: virusesTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postUnMAGVirusesTRNAsURL,
                endpointFilter: getUnMAGVirusesTRNAsFilterOptionsURL,
                endpointSingleDownload: getUnMAGVirusesTRNAsSingleFileURL,
                endpointBatchDownload: postUnMAGVirusesTRNAsBatchDownloadURL,
                modalDetail: (record, microbe) => <TRNAModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TRNAModalDetailTitle/>,
                searchBarFields: VirusesTRNASearchBarConfig
            },
            'CRISPRCasSystems': {
                title: 'CRISPR/Cas System',
                columns: virusesCRISPRCasColumns,
                filterItems: getArchaeaCRISPRCasSystemsFilterItems,
                endpointList: postUnMAGVirusesCRISPRCasSystemsURL,
                endpointFilter: getUnMAGVirusesCRISPRCasSystemsFilterOptionsURL,
                endpointSingleDownload: getUnMAGVirusesCRISPRCasSystemsSingleFileURL,
                endpointBatchDownload: postUnMAGVirusesCRISPRCasSystemsBatchDownloadURL,
                modalDetail: (record, microbe) => <CRISPRCasSystemModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <CRISPRCasSystemModalDetailTitle/>,
                searchBarFields: VirusesCRISPRSearchBarConfig
            },
            'antiCRISPRProteins': {
                title: 'Anti-CRISPR Element',
                columns: virusesAntiCRISPRAnnotationColumns,
                filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
                endpointList: postUnMAGVirusesAntiCRISPRAnnotationsURL,
                endpointFilter: getUnMAGVirusesAntiCRISPRAnnotationsFilterOptionsURL,
                endpointSingleDownload: getUnMAGVirusesAntiCRISPRAnnotationsSingleFileURL,
                endpointBatchDownload: postUnMAGVirusesAntiCRISPRAnnotationsBatchDownloadURL,
                modalDetail: (record, microbe) => <AntiCRISPRAnnotationModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntiCRISPRAnnotationModalDetailTitle/>,
                searchBarFields: VirusesAntiCRISPRSearchBarConfig
            },
            'virulenceFactors': {
                title: 'Virulence Factor',
                columns: virusesVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postUnMAGVirusesVirulenceFactorsURL,
                endpointFilter: getUnMAGVirusesVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getUnMAGVirusesVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postUnMAGVirusesVirulenceFactorsBatchDownloadURL,
                modalDetail: (record, microbe) => <VirulenceFactorModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>,
                searchBarFields: VirusesVirulenceFactorSearchBarConfig
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Gene',
                columns: virusesAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postUnMAGVirusesAntibioticResistancesURL,
                endpointFilter: getUnMAGVirusesAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getUnMAGVirusesAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postUnMAGVirusesAntibioticResistancesBatchDownloadURL,
                modalDetail: (record, microbe) => <AntibioticResistanceGeneModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>,
                searchBarFields: VirusesAntibioticResistanceSearchBarConfig
            },
            'transmembraneHelices': {
                title: 'Transmembrane Protein',
                columns: virusesTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postUnMAGVirusesTransmembraneHelicesURL,
                endpointFilter: getUnMAGVirusesTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getUnMAGVirusesTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postUnMAGVirusesTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record, microbe) => <TransmembraneHelicesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: VirusesTransmembraneHelicesSearchBarConfig,
            }
        }
    }
}
