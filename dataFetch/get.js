import axios from "axios"

export const fetcher = async url => {
    const res = await axios.get(url, {timeout: 60000});
    return res.data;
}

export const downloadSingleFile = (fileUrl) => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.click()
}

const apiPrefix = process.env.NEXT_PUBLIC_API_URL

// Microbe URLs
export const getMicrobeStatisticsURL = `${apiPrefix}/microbe/microbe_statistics`

// Archaea Genomes URLs
export const getArchaeaGenomesFilterOptionsURL = `${apiPrefix}/archaea/genomes_filter_options`
export const getArchaeaGenomesSingleFileURL = `${apiPrefix}/archaea/genome_single_download`

// Archaea Proteins URLs
export const getArchaeaProteinsFilterOptionsURL = `${apiPrefix}/archaea/proteins_filter_options`
export const getArchaeaProteinsSingleFileURL = `${apiPrefix}/archaea/protein_single_download`

// Archaea tRNAs URLs
export const getArchaeaTRNAsFilterOptionsURL = `${apiPrefix}/archaea/tRNAs_filter_options`
export const getArchaeaTRNAsSingleFileURL = `${apiPrefix}/archaea/tRNA_single_download`

// Archaea CRISPR/Cas Systems URLs
export const getArchaeaCRISPRCasSystemsFilterOptionsURL = `${apiPrefix}/archaea/CRISPR_Cas_systems_filter_options`
export const getArchaeaCRISPRCasSystemsSingleFileURL = `${apiPrefix}/archaea/CRISPR_Cas_system_single_download`

// Archaea Anti-CRISPR Annotations URLs
export const getArchaeaAntiCRISPRAnnotationsFilterOptionsURL = `${apiPrefix}/archaea/anti_crispr_annotations_filter_options`
export const getArchaeaAntiCRISPRAnnotationsSingleFileURL = `${apiPrefix}/archaea/anti_crispr_annotation_single_download`

// Archaea Secondary Metabolites URLs
export const getArchaeaSecondaryMetabolitesFilterOptionsURL = `${apiPrefix}/archaea/secondary_metabolites_filter_options`
export const getArchaeaSecondaryMetabolitesSingleFileURL = `${apiPrefix}/archaea/secondary_metabolite_single_download`

// Archaea Signal Peptides URLs
export const getArchaeaSignalPeptidesFilterOptionsURL = `${apiPrefix}/archaea/signal_peptides_filter_options`
export const getArchaeaSignalPeptidesSingleFileURL = `${apiPrefix}/archaea/signal_peptide_single_download`

// Archaea Virulence Factors URLs
export const getArchaeaVirulenceFactorsFilterOptionsURL = `${apiPrefix}/archaea/virulence_factors_filter_options`
export const getArchaeaVirulenceFactorsSingleFileURL = `${apiPrefix}/archaea/virulence_factor_single_download`

// Archaea Antibiotic Resistances URLs
export const getArchaeaAntibioticResistancesFilterOptionsURL = `${apiPrefix}/archaea/antibiotic_resistances_filter_options`
export const getArchaeaAntibioticResistancesSingleFileURL = `${apiPrefix}/archaea/antibiotic_resistance_single_download`

// Archaea Transmembrane Helices URLs
export const getArchaeaTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/archaea/transmembrane_helices_filter_options`
export const getArchaeaTransmembraneHelicesSingleFileURL = `${apiPrefix}/archaea/transmembrane_helice_single_download`
