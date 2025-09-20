import { Stack } from "@mui/system"
import { Progress, Tag, Tooltip, Typography } from "antd"
import Link from "next/link"
import {
    AntibioticResistanceDrugClassChips,
    ArchaeaIDChips, BasicChip, COGCategoryChips,
    DetailButton, DownloadButton, StrandChip
} from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import GTDBPopover from "@/components/pagesComponents/databasePage/_shared/popover/GTDBPopover"

export const archaeaTableColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
        sorter: true,
        fixed: 'left',
        align: 'center',
        render: value => <ArchaeaIDChips archaeaIds={value}/>
    },
    {
        title: 'Organism Name',
        dataIndex: 'organism_name',
        align: 'center',
        render: (value, record) => (
            <Tooltip title={value}>
                <Typography.Link
                    href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${record['taxonomic_id']}`}
                    target='_blank'
                    style={{ width: '175px' }}
                    ellipsis={true}
                >
                    {value}
                </Typography.Link>
            </Tooltip>
        )
    },
    {
        title: 'Taxonomic ID',
        dataIndex: 'taxonomic_id',
        sorter: true,
        align: 'center',
        render: (value) => (
            <Link href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${value}`} target='_blank'>
                {value}
            </Link>
        )
    },
    {
        title: 'Species',
        dataIndex: 'species',
        align: 'center',
        render: (value, record) => (
            <Stack direction="row" spacing={1}>
                <Tooltip title={value}>
                    <Typography.Text
                        ellipsis={true}
                        style={{ width: '175px' }}
                    >
                        {value}
                    </Typography.Text>
                </Tooltip>
                {
                    record?.['gtdb'] ? (
                        <GTDBPopover gtdb={record?.['gtdb']} />
                    ) : (
                        <></>
                    )
                }
            </Stack>
        )
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
        align: 'center',
        width: '250px',
        render: value => (
            <Progress
                percent={value}
                size="small"
                format={(percent) => percent.toFixed(4) + '%'}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068', }}
            />
        )
    },
    {
        title: 'Assembly Level',
        dataIndex: 'assembly_level',
        align: 'center',
        render: value => <BasicChip value={value} color='geekblue'/>
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
        title: 'CheckM Completeness',
        dataIndex: 'checkM_completeness',
        align: 'center',
        render: value => value === 'nan' ? '-': value
    },
    {
        title: 'CheckM Contamination',
        dataIndex: 'checkM_contamination',
        align: 'center',
        render: value => value === 'nan' ? '-': value
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
                    downloadUrl={getSingleFileURL}
                    id={record.id}
                />
            </Stack>
        )
    }
]

export const archaeaProteinTableColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
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
        align: 'center'
    },
    {
        title: 'End',
        dataIndex: 'end',
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]

export const archaeaTRNATableColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]

export const archaeaCRISPRCasColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: ['cas', 'archaea_id'],
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]

export const archaeaAntiCRISPRAnnotationColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]

export const archaeaSecondaryMetaboliteColumns = (handleDetailClick, getSingleFileURL) =>  [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]

export const archaeaSignalPeptideColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]

export const archaeaVirulenceFactorColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]

export const archaeaAntibioticResistanceColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]

export const archaeaTransmembraneHelicesColumns = (handleDetailClick, getSingleFileURL) => [
    {
        title: 'Archaea ID',
        dataIndex: 'archaea_id',
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='volcano'/>
    },
    {
        title: 'Contig ID',
        dataIndex: 'contig_id',
        fixed: 'left',
        align: 'center',
        render: (value) => <BasicChip value={value} color='geekblue'/>
    },
    {
        title: 'Protein ID',
        dataIndex: 'protein_id',
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
        align: 'center'
    },
    {
        title: 'Length',
        dataIndex: 'length',
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
                {/*<DownloadButton*/}
                {/*    downloadUrl={getSingleFileURL}*/}
                {/*    id={record.id}*/}
                {/*/>*/}
            </Stack>
        )
    }
]
