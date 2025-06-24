import { Box, Stack } from "@mui/system"
import useSWR from "swr"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import {
    fetcher,
    getArchaeaGenomeAntibioticResistanceURL,
    getArchaeaGenomeAntiCRISPRURL,
    getArchaeaGenomeCRISPRCasURL,
    getArchaeaGenomeDetailURL,
    getArchaeaGenomeFASTAURL,
    getArchaeaGenomeProteinsURL,
    getArchaeaGenomeSecondaryMetabolitesURL,
    getArchaeaGenomeSignalPeptidesURL,
    getArchaeaGenomeTransmembraneHelicesURL,
    getArchaeaGenomeTRNAsURL,
    getArchaeaGenomeVirulenceFactorsURL,
    getBacteriaGenomeAntibioticResistanceURL,
    getBacteriaGenomeAntiCRISPRURL,
    getBacteriaGenomeCRISPRCasURL,
    getBacteriaGenomeDetailURL,
    getBacteriaGenomeFASTAURL,
    getBacteriaGenomeProteinsURL,
    getBacteriaGenomeSecondaryMetabolitesURL,
    getBacteriaGenomeSignalPeptidesURL,
    getBacteriaGenomeTransmembraneHelicesURL,
    getBacteriaGenomeTRNAsURL,
    getBacteriaGenomeVirulenceFactorsURL,
    getFungiGenomeAntibioticResistanceURL,
    getFungiGenomeAntiCRISPRURL,
    getFungiGenomeCRISPRCasURL,
    getFungiGenomeDetailURL,
    getFungiGenomeFASTAURL,
    getFungiGenomeProteinsURL,
    getFungiGenomeSecondaryMetabolitesURL,
    getFungiGenomeSignalPeptidesURL,
    getFungiGenomeTransmembraneHelicesURL,
    getFungiGenomeTRNAsURL,
    getFungiGenomeVirulenceFactorsURL,
    getUnMAGArchaeaGenomeAntibioticResistanceURL,
    getUnMAGArchaeaGenomeAntiCRISPRURL,
    getUnMAGArchaeaGenomeCRISPRCasURL,
    getUnMAGArchaeaGenomeDetailURL,
    getUnMAGArchaeaGenomeFASTAURL,
    getUnMAGArchaeaGenomeProteinsURL,
    getUnMAGArchaeaGenomeSecondaryMetabolitesURL,
    getUnMAGArchaeaGenomeSignalPeptidesURL,
    getUnMAGArchaeaGenomeTransmembraneHelicesURL,
    getUnMAGArchaeaGenomeTRNAsURL,
    getUnMAGArchaeaGenomeVirulenceFactorsURL,
    getUnMAGBacteriaGenomeAntibioticResistanceURL,
    getUnMAGBacteriaGenomeAntiCRISPRURL,
    getUnMAGBacteriaGenomeCRISPRCasURL,
    getUnMAGBacteriaGenomeDetailURL,
    getUnMAGBacteriaGenomeFASTAURL,
    getUnMAGBacteriaGenomeProteinsURL,
    getUnMAGBacteriaGenomeSecondaryMetabolitesURL,
    getUnMAGBacteriaGenomeSignalPeptidesURL,
    getUnMAGBacteriaGenomeTransmembraneHelicesURL,
    getUnMAGBacteriaGenomeTRNAsURL,
    getUnMAGBacteriaGenomeVirulenceFactorsURL,
    getUnMAGFungiGenomeAntibioticResistanceURL,
    getUnMAGFungiGenomeAntiCRISPRURL,
    getUnMAGFungiGenomeCRISPRCasURL,
    getUnMAGFungiGenomeDetailURL,
    getUnMAGFungiGenomeFASTAURL,
    getUnMAGFungiGenomeProteinsURL,
    getUnMAGFungiGenomeSecondaryMetabolitesURL,
    getUnMAGFungiGenomeSignalPeptidesURL,
    getUnMAGFungiGenomeTransmembraneHelicesURL,
    getUnMAGFungiGenomeTRNAsURL,
    getUnMAGFungiGenomeVirulenceFactorsURL,
    getUnMAGVirusesGenomeAntibioticResistanceURL,
    getUnMAGVirusesGenomeAntiCRISPRURL,
    getUnMAGVirusesGenomeCRISPRCasURL,
    getUnMAGVirusesGenomeDetailURL,
    getUnMAGVirusesGenomeFASTAURL,
    getUnMAGVirusesGenomeProteinsURL,
    getUnMAGVirusesGenomeSecondaryMetabolitesURL,
    getUnMAGVirusesGenomeSignalPeptidesURL,
    getUnMAGVirusesGenomeTransmembraneHelicesURL,
    getUnMAGVirusesGenomeTRNAsURL,
    getUnMAGVirusesGenomeVirulenceFactorsURL,
    getVirusesGenomeAntibioticResistanceURL,
    getVirusesGenomeAntiCRISPRURL,
    getVirusesGenomeCRISPRCasURL,
    getVirusesGenomeDetailURL,
    getVirusesGenomeFASTAURL,
    getVirusesGenomeProteinsURL,
    getVirusesGenomeSecondaryMetabolitesURL,
    getVirusesGenomeSignalPeptidesURL,
    getVirusesGenomeTransmembraneHelicesURL,
    getVirusesGenomeTRNAsURL,
    getVirusesGenomeVirulenceFactorsURL
} from "@/dataFetch/get"
import {
    buildArchaeaGenomeDetailItems
} from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeDescriptionColumns"
import { Descriptions, Typography } from "antd"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { useDatabaseGenomeDetailContext } from "@/components/context/DatabaseGenomeDetailContext"
import GenomeAnnotationContent
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeAnnotationContent"

const GenomeDetailContent = ({}) => {
    const { microbe, magStatus, genomeId } = useDatabaseGenomeDetailContext()

    const {
        data: genomeDetail,
        isLoading,
        error
    } = useSWR(`${GENOMEDETAILCONFIG[microbe][magStatus]['genomeDetailURL']}?genomeId=${genomeId}`, fetcher)

    if (isLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (error) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    const genomeDescriptionItems = GENOMEDETAILCONFIG[microbe][magStatus]['genomeDetailDescriptionItemsBuilder'](genomeDetail, microbe)

    return (
        <Stack spacing={4}>
            <Box>
                <H6
                    sx={{
                        fontSize: '36px',
                        mt: '12px',
                        mb: '36px',
                        borderBottom: '2px solid #e0e0e0',
                        paddingBottom: '12px',
                    }}
                >
                    {GENOMEDETAILCONFIG[microbe][magStatus]['title']}
                </H6>
                <Descriptions bordered items={genomeDescriptionItems} column={2}/>
            </Box>
            <GenomeAnnotationContent genomeDetail={genomeDetail}/>
        </Stack>
    )
}

export const GENOMEDETAILCONFIG = {
    archaea: {
        MAG: {
            title: 'Archaea Genome Detail',
            genomeDetailURL: getArchaeaGenomeDetailURL,
            genomeDetailDescriptionItemsBuilder: buildArchaeaGenomeDetailItems,
            genomeFASTAURL: getArchaeaGenomeFASTAURL,
            genomeProteinsURL: getArchaeaGenomeProteinsURL,
            genomeTRNAsURL: getArchaeaGenomeTRNAsURL,
            genomeCRISPRCasURL: getArchaeaGenomeCRISPRCasURL,
            genomeAntiCRISPRURL: getArchaeaGenomeAntiCRISPRURL,
            genomeSecondaryMetabolitesURL: getArchaeaGenomeSecondaryMetabolitesURL,
            genomeSignalPeptidesURL: getArchaeaGenomeSignalPeptidesURL,
            genomeVirulenceFactorsURL: getArchaeaGenomeVirulenceFactorsURL,
            genomeAntibioticResistanceURL: getArchaeaGenomeAntibioticResistanceURL,
            genomeTransmembraneHelicesURL: getArchaeaGenomeTransmembraneHelicesURL
        },
        unMAG: {
            title: 'Archaea Genome Detail',
            genomeDetailURL: getUnMAGArchaeaGenomeDetailURL,
            genomeDetailDescriptionItemsBuilder: buildArchaeaGenomeDetailItems,
            genomeFASTAURL: getUnMAGArchaeaGenomeFASTAURL,
            genomeProteinsURL: getUnMAGArchaeaGenomeProteinsURL,
            genomeTRNAsURL: getUnMAGArchaeaGenomeTRNAsURL,
            genomeCRISPRCasURL: getUnMAGArchaeaGenomeCRISPRCasURL,
            genomeAntiCRISPRURL: getUnMAGArchaeaGenomeAntiCRISPRURL,
            genomeSecondaryMetabolitesURL: getUnMAGArchaeaGenomeSecondaryMetabolitesURL,
            genomeSignalPeptidesURL: getUnMAGArchaeaGenomeSignalPeptidesURL,
            genomeVirulenceFactorsURL: getUnMAGArchaeaGenomeVirulenceFactorsURL,
            genomeAntibioticResistanceURL: getUnMAGArchaeaGenomeAntibioticResistanceURL,
            genomeTransmembraneHelicesURL: getUnMAGArchaeaGenomeTransmembraneHelicesURL
        }
    },
    bacteria: {
        MAG: {
            title: 'Bacteria Genome Detail',
            genomeDetailURL: getBacteriaGenomeDetailURL,
            genomeDetailDescriptionItemsBuilder: buildArchaeaGenomeDetailItems,
            genomeFASTAURL: getBacteriaGenomeFASTAURL,
            genomeProteinsURL: getBacteriaGenomeProteinsURL,
            genomeTRNAsURL: getBacteriaGenomeTRNAsURL,
            genomeCRISPRCasURL: getBacteriaGenomeCRISPRCasURL,
            genomeAntiCRISPRURL: getBacteriaGenomeAntiCRISPRURL,
            genomeSecondaryMetabolitesURL: getBacteriaGenomeSecondaryMetabolitesURL,
            genomeSignalPeptidesURL: getBacteriaGenomeSignalPeptidesURL,
            genomeVirulenceFactorsURL: getBacteriaGenomeVirulenceFactorsURL,
            genomeAntibioticResistanceURL: getBacteriaGenomeAntibioticResistanceURL,
            genomeTransmembraneHelicesURL: getBacteriaGenomeTransmembraneHelicesURL
        },
        unMAG: {
            title: 'Bacteria Genome Detail',
            genomeDetailURL: getUnMAGBacteriaGenomeDetailURL,
            genomeDetailDescriptionItemsBuilder: buildArchaeaGenomeDetailItems,
            genomeFASTAURL: getUnMAGBacteriaGenomeFASTAURL,
            genomeProteinsURL: getUnMAGBacteriaGenomeProteinsURL,
            genomeTRNAsURL: getUnMAGBacteriaGenomeTRNAsURL,
            genomeCRISPRCasURL: getUnMAGBacteriaGenomeCRISPRCasURL,
            genomeAntiCRISPRURL: getUnMAGBacteriaGenomeAntiCRISPRURL,
            genomeSecondaryMetabolitesURL: getUnMAGBacteriaGenomeSecondaryMetabolitesURL,
            genomeSignalPeptidesURL: getUnMAGBacteriaGenomeSignalPeptidesURL,
            genomeVirulenceFactorsURL: getUnMAGBacteriaGenomeVirulenceFactorsURL,
            genomeAntibioticResistanceURL: getUnMAGBacteriaGenomeAntibioticResistanceURL,
            genomeTransmembraneHelicesURL: getUnMAGBacteriaGenomeTransmembraneHelicesURL
        }
    },
    fungi: {
        MAG: {
            title: 'Fungi Genome Detail',
            genomeDetailURL: getFungiGenomeDetailURL,
            genomeDetailDescriptionItemsBuilder: buildArchaeaGenomeDetailItems,
            genomeFASTAURL: getFungiGenomeFASTAURL,
            genomeProteinsURL: getFungiGenomeProteinsURL,
            genomeTRNAsURL: getFungiGenomeTRNAsURL,
            genomeCRISPRCasURL: getFungiGenomeCRISPRCasURL,
            genomeAntiCRISPRURL: getFungiGenomeAntiCRISPRURL,
            genomeSecondaryMetabolitesURL: getFungiGenomeSecondaryMetabolitesURL,
            genomeSignalPeptidesURL: getFungiGenomeSignalPeptidesURL,
            genomeVirulenceFactorsURL: getFungiGenomeVirulenceFactorsURL,
            genomeAntibioticResistanceURL: getFungiGenomeAntibioticResistanceURL,
            genomeTransmembraneHelicesURL: getFungiGenomeTransmembraneHelicesURL
        },
        unMAG: {
            title: 'Fungi Genome Detail',
            genomeDetailURL: getUnMAGFungiGenomeDetailURL,
            genomeDetailDescriptionItemsBuilder: buildArchaeaGenomeDetailItems,
            genomeFASTAURL: getUnMAGFungiGenomeFASTAURL,
            genomeProteinsURL: getUnMAGFungiGenomeProteinsURL,
            genomeTRNAsURL: getUnMAGFungiGenomeTRNAsURL,
            genomeCRISPRCasURL: getUnMAGFungiGenomeCRISPRCasURL,
            genomeAntiCRISPRURL: getUnMAGFungiGenomeAntiCRISPRURL,
            genomeSecondaryMetabolitesURL: getUnMAGFungiGenomeSecondaryMetabolitesURL,
            genomeSignalPeptidesURL: getUnMAGFungiGenomeSignalPeptidesURL,
            genomeVirulenceFactorsURL: getUnMAGFungiGenomeVirulenceFactorsURL,
            genomeAntibioticResistanceURL: getUnMAGFungiGenomeAntibioticResistanceURL,
            genomeTransmembraneHelicesURL: getUnMAGFungiGenomeTransmembraneHelicesURL
        }
    },
    viruses: {
        MAG: {
            title: 'Viruses Genome Detail',
            genomeDetailURL: getVirusesGenomeDetailURL,
            genomeDetailDescriptionItemsBuilder: buildArchaeaGenomeDetailItems,
            genomeFASTAURL: getVirusesGenomeFASTAURL,
            genomeProteinsURL: getVirusesGenomeProteinsURL,
            genomeTRNAsURL: getVirusesGenomeTRNAsURL,
            genomeCRISPRCasURL: getVirusesGenomeCRISPRCasURL,
            genomeAntiCRISPRURL: getVirusesGenomeAntiCRISPRURL,
            genomeSecondaryMetabolitesURL: getVirusesGenomeSecondaryMetabolitesURL,
            genomeSignalPeptidesURL: getVirusesGenomeSignalPeptidesURL,
            genomeVirulenceFactorsURL: getVirusesGenomeVirulenceFactorsURL,
            genomeAntibioticResistanceURL: getVirusesGenomeAntibioticResistanceURL,
            genomeTransmembraneHelicesURL: getVirusesGenomeTransmembraneHelicesURL
        },
        unMAG: {
            title: 'Viruses Genome Detail',
            genomeDetailURL: getUnMAGVirusesGenomeDetailURL,
            genomeDetailDescriptionItemsBuilder: buildArchaeaGenomeDetailItems,
            genomeFASTAURL: getUnMAGVirusesGenomeFASTAURL,
            genomeProteinsURL: getUnMAGVirusesGenomeProteinsURL,
            genomeTRNAsURL: getUnMAGVirusesGenomeTRNAsURL,
            genomeCRISPRCasURL: getUnMAGVirusesGenomeCRISPRCasURL,
            genomeAntiCRISPRURL: getUnMAGVirusesGenomeAntiCRISPRURL,
            genomeSecondaryMetabolitesURL: getUnMAGVirusesGenomeSecondaryMetabolitesURL,
            genomeSignalPeptidesURL: getUnMAGVirusesGenomeSignalPeptidesURL,
            genomeVirulenceFactorsURL: getUnMAGVirusesGenomeVirulenceFactorsURL,
            genomeAntibioticResistanceURL: getUnMAGVirusesGenomeAntibioticResistanceURL,
            genomeTransmembraneHelicesURL: getUnMAGVirusesGenomeTransmembraneHelicesURL
        }
    }
}

export default GenomeDetailContent
