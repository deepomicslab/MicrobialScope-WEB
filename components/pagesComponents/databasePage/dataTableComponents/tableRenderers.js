import { Button, Dropdown, Tag, Tooltip } from "antd"
import { DownloadOutlined, EyeOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Box, Stack } from "@mui/system"
import { downloadSingleFile } from "@/dataFetch/get"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import Link from "next/link"
import { useDatabaseContext } from "@/components/context/DatabaseContext"

export const DetailButton = ({ handleClick }) => (
    <Tooltip title='View Details'>
        <Button
            shape='circle'
            color='danger'
            variant='filled'
            icon={<EyeOutlined/>}
            onClick={handleClick}
        />
    </Tooltip>
)

const buildDownloadButtonDropdownItems = (downloadUrl, id, dataType, microbe, magStatus) => dataType === 'genomes' ? (
    [
        {
            key: '1',
            label: (
                <Box
                    onClick={
                        () => downloadSingleFile(
                            `${downloadUrl}?id=${id}&type=meta`
                        )
                    }
                >
                    Download Meta
                </Box>
            )
        },
        {
            key: '2',
            label: (
                <Box
                    onClick={
                        () => downloadSingleFile(
                            `${downloadUrl}?id=${id}&type=fasta`
                        )
                    }
                >
                    Download FASTA
                </Box>
            )
        },
        {
            key: '3',
            label: (
                <Box
                    onClick={
                        () => downloadSingleFile(
                            `${downloadUrl}?id=${id}&type=gbk`
                        )
                    }
                >
                    Download GBK
                </Box>
            ),
            disabled: microbe === 'bacteria' && magStatus === 'unMAG'
        },
        {
            key: '4',
            label: (
                <Box
                    onClick={
                        () => downloadSingleFile(
                            `${downloadUrl}?id=${id}&type=gff3`
                        )
                    }
                >
                    Download GFF3
                </Box>
            ),
            disabled: microbe === 'bacteria' && magStatus === 'unMAG'
        }
    ]
) : (
    [
        {
            key: '1',
            label: (
                <Box
                    onClick={
                        () => downloadSingleFile(
                            `${downloadUrl}?id=${id}&type=meta`
                        )
                    }
                >
                    Download Meta
                </Box>
            )
        },
    ]
)

export const DownloadButton = ({ downloadUrl, id }) => {
    const { dataType, dataTableState } = useDatabaseContext()
    const { microbe, magStatus } = dataTableState
    const items = buildDownloadButtonDropdownItems(downloadUrl, id, dataType, microbe, magStatus)

    return (
        <Dropdown menu={{ items }} placement='bottomRight' arrow>
            <Button shape='circle' color='cyan' variant='filled' icon={<DownloadOutlined/>}/>
        </Dropdown>
    )
}

export const BasicChip = ({ value, color }) => (
    <Tag
        style={{
            borderRadius: '20px',
            padding: '2px 8px',
            cursor: 'default',
        }}
        color={color}
    >
        {value}
    </Tag>
)

export const ArchaeaIDChips = ({ archaeaIds }) => (
    <Stack direction='row' alignItems='center'>
        {
            archaeaIds.map(
                archaeaId => (
                    <Link
                        href={`https://www.ncbi.nlm.nih.gov/datasets/genome/${archaeaId}/`}
                        target='_blank'
                        key={archaeaId}
                    >
                        <Tag
                            style={{
                                borderRadius: '20px',
                                padding: '2px 8px'
                            }}
                            color="volcano"
                        >
                            {archaeaId}
                        </Tag>
                    </Link>
                )
            )
        }
    </Stack>
)

export const AntibioticResistanceDrugClassChips = ({ drugClasses, color }) => {
    const shouldCollapse = drugClasses.length > 3
    const visible = shouldCollapse ? drugClasses.slice(0, 2) : drugClasses
    const hiddenCount = shouldCollapse ? drugClasses.length - 2 : 0

    return (
        <Stack direction='row' alignItems='center' justifyContent='center' sx={{ flexWrap: 'wrap' }}>
            {
                visible.map(
                    drugClassId => (
                        <Tag
                            key={drugClassId}
                            style={{
                                cursor: 'default',
                                margin: '2px'
                            }}
                            color={color}
                        >
                            {drugClassId}
                        </Tag>
                    )
                )
            }
            {
                hiddenCount > 0 && (
                    <Tag
                        style={{
                            cursor: 'default',
                        }}
                        color={color}
                    >
                        +{hiddenCount} Drug Class{hiddenCount > 1 ? 'es' : ''}
                    </Tag>
                )
            }
        </Stack>
    )
}

export const StrandChip = ({ strand }) => (
    <Tag
        style={{
            borderRadius: '20px',
            padding: '2px 8px',
            cursor: 'default'
        }}
        color={strand === 0 ? 'blue' : 'red'}
    >
        <Stack direction='row' spacing={0.5}>
            <Span>{strand === 0 ? <PlusOutlined/> : <MinusOutlined/>}</Span>
            <Span>{strand === 0 ? 'Forward' : 'Reverse'}</Span>
        </Stack>
    </Tag>
)

export const COGCategoryChips = ({ COGCategories }) => {
    if (!COGCategories) {
        return (
            <Tooltip title='No COG Category Info'>
                <Tag color='purple'>
                    --
                </Tag>
            </Tooltip>
        )
    }

    return (
        <Stack direction='row' justifyContent='center' spacing={0.5}>
            {COGCategories.map((letter) => {
                const desc = COGCategoryDict[letter] || 'Unknown'
                return (
                    <Tooltip title={desc} key={letter}>
                        <Tag
                            color='purple'
                            style={{
                                width: '25px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            {letter}
                        </Tag>
                    </Tooltip>
                )
            })}
        </Stack>
    )
}

export const COGCategoryDict = {
    J: 'Translation, ribosomal structure and biogenesis',
    A: 'RNA processing and modification',
    K: 'Transcription',
    L: 'Replication, recombination and repair',
    B: 'Chromatin structure and dynamics',
    D: 'Cell cycle control, cell division, chromosome partitioning',
    Y: 'Nuclear structure',
    V: 'Defense mechanisms',
    T: 'Signal transduction mechanisms',
    M: 'Cell wall/membrane/envelope biogenesis',
    N: 'Cell motility',
    Z: 'Cytoskeleton',
    W: 'Extracellular structures',
    U: 'Intracellular trafficking, secretion, and vesicular transport',
    O: 'Posttranslational modification, protein turnover, chaperones',
    X: 'Mobilome: prophages, transposons',
    C: 'Energy production and conversion',
    G: 'Carbohydrate transport and metabolism',
    E: 'Amino acid transport and metabolism',
    F: 'Nucleotide transport and metabolism',
    H: 'Coenzyme transport and metabolism',
    I: 'Lipid transport and metabolism',
    P: 'Inorganic ion transport and metabolism',
    Q: 'Secondary metabolites biosynthesis, transport and catabolism',
    R: 'General function prediction only',
    S: 'Function unknown',
    '': '-',
}
