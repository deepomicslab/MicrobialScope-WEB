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

const apiPrefix = process.env.NEXT_PUBLIC_API_URL

// Archaea Genomes URLs
export const postArchaeaGenomesURL = `${apiPrefix}/archaea/genomes`
export const postUnMAGArchaeaGenomesURL = `${apiPrefix}/archaea/genomes_unmag`
export const postArchaeaGenomesBatchDownloadURL = `${apiPrefix}/archaea/genome_batch_download`
export const postUnMAGArchaeaGenomesBatchDownloadURL = `${apiPrefix}/archaea/genome_batch_download_unmag`

// Archaea Proteins URLs
export const postArchaeaProteinsURL = `${apiPrefix}/archaea/proteins`
export const postUnMAGArchaeaProteinsURL = `${apiPrefix}/archaea/proteins_unmag`
export const postArchaeaProteinsBatchDownloadURL = `${apiPrefix}/archaea/protein_batch_download`
export const postUnMAGArchaeaProteinsBatchDownloadURL = `${apiPrefix}/archaea/protein_batch_download_unmag`

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
export const postArchaeaAntibioticResistancesURL = `${apiPrefix}/archaea/antibiotic_resistances`
export const postUnMAGArchaeaAntibioticResistancesURL = `${apiPrefix}/archaea/antibiotic_resistances_unmag`
export const postArchaeaAntibioticResistancesBatchDownloadURL = `${apiPrefix}/archaea/antibiotic_resistance_batch_download`
export const postUnMAGArchaeaAntibioticResistancesBatchDownloadURL = `${apiPrefix}/archaea/antibiotic_resistance_batch_download_unmag`

// Archaea Transmembrane Helices URLs
export const postArchaeaTransmembraneHelicesURL = `${apiPrefix}/archaea/transmembrane_helices`
export const postUnMAGArchaeaTransmembraneHelicesURL = `${apiPrefix}/archaea/transmembrane_helices_unmag`
export const postArchaeaTransmembraneHelicesBatchDownloadURL = `${apiPrefix}/archaea/transmembrane_helice_batch_download`
export const postUnMAGArchaeaTransmembraneHelicesBatchDownloadURL = `${apiPrefix}/archaea/transmembrane_helice_batch_download_unmag`


// Bacteria Proteins URLs
export const postBacteriaProteinsURL = `${apiPrefix}/bacteria/proteins`
export const postUnMAGBacteriaProteinsURL = `${apiPrefix}/bacteria/proteins_unmag`
export const postBacteriaProteinsBatchDownloadURL = `${apiPrefix}/bacteria/protein_batch_download`
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
export const postBacteriaAntibioticResistancesURL = `${apiPrefix}/bacteria/antibiotic_resistances`
export const postUnMAGBacteriaAntibioticResistancesURL = `${apiPrefix}/bacteria/antibiotic_resistances_unmag`
export const postBacteriaAntibioticResistancesBatchDownloadURL = `${apiPrefix}/bacteria/antibiotic_resistance_batch_download`
export const postUnMAGBacteriaAntibioticResistancesBatchDownloadURL = `${apiPrefix}/bacteria/antibiotic_resistance_batch_download_unmag`

// Bacteria Transmembrane Helices URLs
export const postBacteriaTransmembraneHelicesURL = `${apiPrefix}/bacteria/transmembrane_helices`
export const postUnMAGBacteriaTransmembraneHelicesURL = `${apiPrefix}/bacteria/transmembrane_helices_unmag`
export const postBacteriaTransmembraneHelicesBatchDownloadURL = `${apiPrefix}/bacteria/transmembrane_helice_batch_download`
export const postUnMAGBacteriaTransmembraneHelicesBatchDownloadURL = `${apiPrefix}/bacteria/transmembrane_helice_batch_download_unmag`
