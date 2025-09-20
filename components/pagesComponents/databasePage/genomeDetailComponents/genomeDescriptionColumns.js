import { ArchaeaIDChips, BasicChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import { Progress, Tooltip, Typography } from "antd"
import Link from "next/link"
import { Box } from "@mui/system"

export const buildArchaeaGenomeDetailItems = (genomeDetail, microbe) => [
    {
        key: keyMap[microbe].key,
        label: keyMap[microbe].label,
        span: 2,
        children: <ArchaeaIDChips archaeaIds={genomeDetail[keyMap[microbe].key]}/>
    },
    {
        key: 'organism_name',
        label: 'Organism Name',
        children: (
            <Tooltip title={genomeDetail['organism_name']}>
                <Typography.Link
                    href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${genomeDetail['taxonomic_id']}`}
                    target='_blank'
                    style={{ width: '175px' }}
                    ellipsis={true}
                >
                    {genomeDetail['organism_name']}
                </Typography.Link>
            </Tooltip>
        )
    },
    {
        key: 'taxonomic_id',
        label: 'Taxonomic ID',
        children: (
            <Link
                href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${genomeDetail['taxonomic_id']}`}
                target='_blank'
            >
                {genomeDetail['taxonomic_id']}
            </Link>
        )
    },
    {
        key: 'species',
        label: 'Species',
        children: (
            <Tooltip title={genomeDetail['species']}>
                <Typography.Text
                    ellipsis={true}
                    style={{ width: '175px' }}
                >
                    {genomeDetail['species']}
                </Typography.Text>
            </Tooltip>
        )
    },
    {
        key: 'total_sequence_length',
        label: 'Total Sequence Length',
        children: genomeDetail['total_sequence_length']
    },
    {
        key: 'gc_content',
        label: 'GC Content',
        children: (
            <Box sx={{ width: '250px' }}>
                <Progress
                    percent={genomeDetail['gc_content']}
                    size="small"
                    format={(percent) => percent.toFixed(4) + '%'}
                    strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }}
                />
            </Box>
        )
    },
    {
        key: 'assembly_level',
        label: 'Assembly Level',
        children: <BasicChip value={genomeDetail['assembly_level']} color='geekblue'/>
    },
    {
        key: 'total_chromosomes',
        label: 'Total Chromosomes',
        children: genomeDetail['total_chromosomes']
    },
    {
        key: 'contig_n50',
        label: 'Contig N50',
        children: genomeDetail['contig_n50']
    },
    {
        key: 'scaffold_n50',
        label: 'Scaffold N50',
        children: genomeDetail['scaffold_n50']
    },
    {
        key: 'protein_count',
        label: '# of Proteins',
        children: genomeDetail['protein_count']
    },
    {
        key: 'trna_count',
        label: '# of tRNAs',
        children: genomeDetail['trna_count']
    },
    {
        key: 'crispr_count',
        label: '# of CRISPR/Cas Systems',
        children: genomeDetail['crispr_count'] === undefined ? '--' : genomeDetail['crispr_count']
    },
    {
        key: 'anti_crispr_count',
        label: '# of Anti-CRISPR Proteins',
        children: genomeDetail['anti_crispr_count'] === undefined ? '--' : genomeDetail['anti_crispr_count']
    },
    {
        key: 'secondary_metabolite_count',
        label: '# of Secondary Metabolite Biosynthetic Cluster',
        children: genomeDetail['secondary_metabolite_count'] === undefined ? '--' : genomeDetail['secondary_metabolite_count']
    },
    {
        key: 'signal_peptide_count',
        label: '# of Signal Peptides',
        children: genomeDetail['signal_peptide_count'] === undefined ? '--' : genomeDetail['signal_peptide_count']
    },
    {
        key: 'virulence_factor_count',
        label: '# of Virulence Factors',
        children: genomeDetail['virulence_factor_count']
    },
    {
        key: 'arg_count',
        label: '# of Antibiotic Resistance Genes',
        children: genomeDetail['arg_count'] === null ? '--' : genomeDetail['arg_count']
    },
    {
        key: 'tmh_count',
        label: '# of Transmembrane Proteins',
        children: genomeDetail['tmh_count']
    },
]

const keyMap = {
    archaea: {
        key: 'archaea_id',
        label: 'Archaea ID'
    },
    bacteria: {
        key: 'bacteria_id',
        label: 'Bacteria ID'
    },
    fungi: {
        key: 'fungi_id',
        label: 'Fungi ID'
    },
    viruses: {
        key: 'viruses_id',
        label: 'Viruses ID'
    }
}
