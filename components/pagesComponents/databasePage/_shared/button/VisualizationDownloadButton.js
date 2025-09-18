import { Box } from "@mui/system"
import { useGlobalMessage } from "@/components/context/MessageContext"
import { Button, Dropdown } from "antd"
import { DownOutlined } from "@ant-design/icons"

const buildMenu = (vizRef, messageApi) => {
    const items = [
        {
            key: 'svg',
            label: (
                <Box component='span'>SVG Figure</Box>
            )
        },
        {
            key: 'png',
            label: (
                <Box component='span'>PNG Figure</Box>
            )
        }
    ]

    const handleClick = ({ key }) => {
        if (key === 'svg') {
            vizRef.current?.downloadSvg()
        } else if (key === 'png') {
            vizRef.current?.downloadPng()
        } else {
            messageApi.open({
                type: 'error',
                content: 'Some Error Occurred!',
            })
        }
    }

    return { items, handleClick }
}

const VisualizationDownloadButton = ({ vizRef }) => {
    const messageApi = useGlobalMessage()

    const { items, handleClick } = buildMenu(vizRef, messageApi)

    return (
        <Dropdown
            menu={{ items, onClick: handleClick }}
            placement='bottom'
            arrow
        >
            <Button
                type='primary'
                icon={<DownOutlined />}
                iconPosition='end'
            >
                Download Visualization
            </Button>
        </Dropdown>
    )
}

export default VisualizationDownloadButton
