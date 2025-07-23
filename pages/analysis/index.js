import { Box } from "@mui/system"
import { ConfigProvider, Menu } from "antd"
import { useEffect, useState } from "react"
import ORFModule from "@/components/pagesComponents/analysisPage/modules/ORFModule"
import TRNAModule from "@/components/pagesComponents/analysisPage/modules/TRNAModule"
import VFandARGModule from "@/components/pagesComponents/analysisPage/modules/VFandARGModule"
import TPModule from "@/components/pagesComponents/analysisPage/modules/TPModule"
import SequenceAlignmentModule from "@/components/pagesComponents/analysisPage/modules/SequenceAlignmentModule"
import ComparativeAnalysisModule from "@/components/pagesComponents/analysisPage/modules/ComparativeAnalysisModule"
import { useRouter } from "next/router"
import { LoadingView } from "@/components/stateViews/LoadingView"

const customTheme = {
    components: {
        Menu: {
            itemHeight: 48,
            itemPaddingInline: 20,
            fontSize: 16
        }
    }
}

const menuItems = [
    {
        key: 'orf',
        label: 'ORF prediction & Protein classification',
    },
    {
        key: 'trna',
        label: 'tRNA & tmRNA Prediction',
    },
    {
        key: 'vf',
        label: 'Virulent Factor & ARG Detection',
    },
    {
        key: 'transmembrane',
        label: 'Transmembrane Protein Annotation',
    },
    {
        key: 'alignment',
        label: 'Sequence Alignment',
    },
    {
        key: 'comparative',
        label: 'Comparative Analysis',
    },
]


const AnalysisWrapper = () => {
    const [hasMounted, setHasMounted] = useState(false)
    const { query, isReady } = useRouter()

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted || !isReady) {
        return <LoadingView />
    }

    return <Analysis initModule={query.module || 'orf'} />
}

// Main Analysis Component that receives selectedKey as a prop
const Analysis = ({ initModule }) => {
    const [selectedKey, setSelectedKey] = useState(initModule)

    const renderContent = () => {
        switch (selectedKey) {
            case "orf":
                return <ORFModule />
            case "trna":
                return <TRNAModule />
            case "vf":
                return <VFandARGModule />
            case "transmembrane":
                return <TPModule />
            case "alignment":
                return <SequenceAlignmentModule />
            case "comparative":
                return <ComparativeAnalysisModule />
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
                        items={menuItems}
                    />
                </ConfigProvider>
            </Box>

            <Box flex={1} p={3} overflow="auto">
                {renderContent()}
            </Box>
        </Box>
    )
}

export default AnalysisWrapper
