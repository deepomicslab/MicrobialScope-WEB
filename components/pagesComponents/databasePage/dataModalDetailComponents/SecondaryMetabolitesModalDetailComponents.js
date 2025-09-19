import { Descriptions, Input, Progress, Typography } from "antd"
import { Box, Stack } from "@mui/system"
import { BasicChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"

const { Title } = Typography

export const SecondaryMetabolitesModalDetailTitle = () => (
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
            Secondary Metabolite Biosynthetic Cluster Detail
        </Title>
    </Box>
)

const { TextArea } = Input

export const SecondaryMetabolitesModalDetailDescriptions = ({ record, microbe }) => {
    const items = buildItems(record, microbe)

    return (
        <Stack spacing={2}>
            <Descriptions bordered items={items} column={2}/>
            <Stack>
                <Title level={5} style={{ margin: 0, marginBottom: '20px' }}>
                    Most similar known cluster
                </Title>
                <TextArea
                    value={record['most_similar_cluster']}
                    readOnly
                    rows={3}
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
        children: <BasicChip value={record['contig_id']} color="geekblue" />,
    },
    {
        key: 'region',
        label: 'Region',
        children: <BasicChip value={record['region']} color="gold" />,
    },
    {
        key: 'source',
        label: 'Source',
        children: record['source'],
    },
    {
        key: 'similarity',
        label: 'Similarity',
        children: <SimilarityProgress similarity={record['similarity']}/>,
    },
    {
        key: 'type',
        label: 'Type',
        children: (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {record['type']?.map((item, index) => (
                    <BasicChip key={index} value={item} color="cyan" />
                ))}
            </div>
        )
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
    }
]

const SimilarityProgress = ({similarity}) => {
    const isInvalid = similarity === '-'

    return (
        <Box sx={{ width: '250px' }}>
            <Progress
                percent={isInvalid ? 0 : parseFloat(similarity.replace('%', ''))}
                size="small"
                format={() => (isInvalid ? '--%' : similarity)}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            />
        </Box>
    )
}

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
