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
export const postArchaeaGenomesBatchDownloadURL = `${apiPrefix}/archaea/genome_batch_download`

// Archaea Proteins URLs
export const postArchaeaProteinsURL = `${apiPrefix}/archaea/proteins`
export const postArchaeaProteinsBatchDownloadURL = `${apiPrefix}/archaea/protein_batch_download`

// Archaea tRNAs URLs
export const postArchaeaTRNAsURL = `${apiPrefix}/archaea/tRNAs`
export const postArchaeaTRNAsBatchDownloadURL = `${apiPrefix}/archaea/tRNA_batch_download`

// Archaea CRISPR/Cas Systems URLs
export const postArchaeaCRISPRCasSystemsURL = `${apiPrefix}/archaea/CRISPR_Cas_systems`
export const postArchaeaCRISPRCasSystemsBatchDownloadURL = `${apiPrefix}/archaea/CRISPR_Cas_system_batch_download`

// Archaea Anti-CRISPR Annotations URLs
export const postArchaeaAntiCRISPRAnnotationsURL = `${apiPrefix}/archaea/anti_crispr_annotations`
export const postArchaeaAntiCRISPRAnnotationsBatchDownloadURL = `${apiPrefix}/archaea/anti_crispr_annotation_batch_download`

// Archaea Secondary Metabolites URLs
export const postArchaeaSecondaryMetabolitesURL = `${apiPrefix}/archaea/secondary_metabolites`
export const postArchaeaSecondaryMetabolitesBatchDownloadURL = `${apiPrefix}/archaea/secondary_metabolite_batch_download`

// Archaea Signal Peptides URLs
export const postArchaeaSignalPeptidesURL = `${apiPrefix}/archaea/signal_peptides`
export const postArchaeaSignalPeptidesBatchDownloadURL = `${apiPrefix}/archaea/signal_peptide_batch_download`

// Archaea Virulence Factors URLs
export const postArchaeaVirulenceFactorsURL = `${apiPrefix}/archaea/virulence_factors`
export const postArchaeaVirulenceFactorsBatchDownloadURL = `${apiPrefix}/archaea/virulence_factor_batch_download`

// Archaea Antibiotic Resistances URLs
export const postArchaeaAntibioticResistancesURL = `${apiPrefix}/archaea/antibiotic_resistances`
export const postArchaeaAntibioticResistancesBatchDownloadURL = `${apiPrefix}/archaea/antibiotic_resistance_batch_download`

// Archaea Transmembrane Helices URLs
export const postArchaeaTransmembraneHelicesURL = `${apiPrefix}/archaea/transmembrane_helices`
export const postArchaeaTransmembraneHelicesBatchDownloadURL = `${apiPrefix}/archaea/transmembrane_helice_batch_download`
