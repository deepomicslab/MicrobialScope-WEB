import { useDetailPageTutorialStore } from "@/stores/DetailPageTutorialStore"
import { useCallback, useEffect, useState } from "react"
import { Button, Modal, Steps, Typography } from "antd"
import { Box, Grid, Stack } from "@mui/system"

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const tutorialSteps = [
    {
        title: 'Step 1: Introduction',
        content: 'This is an introduction to the tutorial. Here you will learn about the basics of using the system.',
    },
    {
        title: 'Step 2: First Task',
        content: 'In this step, we will guide you through performing your first task.',
    },
    {
        title: 'Step 3: Advanced Features',
        content: 'This step explains the advanced features you can use to enhance your experience.',
    },
    {
        title: 'Step 4: Review',
        content: 'In this step, we review everything we have covered so far.',
    },
    {
        title: 'Step 5: Completion',
        content: 'You are all set! Now you can start using the system on your own.',
    },
]

const TutorialModal = ({  }) => {
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
    };

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
            title="Tutorial"
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
            width='1200px'
            centered
        >
            <Grid container>
                <Grid item size={3}>
                    <Steps
                        progressDot
                        current={current}
                        onChange={(newCurrent) => setCurrent(newCurrent)}
                        direction="vertical"
                        items={tutorialSteps.map((step) => ({
                            title: step.title,
                            description: step.content,
                        }))}
                    />
                </Grid>
                <Grid item size={8} offset={1}>
                    <Box>
                        <Title level={4}>Tutorial Content</Title>
                        <Paragraph>{tutorialContent}</Paragraph>
                    </Box>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default TutorialModal
