import { Descriptions, Input, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { BasicChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"

const { Title } = Typography

export const CRISPRCasSystemModalDetailTitle = () => (
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
            CRISPR/Cas System Detail
        </Title>
    </Box>
)

const { TextArea } = Input

export const CRISPRCasSystemModalDetailDescriptions = ({ record }) => {
    const CRISPRItems = buildCRISPRItems(record)
    const CasItems = buildCasItems(record)

    return (
        <Stack spacing={2}>
            <Descriptions bordered items={CRISPRItems} column={2} title={'CRISPR Detail'}/>
            <Descriptions bordered items={CasItems} column={2} title={'Cas Detail'}/>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Consensus Repeat Sequence
                </Title>
                <TextArea
                    value={record['repeat_sequence']}
                    readOnly
                    rows={3}
                />
            </Stack>
        </Stack>
    )
}

const buildCRISPRItems = (record) => [
    {
        key: 'crisprId',
        label: 'CRISPR ID',
        children: <BasicChip value={record['crispr_id']} color='purple'/>,
    },
    {
        key: 'crisprSubtype',
        label: 'CRISPR Subtype',
        children: record['crispr_subtype']
    },
    {
        key: 'crisprStart',
        label: 'CRISPR Start',
        children: record['crispr_start']
    },
    {
        key: 'crisprEnd',
        label: 'CRISPR End',
        children: record['crispr_end']
    }
]

const buildCasItems = (record) => [
    {
        key: 'archaeaId',
        label: 'Archaea ID',
        children: <BasicChip value={record['cas']['archaea_id']} color='volcano'/>
    },
    {
        key: 'contigId',
        label: 'Contig ID',
        children: <BasicChip value={record['cas']['contig_id']} color='geekblue'/>
    },
    {
        key: 'casId',
        label: 'Cas ID',
        children: <BasicChip value={record['cas']['cas_id']} color='gold'/>
    },
    {
        key: 'consensus_prediction',
        label: 'CRISPR-Cas Consenus Prediction',
        children: record['cas']['consensus_prediction']
    },
    {
        key: 'casSubtype',
        label: 'CRISPR Subtype',
        span: 2,
        labelStyle: {
            whiteSpace: 'nowrap',
        },
        children: record['cas']['cas_subtype'].join(' or ')
    },
    {
        key: 'casStart',
        label: 'Cas Start',
        children: record['cas']['cas_start']
    },
    {
        key: 'casEnd',
        label: 'Cas End',
        children: record['cas']['cas_end']
    },
    {
        key: 'casGenes',
        label: 'Cas Genes',
        children: <CasGenes casGenes={record['cas']['cas_genes']}/>
    }
]

const CasGenes = ({ casGenes }) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {
            casGenes.map(
                (gene, index) => <BasicChip key={index} value={gene} color='cyan'/>
            )
        }
    </Box>
)
