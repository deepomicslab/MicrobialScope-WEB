export const postDownloadBatchFile = (url, data, showMessage) => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = url
    form.style.display = 'none'

    Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = typeof value === 'object' ? JSON.stringify(value) : String(value)
        form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
}

export const apiPrefix = process.env.NEXT_PUBLIC_API_URL

// Analysis URLs
export const postAnalysisRunDemoURL = `https://microbialapi.deepomics.org/api/analysis/submit_task/`

// Archaea Genomes URLs
export const postArchaeaGenomesURL = `${apiPrefix}/archaea/genomes`
export const postUnMAGArchaeaGenomesURL = `${apiPrefix}/archaea/genomes_unmag`
export const postArchaeaGenomesBatchDownloadURL = `${apiPrefix}/archaea/genome_batch_download`
export const postUnMAGArchaeaGenomesBatchDownloadURL = `${apiPrefix}/archaea/genome_batch_download_unmag`

// Archaea Proteins URLs
export const postArchaeaProteinsURL = `https://microbialapi.deepomics.org/api/largetable/archaea_protein_list/`
export const postUnMAGArchaeaProteinsURL = `https://microbialapi.deepomics.org/api/largetable/archaea_unmag_protein_list/`
export const postArchaeaProteinsBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGArchaeaProteinsBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`

// Archaea tRNAs URLs
export const postArchaeaTRNAsURL = `${apiPrefix}/archaea/tRNAs`
export const postUnMAGArchaeaTRNAsURL = `${apiPrefix}/archaea/tRNAs_unmag`
export const postArchaeaTRNAsBatchDownloadURL = `${apiPrefix}/archaea/tRNA_batch_download`
export const postUnMAGArchaeaTRNAsBatchDownloadURL = `${apiPrefix}/archaea/tRNA_batch_download_unmag`

// Archaea CRISPR/Cas Systems URLs
export const postArchaeaCRISPRCasSystemsURL = `${apiPrefix}/archaea/CRISPR_Cas_systems`
export const postUnMAGArchaeaCRISPRCasSystemsURL = `${apiPrefix}/archaea/CRISPR_Cas_systems_unmag`
export const postArchaeaCRISPRCasSystemsBatchDownloadURL = `${apiPrefix}/archaea/CRISPR_Cas_system_batch_download`
export const postUnMAGArchaeaCRISPRCasSystemsBatchDownloadURL = `${apiPrefix}/archaea/CRISPR_Cas_system_batch_download_unmag`

// Archaea Anti-CRISPR Annotations URLs
export const postArchaeaAntiCRISPRAnnotationsURL = `${apiPrefix}/archaea/anti_crispr_annotations`
export const postUnMAGArchaeaAntiCRISPRAnnotationsURL = `${apiPrefix}/archaea/anti_crispr_annotations_unmag`
export const postArchaeaAntiCRISPRAnnotationsBatchDownloadURL = `${apiPrefix}/archaea/anti_crispr_annotation_batch_download`
export const postUnMAGArchaeaAntiCRISPRAnnotationsBatchDownloadURL = `${apiPrefix}/archaea/anti_crispr_annotation_batch_download_unmag`

// Archaea Secondary Metabolites URLs
export const postArchaeaSecondaryMetabolitesURL = `${apiPrefix}/archaea/secondary_metabolites`
export const postUnMAGArchaeaSecondaryMetabolitesURL = `${apiPrefix}/archaea/secondary_metabolites_unmag`
export const postArchaeaSecondaryMetabolitesBatchDownloadURL = `${apiPrefix}/archaea/secondary_metabolite_batch_download`
export const postUnMAGArchaeaSecondaryMetabolitesBatchDownloadURL = `${apiPrefix}/archaea/secondary_metabolite_batch_download_unmag`

// Archaea Signal Peptides URLs
export const postArchaeaSignalPeptidesURL = `${apiPrefix}/archaea/signal_peptides`
export const postUnMAGArchaeaSignalPeptidesURL = `${apiPrefix}/archaea/signal_peptides_unmag`
export const postArchaeaSignalPeptidesBatchDownloadURL = `${apiPrefix}/archaea/signal_peptide_batch_download`
export const postUnMAGArchaeaSignalPeptidesBatchDownloadURL = `${apiPrefix}/archaea/signal_peptide_batch_download_unmag`

// Archaea Virulence Factors URLs
export const postArchaeaVirulenceFactorsURL = `${apiPrefix}/archaea/virulence_factors`
export const postUnMAGArchaeaVirulenceFactorsURL = `${apiPrefix}/archaea/virulence_factors_unmag`
export const postArchaeaVirulenceFactorsBatchDownloadURL = `${apiPrefix}/archaea/virulence_factor_batch_download`
export const postUnMAGArchaeaVirulenceFactorsBatchDownloadURL = `${apiPrefix}/archaea/virulence_factor_batch_download_unmag`

// Archaea Antibiotic Resistances URLs
export const postArchaeaAntibioticResistancesURL = `https://microbialapi.deepomics.org/api/largetable/archaea_arg_list/`
export const postUnMAGArchaeaAntibioticResistancesURL = `https://microbialapi.deepomics.org/api/largetable/archaea_unmag_arg_list/`
export const postArchaeaAntibioticResistancesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGArchaeaAntibioticResistancesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`

// Archaea Transmembrane Helices URLs
export const postArchaeaTransmembraneHelicesURL = `https://microbialapi.deepomics.org/api/largetable/archaea_tmh_list/`
export const postUnMAGArchaeaTransmembraneHelicesURL = `https://microbialapi.deepomics.org/api/largetable/archaea_unmag_tmh_list/`
export const postArchaeaTransmembraneHelicesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGArchaeaTransmembraneHelicesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`


// Bacteria Genomes URLs
export const postBacteriaGenomesURL = `${apiPrefix}/bacteria/genomes`
export const postUnMAGBacteriaGenomesURL = `${apiPrefix}/bacteria/genomes_unmag`
export const postBacteriaGenomesBatchDownloadURL = `${apiPrefix}/bacteria/genome_batch_download`
export const postUnMAGBacteriaGenomesBatchDownloadURL = `${apiPrefix}/bacteria/genome_batch_download_unmag`

// Bacteria Proteins URLs
export const postBacteriaProteinsURL = `https://microbialapi.deepomics.org/api/largetable/bacteria_protein_list/`
export const postUnMAGBacteriaProteinsURL = `${apiPrefix}/bacteria/proteins_unmag`
export const postBacteriaProteinsBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGBacteriaProteinsBatchDownloadURL = `${apiPrefix}/bacteria/protein_batch_download_unmag`

// Bacteria tRNAs URLs
export const postBacteriaTRNAsURL = `${apiPrefix}/bacteria/tRNAs`
export const postUnMAGBacteriaTRNAsURL = `${apiPrefix}/bacteria/tRNAs_unmag`
export const postBacteriaTRNAsBatchDownloadURL = `${apiPrefix}/bacteria/tRNA_batch_download`
export const postUnMAGBacteriaTRNAsBatchDownloadURL = `${apiPrefix}/bacteria/tRNA_batch_download_unmag`

// Bacteria CRISPR/Cas Systems URLs
export const postBacteriaCRISPRCasSystemsURL = `${apiPrefix}/bacteria/CRISPR_Cas_systems`
export const postUnMAGBacteriaCRISPRCasSystemsURL = `${apiPrefix}/bacteria/CRISPR_Cas_systems_unmag`
export const postBacteriaCRISPRCasSystemsBatchDownloadURL = `${apiPrefix}/bacteria/CRISPR_Cas_system_batch_download`
export const postUnMAGBacteriaCRISPRCasSystemsBatchDownloadURL = `${apiPrefix}/bacteria/CRISPR_Cas_system_batch_download_unmag`

// Bacteria Anti-CRISPR Annotations URLs
export const postBacteriaAntiCRISPRAnnotationsURL = `${apiPrefix}/bacteria/anti_crispr_annotations`
export const postUnMAGBacteriaAntiCRISPRAnnotationsURL = `${apiPrefix}/bacteria/anti_crispr_annotations_unmag`
export const postBacteriaAntiCRISPRAnnotationsBatchDownloadURL = `${apiPrefix}/bacteria/anti_crispr_annotation_batch_download`
export const postUnMAGBacteriaAntiCRISPRAnnotationsBatchDownloadURL = `${apiPrefix}/bacteria/anti_crispr_annotation_batch_download_unmag`

// Bacteria Secondary Metabolites URLs
export const postBacteriaSecondaryMetabolitesURL = `${apiPrefix}/bacteria/secondary_metabolites`
export const postUnMAGBacteriaSecondaryMetabolitesURL = `${apiPrefix}/bacteria/secondary_metabolites_unmag`
export const postBacteriaSecondaryMetabolitesBatchDownloadURL = `${apiPrefix}/bacteria/secondary_metabolite_batch_download`
export const postUnMAGBacteriaSecondaryMetabolitesBatchDownloadURL = `${apiPrefix}/bacteria/secondary_metabolite_batch_download_unmag`

// Bacteria Signal Peptides URLs
export const postBacteriaSignalPeptidesURL = `${apiPrefix}/bacteria/signal_peptides`
export const postUnMAGBacteriaSignalPeptidesURL = `${apiPrefix}/bacteria/signal_peptides_unmag`
export const postBacteriaSignalPeptidesBatchDownloadURL = `${apiPrefix}/bacteria/signal_peptide_batch_download`
export const postUnMAGBacteriaSignalPeptidesBatchDownloadURL = `${apiPrefix}/bacteria/signal_peptide_batch_download_unmag`

// Bacteria Virulence Factors URLs
export const postBacteriaVirulenceFactorsURL = `${apiPrefix}/bacteria/virulence_factors`
export const postUnMAGBacteriaVirulenceFactorsURL = `${apiPrefix}/bacteria/virulence_factors_unmag`
export const postBacteriaVirulenceFactorsBatchDownloadURL = `${apiPrefix}/bacteria/virulence_factor_batch_download`
export const postUnMAGBacteriaVirulenceFactorsBatchDownloadURL = `${apiPrefix}/bacteria/virulence_factor_batch_download_unmag`

// Bacteria Antibiotic Resistances URLs
export const postBacteriaAntibioticResistancesURL = `https://microbialapi.deepomics.org/api/largetable/bacteria_arg_list/`
export const postUnMAGBacteriaAntibioticResistancesURL = `${apiPrefix}/bacteria/antibiotic_resistances_unmag`
export const postBacteriaAntibioticResistancesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGBacteriaAntibioticResistancesBatchDownloadURL = `${apiPrefix}/bacteria/antibiotic_resistance_batch_download_unmag`

// Bacteria Transmembrane Helices URLs
export const postBacteriaTransmembraneHelicesURL = `https://microbialapi.deepomics.org/api/largetable/bacteria_tmh_list/`
export const postUnMAGBacteriaTransmembraneHelicesURL = `${apiPrefix}/bacteria/transmembrane_helices_unmag`
export const postBacteriaTransmembraneHelicesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGBacteriaTransmembraneHelicesBatchDownloadURL = `${apiPrefix}/bacteria/transmembrane_helice_batch_download_unmag`


// Fungi Genomes URLs
export const postFungiGenomesURL = `${apiPrefix}/fungi/genomes`
export const postUnMAGFungiGenomesURL = `${apiPrefix}/fungi/genomes_unmag`
export const postFungiGenomesBatchDownloadURL = `${apiPrefix}/fungi/genome_batch_download`
export const postUnMAGFungiGenomesBatchDownloadURL = `${apiPrefix}/fungi/genome_batch_download_unmag`

// Fungi Proteins URLs
export const postFungiProteinsURL = `https://microbialapi.deepomics.org/api/largetable/fungi_protein_list/`
export const postUnMAGFungiProteinsURL = `https://microbialapi.deepomics.org/api/largetable/fungi_unmag_protein_list/`
export const postFungiProteinsBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGFungiProteinsBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`

// Fungi tRNAs URLs
export const postFungiTRNAsURL = `${apiPrefix}/fungi/tRNAs`
export const postUnMAGFungiTRNAsURL = `${apiPrefix}/fungi/tRNAs_unmag`
export const postFungiTRNAsBatchDownloadURL = `${apiPrefix}/fungi/tRNA_batch_download`
export const postUnMAGFungiTRNAsBatchDownloadURL = `${apiPrefix}/fungi/tRNA_batch_download_unmag`

// Fungi Secondary Metabolites URLs
export const postFungiSecondaryMetabolitesURL = `${apiPrefix}/fungi/secondary_metabolites`
export const postUnMAGFungiSecondaryMetabolitesURL = `${apiPrefix}/fungi/secondary_metabolites_unmag`
export const postFungiSecondaryMetabolitesBatchDownloadURL = `${apiPrefix}/fungi/secondary_metabolite_batch_download`
export const postUnMAGFungiSecondaryMetabolitesBatchDownloadURL = `${apiPrefix}/fungi/secondary_metabolite_batch_download_unmag`

// Fungi Signal Peptides URLs
export const postFungiSignalPeptidesURL = `${apiPrefix}/fungi/signal_peptides`
export const postUnMAGFungiSignalPeptidesURL = `${apiPrefix}/fungi/signal_peptides_unmag`
export const postFungiSignalPeptidesBatchDownloadURL = `${apiPrefix}/fungi/signal_peptide_batch_download`
export const postUnMAGFungiSignalPeptidesBatchDownloadURL = `${apiPrefix}/fungi/signal_peptide_batch_download_unmag`

// Fungi Virulence Factors URLs
export const postFungiVirulenceFactorsURL = `${apiPrefix}/fungi/virulence_factors`
export const postUnMAGFungiVirulenceFactorsURL = `${apiPrefix}/fungi/virulence_factors_unmag`
export const postFungiVirulenceFactorsBatchDownloadURL = `${apiPrefix}/fungi/virulence_factor_batch_download`
export const postUnMAGFungiVirulenceFactorsBatchDownloadURL = `${apiPrefix}/fungi/virulence_factor_batch_download_unmag`

// Fungi Antibiotic Resistances URLs
export const postFungiAntibioticResistancesURL = `https://microbialapi.deepomics.org/api/largetable/fungi_arg_list/`
export const postUnMAGFungiAntibioticResistancesURL = `https://microbialapi.deepomics.org/api/largetable/fungi_unmag_arg_list/`
export const postFungiAntibioticResistancesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGFungiAntibioticResistancesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`

// Fungi Transmembrane Helices URLs
export const postFungiTransmembraneHelicesURL = `https://microbialapi.deepomics.org/api/largetable/fungi_tmh_list/`
export const postUnMAGFungiTransmembraneHelicesURL = `https://microbialapi.deepomics.org/api/largetable/fungi_unmag_tmh_list/`
export const postFungiTransmembraneHelicesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGFungiTransmembraneHelicesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`


// Viruses Genomes URLs
export const postVirusesGenomesURL = `${apiPrefix}/viruses/genomes`
export const postUnMAGVirusesGenomesURL = `${apiPrefix}/viruses/genomes_unmag`
export const postVirusesGenomesBatchDownloadURL = `${apiPrefix}/viruses/genome_batch_download`
export const postUnMAGVirusesGenomesBatchDownloadURL = `${apiPrefix}/viruses/genome_batch_download_unmag`

// Viruses Proteins URLs
export const postVirusesProteinsURL = `https://microbialapi.deepomics.org/api/largetable/viruses_protein_list/`
export const postUnMAGVirusesProteinsURL = `https://microbialapi.deepomics.org/api/largetable/viruses_unmag_protein_list/`
export const postVirusesProteinsBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGVirusesProteinsBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`

// Viruses tRNAs URLs
export const postVirusesTRNAsURL = `${apiPrefix}/viruses/tRNAs`
export const postUnMAGVirusesTRNAsURL = `${apiPrefix}/viruses/tRNAs_unmag`
export const postVirusesTRNAsBatchDownloadURL = `${apiPrefix}/viruses/tRNA_batch_download`
export const postUnMAGVirusesTRNAsBatchDownloadURL = `${apiPrefix}/viruses/tRNA_batch_download_unmag`

// Viruses CRISPR/Cas Systems URLs
export const postVirusesCRISPRCasSystemsURL = `${apiPrefix}/viruses/CRISPR_Cas_systems`
export const postUnMAGVirusesCRISPRCasSystemsURL = `${apiPrefix}/viruses/CRISPR_Cas_systems_unmag`
export const postVirusesCRISPRCasSystemsBatchDownloadURL = `${apiPrefix}/viruses/CRISPR_Cas_system_batch_download`
export const postUnMAGVirusesCRISPRCasSystemsBatchDownloadURL = `${apiPrefix}/viruses/CRISPR_Cas_system_batch_download_unmag`

// Viruses Anti-CRISPR Annotations URLs
export const postVirusesAntiCRISPRAnnotationsURL = `${apiPrefix}/viruses/anti_crispr_annotations`
export const postUnMAGVirusesAntiCRISPRAnnotationsURL = `${apiPrefix}/viruses/anti_crispr_annotations_unmag`
export const postVirusesAntiCRISPRAnnotationsBatchDownloadURL = `${apiPrefix}/viruses/anti_crispr_annotation_batch_download`
export const postUnMAGVirusesAntiCRISPRAnnotationsBatchDownloadURL = `${apiPrefix}/viruses/anti_crispr_annotation_batch_download_unmag`

// Viruses Virulence Factors URLs
export const postVirusesVirulenceFactorsURL = `${apiPrefix}/viruses/virulence_factors`
export const postUnMAGVirusesVirulenceFactorsURL = `${apiPrefix}/viruses/virulence_factors_unmag`
export const postVirusesVirulenceFactorsBatchDownloadURL = `${apiPrefix}/viruses/virulence_factor_batch_download`
export const postUnMAGVirusesVirulenceFactorsBatchDownloadURL = `${apiPrefix}/viruses/virulence_factor_batch_download_unmag`

// Viruses Antibiotic Resistances URLs
export const postVirusesAntibioticResistancesURL = `https://microbialapi.deepomics.org/api/largetable/viruses_arg_list/`
export const postUnMAGVirusesAntibioticResistancesURL = `https://microbialapi.deepomics.org/api/largetable/viruses_unmag_arg_list/`
export const postVirusesAntibioticResistancesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGVirusesAntibioticResistancesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`

// Viruses Transmembrane Helices URLs
export const postVirusesTransmembraneHelicesURL = `https://microbialapi.deepomics.org/api/largetable/viruses_tmh_list/`
export const postUnMAGVirusesTransmembraneHelicesURL = `https://microbialapi.deepomics.org/api/largetable/viruses_unmag_tmh_list/`
export const postVirusesTransmembraneHelicesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
export const postUnMAGVirusesTransmembraneHelicesBatchDownloadURL = `https://microbialapi.deepomics.org/api/largetable/download_large_table_meta_data/`
