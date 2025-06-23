import { Descriptions, Input, Typography } from "antd"
import { Box } from "@mui/system"
import { BasicChip } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"

const { Title } = Typography

export const SignalPeptideModalDetailTitle = () => (
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
            Signal Peptide Detail
        </Title>
    </Box>
)

export const SignalPeptideModalDetailDescriptions = ({ record, microbe }) => {
    const items = buildItems(record, microbe)

    return (
        <Descriptions bordered items={items} column={2}/>
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
        key: 'proteinId',
        label: 'Protein ID',
        children: <BasicChip value={record['protein_id']} color="gold" />,
    },
    {
        key: 'source',
        label: 'Source',
        children: record['source'],
    },
    {
        key: 'prediction',
        label: 'Prediction',
        children: <BasicChip value={record['prediction']} color="purple" />,
    },
    {
        key: 'other',
        label: 'OTHER',
        children: record['other'],
    },
    {
        key: 'spSecSpi',
        label: 'SP(Sec/SPI)',
        children: record['sp_sec_spi'],
    },
    {
        key: 'lipoSecSpii',
        label: 'LIPO(Sec/SPII)',
        children: record['lipo_sec_spii'],
    },
    {
        key: 'tatTatSpi',
        label: 'TAT(Tat/SPI)',
        children: record['tat_tat_spi'],
    },
    {
        key: 'tatLipoTatSpii',
        label: 'TATLIPO(Tat/SPII)',
        children: record['tatlipo_tat_spii'],
    },
    {
        key: 'pilinSecSpiii',
        label: 'PILIN(Sec/SPIII)',
        children: record['pilin_sec_spiii'],
    },
    {
        key: 'csPosition',
        label: 'CS Position',
        children:record['cs_position']
    },
    {
        key: 'csProbability',
        label: 'Probability of CS Position',
        children: record['cs_probability'],
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
