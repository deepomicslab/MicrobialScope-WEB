import { Box } from "@mui/system"
import { BranchesOutlined, BugOutlined, ColumnHeightOutlined, PartitionOutlined } from "@ant-design/icons"
import { ConfigProvider, Menu } from "antd"
import { useState } from "react"
import ORFModule from "@/components/pagesComponents/analysisPage/ORFModule"
import TRNAModule from "@/components/pagesComponents/analysisPage/TRNAModule"
import VFandARGModule from "@/components/pagesComponents/analysisPage/VFandARGModule"
import TPModule from "@/components/pagesComponents/analysisPage/TPModule"

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
                        <Menu.Item key="orf" icon={<PartitionOutlined/>}>
                            ORF prediction & Protein classification
                        </Menu.Item>
                        <Menu.Item key="trna" icon={<BranchesOutlined/>}>
                            tRNA & tmRNA Prediction
                        </Menu.Item>
                        <Menu.Item key="vf" icon={<BugOutlined/>}>
                            Virulent Factor & ARG Detection
                        </Menu.Item>
                        <Menu.Item key="transmembrane" icon={<ColumnHeightOutlined/>}>
                            Transmembrane Protein Annotation
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
