import { Stack } from "@mui/system"
import { Button } from "antd"
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons"
import Link from "next/link"

const DetailButton = ({ url }) => (
    <Link href={url}>
        <Button
            color="primary"
            variant="dashed"
            icon={<EyeOutlined/>}
        >
            Detail
        </Button>
    </Link>
)

const DownloadButton = () => (
    <Button
        color='cyan'
        variant="dashed"
        icon={<DownloadOutlined/>}
    >
        Download
    </Button>
)

export const archaeaTableColumns = [
    {
        title: 'Archaea ID GCA',
        dataIndex: 'archaea_id_GCA',
        sorter: true,
        fixed: 'left',
        align: 'center'
    },
    {
        title: 'Archaea ID GCF',
        dataIndex: 'archaea_id_GCF',
        sorter: true,
        fixed: 'left',
        align: 'center'
    },
    {
        title: 'Organism Name',
        dataIndex: 'organism_name',
        align: 'center'
    },
    {
        title: 'Taxonomic ID',
        dataIndex: 'taxonomic_id',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Species',
        dataIndex: 'species',
        align: 'center'
    },
    {
        title: 'Total Sequence Length',
        dataIndex: 'total_sequence_length',
        sorter: true,
        align: 'center'
    },
    {
        title: 'GC Content',
        dataIndex: 'gc_content',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Assembly Level',
        dataIndex: 'assembly_level',
        align: 'center'
    },
    {
        title: 'Total Number of Chromosomes',
        dataIndex: 'total_chromosomes',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Contig N50',
        dataIndex: 'contig_n50',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Scaffold N50',
        dataIndex: 'scaffold_n50',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        align: 'center',
        render: (_, record) => (
            <Stack direction="row" spacing={2}>
                <DetailButton url={'/database/archaea/genomes'}/>
                <DownloadButton/>
            </Stack>
        )
    }
]

export const archaeaProteinTableColumns = [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
        sorter: true,
        fixed: 'left',
        align: 'center'
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center'
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: true,
        fixed: 'left',
        align: 'center'
    },
    {
        title: 'Orf Prediction Source',
        dataIndex: 'orf_prediction_source',
        align: 'center'
    },
    {
        title: 'Start',
        dataIndex: 'start',
        sorter: true,
        align: 'center'
    },
    {
        title: 'End',
        dataIndex: 'end',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Strand',
        dataIndex: 'strand',
        align: 'center',
        render: (value) => value === 0 ? '+' : '-'
    },
    {
        title: 'Phase',
        dataIndex: 'phase',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Product',
        dataIndex: 'product',
        align: 'center'
    },
    {
        title: 'Function Prediction Source',
        dataIndex: 'function_prediction_source',
        align: 'center'
    },
    {
        title: 'COG Category',
        dataIndex: 'cog_category',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Preferred Name',
        dataIndex: 'preferred_name',
        align: 'center'
    },
    {
        title: 'EC',
        dataIndex: 'ec',
        align: 'center'
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        align: 'center',
        render: (_, record) => (
            <Stack direction="row" spacing={2}>
                <DetailButton url={'/database/archaea/genomes'}/>
                <DownloadButton/>
            </Stack>
        )
    }
]
