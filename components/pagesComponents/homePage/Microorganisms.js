import { Box } from "@mui/system"
import { Card, Col, Row, Statistic, Typography } from "antd"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import CountUp from "react-countup"
import { useRouter } from "next/router"
import Image from "next/image"
import useIntersectionObserver from "@/components/hooks/useIntersectionObserver"

const { Title } = Typography

const buildMicrobes = (statistic) => [
    {
        name: 'Archaea',
        svg: '/Archaea.svg',
        count: statistic['MAGArchaeaCount'] + statistic['unMAGArchaeaCount'],
        type: 'archaea'
    },
    {
        name: 'Bacteria',
        svg: '/Bacteria.svg',
        count: statistic['MAGBacteriaCount'] + statistic['unMAGBacteriaCount'],
        type: 'bacteria'
    },
    {
        name: 'Fungi',
        svg: '/Fungi.svg',
        count: statistic['MAGFungiCount'] + statistic['unMAGFungiCount'],
        type: 'fungi'
    },
    {
        name: 'Viruses',
        svg: '/Viruses.svg',
        count: statistic['MAGVirusesCount'] + statistic['unMAGVirusesCount'],
        type: 'viruses'
    },
]

const formatter = value => <CountUp end={value} separator="," duration={1} preserveValue/>

const Microorganisms = ({ statistic }) => {
    const microbes = buildMicrobes(statistic)
    const router = useRouter()
    const [containerRef, isVisible] = useIntersectionObserver()

    const handleCardClick = (microbe) => {
        router.push({
            pathname: '/database/genomes',
            query: {
                type: microbe.type
            }
        })
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
                Microorganisms
            </Title>
            <Row gutter={[24, 24]} justify="center">
                {microbes.map((microbe, index) => (
                    <Col xs={24} sm={12} md={12} lg={6} key={microbe.name}>
                        <Card
                            hoverable
                            onClick={() => handleCardClick(microbe)}
                            style={{
                                textAlign: 'center',
                                height: '100%',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                            }}
                        >
                            <Box
                                sx={{
                                    height: '225px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '16px',
                                }}
                            >
                                <Image
                                    src={microbe.svg}
                                    alt={microbe.name}
                                    width={150}
                                    height={225}
                                    priority={index === 0}
                                />
                            </Box>
                            <Box ref={containerRef}></Box>
                            <Statistic
                                title={
                                    <Span sx={{ fontWeight: 600, fontSize: '20px', color: '#000' }}>
                                        {microbe.name}
                                    </Span>
                                }
                                value={microbe.count}
                                valueStyle={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: '#6b7280',
                                }}
                                formatter={isVisible ? formatter : null}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Box>
    )
}

export default Microorganisms
