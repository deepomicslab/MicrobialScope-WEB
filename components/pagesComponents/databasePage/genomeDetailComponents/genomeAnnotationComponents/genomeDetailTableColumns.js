import {
    BasicChip,
    COGCategoryChips, DetailButton, StrandChip
} from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import Link from "next/link"
import { Tooltip, Typography } from "antd"
import { Stack } from "@mui/system"

export const buildProteinsTableColumns = (handleDetailClick) => [
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: (a, b) => a['protein_id'].localeCompare(b['protein_id']),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Orf Prediction Source',
        dataIndex: 'orf_prediction_source',
        align: 'center',
        render: (value) => (
            <Link href='https://github.com/hyattpd/Prodigal' target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'Function Prediction Source',
        dataIndex: 'function_prediction_source',
        align: 'center',
        render: (value) => (
            <Link href='https://github.com/eggnogdb/eggnog-mapper' target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'COG Category',
        dataIndex: 'cog_category',
        align: 'center',
        render: (value) => <COGCategoryChips COGCategories={value}/>
    },
    {
        title: 'Product',
        dataIndex: 'product',
        align: 'center',
        render: (value) => (
            <Tooltip title={value}>
                <Typography.Text
                    ellipsis={true}
                    style={{ width: '200px' }}
                >
                    {value}
                </Typography.Text>
            </Tooltip>
        )
    },
    {
        title: 'Start',
        dataIndex: 'start',
        sorter: (a, b) => a.start - b.start,
        align: 'center'
    },
    {
        title: 'End',
        dataIndex: 'end',
        sorter: (a, b) => a.end - b.end,
        align: 'center'
    },
    {
        title: 'Strand',
        dataIndex: 'strand',
        align: 'center',
        filters: [
            { text: 'Forward', value: 0 },
            { text: 'Reverse', value: 1 },
        ],
        onFilter: (value, record) => record.strand === value,
        render: (value) => <StrandChip strand={value}/>
    },
    {
        title: 'Phase',
        dataIndex: 'phase',
        sorter: (a, b) => a['phase'] - b['phase'],
        align: 'center'
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        align: 'center',
        render: (_, record) => (
            <Stack direction="row" spacing={2} justifyContent='center'>
                <DetailButton handleClick={() => handleDetailClick(record)}/>
            </Stack>
        )
    }
]
