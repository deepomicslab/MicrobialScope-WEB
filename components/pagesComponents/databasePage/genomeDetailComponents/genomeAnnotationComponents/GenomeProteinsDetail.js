import { Box, Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import {
    buildProteinsTableColumns
} from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationComponents/genomeDetailTableColumns"
import { useCallback, useMemo, useRef, useState } from "react"
import DraggableModal from "@/components/feedbackComponents/modals/DraggableModal"
import {
    ProteinModalDetailDescriptions,
    ProteinModalDetailTitle
} from "@/components/pagesComponents/databasePage/dataModalDetailComponents/ProteinModalDetailComponents"
import ResponsiveVisualizationContainer from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import { Button } from "antd"
import AnnotatedProteinMapViz
    from "@/components/pagesComponents/databasePage/genomeDetailComponents/genomeAnnotationVizComponents/AnnotatedProteinMapViz"
import { useDatabaseGenomeDetailContext } from "@/components/context/DatabaseGenomeDetailContext"

const GenomeProteinsDetail = ({ fastaDetail, proteins }) => {
    const { microbe } = useDatabaseGenomeDetailContext()

    const [open, setOpen] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState(null)

    const vizRef = useRef(null)

    const handleDetailClick = useCallback((record) => {
        setSelectedRecord(record)
        setOpen(true)
    }, [])

    const columns = buildProteinsTableColumns(handleDetailClick)
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

    return (
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
                    Protein Annotation
                </H6>
                <Stack>
                    <H6 sx={{ fontSize: '28px', mt: '12px', mb: '36px' }}>
                        Protein List
                    </H6>
                    <StyledTable
                        columns={columns}
                        rowKey={(record) => record['id']}
                        dataSource={filteredProteins}
                        scroll={{ y: 55 * 12 }}
                    />
                </Stack>
                <Stack spacing={2}>
                    <Stack direction='row' spacing={6} alignItems="center">
                        <H6 sx={{ fontSize: '28px', mt: '12px', mb: '36px' }}>
                            Annotated Protein Map
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
                        <AnnotatedProteinMapViz
                            key={fastaDetail['contig']}
                            ref={vizRef}
                            fastaDetail={fastaDetail}
                            proteins={filteredProteins}
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
                    key={selectedRecord?.['id']}
                >
                    <ProteinModalDetailDescriptions record={selectedRecord} microbe={microbe}/>
                </Box>
            </DraggableModal>
        </>
    )
}

export default GenomeProteinsDetail
