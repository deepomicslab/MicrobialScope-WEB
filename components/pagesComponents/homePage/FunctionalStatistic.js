import { Box, Container, Stack } from "@mui/system"
import { Card, Col, Row, Statistic, Typography } from "antd"
import Image from "next/image"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import CountUp from "react-countup"
import useIntersectionObserver from "@/components/hooks/useIntersectionObserver"
import { useRouter } from "next/router"

const { Title, Text } = Typography

const buildFunctionalStatistics = (statistic) => [
    {
        name: 'Protein',
        icon: '/Protein.png',
        type: 'proteins',
        color: '#F2F2F2',
        count: statistic['MAGArchaeaProteinCount'] + statistic['unMAGArchaeaProteinCount'] +
            statistic['MAGBacteriaProteinCount'] + statistic['unMAGBacteriaProteinCount'] +
            statistic['MAGFungiProteinCount'] + statistic['unMAGFungiProteinCount'] +
            statistic['MAGVirusesProteinCount'] + statistic['unMAGVirusesProteinCount']
    },
    {
        name: 'tRNA',
        icon: '/tRNA.png',
        type: 'tRNAs',
        color: '#F4F6F8',
        count: statistic['MAGArchaeaTrnaCount'] + statistic['unMAGArchaeaTrnaCount'] +
            statistic['MAGBacteriaTrnaCount'] + statistic['unMAGBacteriaTrnaCount'] +
            statistic['MAGFungiTrnaCount'] + statistic['unMAGFungiTrnaCount'] +
            statistic['MAGVirusesTrnaCount'] + statistic['unMAGVirusesTrnaCount']
    },
    {
        name: 'CRISPR-CAS',
        icon: '/CRISPR-CAS.png',
        type: 'CRISPRCasSystems',
        color: '#F6F4F8',
        count: statistic['MAGArchaeaCRISPRCount'] + statistic['unMAGArchaeaCRISPRCount'] +
            statistic['MAGBacteriaCRISPRCount'] + statistic['unMAGBacteriaCRISPRCount'] +
            statistic['MAGVirusesCRISPRCount'] + statistic['unMAGVirusesCRISPRCount']
    },
    {
        name: 'Anti-CRISPR',
        icon: '/anti-CRISPR.png',
        type: 'antiCRISPRProteins',
        color: '#FDF4F0',
        count: statistic['MAGArchaeaAntiCRISPRAnnotationCount'] + statistic['unMAGArchaeaAntiCRISPRAnnotationCount'] +
            statistic['MAGBacteriaAntiCRISPRAnnotationCount'] + statistic['unMAGBacteriaAntiCRISPRAnnotationCount'] +
            statistic['MAGVirusesAntiCRISPRAnnotationCount'] + statistic['unMAGVirusesAntiCRISPRAnnotationCount']
    },
    {
        name: 'Secondary Metabolite',
        icon: '/Secondary_metabolite.png',
        type: 'secondaryMetabolites',
        color: '#F6F4F2',
        count: statistic['MAGArchaeaSecondaryMetaboliteRegionCount'] + statistic['unMAGArchaeaSecondaryMetaboliteRegionCount'] +
            statistic['MAGBacteriaSecondaryMetaboliteRegionCount'] + statistic['unMAGBacteriaSecondaryMetaboliteRegionCount'] +
            statistic['MAGFungiSecondaryMetaboliteRegionCount'] + statistic['unMAGFungiSecondaryMetaboliteRegionCount']
    },
    {
        name: 'Signal Peptide',
        icon: '/SignalP.png',
        type: 'signalPeptides',
        color: '#F3F5F4',
        count: statistic['MAGArchaeaSignalPeptidePredictionCount'] + statistic['unMAGArchaeaSignalPeptidePredictionCount'] +
            statistic['MAGBacteriaSignalPeptidePredictionCount'] + statistic['unMAGBacteriaSignalPeptidePredictionCount'] +
            statistic['MAGFungiSignalPeptidePredictionCount'] + statistic['unMAGFungiSignalPeptidePredictionCount']
    },
    {
        name: 'Virulence Factor',
        icon: '/Virulence_factor.png',
        type: 'virulenceFactors',
        color: '#FAF0F0',
        count: statistic['MAGArchaeaVirulenceFactorCount'] + statistic['unMAGArchaeaVirulenceFactorCount'] +
            statistic['MAGBacteriaVirulenceFactorCount'] + statistic['unMAGBacteriaVirulenceFactorCount'] +
            statistic['MAGFungiVirulenceFactorCount'] + statistic['unMAGFungiVirulenceFactorCount'] +
            statistic['MAGVirusesVirulenceFactorCount'] + statistic['unMAGVirusesVirulenceFactorCount']
    },
    {
        name: 'Antibiotic Resistance',
        icon: '/Antibiotic_resistance.png',
        type: 'antibioticResistanceGenes',
        color: '#FFFBEA',
        count: statistic['MAGArchaeaAntibioticResistanceCount'] + statistic['unMAGArchaeaAntibioticResistanceCount'] +
            statistic['MAGBacteriaAntibioticResistanceCount'] + statistic['unMAGBacteriaAntibioticResistanceCount'] +
            statistic['MAGFungiAntibioticResistanceCount'] + statistic['unMAGFungiAntibioticResistanceCount'] +
            statistic['MAGVirusesAntibioticResistanceCount'] + statistic['unMAGVirusesAntibioticResistanceCount']
    },
    {
        name: 'Transmembrane Helices',
        icon: '/Transmembrane.png',
        type: 'transmembraneHelices',
        color: '#F1F8F6',
        count: statistic['MAGArchaeaTransmembraneHelicesCount'] + statistic['unMAGArchaeaTransmembraneHelicesCount'] +
            statistic['MAGBacteriaTransmembraneHelicesCount'] + statistic['unMAGBacteriaTransmembraneHelicesCount'] +
            statistic['MAGFungiTransmembraneHelicesCount'] + statistic['unMAGFungiTransmembraneHelicesCount'] +
            statistic['MAGVirusesTransmembraneHelicesCount'] + statistic['unMAGVirusesTransmembraneHelicesCount']
    }
]

const formatter = value => <CountUp end={value} separator="," duration={1} preserveValue/>

const FunctionalStatistic = ({ statistic }) => {
    const functionalStatistics = buildFunctionalStatistics(statistic)
    const router = useRouter()
    const [containerRef, isVisible] = useIntersectionObserver()

    const handleCardClick = (functionalStatistic) => {
        router.push(`/database/${functionalStatistic.type}`)
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
                Functional Annotations
            </Title>
            <Row gutter={[24, 24]} justify="center">
                {functionalStatistics.map((functionalStatistic, index) => (
                    <Col xs={24} sm={12} md={12} lg={8} key={functionalStatistic.name}>
                        <Card
                            hoverable
                            onClick={() => handleCardClick(functionalStatistic)}
                            style={{
                                textAlign: 'center',
                                height: '100%',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                            }}
                        >
                            <Stack direction="row" alignItems="center">
                                <Box
                                    sx={{
                                        backgroundColor: functionalStatistic.color,
                                        borderRadius: '50%',
                                        padding: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '16px',
                                        minWidth: '48px',
                                        minHeight: '48px',
                                    }}
                                >
                                    <Image
                                        src={functionalStatistic.icon}
                                        alt={functionalStatistic.name}
                                        width={81}
                                        height={81}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    {index === 0 && <Box ref={containerRef}></Box>}
                                    <Statistic
                                        title={
                                            <Span sx={{
                                                fontWeight: 600,
                                                fontSize: '20px',
                                                color: '#000',
                                                marginBottom: '2px'
                                            }}>
                                                {functionalStatistic.name}
                                            </Span>
                                        }
                                        value={functionalStatistic.count}
                                        valueStyle={{
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            color: '#6b7280',
                                        }}
                                        formatter={isVisible ? formatter : null}
                                    />
                                </Box>
                            </Stack>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Box>
    )
}

export default FunctionalStatistic
