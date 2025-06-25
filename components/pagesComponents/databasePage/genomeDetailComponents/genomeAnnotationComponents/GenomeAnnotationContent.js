import { useDatabaseGenomeDetailContext } from "@/components/context/DatabaseGenomeDetailContext"
import useSWR from "swr"
import { fetcher } from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { Box, Stack } from "@mui/system"
import {
    GENOMEDETAILCONFIG
} from "@/components/pagesComponents/databasePage/genomeDetailComponents/GenomeDetailContent"
import { Card, Select, Spin, Typography } from "antd"
import { useEffect, useMemo, useState } from "react"
import { H6, Span } from "@/components/styledComponents/styledHTMLTags"
import GenomeProteinsDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeProteinsDetail"
import GenomeTRNAsDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeTRNAsDetail"
import GenomeSecondaryMetabolitesDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeSecondaryMetabolitesDetail"
import GenomeCRISPRCasDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeCRISPRCasDetail"
import GenomeAntiCRISPRDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeAntiCRISPRDetail"
import GenomeSignalPeptidesDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeSignalPeptidesDetail"
import GenomeTransmembraneHelicesDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeTransmembraneHelicesDetail"
import GenomeVirulenceFactorsDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeVirulenceFactorsDetail"
import GenomeAntibioticResistanceDetail
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeAntibioticResistanceDetail"

const { Text } = Typography
const { Option } = Select

const GenomeAnnotationContent = ({ genomeDetail }) => {
    const { microbe, magStatus, genomeId } = useDatabaseGenomeDetailContext()
    const [selectedContig, setSelectedContig] = useState(null)

    const {
        data: fastaInfo,
        isLoading,
        error
    } = useSWR(`${GENOMEDETAILCONFIG[microbe][magStatus]['genomeFASTAURL']}?genomeId=${genomeId}`, fetcher)

    const {
        data: proteins,
        isLoading: proteinsIsLoading,
        error: proteinsError
    } = useSWR(`${GENOMEDETAILCONFIG[microbe][magStatus]['genomeProteinsURL']}?genomeId=${genomeId}`, fetcher)

    const handleContigChange = (value) => {
        setSelectedContig(value)
    }

    const fastaDetail = useMemo(() => {
        return selectedContig ? fastaInfo.find(info => info['contig'] === selectedContig) : null
    }, [fastaInfo, selectedContig])

    useEffect(() => {
        if (fastaInfo && Array.isArray(fastaInfo) && fastaInfo.length > 0) {
            setSelectedContig(prev => prev || fastaInfo[0]['contig'])
        }
    }, [fastaInfo])

    if (isLoading || !fastaDetail || proteinsIsLoading) {
        return (
            <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}>
                <Spin
                    tip={
                        <Stack sx={{ fontSize: '20px' }} spacing={1}>
                            <Span>Loading Genome FASTA sequences...</Span>
                            <Span
                                sx={{
                                    fontSize: '20px',
                                    color: '#FF4D4F'
                                }}
                            >
                                This may take some time depending on the sequence length. Please be patient.
                            </Span>
                        </Stack>
                    }
                    size="large"
                >
                    <Box sx={{ padding: '50px', width: '800px' }}></Box>
                </Spin>
            </LoadingView>
        )
    }

    if (error || proteinsError) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <>
            <Stack spacing={6}>
                <Stack alignItems="center">
                    <Card
                        style={{ width: '100%' }}
                        title={
                            <H6 sx={{ fontSize: '36px', mt: '12px', mb: '12px' }}>
                                Contig Selector
                            </H6>
                        }
                    >
                        <Text type="secondary" style={{ fontSize: '20px' }}>
                            Select a contig to view sequence-specific features or annotations.
                        </Text>

                        <Select
                            style={{ width: '100%', marginTop: 16 }}
                            placeholder="Please select a contig"
                            onChange={handleContigChange}
                            value={selectedContig}
                            size='large'
                        >
                            {fastaInfo.map((contig) => (
                                <Option key={contig['contig']} value={contig['contig']} style={{ fontSize: '16px' }}>
                                    {contig['contig']} – {contig.length.toLocaleString()} bp
                                </Option>
                            ))}
                        </Select>
                    </Card>
                </Stack>
                {
                    proteins.length !== 0 &&
                    <GenomeProteinsDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
                {
                    proteins.length !== 0 && genomeDetail['trna_count'] !== 0 &&
                    <GenomeTRNAsDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
                {
                    microbe !== 'fungi' && proteins.length !== 0 && genomeDetail['crispr_count'] !== 0 &&
                    <GenomeCRISPRCasDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
                {
                    microbe !== 'fungi' && proteins.length !== 0 && genomeDetail['anti_crispr_count'] !== 0 &&
                    <GenomeAntiCRISPRDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
                {
                    microbe !== 'viruses' && proteins.length !== 0 && genomeDetail['secondary_metabolite_count'] !== 0 &&
                    <GenomeSecondaryMetabolitesDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
                {
                    microbe !== 'viruses' && proteins.length !== 0 && genomeDetail['signal_peptide_count'] !== 0 &&
                    <GenomeSignalPeptidesDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
                {
                    proteins.length !== 0 && genomeDetail['virulence_factor_count'] !== 0 &&
                    <GenomeVirulenceFactorsDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
                {
                    proteins.length !== 0 && genomeDetail['arg_count'] !== 0 &&
                    <GenomeAntibioticResistanceDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
                {
                    proteins.length !== 0 && genomeDetail['tmh_count'] !== 0 &&
                    <GenomeTransmembraneHelicesDetail fastaDetail={fastaDetail} proteins={proteins}/>
                }
            </Stack>
        </>
    )
}

export default GenomeAnnotationContent
