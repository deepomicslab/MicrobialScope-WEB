import { CustomHeader, CustomHeaderMenu } from "@/components/styledComponents/styledLayoutComponents"
import { Container } from "@mui/system"
import { Flex } from "antd"
import { A, Img, Span } from "@/components/styledComponents/styledHTMLTags"
import { useRouter } from "next/router"

const MicrobeScopeHeader = () => (
    <CustomHeader>
        <Container maxWidth="xl">
            <Flex justify="space-between">
                <LogoAndTitle/>
                <HeaderMenu/>
            </Flex>
        </Container>
    </CustomHeader>
)

const LogoAndTitle = () => (
    <A
        sx={{
            height: '64px',
            lineHeight: '64px',
            display: 'inline-flex',
            columnGap: '12px',
            alignItems: 'center',
            fontSize: '20px',
            overflow: 'hidden',
            color: '#000000',
        }}
    >
        <Img
            src="/favicon.ico"
            sx={{
                height: '36px',
                width: '36px'
            }}
        />
        <Span
            sx={{
                fontWeight: 'bold'
            }}
        >MicrobeScope</Span>
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
            style={{
                flex: 1,
                minWidth: 0,
            }}
            onClick={handleClick}
            selectable={false}
        />
    )
}

const menuItems = [
    {
        key: 'home',
        label: 'Home',
        link: '/'
    },
    {
        key: 'microbes',
        label: 'Microbes',
        link: '/microbes'
    },
    {
        key: 'database',
        label: 'Database',
        children: [
            {
                key: 'archaeaGroup',
                label: 'Archaea',
                children: [
                    {
                        key: 'ReferenceAnnotationData',
                        label: 'Reference Annotation Data',
                        children: [
                            {
                                key: 'ArchaeaList',
                                label: 'Archaea List',
                                link: '/database/archaea/genomes'
                            },
                            {
                                key: 'ArchaeaProteinList',
                                label: 'Protein List',
                                link: '/database/archaea/proteins'
                            },
                            // {
                            //     key: 'MAGArchaeaTaxonomyList',
                            //     label: 'Taxonomy List',
                            //     link: '/database/MAG/archaea-taxonomy-list'
                            // }
                        ]
                    },
                    {
                        key: 'FunctionalAnnotationData',
                        label: 'Functional Annotation Data',
                        children: [
                            {
                                key: 'ArchaeaTRNAsList',
                                label: 'tRNAs List',
                                link: '/database/archaea/tRNAs'
                            },
                            {
                                key: 'ArchaeaCRISPRCasSystemsList',
                                label: 'CRISPR/Cas Systems List',
                                link: '/database/archaea/CRISPRCasSystems'
                            },
                            {
                                key: 'ArchaeaAntiCRISPRProteinsList',
                                label: 'Anti-CRISPR Proteins List',
                                link: '/database/archaea/antiCRISPRProteins'
                            },
                            {
                                key: 'ArchaeaSecondaryMetabolitesList',
                                label: 'Secondary Metabolites List',
                                link: '/database/archaea/secondaryMetabolites'
                            },
                            {
                                key: 'ArchaeaSignalPeptidesList',
                                label: 'Signal Peptides List',
                                link: '/database/archaea/signalPeptides'
                            },
                            {
                                key: 'ArchaeaVirulenceFactorsList',
                                label: 'Virulence Factors List',
                                link: '/database/archaea/virulenceFactors'
                            },
                            {
                                key: 'ArchaeaAntibioticResistanceGenesList',
                                label: 'Antibiotic Resistance Genes List',
                                link: '/database/archaea/antibioticResistanceGenes'
                            },
                            {
                                key: 'ArchaeaTransmembraneHelicesList',
                                label: 'Transmembrane Helices List',
                                link: '/database/archaea/transmembraneHelices'
                            }
                        ]
                    }
                ]
            },
            {
                key: 'bacteriaGroup',
                label: 'Bacteria',
                children: [
                    {
                        key: 'BacteriaReferenceAnnotationData',
                        label: 'Reference Annotation Data',
                        children: [
                            {
                                key: 'BacteriaList',
                                label: 'Bacteria List',
                                link: '/database/bacteria/genomes'
                            },
                            {
                                key: 'BacteriaProteinList',
                                label: 'Protein List',
                                link: '/database/bacteria/proteins'
                            },
                            // {
                            //     key: 'MAGBacteriaTaxonomyList',
                            //     label: 'Taxonomy List',
                            //     link: '/database/MAG/bacteria-taxonomy-list'
                            // }
                        ]
                    },
                    {
                        key: 'BacteriaFunctionalAnnotationData',
                        label: 'Functional Annotation Data',
                        children: [
                            {
                                key: 'BacteriaTRNAsList',
                                label: 'tRNAs List',
                                link: '/database/bacteria/tRNAs'
                            },
                            {
                                key: 'BacteriaCRISPRCasSystemsList',
                                label: 'CRISPR/Cas Systems List',
                                link: '/database/bacteria/CRISPRCasSystems'
                            },
                            {
                                key: 'BacteriaAntiCRISPRProteinsList',
                                label: 'Anti-CRISPR Proteins List',
                                link: '/database/bacteria/antiCRISPRProteins'
                            },
                            {
                                key: 'BacteriaSecondaryMetabolitesList',
                                label: 'Secondary Metabolites List',
                                link: '/database/bacteria/secondaryMetabolites'
                            },
                            {
                                key: 'BacteriaSignalPeptidesList',
                                label: 'Signal Peptides List',
                                link: '/database/bacteria/signalPeptides'
                            },
                            {
                                key: 'BacteriaVirulenceFactorsList',
                                label: 'Virulence Factors List',
                                link: '/database/bacteria/virulenceFactors'
                            },
                            {
                                key: 'BacteriaAntibioticResistanceGenesList',
                                label: 'Antibiotic Resistance Genes List',
                                link: '/database/bacteria/antibioticResistanceGenes'
                            },
                            {
                                key: 'BacteriaTransmembraneHelicesList',
                                label: 'Transmembrane Helices List',
                                link: '/database/bacteria/transmembraneHelices'
                            }
                        ]
                    }
                ]
            },
            {
                key: 'fungiGroup',
                label: 'Fungi',
                children: [
                    {
                        key: 'FungiReferenceAnnotationData',
                        label: 'Reference Annotation Data',
                        children: [
                            {
                                key: 'FungiList',
                                label: 'Fungi List',
                                link: '/database/fungi/genomes'
                            },
                            {
                                key: 'FungiProteinList',
                                label: 'Protein List',
                                link: '/database/fungi/proteins'
                            },
                            // {
                            //     key: 'MAGFungiTaxonomyList',
                            //     label: 'Taxonomy List',
                            //     link: '/database/MAG/fungi-taxonomy-list'
                            // }
                        ]
                    },
                    {
                        key: 'FungiFunctionalAnnotationData',
                        label: 'Functional Annotation Data',
                        children: [
                            {
                                key: 'FungiTRNAsList',
                                label: 'tRNAs List',
                                link: '/database/fungi/tRNAs'
                            },
                            {
                                key: 'FungiSecondaryMetabolitesList',
                                label: 'Secondary Metabolites List',
                                link: '/database/fungi/secondaryMetabolites'
                            },
                            {
                                key: 'FungiSignalPeptidesList',
                                label: 'Signal Peptides List',
                                link: '/database/fungi/signalPeptides'
                            },
                            {
                                key: 'FungiVirulenceFactorsList',
                                label: 'Virulence Factors List',
                                link: '/database/fungi/virulenceFactors'
                            },
                            {
                                key: 'FungiAntibioticResistanceGenesList',
                                label: 'Antibiotic Resistance Genes List',
                                link: '/database/fungi/antibioticResistanceGenes'
                            },
                            {
                                key: 'FungiTransmembraneHelicesList',
                                label: 'Transmembrane Helices List',
                                link: '/database/fungi/transmembraneHelices'
                            }
                        ]
                    }
                ]
            },
            {
                key: 'virusesGroup',
                label: 'Viruses',
                children: [
                    {
                        key: 'VirusesReferenceAnnotationData',
                        label: 'Reference Annotation Data',
                        children: [
                            {
                                key: 'VirusesList',
                                label: 'Viruses List',
                                link: '/database/viruses/genomes'
                            },
                            {
                                key: 'VirusesProteinList',
                                label: 'Protein List',
                                link: '/database/viruses/proteins'
                            },
                            // {
                            //     key: 'MAGVirusesTaxonomyList',
                            //     label: 'Taxonomy List',
                            //     link: '/database/MAG/viruses-taxonomy-list'
                            // }
                        ]
                    },
                    {
                        key: 'VirusesFunctionalAnnotationData',
                        label: 'Functional Annotation Data',
                        children: [
                            {
                                key: 'VirusesTRNAsList',
                                label: 'tRNAs List',
                                link: '/database/viruses/tRNAs'
                            },
                            {
                                key: 'VirusesCRISPRCasSystemsList',
                                label: 'CRISPR/Cas Systems List',
                                link: '/database/viruses/CRISPRCasSystems'
                            },
                            {
                                key: 'VirusesAntiCRISPRProteinsList',
                                label: 'Anti-CRISPR Proteins List',
                                link: '/database/viruses/antiCRISPRProteins'
                            },
                            {
                                key: 'VirusesVirulenceFactorsList',
                                label: 'Virulence Factors List',
                                link: '/database/viruses/virulenceFactors'
                            },
                            {
                                key: 'VirusesAntibioticResistanceGenesList',
                                label: 'Antibiotic Resistance Genes List',
                                link: '/database/viruses/antibioticResistanceGenes'
                            },
                            {
                                key: 'VirusesTransmembraneHelicesList',
                                label: 'Transmembrane Helices List',
                                link: '/database/viruses/transmembraneHelices'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        key: 'download',
        label: 'Download',
        link: '/download'
    },
    {
        key: 'tutorial',
        label: 'Tutorial',
        link: '/tutorial'
    },
    {
        key: 'contactUs',
        label: 'Contact us',
        link: '/contact'
    }
]

export default MicrobeScopeHeader
