import {
    AntibioticResistanceDrugClassChips,
    BasicChip,
    COGCategoryChips, DetailButton, DownloadButton, StrandChip
} from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import Link from "next/link"
import { Progress, Tag, Tooltip, Typography } from "antd"
import { Stack } from "@mui/system"
import {
    getArchaeaAntibioticResistancesSingleFileURL,
    getArchaeaAntiCRISPRAnnotationsSingleFileURL,
    getArchaeaCRISPRCasSystemsSingleFileURL,
    getArchaeaSecondaryMetabolitesSingleFileURL,
    getArchaeaSignalPeptidesSingleFileURL,
    getArchaeaTransmembraneHelicesSingleFileURL,
    getArchaeaTRNAsSingleFileURL, getArchaeaVirulenceFactorsSingleFileURL
} from "@/dataFetch/get"

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

export const buildTRNAsTableColumns = (handleDetailClick) => [
    {
        title: 'tRNA ID',
        dataIndex: 'trna_id',
        sorter: (a, b) => a.trna_id.localeCompare(b.trna_id),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'tRNA Type',
        dataIndex: 'trna_type',
        align: 'center',
        sorter: (a, b) => a.trna_type.localeCompare(b.trna_type),
        render: (value) => <BasicChip value={value} color='purple'/>
    },
    {
        title: 'Length',
        dataIndex: 'length',
        sorter: (a, b) => a.length - b.length,
        align: 'center'
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

export const buildCRISPRCasTableColumns = (handleDetailClick) => [
    {
        title: 'Cas ID',
        dataIndex: ['cas', 'cas_id'],
        sorter: (a, b) => a.cas['cas_id'].localeCompare(b.cas['cas_id']),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'CRISPR ID',
        dataIndex: 'crispr_id',
        sorter: (a, b) => a['crispr_id'].localeCompare(b['crispr_id']),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='purple'/>
    },
    {
        title: 'CRISPR Subtype',
        dataIndex: 'crispr_subtype',
        align: 'center'
    },
    {
        title: 'Cas Subtype',
        dataIndex: ['cas', 'cas_subtype'],
        align: 'center',
        render: (value) => value.join(' or ')
    },
    {
        title: 'CRISPR-Cas Consenus Prediction',
        dataIndex: ['cas', 'consensus_prediction'],
        align: 'center'
    },
    {
        title: 'CRISPR Start',
        dataIndex: 'crispr_start',
        sorter: (a, b) => a.start - b.start,
        align: 'center'
    },
    {
        title: 'CRISPR End',
        dataIndex: 'crispr_end',
        sorter: (a, b) => a.end - b.end,
        align: 'center'
    },
    {
        title: 'Consensus Repeat Sequence',
        dataIndex: 'repeat_sequence',
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

export const buildAntiCRISPRTableColumns = (handleDetailClick) => [
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: (a, b) => a.protein_id.localeCompare(b.protein_id),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Position',
        dataIndex: 'position',
        align: 'center',
        sorter: (a, b) => a.position - b.position
    },
    {
        title: 'Classification',
        dataIndex: 'classification',
        align: 'center',
        sorter: (a, b) => a.classification.localeCompare(b.classification),
        render: (value) => <BasicChip value={value} color='purple' />
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
        sorter: (a, b) => a.strand - b.strand,
        render: (value) => <StrandChip strand={value} />
    },
    {
        title: 'aa Length',
        dataIndex: 'aa_length',
        sorter: (a, b) => a.aa_length - b.aa_length,
        align: 'center',
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

export const buildSecondaryMetabolitesTableColumns = (handleDetailClick) => [
    {
        title: 'Region',
        dataIndex: 'region',
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Source',
        dataIndex: 'source',
        align: 'center',
        render: (value) => (
            <Link href='https://antismash.secondarymetabolites.org/#!/download' target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'Similarity',
        dataIndex: 'similarity',
        align: 'center',
        width: '200px',
        render: value => {
            const isInvalid = value === '-'

            return (
                <Progress
                    percent={isInvalid ? 0 : parseFloat(value.replace('%', ''))}
                    size="small"
                    format={() => (isInvalid ? '--%' : value)}
                    strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                />
            )
        }
    },
    {
        title: 'Type',
        dataIndex: 'type',
        align: 'center',
        render: (values) => (
            values.map(
                value => <Tag key={value} color='purple'>{value}</Tag>
            )
        )
    },
    {
        title: 'Start',
        dataIndex: 'start',
        align: 'center',
        sorter: (a, b) => a.start - b.start,
    },

    {
        title: 'End',
        dataIndex: 'end',
        align: 'center',
        sorter: (a, b) => a.end - b.end,
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

export const buildSignalPeptidesTableColumns = (handleDetailClick) => [
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: (a, b) => a.protein_id.localeCompare(b.protein_id),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Source',
        dataIndex: 'source',
        align: 'center',
        render: (value) => (
            <Link href='https://dtu.biolib.com/SignalP-6' target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'Prediction',
        dataIndex: 'prediction',
        align: 'center',
        render: (value) => <BasicChip value={value} color='purple'/>
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

export const buildVirulenceFactorsTableColumns = (handleDetailClick) => [
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: (a, b) => a.protein_id.localeCompare(b.protein_id),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'VF Database',
        dataIndex: 'vf_database',
        align: 'center',
        render: (value) => (
            <Link href='https://www.mgc.ac.cn/cgi-bin/VFs/v5/main.cgi' target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'Vfcategory',
        dataIndex: 'vf_category',
        align: 'center',
        render: (value) => <BasicChip value={value} color='purple'/>
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

export const buildAntibioticResistanceTableColumns = (handleDetailClick) => [
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: (a, b) => a.protein_id.localeCompare(b.protein_id),
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'ARG Database',
        dataIndex: 'arg_database',
        align: 'center',
        render: (value) => (
            <Link href='https://card.mcmaster.ca/' target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'Cut Off',
        dataIndex: 'cutoff',
        align: 'center',
        render: (value) => <BasicChip value={value} color='purple'/>
    },
    {
        title: 'Drug Class',
        dataIndex: 'drug_class',
        align: 'center',
        render: (value) => <AntibioticResistanceDrugClassChips drugClasses={value} color='blue' />
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

export const buildTransmembraneHelicesTableColumns = (handleDetailClick) => [
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        fixed: 'left',
        align: 'center',
        sorter: (a, b) => a['protein_id'].localeCompare(b['protein_id']),
        render: (value) => <BasicChip value={value} color='gold' />
    },
    {
        title: 'Source',
        dataIndex: 'source',
        align: 'center',
        sorter: (a, b) => a.source.localeCompare(b.source),
        render: (value) => (
            <Link href='https://services.healthtech.dtu.dk/services/TMHMM-2.0/' target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'Number of predicted TMHs',
        dataIndex: 'predicted_tmh_count',
        align: 'center',
        sorter: (a, b) => a['predicted_tmh_count'] - b['predicted_tmh_count']
    },
    {
        title: 'Length',
        dataIndex: 'length',
        align: 'center',
        sorter: (a, b) => a.length - b.length
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
