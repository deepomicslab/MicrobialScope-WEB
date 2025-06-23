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
export const getArchaeaGenomeTRNAsURL = `${apiPrefix}/archaea/genome_detail_tRNAs`
export const getUnMAGArchaeaGenomeTRNAsURL = `${apiPrefix}/archaea/genome_detail_tRNAs_unmag`
export const getArchaeaGenomeCRISPRCasURL = `${apiPrefix}/archaea/genome_detail_crispr`
export const getUnMAGArchaeaGenomeCRISPRCasURL = `${apiPrefix}/archaea/genome_detail_crispr_unmag`
export const getArchaeaGenomeAntiCRISPRURL = `${apiPrefix}/archaea/genome_detail_anti_crispr`
export const getUnMAGArchaeaGenomeAntiCRISPRURL = `${apiPrefix}/archaea/genome_detail_anti_crispr_unmag`
export const getArchaeaGenomeSecondaryMetabolitesURL = `${apiPrefix}/archaea/genome_detail_secondary_metabolites`
export const getUnMAGArchaeaGenomeSecondaryMetabolitesURL = `${apiPrefix}/archaea/genome_detail_secondary_metabolites_unmag`
export const getArchaeaGenomeSignalPeptidesURL = `${apiPrefix}/archaea/genome_detail_signal_peptides`
export const getUnMAGArchaeaGenomeSignalPeptidesURL = `${apiPrefix}/archaea/genome_detail_signal_peptides_unmag`
export const getArchaeaGenomeVirulenceFactorsURL = `${apiPrefix}/archaea/genome_detail_virulence_factors`
export const getUnMAGArchaeaGenomeVirulenceFactorsURL = `${apiPrefix}/archaea/genome_detail_virulence_factors_unmag`
export const getArchaeaGenomeAntibioticResistanceURL = `${apiPrefix}/archaea/genome_detail_antibiotic_resistance`
export const getUnMAGArchaeaGenomeAntibioticResistanceURL = `${apiPrefix}/archaea/genome_detail_antibiotic_resistance_unmag`
export const getArchaeaGenomeTransmembraneHelicesURL = `${apiPrefix}/archaea/genome_detail_transmembrane_helices`
export const getUnMAGArchaeaGenomeTransmembraneHelicesURL = `${apiPrefix}/archaea/genome_detail_transmembrane_helices_unmag`



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


// Bacteria Proteins URLs
export const getBacteriaProteinsFilterOptionsURL = `${apiPrefix}/bacteria/proteins_filter_options`
export const getUnMAGBacteriaProteinsFilterOptionsURL = `${apiPrefix}/bacteria/proteins_filter_options_unmag`
export const getBacteriaProteinsSingleFileURL = `${apiPrefix}/bacteria/protein_single_download`
export const getUnMAGBacteriaProteinsSingleFileURL = `${apiPrefix}/bacteria/protein_single_download_unmag`

// Bacteria tRNAs URLs
export const getBacteriaTRNAsFilterOptionsURL = `${apiPrefix}/bacteria/tRNAs_filter_options`
export const getUnMAGBacteriaTRNAsFilterOptionsURL = `${apiPrefix}/bacteria/tRNAs_filter_options_unmag`
export const getBacteriaTRNAsSingleFileURL = `${apiPrefix}/bacteria/tRNA_single_download`
export const getUnMAGBacteriaTRNAsSingleFileURL = `${apiPrefix}/bacteria/tRNA_single_download_unmag`

// Bacteria CRISPR/Cas Systems URLs
export const getBacteriaCRISPRCasSystemsFilterOptionsURL = `${apiPrefix}/bacteria/CRISPR_Cas_systems_filter_options`
export const getUnMAGBacteriaCRISPRCasSystemsFilterOptionsURL = `${apiPrefix}/bacteria/CRISPR_Cas_systems_filter_options_unmag`
export const getBacteriaCRISPRCasSystemsSingleFileURL = `${apiPrefix}/bacteria/CRISPR_Cas_system_single_download`
export const getUnMAGBacteriaCRISPRCasSystemsSingleFileURL = `${apiPrefix}/bacteria/CRISPR_Cas_system_single_download_unmag`

// Bacteria Anti-CRISPR Annotations URLs
export const getBacteriaAntiCRISPRAnnotationsFilterOptionsURL = `${apiPrefix}/bacteria/anti_crispr_annotations_filter_options`
export const getUnMAGBacteriaAntiCRISPRAnnotationsFilterOptionsURL = `${apiPrefix}/bacteria/anti_crispr_annotations_filter_options_unmag`
export const getBacteriaAntiCRISPRAnnotationsSingleFileURL = `${apiPrefix}/bacteria/anti_crispr_annotation_single_download`
export const getUnMAGBacteriaAntiCRISPRAnnotationsSingleFileURL = `${apiPrefix}/bacteria/anti_crispr_annotation_single_download_unmag`

// Bacteria Secondary Metabolites URLs
export const getBacteriaSecondaryMetabolitesFilterOptionsURL = `${apiPrefix}/bacteria/secondary_metabolites_filter_options`
export const getUnMAGBacteriaSecondaryMetabolitesFilterOptionsURL = `${apiPrefix}/bacteria/secondary_metabolites_filter_options_unmag`
export const getBacteriaSecondaryMetabolitesSingleFileURL = `${apiPrefix}/bacteria/secondary_metabolite_single_download`
export const getUnMAGBacteriaSecondaryMetabolitesSingleFileURL = `${apiPrefix}/bacteria/secondary_metabolite_single_download_unmag`

// Bacteria Signal Peptides URLs
export const getBacteriaSignalPeptidesFilterOptionsURL = `${apiPrefix}/bacteria/signal_peptides_filter_options`
export const getUnMAGBacteriaSignalPeptidesFilterOptionsURL = `${apiPrefix}/bacteria/signal_peptides_filter_options_unmag`
export const getBacteriaSignalPeptidesSingleFileURL = `${apiPrefix}/bacteria/signal_peptide_single_download`
export const getUnMAGBacteriaSignalPeptidesSingleFileURL = `${apiPrefix}/bacteria/signal_peptide_single_download_unmag`

// Bacteria Virulence Factors URLs
export const getBacteriaVirulenceFactorsFilterOptionsURL = `${apiPrefix}/bacteria/virulence_factors_filter_options`
export const getUnMAGBacteriaVirulenceFactorsFilterOptionsURL = `${apiPrefix}/bacteria/virulence_factors_filter_options_unmag`
export const getBacteriaVirulenceFactorsSingleFileURL = `${apiPrefix}/bacteria/virulence_factor_single_download`
export const getUnMAGBacteriaVirulenceFactorsSingleFileURL = `${apiPrefix}/bacteria/virulence_factor_single_download_unmag`

// Bacteria Antibiotic Resistances URLs
export const getBacteriaAntibioticResistancesFilterOptionsURL = `${apiPrefix}/bacteria/antibiotic_resistances_filter_options`
export const getUnMAGBacteriaAntibioticResistancesFilterOptionsURL = `${apiPrefix}/bacteria/antibiotic_resistances_filter_options_unmag`
export const getBacteriaAntibioticResistancesSingleFileURL = `${apiPrefix}/bacteria/antibiotic_resistance_single_download`
export const getUnMAGBacteriaAntibioticResistancesSingleFileURL = `${apiPrefix}/bacteria/antibiotic_resistance_single_download_unmag`

// Bacteria Transmembrane Helices URLs
export const getBacteriaTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/bacteria/transmembrane_helices_filter_options`
export const getUnMAGBacteriaTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/bacteria/transmembrane_helices_filter_options_unmag`
export const getBacteriaTransmembraneHelicesSingleFileURL = `${apiPrefix}/bacteria/transmembrane_helice_single_download`
export const getUnMAGBacteriaTransmembraneHelicesSingleFileURL = `${apiPrefix}/bacteria/transmembrane_helice_single_download_unmag`
