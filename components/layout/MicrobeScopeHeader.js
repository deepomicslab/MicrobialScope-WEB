import { CustomHeader, CustomHeaderMenu } from "@/components/styledComponents/styledLayoutComponents"
import { Flex } from "antd"
import { A, Img, Span } from "@/components/styledComponents/styledHTMLTags"
import { useRouter } from "next/router"
import {
    BookOutlined, CloudDownloadOutlined,
    DatabaseOutlined,
    DownloadOutlined,
    ExperimentOutlined, FileTextOutlined,
    HomeOutlined,
    MailOutlined
} from "@ant-design/icons"
import MicrobialIcon from "@/components/icons/Microbial"
import DatabaseIcon from "@/components/icons/Database"

const MicrobeScopeHeader = () => (
    <CustomHeader>
        <Flex justify="space-between">
            <LogoAndTitle/>
            <HeaderMenu/>
        </Flex>
    </CustomHeader>
)

const LogoAndTitle = () => (
    <A
        sx={{
            height: '64px',
            lineHeight: '64px',
            display: 'inline-flex',
            columnGap: '2px',
            alignItems: 'center',
            fontSize: '20px',
            overflow: 'hidden',
            color: '#000000',
        }}
        href='/'
    >
        <Img
            src="/MicrobialScope_logo.png"
            sx={{
                height: '56px',
                width: '56px'
            }}
        />
        <Span sx={{ fontSize: '24px', fontWeight: 700 }}>MicorbialScope</Span>
    </A>
)

const HeaderMenu = () => {
    const router = useRouter()

    const handleClick = ({ item }) => {
        router.push(item.props.link)
    }

    return (
        <CustomHeaderMenu
            mode="horizontal"
            items={menuItems}
            onClick={handleClick}
            selectable={false}
        />
    )
}

const menuItems = [
    {
        key: 'home',
        label: 'Home',
        icon: <HomeOutlined style={{ fontSize: '20px' }}/>,
        link: '/'
    },
    {
        key: 'microorganism',
        label: 'Microorganism',
        icon: <MicrobialIcon style={{ fontSize: '20px' }}/>,
        link: '/microorganism'
    },
    {
        key: 'database',
        label: 'Database',
        icon: <DatabaseIcon style={{ fontSize: '20px' }}/>,
        children: [
            {
                key: 'genomes',
                label: 'Genomes',
                link: '/database/genomes'
            },
            {
                key: 'proteins',
                label: 'Proteins',
                link: '/database/proteins'
            },{
                key: 'tRNAs',
                label: 'tRNAs',
                link: '/database/tRNAs'
            },
            {
                key: 'CRISPRCasSystems',
                label: 'CRISPR/Cas Systems',
                link: '/database/CRISPRCasSystems'
            },
            {
                key: 'antiCRISPRProteinsList',
                label: 'Anti-CRISPR Proteins',
                link: '/database/antiCRISPRProteins'
            },
            {
                key: 'secondaryMetabolites',
                label: 'Secondary Metabolites',
                link: '/database/secondaryMetabolites'
            },
            {
                key: 'signalPeptides',
                label: 'Signal Peptides',
                link: '/database/signalPeptides'
            },
            {
                key: 'virulenceFactorsList',
                label: 'Virulence Factors',
                link: '/database/virulenceFactors'
            },
            {
                key: 'antibioticResistanceGenes',
                label: 'Antibiotic Resistance Genes',
                link: '/database/antibioticResistanceGenes'
            },
            {
                key: 'transmembraneHelices',
                label: 'Transmembrane Helices',
                link: '/database/transmembraneHelices'
            }
        ]
    },
    {
        key: 'download',
        label: 'Download',
        icon: <CloudDownloadOutlined style={{ fontSize: '20px' }} />,
        link: '/download'
    },
    {
        key: 'tutorial',
        label: 'Tutorial',
        icon: <FileTextOutlined style={{ fontSize: '20px' }} />,
        link: '/tutorial'
    },
    {
        key: 'contactUs',
        label: 'Contact us',
        icon: <MailOutlined style={{ fontSize: '20px' }} />,
        link: '/contact'
    }
]

export default MicrobeScopeHeader
