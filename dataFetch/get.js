import axios from "axios"
import { postUnMAGArchaeaAntiCRISPRAnnotationsURL } from "@/dataFetch/post"

export const fetcher = async url => {
    const res = await axios.get(url, {timeout: 600000});
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
export const getMetaFileURL = `${apiPrefix}/microbe/download_meta`

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


// Bacteria Genomes URLs
export const getBacteriaGenomesFilterOptionsURL = `${apiPrefix}/bacteria/genomes_filter_options`
export const getUnMAGBacteriaGenomesFilterOptionsURL = `${apiPrefix}/bacteria/genomes_filter_options_unmag`
export const getBacteriaGenomesSingleFileURL = `${apiPrefix}/bacteria/genome_single_download`
export const getUnMAGBacteriaGenomesSingleFileURL = `${apiPrefix}/bacteria/genome_single_download_unmag`

// Bacteria Genome Detail URLs
export const getBacteriaGenomeDetailURL = `${apiPrefix}/bacteria/genome_detail`
export const getUnMAGBacteriaGenomeDetailURL = `${apiPrefix}/bacteria/genome_detail_unmag`
export const getBacteriaGenomeFASTAURL = `${apiPrefix}/bacteria/genome_fasta`
export const getUnMAGBacteriaGenomeFASTAURL = `${apiPrefix}/bacteria/genome_fasta_unmag`
export const getBacteriaGenomeProteinsURL = `${apiPrefix}/bacteria/genome_detail_proteins`
export const getUnMAGBacteriaGenomeProteinsURL = `${apiPrefix}/bacteria/genome_detail_proteins_unmag`
export const getBacteriaGenomeTRNAsURL = `${apiPrefix}/bacteria/genome_detail_tRNAs`
export const getUnMAGBacteriaGenomeTRNAsURL = `${apiPrefix}/bacteria/genome_detail_tRNAs_unmag`
export const getBacteriaGenomeCRISPRCasURL = `${apiPrefix}/bacteria/genome_detail_crispr`
export const getUnMAGBacteriaGenomeCRISPRCasURL = `${apiPrefix}/bacteria/genome_detail_crispr_unmag`
export const getBacteriaGenomeAntiCRISPRURL = `${apiPrefix}/bacteria/genome_detail_anti_crispr`
export const getUnMAGBacteriaGenomeAntiCRISPRURL = `${apiPrefix}/bacteria/genome_detail_anti_crispr_unmag`
export const getBacteriaGenomeSecondaryMetabolitesURL = `${apiPrefix}/bacteria/genome_detail_secondary_metabolites`
export const getUnMAGBacteriaGenomeSecondaryMetabolitesURL = `${apiPrefix}/bacteria/genome_detail_secondary_metabolites_unmag`
export const getBacteriaGenomeSignalPeptidesURL = `${apiPrefix}/bacteria/genome_detail_signal_peptides`
export const getUnMAGBacteriaGenomeSignalPeptidesURL = `${apiPrefix}/bacteria/genome_detail_signal_peptides_unmag`
export const getBacteriaGenomeVirulenceFactorsURL = `${apiPrefix}/bacteria/genome_detail_virulence_factors`
export const getUnMAGBacteriaGenomeVirulenceFactorsURL = `${apiPrefix}/bacteria/genome_detail_virulence_factors_unmag`
export const getBacteriaGenomeAntibioticResistanceURL = `${apiPrefix}/bacteria/genome_detail_antibiotic_resistance`
export const getUnMAGBacteriaGenomeAntibioticResistanceURL = `${apiPrefix}/bacteria/genome_detail_antibiotic_resistance_unmag`
export const getBacteriaGenomeTransmembraneHelicesURL = `${apiPrefix}/bacteria/genome_detail_transmembrane_helices`
export const getUnMAGBacteriaGenomeTransmembraneHelicesURL = `${apiPrefix}/bacteria/genome_detail_transmembrane_helices_unmag`

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


// Fungi Genomes URLs
export const getFungiGenomesFilterOptionsURL = `${apiPrefix}/fungi/genomes_filter_options`
export const getUnMAGFungiGenomesFilterOptionsURL = `${apiPrefix}/fungi/genomes_filter_options_unmag`
export const getFungiGenomesSingleFileURL = `${apiPrefix}/fungi/genome_single_download`
export const getUnMAGFungiGenomesSingleFileURL = `${apiPrefix}/fungi/genome_single_download_unmag`

// Fungi Genome Detail URLs
export const getFungiGenomeDetailURL = `${apiPrefix}/fungi/genome_detail`
export const getUnMAGFungiGenomeDetailURL = `${apiPrefix}/fungi/genome_detail_unmag`
export const getFungiGenomeFASTAURL = `${apiPrefix}/fungi/genome_fasta`
export const getUnMAGFungiGenomeFASTAURL = `${apiPrefix}/fungi/genome_fasta_unmag`
export const getFungiGenomeProteinsURL = `${apiPrefix}/fungi/genome_detail_proteins`
export const getUnMAGFungiGenomeProteinsURL = `${apiPrefix}/fungi/genome_detail_proteins_unmag`
export const getFungiGenomeTRNAsURL = `${apiPrefix}/fungi/genome_detail_tRNAs`
export const getUnMAGFungiGenomeTRNAsURL = `${apiPrefix}/fungi/genome_detail_tRNAs_unmag`
export const getFungiGenomeCRISPRCasURL = `${apiPrefix}/fungi/genome_detail_crispr`
export const getUnMAGFungiGenomeCRISPRCasURL = `${apiPrefix}/fungi/genome_detail_crispr_unmag`
export const getFungiGenomeAntiCRISPRURL = `${apiPrefix}/fungi/genome_detail_anti_crispr`
export const getUnMAGFungiGenomeAntiCRISPRURL = `${apiPrefix}/fungi/genome_detail_anti_crispr_unmag`
export const getFungiGenomeSecondaryMetabolitesURL = `${apiPrefix}/fungi/genome_detail_secondary_metabolites`
export const getUnMAGFungiGenomeSecondaryMetabolitesURL = `${apiPrefix}/fungi/genome_detail_secondary_metabolites_unmag`
export const getFungiGenomeSignalPeptidesURL = `${apiPrefix}/fungi/genome_detail_signal_peptides`
export const getUnMAGFungiGenomeSignalPeptidesURL = `${apiPrefix}/fungi/genome_detail_signal_peptides_unmag`
export const getFungiGenomeVirulenceFactorsURL = `${apiPrefix}/fungi/genome_detail_virulence_factors`
export const getUnMAGFungiGenomeVirulenceFactorsURL = `${apiPrefix}/fungi/genome_detail_virulence_factors_unmag`
export const getFungiGenomeAntibioticResistanceURL = `${apiPrefix}/fungi/genome_detail_antibiotic_resistance`
export const getUnMAGFungiGenomeAntibioticResistanceURL = `${apiPrefix}/fungi/genome_detail_antibiotic_resistance_unmag`
export const getFungiGenomeTransmembraneHelicesURL = `${apiPrefix}/fungi/genome_detail_transmembrane_helices`
export const getUnMAGFungiGenomeTransmembraneHelicesURL = `${apiPrefix}/fungi/genome_detail_transmembrane_helices_unmag`

// Fungi Proteins URLs
export const getFungiProteinsFilterOptionsURL = `${apiPrefix}/fungi/proteins_filter_options`
export const getUnMAGFungiProteinsFilterOptionsURL = `${apiPrefix}/fungi/proteins_filter_options_unmag`
export const getFungiProteinsSingleFileURL = `${apiPrefix}/fungi/protein_single_download`
export const getUnMAGFungiProteinsSingleFileURL = `${apiPrefix}/fungi/protein_single_download_unmag`

// Fungi tRNAs URLs
export const getFungiTRNAsFilterOptionsURL = `${apiPrefix}/fungi/tRNAs_filter_options`
export const getUnMAGFungiTRNAsFilterOptionsURL = `${apiPrefix}/fungi/tRNAs_filter_options_unmag`
export const getFungiTRNAsSingleFileURL = `${apiPrefix}/fungi/tRNA_single_download`
export const getUnMAGFungiTRNAsSingleFileURL = `${apiPrefix}/fungi/tRNA_single_download_unmag`

// Fungi Secondary Metabolites URLs
export const getFungiSecondaryMetabolitesFilterOptionsURL = `${apiPrefix}/fungi/secondary_metabolites_filter_options`
export const getUnMAGFungiSecondaryMetabolitesFilterOptionsURL = `${apiPrefix}/fungi/secondary_metabolites_filter_options_unmag`
export const getFungiSecondaryMetabolitesSingleFileURL = `${apiPrefix}/fungi/secondary_metabolite_single_download`
export const getUnMAGFungiSecondaryMetabolitesSingleFileURL = `${apiPrefix}/fungi/secondary_metabolite_single_download_unmag`

// Fungi Signal Peptides URLs
export const getFungiSignalPeptidesFilterOptionsURL = `${apiPrefix}/fungi/signal_peptides_filter_options`
export const getUnMAGFungiSignalPeptidesFilterOptionsURL = `${apiPrefix}/fungi/signal_peptides_filter_options_unmag`
export const getFungiSignalPeptidesSingleFileURL = `${apiPrefix}/fungi/signal_peptide_single_download`
export const getUnMAGFungiSignalPeptidesSingleFileURL = `${apiPrefix}/fungi/signal_peptide_single_download_unmag`

// Fungi Virulence Factors URLs
export const getFungiVirulenceFactorsFilterOptionsURL = `${apiPrefix}/fungi/virulence_factors_filter_options`
export const getUnMAGFungiVirulenceFactorsFilterOptionsURL = `${apiPrefix}/fungi/virulence_factors_filter_options_unmag`
export const getFungiVirulenceFactorsSingleFileURL = `${apiPrefix}/fungi/virulence_factor_single_download`
export const getUnMAGFungiVirulenceFactorsSingleFileURL = `${apiPrefix}/fungi/virulence_factor_single_download_unmag`

// Fungi Antibiotic Resistances URLs
export const getFungiAntibioticResistancesFilterOptionsURL = `${apiPrefix}/fungi/antibiotic_resistances_filter_options`
export const getUnMAGFungiAntibioticResistancesFilterOptionsURL = `${apiPrefix}/fungi/antibiotic_resistances_filter_options_unmag`
export const getFungiAntibioticResistancesSingleFileURL = `${apiPrefix}/fungi/antibiotic_resistance_single_download`
export const getUnMAGFungiAntibioticResistancesSingleFileURL = `${apiPrefix}/fungi/antibiotic_resistance_single_download_unmag`

// Fungi Transmembrane Helices URLs
export const getFungiTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/fungi/transmembrane_helices_filter_options`
export const getUnMAGFungiTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/fungi/transmembrane_helices_filter_options_unmag`
export const getFungiTransmembraneHelicesSingleFileURL = `${apiPrefix}/fungi/transmembrane_helice_single_download`
export const getUnMAGFungiTransmembraneHelicesSingleFileURL = `${apiPrefix}/fungi/transmembrane_helice_single_download_unmag`


// Viruses Genomes URLs
export const getVirusesGenomesFilterOptionsURL = `${apiPrefix}/viruses/genomes_filter_options`
export const getUnMAGVirusesGenomesFilterOptionsURL = `${apiPrefix}/viruses/genomes_filter_options_unmag`
export const getVirusesGenomesSingleFileURL = `${apiPrefix}/viruses/genome_single_download`
export const getUnMAGVirusesGenomesSingleFileURL = `${apiPrefix}/viruses/genome_single_download_unmag`

// Viruses Genome Detail URLs
export const getVirusesGenomeDetailURL = `${apiPrefix}/viruses/genome_detail`
export const getUnMAGVirusesGenomeDetailURL = `${apiPrefix}/viruses/genome_detail_unmag`
export const getVirusesGenomeFASTAURL = `${apiPrefix}/viruses/genome_fasta`
export const getUnMAGVirusesGenomeFASTAURL = `${apiPrefix}/viruses/genome_fasta_unmag`
export const getVirusesGenomeProteinsURL = `${apiPrefix}/viruses/genome_detail_proteins`
export const getUnMAGVirusesGenomeProteinsURL = `${apiPrefix}/viruses/genome_detail_proteins_unmag`
export const getVirusesGenomeTRNAsURL = `${apiPrefix}/viruses/genome_detail_tRNAs`
export const getUnMAGVirusesGenomeTRNAsURL = `${apiPrefix}/viruses/genome_detail_tRNAs_unmag`
export const getVirusesGenomeCRISPRCasURL = `${apiPrefix}/viruses/genome_detail_crispr`
export const getUnMAGVirusesGenomeCRISPRCasURL = `${apiPrefix}/viruses/genome_detail_crispr_unmag`
export const getVirusesGenomeAntiCRISPRURL = `${apiPrefix}/viruses/genome_detail_anti_crispr`
export const getUnMAGVirusesGenomeAntiCRISPRURL = `${apiPrefix}/viruses/genome_detail_anti_crispr_unmag`
export const getVirusesGenomeSecondaryMetabolitesURL = `${apiPrefix}/viruses/genome_detail_secondary_metabolites`
export const getUnMAGVirusesGenomeSecondaryMetabolitesURL = `${apiPrefix}/viruses/genome_detail_secondary_metabolites_unmag`
export const getVirusesGenomeSignalPeptidesURL = `${apiPrefix}/viruses/genome_detail_signal_peptides`
export const getUnMAGVirusesGenomeSignalPeptidesURL = `${apiPrefix}/viruses/genome_detail_signal_peptides_unmag`
export const getVirusesGenomeVirulenceFactorsURL = `${apiPrefix}/viruses/genome_detail_virulence_factors`
export const getUnMAGVirusesGenomeVirulenceFactorsURL = `${apiPrefix}/viruses/genome_detail_virulence_factors_unmag`
export const getVirusesGenomeAntibioticResistanceURL = `${apiPrefix}/viruses/genome_detail_antibiotic_resistance`
export const getUnMAGVirusesGenomeAntibioticResistanceURL = `${apiPrefix}/viruses/genome_detail_antibiotic_resistance_unmag`
export const getVirusesGenomeTransmembraneHelicesURL = `${apiPrefix}/viruses/genome_detail_transmembrane_helices`
export const getUnMAGVirusesGenomeTransmembraneHelicesURL = `${apiPrefix}/viruses/genome_detail_transmembrane_helices_unmag`

// Viruses Proteins URLs
export const getVirusesProteinsFilterOptionsURL = `${apiPrefix}/viruses/proteins_filter_options`
export const getUnMAGVirusesProteinsFilterOptionsURL = `${apiPrefix}/viruses/proteins_filter_options_unmag`
export const getVirusesProteinsSingleFileURL = `${apiPrefix}/viruses/protein_single_download`
export const getUnMAGVirusesProteinsSingleFileURL = `${apiPrefix}/viruses/protein_single_download_unmag`

// Viruses tRNAs URLs
export const getVirusesTRNAsFilterOptionsURL = `${apiPrefix}/viruses/tRNAs_filter_options`
export const getUnMAGVirusesTRNAsFilterOptionsURL = `${apiPrefix}/viruses/tRNAs_filter_options_unmag`
export const getVirusesTRNAsSingleFileURL = `${apiPrefix}/viruses/tRNA_single_download`
export const getUnMAGVirusesTRNAsSingleFileURL = `${apiPrefix}/viruses/tRNA_single_download_unmag`

// Viruses CRISPR/Cas Systems URLs
export const getVirusesCRISPRCasSystemsFilterOptionsURL = `${apiPrefix}/viruses/CRISPR_Cas_systems_filter_options`
export const getUnMAGVirusesCRISPRCasSystemsFilterOptionsURL = `${apiPrefix}/viruses/CRISPR_Cas_systems_filter_options_unmag`
export const getVirusesCRISPRCasSystemsSingleFileURL = `${apiPrefix}/viruses/CRISPR_Cas_system_single_download`
export const getUnMAGVirusesCRISPRCasSystemsSingleFileURL = `${apiPrefix}/viruses/CRISPR_Cas_system_single_download_unmag`

// Viruses Anti-CRISPR Annotations URLs
export const getVirusesAntiCRISPRAnnotationsFilterOptionsURL = `${apiPrefix}/viruses/anti_crispr_annotations_filter_options`
export const getUnMAGVirusesAntiCRISPRAnnotationsFilterOptionsURL = `${apiPrefix}/viruses/anti_crispr_annotations_filter_options_unmag`
export const getVirusesAntiCRISPRAnnotationsSingleFileURL = `${apiPrefix}/viruses/anti_crispr_annotation_single_download`
export const getUnMAGVirusesAntiCRISPRAnnotationsSingleFileURL = `${apiPrefix}/viruses/anti_crispr_annotation_single_download_unmag`

// Viruses Virulence Factors URLs
export const getVirusesVirulenceFactorsFilterOptionsURL = `${apiPrefix}/viruses/virulence_factors_filter_options`
export const getUnMAGVirusesVirulenceFactorsFilterOptionsURL = `${apiPrefix}/viruses/virulence_factors_filter_options_unmag`
export const getVirusesVirulenceFactorsSingleFileURL = `${apiPrefix}/viruses/virulence_factor_single_download`
export const getUnMAGVirusesVirulenceFactorsSingleFileURL = `${apiPrefix}/viruses/virulence_factor_single_download_unmag`

// Viruses Antibiotic Resistances URLs
export const getVirusesAntibioticResistancesFilterOptionsURL = `${apiPrefix}/viruses/antibiotic_resistances_filter_options`
export const getUnMAGVirusesAntibioticResistancesFilterOptionsURL = `${apiPrefix}/viruses/antibiotic_resistances_filter_options_unmag`
export const getVirusesAntibioticResistancesSingleFileURL = `${apiPrefix}/viruses/antibiotic_resistance_single_download`
export const getUnMAGVirusesAntibioticResistancesSingleFileURL = `${apiPrefix}/viruses/antibiotic_resistance_single_download_unmag`

// Viruses Transmembrane Helices URLs
export const getVirusesTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/viruses/transmembrane_helices_filter_options`
export const getUnMAGVirusesTransmembraneHelicesFilterOptionsURL = `${apiPrefix}/viruses/transmembrane_helices_filter_options_unmag`
export const getVirusesTransmembraneHelicesSingleFileURL = `${apiPrefix}/viruses/transmembrane_helice_single_download`
export const getUnMAGVirusesTransmembraneHelicesSingleFileURL = `${apiPrefix}/viruses/transmembrane_helice_single_download_unmag`
