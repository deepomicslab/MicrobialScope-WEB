import { Box, Stack } from "@mui/system"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import Link from "next/link"
import { Button, Tag } from "antd"
import { ArrowRightOutlined, EyeOutlined } from "@ant-design/icons"
import { TitleWithTooltip } from "@/components/pagesComponents/sharedComponents/sharedTableComponents"

const MicrobeTable = ({ data }) => {
    const dataSource = extractTableData(data)

    return (
        <Box sx={{ my: '20px', mx: '48px' }}>
            <StyledTable
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{ x: 'max-content' }}
            />
        </Box>
    )
}

const OverviewButton = () => (
    <Button
        color="primary"
        variant="dashed"
        icon={<ArrowRightOutlined />}
        iconPosition='end'
    >
        Explore
    </Button>
)

const AssemblyTypeChip = ({ assemblyType }) => (
    <Tag
        style={{
            borderRadius: '20px',
            padding: '2px 8px',
            backgroundColor: assemblyType === 'MAG' ? '#253D56' : '#A12D44',
            border: `1px solid ${assemblyType === 'MAG' ? '#253D56' : '#A12D44'}`,
            color: 'rgb(255, 255, 255, 0.95)',
            cursor: 'default',
        }}
    >
        {magStatusValueMap[assemblyType]}
    </Tag>
)

const columns = [
    {
        title: <TitleWithTooltip title='Microbe Type' info='Info'/>,
        dataIndex: 'microbeType',
        key: 'microbeType',
        fixed: 'left',
        align: 'center',
        onCell: (_, index) => {
            if (index % 2 === 0) {
                return { rowSpan: 2 }
            }

            if (index % 2 === 1) {
                return { rowSpan: 0 }
            }

            return {}
        },
    },
    {
        title: <TitleWithTooltip title='Assembly Type' info='info'/> ,
        dataIndex: 'assemblyType',
        key: 'assemblyType',
        fixed: 'left',
        align: 'center',
        render: assemblyType => <AssemblyTypeChip assemblyType={assemblyType}/>
    },
    {
        title: <TitleWithTooltip title='Genomes' info='info'/> ,
        dataIndex: 'genomes',
        key: 'genomes',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='Taxonomies' info='info'/>,
        dataIndex: 'taxonomies',
        key: 'taxonomies',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='Proteins' info='info'/>,
        dataIndex: 'proteins',
        key: 'proteins',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='tRNAs' info='info'/>,
        dataIndex: 'tRNAs',
        key: 'tRNAs',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='CRISPR/Cas Systems' info='info'/>,
        dataIndex: 'CRISPRCasSystems',
        key: 'CRISPRCasSystems',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='Anti-CRISPR' info='info'/>,
        dataIndex: 'antiCRISPR',
        key: 'antiCRISPR',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='Secondary Metabolites' info='info'/>,
        dataIndex: 'secondaryMetabolites',
        key: 'secondaryMetabolites',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='Signal Peptides' info='info'/>,
        dataIndex: 'signalPeptides',
        key: 'signalPeptides',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='Virulence Factors' info='info'/>,
        dataIndex: 'virulenceFactors',
        key: 'virulenceFactors',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='Antibiotic Resistance Genes' info='info'/>,
        dataIndex: 'antibioticResistanceGenes',
        key: 'antibioticResistanceGenes',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: <TitleWithTooltip title='Transmembrane Proteins' info='info'/>,
        dataIndex: 'transmembraneProteins',
        key: 'transmembraneProteins',
        align: 'center',
        render: (value) => value === 0 ? '--' : value
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        align: 'center',
        render: (_, record) => (
            <Link href={`http://localhost:3000/database/genomes?microbe=${microbeValueMap[record['microbeType']]}&mag=${record['assemblyType']}`}>
                <OverviewButton/>
            </Link>
        )
    }
]

const magStatusValueMap = {
    unMAG: 'Monoisolate',
    MAG: 'MAG'
}

const microbeValueMap = {
    Archaea: 'archaea',
    Bacteria: 'bacteria',
    Fungi: 'fungi',
    Viruses: 'viruses',
}

const extractTableData = (data) => [
    {
        key: 'MAGArchaea',
        microbeType: 'Archaea',
        assemblyType: 'MAG',
        genomes: data['MAGArchaeaCount'],
        taxonomies: data['MAGArchaeaTaxonomyCount'],
        proteins: data['MAGArchaeaProteinCount'],
        tRNAs: data['MAGArchaeaTrnaCount'],
        CRISPRCasSystems: data['MAGArchaeaCRISPRCount'],
        antiCRISPR: data['MAGArchaeaAntiCRISPRAnnotationCount'],
        secondaryMetabolites: data['MAGArchaeaSecondaryMetaboliteRegionCount'],
        signalPeptides: data['MAGArchaeaSignalPeptidePredictionCount'],
        virulenceFactors: data['MAGArchaeaVirulenceFactorCount'],
        antibioticResistanceGenes: data['MAGArchaeaAntibioticResistanceCount'],
        transmembraneProteins: data['MAGArchaeaTransmembraneHelicesCount']
    },
    {
        key: 'unMAGArchaea',
        microbeType: 'Archaea',
        assemblyType: 'unMAG',
        genomes: data['unMAGArchaeaCount'],
        taxonomies: data['unMAGArchaeaTaxonomyCount'],
        proteins: data['unMAGArchaeaProteinCount'],
        tRNAs: data['unMAGArchaeaTrnaCount'],
        CRISPRCasSystems: data['unMAGArchaeaCRISPRCount'],
        antiCRISPR: data['unMAGArchaeaAntiCRISPRAnnotationCount'],
        secondaryMetabolites: data['unMAGArchaeaSecondaryMetaboliteRegionCount'],
        signalPeptides: data['unMAGArchaeaSignalPeptidePredictionCount'],
        virulenceFactors: data['unMAGArchaeaVirulenceFactorCount'],
        antibioticResistanceGenes: data['unMAGArchaeaAntibioticResistanceCount'],
        transmembraneProteins: data['unMAGArchaeaTransmembraneHelicesCount']
    },
    {
        key: 'MAGBacteria',
        microbeType: 'Bacteria',
        assemblyType: 'MAG',
        genomes: data['MAGBacteriaCount'],
        taxonomies: data['MAGBacteriaTaxonomyCount'],
        proteins: data['MAGBacteriaProteinCount'],
        tRNAs: data['MAGBacteriaTrnaCount'],
        CRISPRCasSystems: data['MAGBacteriaCRISPRCount'],
        antiCRISPR: data['MAGBacteriaAntiCRISPRAnnotationCount'],
        secondaryMetabolites: data['MAGBacteriaSecondaryMetaboliteRegionCount'],
        signalPeptides: data['MAGBacteriaSignalPeptidePredictionCount'],
        virulenceFactors: data['MAGBacteriaVirulenceFactorCount'],
        antibioticResistanceGenes: data['MAGBacteriaAntibioticResistanceCount'],
        transmembraneProteins: data['MAGBacteriaTransmembraneHelicesCount']
    },
    {
        key: 'unMAGBacteria',
        microbeType: 'Bacteria',
        assemblyType: 'unMAG',
        genomes: data['unMAGBacteriaCount'],
        taxonomies: data['unMAGBacteriaTaxonomyCount'],
        proteins: data['unMAGBacteriaProteinCount'],
        tRNAs: data['unMAGBacteriaTrnaCount'],
        CRISPRCasSystems: data['unMAGBacteriaCRISPRCount'],
        antiCRISPR: data['unMAGBacteriaAntiCRISPRAnnotationCount'],
        secondaryMetabolites: data['unMAGBacteriaSecondaryMetaboliteRegionCount'],
        signalPeptides: data['unMAGBacteriaSignalPeptidePredictionCount'],
        virulenceFactors: data['unMAGBacteriaVirulenceFactorCount'],
        antibioticResistanceGenes: data['unMAGBacteriaAntibioticResistanceCount'],
        transmembraneProteins: data['unMAGBacteriaTransmembraneHelicesCount']
    },
    {
        key: 'MAGFungi',
        microbeType: 'Fungi',
        assemblyType: 'MAG',
        genomes: data['MAGFungiCount'],
        taxonomies: data['MAGFungiTaxonomyCount'],
        proteins: data['MAGFungiProteinCount'],
        tRNAs: data['MAGFungiTrnaCount'],
        CRISPRCasSystems: 0,
        antiCRISPR: 0,
        secondaryMetabolites: data['MAGFungiSecondaryMetaboliteRegionCount'],
        signalPeptides: data['MAGFungiSignalPeptidePredictionCount'],
        virulenceFactors: data['MAGFungiVirulenceFactorCount'],
        antibioticResistanceGenes: data['MAGFungiAntibioticResistanceCount'],
        transmembraneProteins: data['MAGFungiTransmembraneHelicesCount']
    },
    {
        key: 'unMAGFungi',
        microbeType: 'Fungi',
        assemblyType: 'unMAG',
        genomes: data['unMAGFungiCount'],
        taxonomies: data['unMAGFungiTaxonomyCount'],
        proteins: data['unMAGFungiProteinCount'],
        tRNAs: data['unMAGFungiTrnaCount'],
        CRISPRCasSystems: 0,
        antiCRISPR: 0,
        secondaryMetabolites: data['unMAGFungiSecondaryMetaboliteRegionCount'],
        signalPeptides: data['unMAGFungiSignalPeptidePredictionCount'],
        virulenceFactors: data['unMAGFungiVirulenceFactorCount'],
        antibioticResistanceGenes: data['unMAGFungiAntibioticResistanceCount'],
        transmembraneProteins: data['unMAGFungiTransmembraneHelicesCount']
    },
    {
        key: 'MAGViruses',
        microbeType: 'Viruses',
        assemblyType: 'MAG',
        genomes: data['MAGVirusesCount'],
        taxonomies: data['MAGVirusesTaxonomyCount'],
        proteins: data['MAGVirusesProteinCount'],
        tRNAs: data['MAGVirusesTrnaCount'],
        CRISPRCasSystems: data['MAGVirusesCRISPRCount'],
        antiCRISPR: data['MAGVirusesAntiCRISPRAnnotationCount'],
        secondaryMetabolites: 0,
        signalPeptides: 0,
        virulenceFactors: data['MAGVirusesVirulenceFactorCount'],
        antibioticResistanceGenes: data['MAGVirusesAntibioticResistanceCount'],
        transmembraneProteins: data['MAGVirusesTransmembraneHelicesCount']
    },
    {
        key: 'unMAGViruses',
        microbeType: 'Viruses',
        assemblyType: 'unMAG',
        genomes: data['unMAGVirusesCount'],
        taxonomies: data['unMAGVirusesTaxonomyCount'],
        proteins: data['unMAGVirusesProteinCount'],
        tRNAs: data['unMAGVirusesTrnaCount'],
        CRISPRCasSystems: data['unMAGVirusesCRISPRCount'],
        antiCRISPR: data['unMAGVirusesAntiCRISPRAnnotationCount'],
        secondaryMetabolites: 0,
        signalPeptides: 0,
        virulenceFactors: data['unMAGVirusesVirulenceFactorCount'],
        antibioticResistanceGenes: data['unMAGVirusesAntibioticResistanceCount'],
        transmembraneProteins: data['unMAGVirusesTransmembraneHelicesCount']
    }
]

export default MicrobeTable
