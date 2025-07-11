import { CustomHeader, CustomHeaderMenu } from "@/components/styledComponents/styledLayoutComponents"
import { Flex } from "antd"
import { A, Img, Span } from "@/components/styledComponents/styledHTMLTags"
import { useRouter } from "next/router"
import {
    BarChartOutlined,
    CloudDownloadOutlined, FileTextOutlined,
    HomeOutlined, MailOutlined, ProfileOutlined
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
                label: 'Genome',
                link: '/database/genomes'
            },
            {
                key: 'proteins',
                label: 'Protein',
                link: '/database/proteins'
            }, {
                key: 'tRNAs',
                label: 'tRNA & tmRNA',
                link: '/database/tRNAs'
            },
            {
                key: 'CRISPRCasSystems',
                label: 'CRISPR/Cas System',
                link: '/database/CRISPRCasSystems'
            },
            {
                key: 'antiCRISPRProteinsList',
                label: 'Anti-CRISPR Protein',
                link: '/database/antiCRISPRProteins'
            },
            {
                key: 'secondaryMetabolites',
                label: 'Secondary Metabolite',
                link: '/database/secondaryMetabolites'
            },
            {
                key: 'signalPeptides',
                label: 'Signal Peptide',
                link: '/database/signalPeptides'
            },
            {
                key: 'virulenceFactorsList',
                label: 'Virulence Factor',
                link: '/database/virulenceFactors'
            },
            {
                key: 'antibioticResistanceGenes',
                label: 'Antibiotic Resistance Gene',
                link: '/database/antibioticResistanceGenes'
            },
            {
                key: 'transmembraneHelices',
                label: 'Transmembrane Protein',
                link: '/database/transmembraneHelices'
            }
        ]
    },
    {
        key: 'analysis',
        label: 'Analysis',
        icon: <BarChartOutlined style={{ fontSize: '20px' }}/>,
        link: '/analysis'
    },
    {
        key: 'workspace',
        label: 'Workspace',
        icon: <ProfileOutlined style={{ fontSize: '20px' }}/>,
        link: '/workspace'
    },
    {
        key: 'download',
        label: 'Download',
        icon: <CloudDownloadOutlined style={{ fontSize: '20px' }}/>,
        link: '/download'
    },
    {
        key: 'tutorial',
        label: 'Tutorial',
        icon: <FileTextOutlined style={{ fontSize: '20px' }}/>,
        link: '/tutorial'
    },
    {
        key: 'contactUs',
        label: 'Contact us',
        icon: <MailOutlined style={{ fontSize: '20px' }}/>,
        link: '/contact'
    }
]

export default MicrobeScopeHeader
