import { useDatabaseGenomeDetailContext } from "@/components/context/DatabaseGenomeDetailContext"
import useSWR from "swr"
import { fetcher } from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { Box, Stack } from "@mui/system"
import {
    GENOMEDETAILCONFIG
} from "@/components/pagesComponents/databasePage/genomeDetailComponents/GenomeDetailContent"
import { Button, Card, Select, Space, Typography } from "antd"
import { useEffect, useMemo, useState } from "react"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import GenomeProteinsDetail from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/GenomeProteinsDetail"

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

    if (isLoading || !fastaDetail) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (error) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <>
            <Stack spacing={4}>
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
                    genomeDetail['protein_num'] !== 0 &&
                    <GenomeProteinsDetail fastaDetail={fastaDetail} />
                }
            </Stack>
        </>
    )
}

export default GenomeAnnotationContent
