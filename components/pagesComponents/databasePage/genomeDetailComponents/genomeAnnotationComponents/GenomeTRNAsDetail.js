import { useDatabaseGenomeDetailContext } from "@/components/context/DatabaseGenomeDetailContext"
import useSWR from "swr"
import {
    GENOMEDETAILCONFIG
} from "@/components/pagesComponents/databasePage/genomeDetailComponents/GenomeDetailContent"
import { fetcher } from "@/dataFetch/get"
import { useCallback, useMemo, useRef, useState } from "react"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import {
    buildTRNAsTableColumns
} from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/genomeDetailTableColumns"
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
    TRNAModalDetailDescriptions, TRNAModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/TRNAModalDetailDescriptionsComponents"
import AnnotatedTRNAMapViz
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationVizComponents/AnnotatedTRNAMapViz"
import VisualizationDownloadButton
    from "@/components/pagesComponents/databasePage/_shared/button/VisualizationDownloadButton"
import useVisualizationMode from "@/components/pagesComponents/databasePage/hooks/visualization/useVisualizationMode"
import VisualizationModeSwitchButton
    from "@/components/pagesComponents/databasePage/_shared/button/VisualizationModeSwitchButton"

const GenomeTRNAsDetail = ({ fastaDetail, proteins }) => {
    const { microbe, magStatus, genomeId } = useDatabaseGenomeDetailContext()

    const {
        data: tRNAs,
        isLoading,
        error
    } = useSWR(`${GENOMEDETAILCONFIG[microbe][magStatus]['genomeTRNAsURL']}?genomeId=${genomeId}`, fetcher)

    const [open, setOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)
    const { visualizationMode, handleVisualizationModeChange } = useVisualizationMode()

    const vizRef = useRef(null)

    const handleDetailClick = useCallback((record) => {
        setSelectedRecord(record)
        setOpen(true)
    }, [])

    const columns = buildTRNAsTableColumns(handleDetailClick)
    const filteredTRNAs = useMemo(() => {
        if (!tRNAs || !fastaDetail['contig']) return []
        return tRNAs.filter(p => p['contig_id'] === fastaDetail['contig'])
    }, [fastaDetail, tRNAs])
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
                filteredTRNAs.length > 0 ? (
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
                                tRNA & tmRNA Annotation
                            </H6>
                            <Stack>
                                <H6 sx={{ fontSize: '28px', mt: '12px', mb: '36px' }}>
                                    tRNA & tmRNA List
                                </H6>
                                <StyledTable
                                    columns={columns}
                                    rowKey={(record) => record['id']}
                                    dataSource={filteredTRNAs}
                                    scroll={{ y: 55 * 12 }}
                                />
                            </Stack>
                            <Stack spacing={2}>
                                <Stack direction='row' spacing={6} alignItems="center">
                                    <H6 sx={{ fontSize: '28px', mt: '12px', mb: '36px' }}>
                                        Annotated tRNA & tmRNA Map
                                    </H6>
                                    <Stack direction='row' spacing={2}>
                                        <VisualizationModeSwitchButton
                                            visualizationMode={visualizationMode}
                                            handleVisualizationModeChange={handleVisualizationModeChange}
                                        />
                                        <VisualizationDownloadButton vizRef={vizRef}/>
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
                                    <AnnotatedTRNAMapViz
                                        key={fastaDetail['contig']}
                                        ref={vizRef}
                                        fastaDetail={fastaDetail}
                                        proteins={filteredProteins}
                                        tRNAs={filteredTRNAs}
                                        mode={visualizationMode}
                                    />
                                </ResponsiveVisualizationContainer>
                                <Box></Box>
                            </Stack>
                        </Stack>
                        <DraggableModal
                            open={open}
                            handleConfirm={handleConfirm}
                            handleCancel={handleCancel}
                            title={<TRNAModalDetailTitle/>}
                        >
                            <Box
                                sx={{
                                    px: '8px',
                                    py: '12px',
                                    maxHeight: '75vh',
                                    overflowX: 'auto'
                                }}
                                key={selectedRecord?.['id']}
                            >
                                <TRNAModalDetailDescriptions record={selectedRecord} microbe={microbe}/>
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

export default GenomeTRNAsDetail
