import { Box } from "@mui/system"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import Link from "next/link"
import { Button } from "antd"
import { EyeOutlined } from "@ant-design/icons"

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
        icon={<EyeOutlined/>}
    >
        Overview
    </Button>
)

const AssemblyTypeChip = ({ assemblyType }) => (
    <Button
        style={{
            backgroundColor: assemblyType === 'MAG' ? '#253D56' : '#A12D44',
            color: 'rgb(255, 255, 255, 0.95)',
            border: `1px solid ${assemblyType === 'MAG' ? '#253D56' : '#A12D44'}`,
            borderRadius: '20px',
            fontSize: '13px',
        }}
        size='small'
    >
        {assemblyType}
    </Button>
)

const columns = [
    {
        title: 'Microbe Type',
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
        title: 'Assembly Type',
        dataIndex: 'assemblyType',
        key: 'assemblyType',
        fixed: 'left',
        align: 'center',
        render: assemblyType => <AssemblyTypeChip assemblyType={assemblyType} />
    },
    {
        title: 'Genomes',
        dataIndex: 'genomes',
        key: 'genomes',
        align: 'center'
    },
    {
        title: 'Taxonomies',
        dataIndex: 'taxonomies',
        key: 'taxonomies',
        align: 'center'
    },
    {
        title: 'Proteins',
        dataIndex: 'proteins',
        key: 'proteins',
        align: 'center'
    },
    {
        title: 'tRNAs',
        dataIndex: 'tRNAs',
        key: 'tRNAs',
        align: 'center'
    },
    {
        title: 'CRISPR/Cas Systems',
        dataIndex: 'CRISPRCasSystems',
        key: 'CRISPRCasSystems',
        align: 'center'
    },
    {
        title: 'Anti-CRISPR',
        dataIndex: 'antiCRISPR',
        key: 'antiCRISPR',
        align: 'center'
    },
    {
        title: 'Secondary Metabolites',
        dataIndex: 'secondaryMetabolites',
        key: 'secondaryMetabolites',
        align: 'center'
    },
    {
        title: 'Signal Peptides',
        dataIndex: 'signalPeptides',
        key: 'signalPeptides',
        align: 'center'
    },
    {
        title: 'Virulence Factors',
        dataIndex: 'virulenceFactors',
        key: 'virulenceFactors',
        align: 'center'
    },
    {
        title: 'Antibiotic Resistance Genes',
        dataIndex: 'antibioticResistanceGenes',
        key: 'antibioticResistanceGenes',
        align: 'center'
    },
    {
        title: 'Transmembrane Proteins',
        dataIndex: 'transmembraneProteins',
        key: 'transmembraneProteins',
        align: 'center'
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        align: 'center',
        render: (_, record) => (
            <Link href={`/microbes/overview/${record['microbeType']}?assembly=${record['assemblyType']}`}>
                <OverviewButton/>
            </Link>
        )
    }
]

const extractTableData = (data) => [
    {
        key: 'MAGArchaea',
        microbeType: 'Archaea',
        assemblyType: 'MAG',
        genomes: data['MAGArchaeaCount'],
        taxonomies: data['MAGArchaeaTaxonomyCount'],
        proteins: data['MAGArchaeaProteinCount'],
        tRNAs: data['MAGArchaeaTrnaCount'],
        CRISPRCasSystems: data['MAGArchaeaCRISPRCasCount'],
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
        CRISPRCasSystems: data['unMAGArchaeaCRISPRCasCount'],
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
        CRISPRCasSystems: data['MAGBacteriaCRISPRCasCount'],
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
        CRISPRCasSystems: data['unMAGBacteriaCRISPRCasCount'],
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
        CRISPRCasSystems: data['MAGVirusesCRISPRCasCount'],
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
        CRISPRCasSystems: data['unMAGVirusesCRISPRCasCount'],
        antiCRISPR: data['unMAGVirusesAntiCRISPRAnnotationCount'],
        secondaryMetabolites: 0,
        signalPeptides: 0,
        virulenceFactors: data['unMAGVirusesVirulenceFactorCount'],
        antibioticResistanceGenes: data['unMAGVirusesAntibioticResistanceCount'],
        transmembraneProteins: data['unMAGVirusesTransmembraneHelicesCount']
    }
]

export default MicrobeTable
