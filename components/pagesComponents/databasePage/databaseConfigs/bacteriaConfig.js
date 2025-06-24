import {
    getArchaeaAntibioticResistancesFilterItems,
    getArchaeaAntiCRISPRAnnotationsFilterItems,
    getArchaeaCRISPRCasSystemsFilterItems, getArchaeaFilterItems,
    getArchaeaProteinsFilterItems,
    getArchaeaSecondaryMetabolitesFilterItems,
    getArchaeaSignalPeptidesFilterItems, getArchaeaTransmembraneHelicesFilterItems,
    getArchaeaTRNAsFilterItems, getArchaeaVirulenceFactorsFilterItems
} from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterItems"
import {
    postBacteriaAntibioticResistancesBatchDownloadURL,
    postBacteriaAntibioticResistancesURL,
    postBacteriaAntiCRISPRAnnotationsBatchDownloadURL,
    postBacteriaAntiCRISPRAnnotationsURL,
    postBacteriaCRISPRCasSystemsBatchDownloadURL,
    postBacteriaCRISPRCasSystemsURL, postBacteriaGenomesBatchDownloadURL, postBacteriaGenomesURL,
    postBacteriaProteinsBatchDownloadURL,
    postBacteriaProteinsURL,
    postBacteriaSecondaryMetabolitesBatchDownloadURL,
    postBacteriaSecondaryMetabolitesURL,
    postBacteriaSignalPeptidesBatchDownloadURL,
    postBacteriaSignalPeptidesURL,
    postBacteriaTransmembraneHelicesBatchDownloadURL,
    postBacteriaTransmembraneHelicesURL,
    postBacteriaTRNAsBatchDownloadURL,
    postBacteriaTRNAsURL,
    postBacteriaVirulenceFactorsBatchDownloadURL,
    postBacteriaVirulenceFactorsURL,
    postUnMAGBacteriaAntibioticResistancesBatchDownloadURL,
    postUnMAGBacteriaAntibioticResistancesURL,
    postUnMAGBacteriaAntiCRISPRAnnotationsBatchDownloadURL,
    postUnMAGBacteriaAntiCRISPRAnnotationsURL,
    postUnMAGBacteriaCRISPRCasSystemsBatchDownloadURL,
    postUnMAGBacteriaCRISPRCasSystemsURL, postUnMAGBacteriaGenomesBatchDownloadURL, postUnMAGBacteriaGenomesURL,
    postUnMAGBacteriaProteinsBatchDownloadURL,
    postUnMAGBacteriaProteinsURL,
    postUnMAGBacteriaSecondaryMetabolitesBatchDownloadURL,
    postUnMAGBacteriaSecondaryMetabolitesURL,
    postUnMAGBacteriaSignalPeptidesBatchDownloadURL,
    postUnMAGBacteriaSignalPeptidesURL,
    postUnMAGBacteriaTransmembraneHelicesBatchDownloadURL,
    postUnMAGBacteriaTransmembraneHelicesURL,
    postUnMAGBacteriaTRNAsBatchDownloadURL,
    postUnMAGBacteriaTRNAsURL,
    postUnMAGBacteriaVirulenceFactorsBatchDownloadURL,
    postUnMAGBacteriaVirulenceFactorsURL
} from "@/dataFetch/post"
import {
    getBacteriaAntibioticResistancesFilterOptionsURL,
    getBacteriaAntibioticResistancesSingleFileURL,
    getBacteriaAntiCRISPRAnnotationsFilterOptionsURL,
    getBacteriaAntiCRISPRAnnotationsSingleFileURL,
    getBacteriaCRISPRCasSystemsFilterOptionsURL,
    getBacteriaCRISPRCasSystemsSingleFileURL,
    getBacteriaGenomesFilterOptionsURL,
    getBacteriaGenomesSingleFileURL,
    getBacteriaProteinsFilterOptionsURL,
    getBacteriaProteinsSingleFileURL,
    getBacteriaSecondaryMetabolitesFilterOptionsURL,
    getBacteriaSecondaryMetabolitesSingleFileURL,
    getBacteriaSignalPeptidesFilterOptionsURL,
    getBacteriaSignalPeptidesSingleFileURL,
    getBacteriaTransmembraneHelicesFilterOptionsURL,
    getBacteriaTransmembraneHelicesSingleFileURL,
    getBacteriaTRNAsFilterOptionsURL,
    getBacteriaTRNAsSingleFileURL,
    getBacteriaVirulenceFactorsFilterOptionsURL,
    getBacteriaVirulenceFactorsSingleFileURL,
    getUnMAGBacteriaAntibioticResistancesFilterOptionsURL,
    getUnMAGBacteriaAntibioticResistancesSingleFileURL,
    getUnMAGBacteriaAntiCRISPRAnnotationsFilterOptionsURL,
    getUnMAGBacteriaAntiCRISPRAnnotationsSingleFileURL,
    getUnMAGBacteriaCRISPRCasSystemsFilterOptionsURL,
    getUnMAGBacteriaCRISPRCasSystemsSingleFileURL,
    getUnMAGBacteriaGenomesFilterOptionsURL,
    getUnMAGBacteriaGenomesSingleFileURL,
    getUnMAGBacteriaProteinsFilterOptionsURL,
    getUnMAGBacteriaProteinsSingleFileURL,
    getUnMAGBacteriaSecondaryMetabolitesFilterOptionsURL,
    getUnMAGBacteriaSecondaryMetabolitesSingleFileURL,
    getUnMAGBacteriaSignalPeptidesFilterOptionsURL,
    getUnMAGBacteriaSignalPeptidesSingleFileURL,
    getUnMAGBacteriaTransmembraneHelicesFilterOptionsURL,
    getUnMAGBacteriaTransmembraneHelicesSingleFileURL,
    getUnMAGBacteriaTRNAsFilterOptionsURL,
    getUnMAGBacteriaTRNAsSingleFileURL,
    getUnMAGBacteriaVirulenceFactorsFilterOptionsURL,
    getUnMAGBacteriaVirulenceFactorsSingleFileURL
} from "@/dataFetch/get"
import {
    ProteinModalDetailDescriptions,
    ProteinModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/ProteinModalDetailComponents"
import {
    BacteriaAntibioticResistanceSearchBarConfig,
    BacteriaAntiCRISPRSearchBarConfig,
    BacteriaCRISPRSearchBarConfig, BacteriaGenomeSearchBarConfig,
    BacteriaProteinSearchBarConfig,
    BacteriaSecondaryMetabolitesSearchBarConfig,
    BacteriaSignalPeptideSearchBarConfig,
    BacteriaTransmembraneHelicesSearchBarConfig,
    BacteriaTRNASearchBarConfig,
    BacteriaVirulenceFactorSearchBarConfig
} from "@/components/pagesComponents/databasePage/databaseConfigs/searchBarConfig"
import {
    bacteriaAntibioticResistanceColumns,
    bacteriaAntiCRISPRAnnotationColumns,
    bacteriaCRISPRCasColumns,
    bacteriaProteinTableColumns,
    bacteriaSecondaryMetaboliteColumns,
    bacteriaSignalPeptideColumns, bacteriaTableColumns, bacteriaTransmembraneHelicesColumns,
    bacteriaTRNATableColumns, bacteriaVirulenceFactorColumns
} from "@/components/pagesComponents/databasePage/dataTableComponents/bacteriaTableColumns"
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
import {
    TransmembraneHelicesModalDetailDescriptions,
    TransmembraneHelicesModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TransmembraneHelicesModalDetailComponents"

export const bacteriaConfig = {
    'bacteria': {
        'MAG': {
            'genomes': {
                title: 'Bacteria Genomes',
                columns: bacteriaTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postBacteriaGenomesURL,
                endpointFilter: getBacteriaGenomesFilterOptionsURL,
                endpointSingleDownload: getBacteriaGenomesSingleFileURL,
                endpointBatchDownload: postBacteriaGenomesBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: BacteriaGenomeSearchBarConfig
            },
            'proteins': {
                title: 'Bacteria Proteins',
                columns: bacteriaProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postBacteriaProteinsURL,
                endpointFilter: getBacteriaProteinsFilterOptionsURL,
                endpointSingleDownload: getBacteriaProteinsSingleFileURL,
                endpointBatchDownload: postBacteriaProteinsBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: BacteriaProteinSearchBarConfig
            },
            'tRNAs': {
                title: 'Bacteria tRNAs',
                columns: bacteriaTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postBacteriaTRNAsURL,
                endpointFilter: getBacteriaTRNAsFilterOptionsURL,
                endpointSingleDownload: getBacteriaTRNAsSingleFileURL,
                endpointBatchDownload: postBacteriaTRNAsBatchDownloadURL,
                modalDetail: (record, microbe) => <TRNAModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TRNAModalDetailTitle/>,
                searchBarFields: BacteriaTRNASearchBarConfig
            },
            'CRISPRCasSystems': {
                title: 'CRISPR/Cas Systems',
                columns: bacteriaCRISPRCasColumns,
                filterItems: getArchaeaCRISPRCasSystemsFilterItems,
                endpointList: postBacteriaCRISPRCasSystemsURL,
                endpointFilter: getBacteriaCRISPRCasSystemsFilterOptionsURL,
                endpointSingleDownload: getBacteriaCRISPRCasSystemsSingleFileURL,
                endpointBatchDownload: postBacteriaCRISPRCasSystemsBatchDownloadURL,
                modalDetail: (record, microbe) => <CRISPRCasSystemModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <CRISPRCasSystemModalDetailTitle/>,
                searchBarFields: BacteriaCRISPRSearchBarConfig
            },
            'antiCRISPRProteins': {
                title: 'Anti-CRISPR Proteins',
                columns: bacteriaAntiCRISPRAnnotationColumns,
                filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
                endpointList: postBacteriaAntiCRISPRAnnotationsURL,
                endpointFilter: getBacteriaAntiCRISPRAnnotationsFilterOptionsURL,
                endpointSingleDownload: getBacteriaAntiCRISPRAnnotationsSingleFileURL,
                endpointBatchDownload: postBacteriaAntiCRISPRAnnotationsBatchDownloadURL,
                modalDetail: (record, microbe) => <AntiCRISPRAnnotationModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntiCRISPRAnnotationModalDetailTitle/>,
                searchBarFields: BacteriaAntiCRISPRSearchBarConfig
            },
            'secondaryMetabolites': {
                title: 'Secondary Metabolites',
                columns: bacteriaSecondaryMetaboliteColumns,
                filterItems: getArchaeaSecondaryMetabolitesFilterItems,
                endpointList: postBacteriaSecondaryMetabolitesURL,
                endpointFilter: getBacteriaSecondaryMetabolitesFilterOptionsURL,
                endpointSingleDownload: getBacteriaSecondaryMetabolitesSingleFileURL,
                endpointBatchDownload: postBacteriaSecondaryMetabolitesBatchDownloadURL,
                modalDetail: (record, microbe) => <SecondaryMetabolitesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SecondaryMetabolitesModalDetailTitle/>,
                searchBarFields: BacteriaSecondaryMetabolitesSearchBarConfig
            },
            'signalPeptides': {
                title: 'Signal Peptides',
                columns: bacteriaSignalPeptideColumns,
                filterItems: getArchaeaSignalPeptidesFilterItems,
                endpointList: postBacteriaSignalPeptidesURL,
                endpointFilter: getBacteriaSignalPeptidesFilterOptionsURL,
                endpointSingleDownload: getBacteriaSignalPeptidesSingleFileURL,
                endpointBatchDownload: postBacteriaSignalPeptidesBatchDownloadURL,
                modalDetail: (record, microbe) => <SignalPeptideModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SignalPeptideModalDetailTitle/>,
                searchBarFields: BacteriaSignalPeptideSearchBarConfig
            },
            'virulenceFactors': {
                title: 'Virulence Factors',
                columns: bacteriaVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postBacteriaVirulenceFactorsURL,
                endpointFilter: getBacteriaVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getBacteriaVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postBacteriaVirulenceFactorsBatchDownloadURL,
                modalDetail: (record, microbe) => <VirulenceFactorModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>,
                searchBarFields: BacteriaVirulenceFactorSearchBarConfig
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Genes',
                columns: bacteriaAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postBacteriaAntibioticResistancesURL,
                endpointFilter: getBacteriaAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getBacteriaAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postBacteriaAntibioticResistancesBatchDownloadURL,
                modalDetail: (record, microbe) => <AntibioticResistanceGeneModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>,
                searchBarFields: BacteriaAntibioticResistanceSearchBarConfig
            },
            'transmembraneHelices': {
                title: 'Transmembrane Helices',
                columns: bacteriaTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postBacteriaTransmembraneHelicesURL,
                endpointFilter: getBacteriaTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getBacteriaTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postBacteriaTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record, microbe) => <TransmembraneHelicesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: BacteriaTransmembraneHelicesSearchBarConfig
            }
        },
        'unMAG': {
            'genomes': {
                title: 'Bacteria Genomes',
                columns: bacteriaTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postUnMAGBacteriaGenomesURL,
                endpointFilter: getUnMAGBacteriaGenomesFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaGenomesSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaGenomesBatchDownloadURL,
                modalDetail: (record) => JSON.stringify(record, null, 2),
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: BacteriaGenomeSearchBarConfig
            },
            'proteins': {
                title: 'Bacteria Proteins',
                columns: bacteriaProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postUnMAGBacteriaProteinsURL,
                endpointFilter: getUnMAGBacteriaProteinsFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaProteinsSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaProteinsBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: BacteriaProteinSearchBarConfig
            },
            'tRNAs': {
                title: 'Bacteria tRNAs',
                columns: bacteriaTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postUnMAGBacteriaTRNAsURL,
                endpointFilter: getUnMAGBacteriaTRNAsFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaTRNAsSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaTRNAsBatchDownloadURL,
                modalDetail: (record, microbe) => <TRNAModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TRNAModalDetailTitle/>,
                searchBarFields: BacteriaTRNASearchBarConfig
            },
            'CRISPRCasSystems': {
                title: 'CRISPR/Cas Systems',
                columns: bacteriaCRISPRCasColumns,
                filterItems: getArchaeaCRISPRCasSystemsFilterItems,
                endpointList: postUnMAGBacteriaCRISPRCasSystemsURL,
                endpointFilter: getUnMAGBacteriaCRISPRCasSystemsFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaCRISPRCasSystemsSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaCRISPRCasSystemsBatchDownloadURL,
                modalDetail: (record, microbe) => <CRISPRCasSystemModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <CRISPRCasSystemModalDetailTitle/>,
                searchBarFields: BacteriaCRISPRSearchBarConfig
            },
            'antiCRISPRProteins': {
                title: 'Anti-CRISPR Proteins',
                columns: bacteriaAntiCRISPRAnnotationColumns,
                filterItems: getArchaeaAntiCRISPRAnnotationsFilterItems,
                endpointList: postUnMAGBacteriaAntiCRISPRAnnotationsURL,
                endpointFilter: getUnMAGBacteriaAntiCRISPRAnnotationsFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaAntiCRISPRAnnotationsSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaAntiCRISPRAnnotationsBatchDownloadURL,
                modalDetail: (record, microbe) => <AntiCRISPRAnnotationModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntiCRISPRAnnotationModalDetailTitle/>,
                searchBarFields: BacteriaAntiCRISPRSearchBarConfig
            },
            'secondaryMetabolites': {
                title: 'Secondary Metabolites',
                columns: bacteriaSecondaryMetaboliteColumns,
                filterItems: getArchaeaSecondaryMetabolitesFilterItems,
                endpointList: postUnMAGBacteriaSecondaryMetabolitesURL,
                endpointFilter: getUnMAGBacteriaSecondaryMetabolitesFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaSecondaryMetabolitesSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaSecondaryMetabolitesBatchDownloadURL,
                modalDetail: (record, microbe) => <SecondaryMetabolitesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SecondaryMetabolitesModalDetailTitle/>,
                searchBarFields: BacteriaSecondaryMetabolitesSearchBarConfig
            },
            'signalPeptides': {
                title: 'Signal Peptides',
                columns: bacteriaSignalPeptideColumns,
                filterItems: getArchaeaSignalPeptidesFilterItems,
                endpointList: postUnMAGBacteriaSignalPeptidesURL,
                endpointFilter: getUnMAGBacteriaSignalPeptidesFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaSignalPeptidesSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaSignalPeptidesBatchDownloadURL,
                modalDetail: (record, microbe) => <SignalPeptideModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SignalPeptideModalDetailTitle/>,
                searchBarFields: BacteriaSignalPeptideSearchBarConfig
            },
            'virulenceFactors': {
                title: 'Virulence Factors',
                columns: bacteriaVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postUnMAGBacteriaVirulenceFactorsURL,
                endpointFilter: getUnMAGBacteriaVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaVirulenceFactorsBatchDownloadURL,
                modalDetail: (record, microbe) => <VirulenceFactorModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>,
                searchBarFields: BacteriaVirulenceFactorSearchBarConfig
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Genes',
                columns: bacteriaAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postUnMAGBacteriaAntibioticResistancesURL,
                endpointFilter: getUnMAGBacteriaAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaAntibioticResistancesBatchDownloadURL,
                modalDetail: (record, microbe) => <AntibioticResistanceGeneModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>,
                searchBarFields: BacteriaAntibioticResistanceSearchBarConfig
            },
            'transmembraneHelices': {
                title: 'Transmembrane Helices',
                columns: bacteriaTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postUnMAGBacteriaTransmembraneHelicesURL,
                endpointFilter: getUnMAGBacteriaTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getUnMAGBacteriaTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postUnMAGBacteriaTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record, microbe) => <TransmembraneHelicesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: BacteriaTransmembraneHelicesSearchBarConfig,
            }
        }
    }
}
