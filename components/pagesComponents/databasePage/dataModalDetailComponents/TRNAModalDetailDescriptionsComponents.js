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

export const TRNAModalDetailDescriptions = ({ record, microbe }) => {
    const items = buildItems(record, microbe)

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

const buildItems = (record, microbe) => [
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
        key: microbeMap[microbe].key,
        label: microbeMap[microbe].label,
        children: <BasicChip value={record[microbeMap[microbe].value]} color="volcano"/>,
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
