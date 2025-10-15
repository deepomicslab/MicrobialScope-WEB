import { Descriptions, Input, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { BasicChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"

const { Title } = Typography

export const AntibioticResistanceGeneModalDetailTitle = () => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: '12px',
            marginBottom: '16px',
        }}
    >
        <Title level={3} style={{ margin: 0, fontWeight: 600, color: '#333', pointerEvents: 'none' }}>
            Antibiotic Resistance Gene Detail
        </Title>
    </Box>
)

const { TextArea } = Input

export const AntibioticResistanceGeneModalDetailDescriptions = ({ record, microbe }) => {
    const items = buildItems(record, microbe)

    return (
        <Stack spacing={2}>
            <Descriptions bordered items={items} column={2}/>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Product
                </Title>
                <TextArea
                    value={record['product'] === 'nan' ? '---' : record['product']}
                    readOnly
                    rows={1}
                />
            </Stack>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Antibiotic
                </Title>
                <TextArea
                    value={record['antibiotic'] === 'nan' ? '---' : record['antibiotic']}
                    readOnly
                    rows={3}
                />
            </Stack>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    SNPs in Best Hit ARO
                </Title>
                <TextArea
                    value={record['snps_in_best_hit_aro'] === 'nan' ? '---' : record['snps_in_best_hit_aro']}
                    readOnly
                    rows={1}
                />
            </Stack>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Other SNPs
                </Title>
                <TextArea
                    value={record['other_snps'] === 'nan' ? '---' : record['other_snps']}
                    readOnly
                    rows={1}
                />
            </Stack>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Sequence
                </Title>
                <TextArea
                    value={record['sequence']}
                    readOnly
                    rows={3}
                />
            </Stack>
        </Stack>
    )
}

const buildItems = (record, microbe) => [
    {
        key: microbeMap[microbe].key,
        label: microbeMap[microbe].label,
        children: <BasicChip value={record[microbeMap[microbe].value]} color="volcano"/>,
    },
    {
        key: 'contigId',
        label: 'Contig ID',
        children: <BasicChip value={record['contig_id']} color="geekblue" />,
    },
    {
        key: 'proteinId',
        label: 'Protein ID',
        children: <BasicChip value={record['protein_id']} color="gold" />,
    },
    {
        key: 'argDatabase',
        label: 'ARG Database',
        children: record['arg_database']
    },
    {
        key: 'cutoff',
        label: 'Cutoff',
        children: <BasicChip value={record['cutoff']} color="purple" />,
    },
    {
        key: 'aro',
        label: 'ARO ID',
        children: record['aro']
    },
    {
        key: 'hspIdentifier',
        label: 'HSP Identifier',
        span: 2,
        children: (
            <div style={{ whiteSpace: 'pre-wrap' }}>{record['hsp_identifier']}</div>
        ),
    },
    {
        key: 'bestHitAro',
        label: 'Best Hit ARO',
        children: record['best_hit_aro']
    },
    {
        key: 'bestIdentities',
        label: 'Best Identity',
        children: record['best_identities']
    },
    {
        key: 'drugClass',
        label: 'Drug Class',
        children: (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {record['drug_class']?.map((cls, idx) => (
                    <BasicChip key={idx} value={cls} color="blue" />
                ))}
            </div>
        ),
        span: 2,
    },
    {
        key: 'resistanceMechanism',
        label: 'Resistance Mechanism',
        children: record['resistance_mechanism'],
        span: 2,
    },
    {
        key: 'amrGeneFamily',
        label: 'AMR Gene Family',
        children: record['amr_gene_family'],
    }
]

const microbeMap = {
    archaea: {
        key: 'archaeaId',
        label: 'Archaea ID',
        value: 'archaea_id'
    },
    bacteria: {
        key: 'bacteriaId',
        label: 'Bacteria ID',
        value: 'bacteria_id'
    },
    fungi: {
        key: 'fungiId',
        label: 'Fungi ID',
        value: 'fungi_id'
    },
    viruses: {
        key: 'virusesId',
        label: 'Viruses ID',
        value: 'viruses_id'
    }
}

export const VirusesAntibioticResistanceGeneModalDetailDescriptions = ({ record, microbe }) => {
    const items = buildVirusesItems(record)

    return (
        <Stack spacing={2}>
            <Descriptions bordered items={items} column={2}/>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Sequence
                </Title>
                <TextArea
                    value={record['sequence']}
                    readOnly
                    rows={3}
                />
            </Stack>
        </Stack>
    )
}

const buildVirusesItems = (record) => [
    {
        key: 'virusesId',
        label: 'Viruses ID',
        children: <BasicChip value={record['viruses_id']} color="volcano"/>,
    },
    {
        key: 'contigId',
        label: 'Contig ID',
        children: <BasicChip value={record['contig_id']} color="geekblue" />,
    },
    {
        key: 'proteinId',
        label: 'Protein ID',
        children: <BasicChip value={record['protein_id']} color="gold" />,
    },
    {
        key: 'elementSymbol',
        label: 'Element symbol',
        children: record['element_symbol'] === '' ? '--' : record['element_symbol']
    },
    {
        key: 'elementName',
        label: 'Element Name',
        children: record['element_name'] === '' ? '--' : record['element_name']
    },
    {
        key: 'scope',
        label: 'Scope',
        children: record['scope'] === '' ? '--' : record['scope']
    },
    {
        key: 'type',
        label: 'Type',
        children: record['type'] === '' ? '--' : record['type']
    },
    {
        key: 'subtype',
        label: 'Subtype',
        children: record['subtype'] === '' ? '--' : record['subtype']
    },
    {
        key: 'class',
        label: 'Class',
        children: record['class'] === '' ? '--' : record['class']
    },
    {
        key: 'subclass',
        label: 'Subclass',
        children: record['subclass'] === '' ? '--' : record['subclass']
    },
    {
        key: 'method',
        label: 'Method',
        children: record['method'] === '' ? '--' : record['method']
    },
    {
        key: 'target_length',
        label: 'Target length',
        children: record['target_length'] === '' ? '--' : record['target_length']
    },
    {
        key: 'reference_sequence_length',
        label: 'Reference sequence length',
        children: record['reference_sequence_length'] === '' ? '--' : record['reference_sequence_length']
    },
    {
        key: 'coverage_of_reference',
        label: '% Coverage of reference',
        children: record['coverage_of_reference'] === '' ? '--' : record['coverage_of_reference']
    },
    {
        key: 'identity_to_reference',
        label: '% Identity to reference',
        children: record['identity_to_reference'] === '' ? '--' : record['identity_to_reference']
    },
    {
        key: 'alignment_length',
        label: 'Alignment length',
        children: record['alignment_length'] === '' ? '--' : record['alignment_length']
    },
    {
        key: 'closest_reference_accessionh',
        label: 'Closest reference accession',
        children: record['closest_reference_accession'] === '' ? '--' : record['closest_reference_accession']
    },
    {
        key: 'closest_reference_name',
        label: 'Closest reference name',
        children: record['closest_reference_name'] === '' ? '--' : record['closest_reference_name']
    },
    {
        key: 'HMM_accession',
        label: 'HMM accession',
        children: record['hmm_accession'] === '' ? '--' : record['hmm_accession']
    },
    {
        key: 'HMM_description',
        label: 'HMM description',
        children: record['hmm_description'] === '' ? '--' : record['hmm_description']
    }
]
