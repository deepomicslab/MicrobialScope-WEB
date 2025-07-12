import { Box } from "@mui/system"
import { ConfigProvider, Menu } from "antd"
import { useState } from "react"
import ORFModule from "@/components/pagesComponents/analysisPage/modules/ORFModule"
import TRNAModule from "@/components/pagesComponents/analysisPage/modules/TRNAModule"
import VFandARGModule from "@/components/pagesComponents/analysisPage/modules/VFandARGModule"
import TPModule from "@/components/pagesComponents/analysisPage/modules/TPModule"
import SequenceAlignmentModule from "@/components/pagesComponents/analysisPage/modules/SequenceAlignmentModule"
import ComparativeAnalysisModule from "@/components/pagesComponents/analysisPage/modules/ComparativeAnalysisModule"

const customTheme = {
    components: {
        Menu: {
            itemHeight: 48,
            itemPaddingInline: 20,
            fontSize: 16
        }
    }
}

const Analysis = ({}) => {
    const [selectedKey, setSelectedKey] = useState("orf")

    const renderContent = () => {
        switch (selectedKey) {
            case "orf":
                return <ORFModule/>
            case "trna":
                return <TRNAModule/>
            case "vf":
                return <VFandARGModule/>
            case "transmembrane":
                return <TPModule/>
            case "alignment":
                return <SequenceAlignmentModule/>
            case "comparative":
                return <ComparativeAnalysisModule/>
            default:
                return null
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: 'calc(100vh - 148px)'
            }}
        >
            <Box
                sx={{
                    pt: '12px',
                    width: 350,
                    borderRight: '1px solid #e5e5e5'
                }}
            >
                <ConfigProvider theme={customTheme}>
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        onClick={({ key }) => setSelectedKey(key)}
                        style={{ borderRight: 'none' }}
                    >
                        <Menu.Item key="orf">
                            ORF prediction & Protein classification
                        </Menu.Item>
                        <Menu.Item key="trna">
                            tRNA & tmRNA Prediction
                        </Menu.Item>
                        <Menu.Item key="vf">
                            Virulent Factor & ARG Detection
                        </Menu.Item>
                        <Menu.Item key="transmembrane">
                            Transmembrane Protein Annotation
                        </Menu.Item>
                        <Menu.Item key="alignment">
                            Sequence Alignment
                        </Menu.Item>
                        <Menu.Item key="comparative">
                            Comparative Analysis
                        </Menu.Item>
                    </Menu>
                </ConfigProvider>
            </Box>

            <Box flex={1} p={3} overflow="auto">
                { renderContent() }
            </Box>
        </Box>
    )
}

export default Analysis
