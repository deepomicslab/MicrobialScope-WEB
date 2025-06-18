import { Descriptions, Input, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { BasicChip, StrandChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"

const { Title } = Typography

export const AntiCRISPRAnnotationModalDetailTitle = () => (
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
            Anti-CRISPR Protein Detail
        </Title>
    </Box>
)

const { TextArea } = Input

export const AntiCRISPRAnnotationModalDetailDescriptions = ({ record }) => {
    const items = buildItems(record)

    return (
        <Stack spacing={2}>
            <Descriptions bordered items={items} column={2}/>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Acr/Aca
                </Title>
                <TextArea
                    value={record['acr_aca']}
                    readOnly
                    rows={1}
                />
            </Stack>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    MGE/Prophage MetaData
                </Title>
                <TextArea
                    value={record['mge_metadata']}
                    readOnly
                    rows={1}
                />
            </Stack>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Acr_Hit|pident
                </Title>
                <TextArea
                    value={record['acr_hit_pident']}
                    readOnly
                    rows={1}
                />
            </Stack>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Self Target w/in 5000 BP
                </Title>
                <TextArea
                    value={record['self_target_within_5kb']}
                    readOnly
                    rows={1}
                />
            </Stack>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Self Target Outside 5000 BP
                </Title>
                <TextArea
                    value={record['self_target_outside_5kb']}
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

const buildItems = (record) => [
    {
        key: 'proteinId',
        label: 'Protein ID',
        children: <BasicChip value={record['protein_id']} color="gold" />,
    },
    {
        key: 'position',
        label: 'Position',
        children: record['position'],
    },
    {
        key: 'archaeaId',
        label: 'Archaea ID',
        children: <BasicChip value={record['archaea_id']} color="volcano" />,
    },
    {
        key: 'contigId',
        label: 'Contig ID',
        children: <BasicChip value={record['contig_id']} color="geekblue" />,
    },
    {
        key: 'strand',
        label: 'Strand',
        children: <StrandChip strand={record['strand']} />,
    },
    {
        key: 'classification',
        label: 'Classification',
        children: <BasicChip value={record['classification']} color="purple" />,
    },
    {
        key: 'start',
        label: 'Start',
        children: record['start'],
    },
    {
        key: 'end',
        label: 'End',
        children: record['end'],
    },
    {
        key: 'aaLength',
        label: 'AA Length',
        children: record['aa_length'],
    }
]
