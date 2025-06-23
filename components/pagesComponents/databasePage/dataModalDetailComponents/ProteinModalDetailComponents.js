import { Descriptions, Input, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import {
    BasicChip,
    COGCategoryChips
} from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"
import dynamic from "next/dynamic"

const MolStarWrapper = dynamic(() => import('@/components/pagesComponents/MolStarComponents/MolStarWrapper'), {
    ssr: false,
})

const { Title } = Typography

export const ProteinModalDetailTitle = () => (
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
            Protein Detail
        </Title>
    </Box>
)

const { TextArea } = Input

export const ProteinModalDetailDescriptions = ({ record, microbe }) => {
    const items = buildItems(record, microbe)

    return (
        <>
            <Stack spacing={2}>
                <Descriptions bordered items={items} column={2}/>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        Product
                    </Title>
                    <TextArea
                        value={record['product']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        Description
                    </Title>
                    <TextArea
                        value={record['description']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        GOs
                    </Title>
                    <TextArea
                        value={record['gos']}
                        readOnly
                        rows={3}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        KEGG ko
                    </Title>
                    <TextArea
                        value={record['kegg_ko']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        KEGG Pathway
                    </Title>
                    <TextArea
                        value={record['kegg_pathway']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        KEGG Module
                    </Title>
                    <TextArea
                        value={record['kegg_module']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        KEGG Reaction
                    </Title>
                    <TextArea
                        value={record['kegg_reaction']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        KEGG rclass
                    </Title>
                    <TextArea
                        value={record['kegg_rclass']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        BRITE
                    </Title>
                    <TextArea
                        value={record['brite']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        KEGG TC
                    </Title>
                    <TextArea
                        value={record['kegg_tc']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        CAZy
                    </Title>
                    <TextArea
                        value={record['cazy']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        BiGG Reaction
                    </Title>
                    <TextArea
                        value={record['bigg_reaction']}
                        readOnly
                        rows={1}
                    />
                </Stack>
                <Stack>
                    <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                        PFAMs
                    </Title>
                    <TextArea
                        value={record['pfams']}
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
            <Box
                sx={{
                    width: '100%',
                    height: 480,
                    position: 'relative',
                    mt: '125px'
                }}
            >
                <MolStarWrapper proteinId={record['protein_id']} sequence={record['sequence']}/>
            </Box>
        </>


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
        children: <BasicChip value={record['contig_id']} color="geekblue"/>,
    },
    {
        key: 'proteinId',
        label: 'Protein ID',
        children: <BasicChip value={record['protein_id']} color="gold"/>,
    },
    {
        key: 'orfPredictionSource',
        label: 'ORF Prediction Source',
        children: record['orf_prediction_source']
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
        key: 'strand',
        label: 'Strand',
        children: record['strand'],
    },
    {
        key: 'phase',
        label: 'Phase',
        children: record['phase'],
    },
    {
        key: 'functionPredictionSource',
        label: 'Function Prediction Source',
        children: record['function_prediction_source']
    },
    {
        key: 'cogCategory',
        label: 'COG Category',
        children: <COGCategoryChips COGCategories={record['cog_category']}/>,
    },
    {
        key: 'preferredName',
        label: 'Preferred Name',
        children: record['preferred_name']
    },
    {
        key: 'ec',
        label: 'EC Number',
        children: record['ec']
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
