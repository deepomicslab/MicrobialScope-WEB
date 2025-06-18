import { Descriptions, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { Input } from 'antd'
import { BasicChip, StrandChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"

const { Title } = Typography

export const TRNAModalDetailTitle = () => (
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
            tRNA Detail
        </Title>
    </Box>
)

const { TextArea } = Input

export const TRNAModalDetailDescriptions = ({ record }) => {
    const items = buildItems(record)

    return (
        <Stack spacing={2}>
            <Descriptions bordered items={items} column={2}/>
            <TextArea
                value={record['sequence']}
                readOnly
                rows={8}
            />
        </Stack>
    )
}

const buildItems = (record) => [
    {
        key: 'tRNAId',
        label: 'tRNA ID',
        children: <BasicChip value={record['trna_id']} color='gold'/>
    },
    {
        key: 'tRNAType',
        label: 'tRNA Type',
        children: <BasicChip value={record['trna_type']} color='purple'/>,
    },
    {
        key: 'archaeaId',
        label: 'Archaea ID',
        children: <BasicChip value={record['archaea_id']} color='volcano'/>
    },
    {
        key: 'contigId',
        label: 'Contig ID',
        children: <BasicChip value={record['contig_id']} color='geekblue'/>
    },
    {
        key: 'strand',
        label: 'Strand',
        children: <StrandChip strand={record['strand']} />
    },
    {
        key: 'length',
        label: 'Length',
        children: record['length']
    },
    {
        key: 'start',
        label: 'Start',
        children: record['start']
    },
    {
        key: 'end',
        label: 'End',
        children: record['end']
    }
]
