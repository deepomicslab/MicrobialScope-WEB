import axios from "axios"
import { postUnMAGArchaeaAntiCRISPRAnnotationsURL } from "@/dataFetch/post"

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
export const getProteinCIFURL = `${apiPrefix}/microbe/protein_cif`

// Archaea Genomes URLs
export const getArchaeaGenomesFilterOptionsURL = `${apiPrefix}/archaea/genomes_filter_options`
export const getUnMAGArchaeaGenomesFilterOptionsURL = `${apiPrefix}/archaea/genomes_filter_options_unmag`
export const getArchaeaGenomesSingleFileURL = `${apiPrefix}/archaea/genome_single_download`
export const getUnMAGArchaeaGenomesSingleFileURL = `${apiPrefix}/archaea/genome_single_download_unmag`

// Archaea Genome Detail URLs
export const getArchaeaGenomeDetailURL = `${apiPrefix}/archaea/genome_detail`
export const getUnMAGArchaeaGenomeDetailURL = `${apiPrefix}/archaea/genome_detail_unmag`
export const getArchaeaGenomeFASTAURL = `${apiPrefix}/archaea/genome_fasta`
export const getUnMAGArchaeaGenomeFASTAURL = `${apiPrefix}/archaea/genome_fasta_unmag`
export const getArchaeaGenomeProteinsURL = `${apiPrefix}/archaea/genome_detail_proteins`
export const getUnMAGArchaeaGenomeProteinsURL = `${apiPrefix}/archaea/genome_detail_proteins_unmag`

// Archaea Proteins URLs
export const getArchaeaProteinsFilterOptionsURL = `${apiPrefix}/archaea/proteins_filter_options`
export const getUnMAGArchaeaProteinsFilterOptionsURL = `${apiPrefix}/archaea/proteins_filter_options_unmag`
export const getArchaeaProteinsSingleFileURL = `${apiPrefix}/archaea/protein_single_download`
export const getUnMAGArchaeaProteinsSingleFileURL = `${apiPrefix}/archaea/protein_single_download_unmag`

// Archaea tRNAs URLs
export const getArchaeaTRNAsFilterOptionsURL = `${apiPrefix}/archaea/tRNAs_filter_options`
export const getUnMAGArchaeaTRNAsFilterOptionsURL = `${apiPrefix}/archaea/tRNAs_filter_options_unmag`
export const getArchaeaTRNAsSingleFileURL = `${apiPrefix}/archaea/tRNA_single_download`
export const getUnMAGArchaeaTRNAsSingleFileURL = `${apiPrefix}/archaea/tRNA_single_download_unmag`

// Archaea CRISPR/Cas Systems URLs
export const getArchaeaCRISPRCasSystemsFilterOptionsURL = `${apiPrefix}/archaea/CRISPR_Cas_systems_filter_options`
export const getUnMAGArchaeaCRISPRCasSystemsFilterOptionsURL = `${apiPrefix}/archaea/CRISPR_Cas_systems_filter_options_unmag`
export const getArchaeaCRISPRCasSystemsSingleFileURL = `${apiPrefix}/archaea/CRISPR_Cas_system_single_download`
export const getUnMAGArchaeaCRISPRCasSystemsSingleFileURL = `${apiPrefix}/archaea/CRISPR_Cas_system_single_download_unmag`

// Archaea Anti-CRISPR Annotations URLs
export const getArchaeaAntiCRISPRAnnotationsFilterOptionsURL = `${apiPrefix}/archaea/anti_crispr_annotations_filter_options`
export const getUnMAGArchaeaAntiCRISPRAnnotationsFilterOptionsURL = `${apiPrefix}/archaea/anti_crispr_annotations_filter_options_unmag`
export const getArchaeaAntiCRISPRAnnotationsSingleFileURL = `${apiPrefix}/archaea/anti_crispr_annotation_single_download`
export const getUnMAGArchaeaAntiCRISPRAnnotationsSingleFileURL = `${apiPrefix}/archaea/anti_crispr_annotation_single_download_unmag`

// Archaea Secondary Metabolites URLs
export const getArchaeaSecondaryMetabolitesFilterOptionsURL = `${apiPrefix}/archaea/secondary_metabolites_filter_options`
export const getUnMAGArchaeaSecondaryMetabolitesFilterOptionsURL = `${apiPrefix}/archaea/secondary_metabolites_filter_options_unmag`
export const getArchaeaSecondaryMetabolitesSingleFileURL = `${apiPrefix}/archaea/secondary_metabolite_single_download`
export const getUnMAGArchaeaSecondaryMetabolitesSingleFileURL = `${apiPrefix}/archaea/secondary_metabolite_single_download_unmag`

// Archaea Signal Peptides URLs
export const getArchaeaSignalPeptidesFilterOptionsURL = `${apiPrefix}/archaea/signal_peptides_filter_options`
export const getUnMAGArchaeaSignalPeptidesFilterOptionsURL = `${apiPrefix}/archaea/signal_peptides_filter_options_unmag`
export const getArchaeaSignalPeptidesSingleFileURL = `${apiPrefix}/archaea/signal_peptide_single_download`
export const getUnMAGArchaeaSignalPeptidesSingleFileURL = `${apiPrefix}/archaea/signal_peptide_single_download_unmag`

// Archaea Virulence Factors URLs
export const getArchaeaVirulenceFactorsFilterOptionsURL = `${apiPrefix}/archaea/virulence_factors_filter_options`
export const getUnMAGArchaeaVirulenceFactorsFilterOptionsURL = `${apiPrefix}/archaea/virulence_factors_filter_options_unmag`
export const getArchaeaVirulenceFactorsSingleFileURL = `${apiPrefix}/archaea/virulence_factor_single_download`
export const getUnMAGArchaeaVirulenceFactorsSingleFileURL = `${apiPrefix}/archaea/virulence_factor_single_download_unmag`

// Archaea Antibiotic Resistances URLs
export const getArchaeaAntibioticResistancesFilterOptionsURL = `${apiPrefix}/archaea/antibiotic_resistances_filter_options`
export const getUnMAGArchaeaAntibioticResistancesFilterOptionsURL = `${apiPrefix}/archaea/antibiotic_resistances_filter_options_unmag`
export const getArchaeaAntibioticResistancesSingleFileURL = `${apiPrefix}/archaea/antibiotic_resistance_single_download`
export const getUnMAGArchaeaAntibioticResistancesSingleFileURL = `${apiPrefix}/archaea/antibiotic_resistance_single_download_unmag`

// Archaea Transmembrane Helices URLs
export const getArchaeaTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/archaea/transmembrane_helices_filter_options`
export const getUnMAGArchaeaTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/archaea/transmembrane_helices_filter_options_unmag`
export const getArchaeaTransmembraneHelicesSingleFileURL = `${apiPrefix}/archaea/transmembrane_helice_single_download`
export const getUnMAGArchaeaTransmembraneHelicesSingleFileURL = `${apiPrefix}/archaea/transmembrane_helice_single_download_unmag`


