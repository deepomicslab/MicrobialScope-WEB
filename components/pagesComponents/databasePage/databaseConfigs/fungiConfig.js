import {
    getArchaeaAntibioticResistancesFilterItems, getArchaeaFilterItems,
    getArchaeaProteinsFilterItems,
    getArchaeaSecondaryMetabolitesFilterItems,
    getArchaeaSignalPeptidesFilterItems, getArchaeaTransmembraneHelicesFilterItems,
    getArchaeaTRNAsFilterItems, getArchaeaVirulenceFactorsFilterItems
} from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterItems"
import {
    postFungiAntibioticResistancesBatchDownloadURL,
    postFungiGenomesBatchDownloadURL,
    postFungiGenomesURL,
    postFungiProteinsBatchDownloadURL,
    postFungiProteinsURL,
    postFungiSecondaryMetabolitesBatchDownloadURL,
    postFungiSecondaryMetabolitesURL,
    postFungiSignalPeptidesBatchDownloadURL,
    postFungiSignalPeptidesURL,
    postFungiTransmembraneHelicesBatchDownloadURL,
    postFungiTransmembraneHelicesURL,
    postFungiTRNAsBatchDownloadURL,
    postFungiTRNAsURL,
    postFungiVirulenceFactorsBatchDownloadURL,
    postFungiVirulenceFactorsURL,
    postUniversalAntibioticResistancesURL,
    postUnMAGFungiAntibioticResistancesBatchDownloadURL,
    postUnMAGFungiGenomesBatchDownloadURL,
    postUnMAGFungiGenomesURL,
    postUnMAGFungiProteinsBatchDownloadURL,
    postUnMAGFungiProteinsURL,
    postUnMAGFungiSecondaryMetabolitesBatchDownloadURL,
    postUnMAGFungiSecondaryMetabolitesURL,
    postUnMAGFungiSignalPeptidesBatchDownloadURL,
    postUnMAGFungiSignalPeptidesURL,
    postUnMAGFungiTransmembraneHelicesBatchDownloadURL,
    postUnMAGFungiTransmembraneHelicesURL,
    postUnMAGFungiTRNAsBatchDownloadURL,
    postUnMAGFungiTRNAsURL,
    postUnMAGFungiVirulenceFactorsBatchDownloadURL,
    postUnMAGFungiVirulenceFactorsURL
} from "@/dataFetch/post"
import {
    getFungiAntibioticResistancesFilterOptionsURL,
    getFungiAntibioticResistancesSingleFileURL, getFungiGenomesFilterOptionsURL, getFungiGenomesSingleFileURL,
    getFungiProteinsFilterOptionsURL,
    getFungiProteinsSingleFileURL,
    getFungiSecondaryMetabolitesFilterOptionsURL,
    getFungiSecondaryMetabolitesSingleFileURL,
    getFungiSignalPeptidesFilterOptionsURL,
    getFungiSignalPeptidesSingleFileURL,
    getFungiTransmembraneHelicesFilterOptionsURL,
    getFungiTransmembraneHelicesSingleFileURL,
    getFungiTRNAsFilterOptionsURL,
    getFungiTRNAsSingleFileURL,
    getFungiVirulenceFactorsFilterOptionsURL,
    getFungiVirulenceFactorsSingleFileURL,
    getUnMAGFungiAntibioticResistancesFilterOptionsURL,
    getUnMAGFungiAntibioticResistancesSingleFileURL,
    getUnMAGFungiGenomesFilterOptionsURL,
    getUnMAGFungiGenomesSingleFileURL,
    getUnMAGFungiProteinsFilterOptionsURL,
    getUnMAGFungiProteinsSingleFileURL,
    getUnMAGFungiSecondaryMetabolitesFilterOptionsURL,
    getUnMAGFungiSecondaryMetabolitesSingleFileURL,
    getUnMAGFungiSignalPeptidesFilterOptionsURL,
    getUnMAGFungiSignalPeptidesSingleFileURL,
    getUnMAGFungiTransmembraneHelicesFilterOptionsURL,
    getUnMAGFungiTransmembraneHelicesSingleFileURL,
    getUnMAGFungiTRNAsFilterOptionsURL,
    getUnMAGFungiTRNAsSingleFileURL,
    getUnMAGFungiVirulenceFactorsFilterOptionsURL,
    getUnMAGFungiVirulenceFactorsSingleFileURL
} from "@/dataFetch/get"
import {
    ProteinModalDetailDescriptions,
    ProteinModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/ProteinModalDetailComponents"
import {
    FungiAntibioticResistanceSearchBarConfig, FungiGenomeSearchBarConfig, FungiProteinSearchBarConfig,
    FungiSecondaryMetabolitesSearchBarConfig,
    FungiSignalPeptideSearchBarConfig,
    FungiTransmembraneHelicesSearchBarConfig, FungiTRNASearchBarConfig,
    FungiVirulenceFactorSearchBarConfig
} from "@/components/pagesComponents/databasePage/databaseConfigs/searchBarConfig"
import {
    fungiAntibioticResistanceColumns,
    fungiProteinTableColumns,
    fungiSecondaryMetaboliteColumns,
    fungiSignalPeptideColumns, fungiTableColumns, fungiTransmembraneHelicesColumns,
    fungiTRNATableColumns,
    fungiVirulenceFactorColumns
} from "@/components/pagesComponents/databasePage/dataTableComponents/fungiTableColumns"
import {
    TRNAModalDetailDescriptions,
    TRNAModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TRNAModalDetailDescriptionsComponents"
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

export const fungiConfig = {
    'fungi': {
        'MAG': {
            'genomes': {
                title: 'Genome',
                columns: fungiTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postFungiGenomesURL,
                endpointFilter: getFungiGenomesFilterOptionsURL,
                endpointSingleDownload: getFungiGenomesSingleFileURL,
                endpointBatchDownload: postFungiGenomesBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: FungiGenomeSearchBarConfig
            },
            'proteins': {
                title: 'Protein',
                columns: fungiProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postFungiProteinsURL,
                endpointFilter: getFungiProteinsFilterOptionsURL,
                endpointSingleDownload: getFungiProteinsSingleFileURL,
                endpointBatchDownload: postFungiProteinsBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: FungiProteinSearchBarConfig
            },
            'tRNAs': {
                title: 'tRNA & tmRNA',
                columns: fungiTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postFungiTRNAsURL,
                endpointFilter: getFungiTRNAsFilterOptionsURL,
                endpointSingleDownload: getFungiTRNAsSingleFileURL,
                endpointBatchDownload: postFungiTRNAsBatchDownloadURL,
                modalDetail: (record, microbe) => <TRNAModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TRNAModalDetailTitle/>,
                searchBarFields: FungiTRNASearchBarConfig
            },
            'secondaryMetabolites': {
                title: 'Secondary Metabolite Biosynthetic Cluster',
                columns: fungiSecondaryMetaboliteColumns,
                filterItems: getArchaeaSecondaryMetabolitesFilterItems,
                endpointList: postFungiSecondaryMetabolitesURL,
                endpointFilter: getFungiSecondaryMetabolitesFilterOptionsURL,
                endpointSingleDownload: getFungiSecondaryMetabolitesSingleFileURL,
                endpointBatchDownload: postFungiSecondaryMetabolitesBatchDownloadURL,
                modalDetail: (record, microbe) => <SecondaryMetabolitesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SecondaryMetabolitesModalDetailTitle/>,
                searchBarFields: FungiSecondaryMetabolitesSearchBarConfig
            },
            'signalPeptides': {
                title: 'Signal Peptide',
                columns: fungiSignalPeptideColumns,
                filterItems: getArchaeaSignalPeptidesFilterItems,
                endpointList: postFungiSignalPeptidesURL,
                endpointFilter: getFungiSignalPeptidesFilterOptionsURL,
                endpointSingleDownload: getFungiSignalPeptidesSingleFileURL,
                endpointBatchDownload: postFungiSignalPeptidesBatchDownloadURL,
                modalDetail: (record, microbe) => <SignalPeptideModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SignalPeptideModalDetailTitle/>,
                searchBarFields: FungiSignalPeptideSearchBarConfig
            },
            'virulenceFactors': {
                title: 'Virulence Factor',
                columns: fungiVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postFungiVirulenceFactorsURL,
                endpointFilter: getFungiVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getFungiVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postFungiVirulenceFactorsBatchDownloadURL,
                modalDetail: (record, microbe) => <VirulenceFactorModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>,
                searchBarFields: FungiVirulenceFactorSearchBarConfig
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Gene',
                columns: fungiAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postUniversalAntibioticResistancesURL,
                endpointFilter: getFungiAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getFungiAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postFungiAntibioticResistancesBatchDownloadURL,
                modalDetail: (record, microbe) => <AntibioticResistanceGeneModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>,
                searchBarFields: FungiAntibioticResistanceSearchBarConfig
            },
            'transmembraneHelices': {
                title: 'Transmembrane Protein',
                columns: fungiTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postFungiTransmembraneHelicesURL,
                endpointFilter: getFungiTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getFungiTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postFungiTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record, microbe) => <TransmembraneHelicesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: FungiTransmembraneHelicesSearchBarConfig
            }
        },
        'unMAG': {
            'genomes': {
                title: 'Genome',
                columns: fungiTableColumns,
                filterItems: getArchaeaFilterItems,
                endpointList: postUnMAGFungiGenomesURL,
                endpointFilter: getUnMAGFungiGenomesFilterOptionsURL,
                endpointSingleDownload: getUnMAGFungiGenomesSingleFileURL,
                endpointBatchDownload: postUnMAGFungiGenomesBatchDownloadURL,
                modalDetail: (record) => JSON.stringify(record, null, 2),
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: FungiGenomeSearchBarConfig
            },
            'proteins': {
                title: 'Protein',
                columns: fungiProteinTableColumns,
                filterItems: getArchaeaProteinsFilterItems,
                endpointList: postUnMAGFungiProteinsURL,
                endpointFilter: getUnMAGFungiProteinsFilterOptionsURL,
                endpointSingleDownload: getUnMAGFungiProteinsSingleFileURL,
                endpointBatchDownload: postUnMAGFungiProteinsBatchDownloadURL,
                modalDetail: (record, microbe) => <ProteinModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <ProteinModalDetailTitle/>,
                searchBarFields: FungiProteinSearchBarConfig
            },
            'tRNAs': {
                title: 'tRNA & tmRNA',
                columns: fungiTRNATableColumns,
                filterItems: getArchaeaTRNAsFilterItems,
                endpointList: postUnMAGFungiTRNAsURL,
                endpointFilter: getUnMAGFungiTRNAsFilterOptionsURL,
                endpointSingleDownload: getUnMAGFungiTRNAsSingleFileURL,
                endpointBatchDownload: postUnMAGFungiTRNAsBatchDownloadURL,
                modalDetail: (record, microbe) => <TRNAModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TRNAModalDetailTitle/>,
                searchBarFields: FungiTRNASearchBarConfig
            },
            'secondaryMetabolites': {
                title: 'Secondary Metabolite Biosynthetic Cluster',
                columns: fungiSecondaryMetaboliteColumns,
                filterItems: getArchaeaSecondaryMetabolitesFilterItems,
                endpointList: postUnMAGFungiSecondaryMetabolitesURL,
                endpointFilter: getUnMAGFungiSecondaryMetabolitesFilterOptionsURL,
                endpointSingleDownload: getUnMAGFungiSecondaryMetabolitesSingleFileURL,
                endpointBatchDownload: postUnMAGFungiSecondaryMetabolitesBatchDownloadURL,
                modalDetail: (record, microbe) => <SecondaryMetabolitesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SecondaryMetabolitesModalDetailTitle/>,
                searchBarFields: FungiSecondaryMetabolitesSearchBarConfig
            },
            'signalPeptides': {
                title: 'Signal Peptide',
                columns: fungiSignalPeptideColumns,
                filterItems: getArchaeaSignalPeptidesFilterItems,
                endpointList: postUnMAGFungiSignalPeptidesURL,
                endpointFilter: getUnMAGFungiSignalPeptidesFilterOptionsURL,
                endpointSingleDownload: getUnMAGFungiSignalPeptidesSingleFileURL,
                endpointBatchDownload: postUnMAGFungiSignalPeptidesBatchDownloadURL,
                modalDetail: (record, microbe) => <SignalPeptideModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <SignalPeptideModalDetailTitle/>,
                searchBarFields: FungiSignalPeptideSearchBarConfig
            },
            'virulenceFactors': {
                title: 'Virulence Factor',
                columns: fungiVirulenceFactorColumns,
                filterItems: getArchaeaVirulenceFactorsFilterItems,
                endpointList: postUnMAGFungiVirulenceFactorsURL,
                endpointFilter: getUnMAGFungiVirulenceFactorsFilterOptionsURL,
                endpointSingleDownload: getUnMAGFungiVirulenceFactorsSingleFileURL,
                endpointBatchDownload: postUnMAGFungiVirulenceFactorsBatchDownloadURL,
                modalDetail: (record, microbe) => <VirulenceFactorModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <VirulenceFactorModalDetailTitle/>,
                searchBarFields: FungiVirulenceFactorSearchBarConfig
            },
            'antibioticResistanceGenes': {
                title: 'Antibiotic Resistance Gene',
                columns: fungiAntibioticResistanceColumns,
                filterItems: getArchaeaAntibioticResistancesFilterItems,
                endpointList: postUniversalAntibioticResistancesURL,
                endpointFilter: getUnMAGFungiAntibioticResistancesFilterOptionsURL,
                endpointSingleDownload: getUnMAGFungiAntibioticResistancesSingleFileURL,
                endpointBatchDownload: postUnMAGFungiAntibioticResistancesBatchDownloadURL,
                modalDetail: (record, microbe) => <AntibioticResistanceGeneModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <AntibioticResistanceGeneModalDetailTitle/>,
                searchBarFields: FungiAntibioticResistanceSearchBarConfig
            },
            'transmembraneHelices': {
                title: 'Transmembrane Protein',
                columns: fungiTransmembraneHelicesColumns,
                filterItems: getArchaeaTransmembraneHelicesFilterItems,
                endpointList: postUnMAGFungiTransmembraneHelicesURL,
                endpointFilter: getUnMAGFungiTransmembraneHelicesFilterOptionsURL,
                endpointSingleDownload: getUnMAGFungiTransmembraneHelicesSingleFileURL,
                endpointBatchDownload: postUnMAGFungiTransmembraneHelicesBatchDownloadURL,
                modalDetail: (record, microbe) => <TransmembraneHelicesModalDetailDescriptions record={record} microbe={microbe}/>,
                modalTitle: <TransmembraneHelicesModalDetailTitle/>,
                searchBarFields: FungiTransmembraneHelicesSearchBarConfig,
            }
        }
    }
}
