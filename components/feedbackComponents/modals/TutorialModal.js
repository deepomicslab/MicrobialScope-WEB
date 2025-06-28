import { useDetailPageTutorialStore } from "@/stores/DetailPageTutorialStore"
import { useCallback, useEffect, useState } from "react"
import { Button, Image, Modal, Steps, Typography } from "antd"
import { Box, Grid, Stack } from "@mui/system"

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const OverviewGenomeInfoContent = ({}) => (
    <>
        <Title level={4} style={{ margin: 0, marginBottom: '8px', fontSize: '32px' }}>Overview Genome Info</Title>
        <Paragraph style={{ fontSize: '20px' }}>You will find information such as the organism name, taxonomic ID,
            assembly level, and total sequence
            length. This gives you a general overview of the genome and its characteristics, helping you understand the
            context before delving deeper into specific analyses.</Paragraph>
        <Image src='/OverviewGenomeInfo.png' alt='OverviewGenomeInfo.png'/>
    </>
)

const SelectContigContent = ({}) => (
    <>
        <Title level={4} style={{ margin: 0, marginBottom: '8px', fontSize: '32px' }}>Select Contig</Title>
        <Paragraph style={{ fontSize: '20px' }}>The Contig Selector allows you to choose a contig from the available
            list. After selecting a contig, you will be able to view detailed sequence-specific features and
            annotations related to that particular segment.</Paragraph>
        <Image src='/SelectContig.png' alt='SelectContig.png'/>
    </>
)

const ExploreAnnotationsInfoContent = ({}) => (
    <>
        <Title level={4} style={{ margin: 0, marginBottom: '8px', fontSize: '32px' }}>Explore Annotations Info</Title>
        <Paragraph style={{ fontSize: '20px' }}>
            Genomic annotations provide insights into the functions of various genomic elements, including proteins,
            tRNAs & tmRNAs, secondary metabolites, etc. Here, you will learn how to explore different annotation tables
            and understand key information such as feature positions, prediction sources, and biological
            functions.
        </Paragraph>
        <Image src='/ExploreAnnotationsInfo.gif' alt='ExploreAnnotationsInfo.gif'/>
    </>
)

const InteractWithVisualization = ({}) => (
    <>
        <Title level={4} style={{ margin: 0, marginBottom: '8px', fontSize: '32px' }}>Interact With
            Visualization</Title>
        <Paragraph style={{ fontSize: '20px' }}>
            You can interact with a visualized annotations map to get a clearer,
            graphical representation of the genomic annotations.The Annotated Map visualizes the selected
            contig&apos;s features, showing gene positions, GC content, and potential functional elements like
            transmembrane proteins and CRISPR-Cas systems.
        </Paragraph>
        <Paragraph style={{ fontSize: '20px' }}>
            <strong>The AreaPlot</strong> at the bottom of the visualization serves as a zoom control. You can hover
            over the plot and
            adjust the zoom level by interacting with it:
        </Paragraph>
        <ul style={{ fontSize: '20px' }}>
            <li><strong>Zoom in/out</strong> by moving your mouse wheel over the AreaPlot.</li>
            <li><strong>Drag horizontally</strong> within the AreaPlot to shift the focus of the genomic view.</li>
        </ul>
        <Image src='/InteractWithVisualization.gif' alt='InteractWithVisualization.gif'/>
    </>
)

const DownloadVisualizationChart = ({}) => (
    <>
        <Title level={4} style={{ margin: 0, marginBottom: '8px', fontSize: '32px' }}>Download Visualization
            Chart</Title>
        <Paragraph style={{ fontSize: '20px' }}>
            You can download both SVG and PNG versions of the annotated protein map.
        </Paragraph>
        <Paragraph style={{ fontSize: '20px' }}>
            <strong>In the Annotated Protein Map,</strong> when the current window size is smaller than 25,000 bp, product names of
            annotated proteins will be displayed directly on the map for easier interpretation.
        </Paragraph>
        <Image src='/DownloadVisualizationChart.gif' alt='DownloadVisualizationChart.gif'/>
    </>
)


const tutorialSteps = [
    {
        title: 'Step 1: Overview Genome Info',
        content: <OverviewGenomeInfoContent/>
    },
    {
        title: 'Step 2: Select Contig',
        content: <SelectContigContent/>
    },
    {
        title: 'Step 3: Explore Annotations Info',
        content: <ExploreAnnotationsInfoContent/>
    },
    {
        title: 'Step 4: Interact With Visualization',
        content: <InteractWithVisualization/>
    },
    {
        title: 'Step 5: Download Visualization Chart',
        content: <DownloadVisualizationChart/>
    },
]

const TutorialModal = ({}) => {
    const { hasSeenTutorial, setHasSeenTutorial } = useDetailPageTutorialStore(state => state)
    const [current, setCurrent] = useState(0)
    const [tutorialContent, setTutorialContent] = useState('')
    const [visible, setVisible] = useState(false)


    const updateTutorialContent = useCallback((stepIndex) => {
        setTutorialContent(tutorialSteps[stepIndex].content)
    }, [])

    const next = () => {
        if (current < tutorialSteps.length - 1) {
            setCurrent(current + 1);
            updateTutorialContent(current + 1)
        }
    };

    const prev = () => {
        if (current > 0) {
            setCurrent(current - 1);
            updateTutorialContent(current - 1)
        }
    }

    const onStepClick = (current) => {
        setCurrent(current)
        updateTutorialContent(current)
    }

    const handleModalClose = () => {
        setCurrent(0)
        setTutorialContent('')
        setHasSeenTutorial()
        setVisible(false)
    }

    useEffect(() => {
        if (visible) {
            updateTutorialContent(0)
        }
    }, [updateTutorialContent, visible])

    useEffect(() => {
        if (!hasSeenTutorial) {
            setVisible(true)
        }
    }, [hasSeenTutorial])

    return (
        <Modal
            title={<Title level={2} style={{ margin: 0, marginTop: '8px' }}>Genome Detail Tutorial</Title>}
            open={visible}
            onCancel={handleModalClose}
            footer={[
                current > 0 && (
                    <Button key="prev" onClick={prev}>
                        Previous Step
                    </Button>
                ),
                current < tutorialSteps.length - 1 ? (
                    <Button key="next" type="primary" onClick={next}>
                        Next Step
                    </Button>
                ) : (
                    <Button key="gotit" type="primary" onClick={handleModalClose}>
                        Got it!
                    </Button>
                )
            ]}
            width='80%'
            centered
        >
            <Grid container sx={{ py: '12px' }}>
                <Grid item size={2.5}>
                    <Steps
                        progressDot
                        current={current}
                        onChange={onStepClick}
                        direction="vertical"
                        items={tutorialSteps.map((step) => ({
                            title: step.title,
                            // description: step.content,
                        }))}
                    />
                </Grid>
                <Grid item size={9} offset={0.5}>
                    <Box
                        sx={{
                            height: '75vh',
                            maxHeight: '75vh',
                            overflow: 'auto'
                        }}
                    >
                        {tutorialContent}
                    </Box>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default TutorialModal
