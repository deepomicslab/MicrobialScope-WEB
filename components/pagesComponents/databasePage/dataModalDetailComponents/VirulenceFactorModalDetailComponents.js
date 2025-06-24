import { Descriptions, Input, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { BasicChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"

const { Title } = Typography

export const VirulenceFactorModalDetailTitle = () => (
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
            Virulence Factor Detail
        </Title>
    </Box>
)

const { TextArea } = Input

export const VirulenceFactorModalDetailDescriptions = ({ record, microbe }) => {
    const items = microbe !== 'fungi' ? buildItems(record, microbe) : buildFungiItems(record, microbe)

    return (
        <Stack spacing={2}>
            <Descriptions bordered items={items} column={2}/>
            {
                microbe === 'fungi' ? (
                    <FungiTextField record={record} />
                ) : (
                    <>
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
                                Characteristics
                            </Title>
                            <TextArea
                                value={record['characteristics'] === 'nan' ? '---' : record['characteristics']}
                                readOnly
                                rows={3}
                            />
                        </Stack>
                        <Stack>
                            <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                                Structure
                            </Title>
                            <TextArea
                                value={record['structure'] === 'nan' ? '---' : record['structure']}
                                readOnly
                                rows={3}
                            />
                        </Stack>
                        <Stack>
                            <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                                Function
                            </Title>
                            <TextArea
                                value={record['function'] === 'nan' ? '---' : record['function']}
                                readOnly
                                rows={3}
                            />
                        </Stack>
                        <Stack>
                            <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                                Mechanism
                            </Title>
                            <TextArea
                                value={record['mechanism'] === 'nan' ? '---' : record['mechanism']}
                                readOnly
                                rows={3}
                            />
                        </Stack>
                    </>
                )
            }
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Sequence
                </Title>
                <TextArea
                    value={record['sequence'] === 'nan' ? '---' : record['sequence']}
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
        key: 'vfCategory',
        label: 'VF Category',
        children: <BasicChip value={record['vf_category']} color="purple" />,
    },
    {
        key: 'vfDatabase',
        label: 'VF Database',
        children: record['vf_database'],
    },
    {
        key: 'vfseqId',
        label: 'VFSeq ID',
        children:record['vfseq_id'],
    },
    {
        key: 'identity',
        label: 'Identity',
        children: record['identity'],
    },
    {
        key: 'evalue',
        label: 'E-value',
        children: record['e_value'],
    },
    {
        key: 'geneName',
        label: 'Gene Name',
        children: record['gene_name'],
    },
    {
        key: 'vfId',
        label: 'VF ID',
        children: record['vf_id'],
    },
    {
        key: 'vfName',
        label: 'VF Name',
        children: record['vf_name'],
    },
    {
        key: 'VF_FullName',
        label: 'VF FullName',
        children: record['vf_fullname']
    },
    {
        key: 'vfcId',
        label: 'VFC ID',
        children: record['vfc_id'],
    }
]

const buildFungiItems = (record, microbe) => [
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
        key: 'vfDatabase',
        label: 'VF Database',
        children: record['vf_database'],
    },
    {
        key: 'uniProtId',
        label: 'Uni Prot ID',
        children:record['uni_prot_id'],
    },
    {
        key: 'identity',
        label: 'Identity',
        children: record['identity'],
    },
    {
        key: 'evalue',
        label: 'E-value',
        children: record['e_value'],
    },
    {
        key: 'geneSymbol',
        label: 'Gene Symbol',
        children: record['gene_symbol'],
    },
    {
        key: 'organism',
        label: 'Organism',
        children: record['organism'],
    },
    {
        key: 'taxonomyId',
        label: 'Taxonomy Id',
        children: record['taxonomy_id']
    },
    {
        key: 'diseaseKey',
        label: 'Disease Key',
        children: record['disease_key']
    }
]

const FungiTextField = ({record}) => (
    <>
        <Stack>
            <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                Disease Host
            </Title>
            <TextArea
                value={record['disease_host'] === 'nan' ? '---' : record['disease_host']}
                readOnly
                rows={1}
            />
        </Stack>
        <Stack>
            <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                Disease
            </Title>
            <TextArea
                value={record['disease'] === 'nan' ? '---' : record['disease']}
                readOnly
                rows={3}
            />
        </Stack>
    </>
)

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

