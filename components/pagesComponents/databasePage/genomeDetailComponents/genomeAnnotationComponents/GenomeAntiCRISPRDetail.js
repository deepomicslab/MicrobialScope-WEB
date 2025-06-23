import { useDatabaseGenomeDetailContext } from "@/components/context/DatabaseGenomeDetailContext"
import useSWR from "swr"
import {
    GENOMEDETAILCONFIG
} from "@/components/pagesComponents/databasePage/genomeDetailComponents/GenomeDetailContent"
import { fetcher } from "@/dataFetch/get"
import { useCallback, useMemo, useRef, useState } from "react"
import {
    buildAntiCRISPRTableColumns
} from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/genomeDetailTableColumns"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import { Box, Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import { Button } from "antd"
import ResponsiveVisualizationContainer from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import DraggableModal from "@/components/feedbackComponents/modals/DraggableModal"
import {
    ProteinModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/ProteinModalDetailComponents"
import {
    AntiCRISPRAnnotationModalDetailDescriptions
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/AntiCRISPRAnnotationModalDetailComponents"
import AnnotatedAntiCRISPRMapViz
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationVizComponents/AnnotatedAntiCRISPRMapViz"

const GenomeAntiCRISPRDetail = ({ fastaDetail, proteins }) => {
    const { microbe, magStatus, genomeId } = useDatabaseGenomeDetailContext()

    const {
        data: antiCRISPR,
        isLoading,
        error
    } = useSWR(`${GENOMEDETAILCONFIG[microbe][magStatus]['genomeAntiCRISPRURL']}?genomeId=${genomeId}`, fetcher)

    const [open, setOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)

    const vizRef = useRef(null)

    const handleDetailClick = useCallback((record) => {
        setSelectedRecord(record)
        setOpen(true)
    }, [])

    const columns = buildAntiCRISPRTableColumns(handleDetailClick)
    const filteredAntiCRISPR = useMemo(() => {
        if (!antiCRISPR || !fastaDetail['contig']) return []
        return antiCRISPR.filter(p => p['contig_id'] === fastaDetail['contig'])
    }, [antiCRISPR, fastaDetail])
    const filteredProteins = useMemo(() => {
        if (!proteins || !fastaDetail['contig']) return []
        return proteins.filter(p => p['contig_id'] === fastaDetail['contig'])
    }, [fastaDetail, proteins])

    const handleConfirm = () => {
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    if (isLoading) {
        return <LoadingView containerSx={{ height: '400px', marginTop: '40px' }}/>
    }

    if (error) {
        return <ErrorView containerSx={{ height: '400px', marginTop: '40px' }}/>
    }

    return (
        <>
            {
                filteredAntiCRISPR.length > 0 ? (
                    <>
                        <Stack spacing={2}>
                            <H6
                                sx={{
                                    fontSize: '36px',
                                    mt: '12px',
                                    mb: '36px',
                                    borderBottom: '2px solid #e0e0e0',
                                    paddingBottom: '12px',
                                }}
                            >
                                Anti-CRISPR Proteins Annotation
                            </H6>
                            <Stack>
                                <H6 sx={{ fontSize: '28px', mt: '12px', mb: '36px' }}>
                                    Anti-CRISPR Proteins List
                                </H6>
                                <StyledTable
                                    columns={columns}
                                    rowKey={(record) => record['id']}
                                    dataSource={filteredAntiCRISPR}
                                    scroll={{ y: 55 * 12 }}
                                />
                            </Stack>
                            <Stack spacing={2}>
                                <Stack direction='row' spacing={6} alignItems="center">
                                    <H6 sx={{ fontSize: '28px', mt: '12px', mb: '36px' }}>
                                        Annotated Anti-CRISPR Proteins Map
                                    </H6>
                                    <Stack direction='row' spacing={2}>
                                        <Button
                                            type="primary"
                                            onClick={() => vizRef.current?.downloadSvg()}
                                        >
                                            Download SVG Chart
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => vizRef.current?.downloadPng()}
                                        >
                                            Download PNG Chart
                                        </Button>
                                    </Stack>
                                </Stack>
                                <ResponsiveVisualizationContainer
                                    containerSx={{
                                        minHeight: '920px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                        overflowX: 'auto',
                                        scrollbarColor: '#eaeaea transparent',
                                        '&::-webkit-scrollbar': {
                                            height: '6px',
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: '#eaeaea',
                                            borderRadius: '4px',
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    <AnnotatedAntiCRISPRMapViz
                                        key={fastaDetail['contig']}
                                        ref={vizRef}
                                        fastaDetail={fastaDetail}
                                        proteins={filteredProteins}
                                        antiCRISPR={filteredAntiCRISPR}
                                    />
                                </ResponsiveVisualizationContainer>
                                <Box></Box>
                            </Stack>
                        </Stack>
                        <DraggableModal
                            open={open}
                            handleConfirm={handleConfirm}
                            handleCancel={handleCancel}
                            title={() => <ProteinModalDetailTitle/>}
                        >
                            <Box
                                sx={{
                                    px: '8px',
                                    py: '12px',
                                    maxHeight: '75vh',
                                    overflowX: 'auto'
                                }}
                            >
                                <AntiCRISPRAnnotationModalDetailDescriptions record={selectedRecord}/>
                            </Box>
                        </DraggableModal>
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default GenomeAntiCRISPRDetail
