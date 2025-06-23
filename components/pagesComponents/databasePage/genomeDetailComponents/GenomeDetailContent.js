import { Box, Stack } from "@mui/system"
import useSWR from "swr"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import {
    fetcher, getArchaeaGenomeAntibioticResistanceURL,
    getArchaeaGenomeAntiCRISPRURL,
    getArchaeaGenomeCRISPRCasURL,
    getArchaeaGenomeDetailURL,
    getArchaeaGenomeFASTAURL,
    getArchaeaGenomeProteinsURL,
    getArchaeaGenomeSecondaryMetabolitesURL,
    getArchaeaGenomeSignalPeptidesURL, getArchaeaGenomeTransmembraneHelicesURL,
    getArchaeaGenomeTRNAsURL, getArchaeaGenomeVirulenceFactorsURL, getUnMAGArchaeaGenomeAntibioticResistanceURL,
    getUnMAGArchaeaGenomeAntiCRISPRURL,
    getUnMAGArchaeaGenomeCRISPRCasURL,
    getUnMAGArchaeaGenomeDetailURL,
    getUnMAGArchaeaGenomeFASTAURL,
    getUnMAGArchaeaGenomeProteinsURL,
    getUnMAGArchaeaGenomeSecondaryMetabolitesURL,
    getUnMAGArchaeaGenomeSignalPeptidesURL, getUnMAGArchaeaGenomeTransmembraneHelicesURL,
    getUnMAGArchaeaGenomeTRNAsURL, getUnMAGArchaeaGenomeVirulenceFactorsURL
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

    const genomeDescriptionItems = GENOMEDETAILCONFIG[microbe][magStatus]['genomeDetailDescriptionItemsBuilder'](genomeDetail)

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
    }
}

export default GenomeDetailContent
