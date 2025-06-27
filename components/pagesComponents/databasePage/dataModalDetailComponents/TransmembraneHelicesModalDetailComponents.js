import { BasicChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import { Descriptions, Input, Table, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"

const { Title } = Typography

export const TransmembraneHelicesModalDetailTitle = () => (
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
            Transmembrane Protein Detail
        </Title>
    </Box>
)

export const TransmembraneHelicesModalDetailDescriptions = ({ record, microbe }) => {
    const items = buildItems(record, microbe)

    return (
        <Stack spacing={2}>
            <Descriptions bordered items={items} column={2}/>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Helices
                </Title>
                <StyledTable
                    rowKey='id'
                    columns={helicesTableColumns}
                    dataSource={record['helices']}
                    pagination={{ defaultPageSize: 5 }}
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
        children: <BasicChip value={record['contig_id']} color="blue"/>,
    },
    {
        key: 'proteinId',
        label: 'Protein ID',
        children: <BasicChip value={record['protein_id']} color="gold"/>,
    },
    {
        key: 'length',
        label: 'Protein Length',
        children: record['length'],
    },
    {
        key: 'predictedTmhCount',
        label: 'Predicted TM Helices',
        children: record['predicted_tmh_count'],
    },
    {
        key: 'source',
        label: 'Prediction Source',
        children: <BasicChip value={record['source']} color="purple"/>,
    },
    {
        key: 'expectedAAsInTmh',
        label: 'Expected AAs in TMH',
        children: record['expected_aas_in_tmh'].toFixed(2),
    },
    {
        key: 'expectedFirst60AAs',
        label: 'Expected in First 60 AAs',
        children: record['expected_first_60_aas'].toFixed(2),
    },
    {
        key: 'totalProbNIn',
        label: 'Total Prob N-in',
        children: record['total_prob_n_in'],
    }
]

const helicesTableColumns = [
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
        align: 'center',
        filters: [
            { text: 'inside', value: 'inside' },
            { text: 'outside', value: 'outside' },
            { text: 'TMhelix', value: 'TMhelix' },
        ],
        onFilter: (value, record) => record.position === value,
    },
    {
        title: 'Start',
        dataIndex: 'start',
        key: 'start',
        align: 'center',
        sorter: (a, b) => a.start - b.start,
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'End',
        dataIndex: 'end',
        key: 'end',
        align: 'center',
        sorter: (a, b) => a.end - b.end,
        sortDirections: ['ascend', 'descend'],
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
