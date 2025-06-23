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
    getArchaeaProteinsSingleFileURL,
    getArchaeaSecondaryMetabolitesSingleFileURL,
    getArchaeaSignalPeptidesSingleFileURL,
    getArchaeaTransmembraneHelicesSingleFileURL,
    getArchaeaTRNAsSingleFileURL,
    getArchaeaVirulenceFactorsSingleFileURL
} from "@/dataFetch/get"

export const bacteriaProteinTableColumns = (handleDetailClick) => [
    {
        title: 'Bacteria ID',
        dataIndex: 'bacteria_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: true,
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
        render: (value) => <StrandChip strand={value}/>
    },
    {
        title: 'Phase',
        dataIndex: 'phase',
        sorter: true,
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
                <DownloadButton
                    downloadUrl={getArchaeaProteinsSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const bacteriaTRNATableColumns = (handleDetailClick) => [
    {
        title: 'Bacteria ID',
        dataIndex: 'bacteria_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'tRNA ID',
        dataIndex: 'trna_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'tRNA Type',
        dataIndex: 'trna_type',
        align: 'center',
        sorter: true,
        render: (value) => <BasicChip value={value} color='purple'/>
    },
    {
        title: 'Length',
        dataIndex: 'length',
        sorter: true,
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
                <DownloadButton
                    downloadUrl={getArchaeaTRNAsSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const bacteriaCRISPRCasColumns = (handleDetailClick) => [
    {
        title: 'Bacteria ID',
        dataIndex: ['cas', 'bacteria_id'],
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: ['cas', 'contig_id'],
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Cas ID',
        dataIndex: ['cas', 'cas_id'],
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'CRISPR ID',
        dataIndex: 'crispr_id',
        sorter: true,
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
        dataIndex: 'consensus_prediction',
        align: 'center'
    },
    {
        title: 'CRISPR Start',
        dataIndex: 'crispr_start',
        sorter: true,
        align: 'center',
    },
    {
        title: 'CRISPR End',
        dataIndex: 'crispr_end',
        sorter: true,
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
                <DownloadButton
                    downloadUrl={getArchaeaCRISPRCasSystemsSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const bacteriaAntiCRISPRAnnotationColumns = (handleDetailClick) => [
    {
        title: 'Bacteria ID',
        dataIndex: 'bacteria_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Position',
        dataIndex: 'position',
        align: 'center'
    },
    {
        title: 'Classification',
        dataIndex: 'classification',
        align: 'center',
        render: (value) => <BasicChip value={value} color='purple' />
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
        render: (value) => <StrandChip strand={value} />
    },
    {
        title: 'aa Length',
        dataIndex: 'aa_length',
        sorter: true,
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
                <DownloadButton
                    downloadUrl={getArchaeaAntiCRISPRAnnotationsSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const bacteriaSecondaryMetaboliteColumns = (handleDetailClick) =>  [
    {
        title: 'Bacteria ID',
        dataIndex: 'bacteria_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
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
        align: 'center'
    },
    {
        title: 'End',
        dataIndex: 'end',
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
                <DownloadButton
                    downloadUrl={getArchaeaSecondaryMetabolitesSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const bacteriaSignalPeptideColumns = (handleDetailClick) => [
    {
        title: 'Bacteria ID',
        dataIndex: 'bacteria_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: true,
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
                <DownloadButton
                    downloadUrl={getArchaeaSignalPeptidesSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const bacteriaVirulenceFactorColumns = (handleDetailClick) => [
    {
        title: 'Bacteria ID',
        dataIndex: 'bacteria_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: true,
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
                <DownloadButton
                    downloadUrl={getArchaeaVirulenceFactorsSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const bacteriaAntibioticResistanceColumns = (handleDetailClick) => [
    {
        title: 'Bacteria ID',
        dataIndex: 'bacteria_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: true,
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
                <DownloadButton
                    downloadUrl={getArchaeaAntibioticResistancesSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const bacteriaTransmembraneHelicesColumns = (handleDetailClick) => [
    {
        title: 'Bacteria ID',
        dataIndex: 'bacteria_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='gold'/>
    },
    {
        title: 'Source',
        dataIndex: 'source',
        align: 'center',
        render: (value) => (
            <Link href='https://services.healthtech.dtu.dk/services/TMHMM-2.0/' target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'Number of predicted TMHs',
        dataIndex: 'predicted_tmh_count',
        sorter: true,
        align: 'center'
    },
    {
        title: 'Length',
        dataIndex: 'length',
        sorter: true,
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
                <DownloadButton
                    downloadUrl={getArchaeaTransmembraneHelicesSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]
