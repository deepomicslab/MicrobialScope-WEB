import { useRef } from "react"
import { Box } from "@mui/system"

const Tutorial = ({}) => {
    const iframeRef = useRef(null)

    return (
        <Box sx={{ height: "100%", mx: '-80px' }}>
            <iframe
                ref={iframeRef}
                src="/docs/index.html"
                style={{width: '100%', minHeight: 'calc(100vh - 148px)', border: 'none' }}
                title="Docsify Docs"
                allow="fullscreen"
            />
        </Box>
    )
}

export default Tutorial
