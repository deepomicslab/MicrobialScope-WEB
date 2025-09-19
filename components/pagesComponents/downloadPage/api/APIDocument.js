import { useRef } from "react"
import { Box } from "@mui/system"

const APIDocument = ({}) => {
    const iframeRef = useRef(null)

    return (
        <Box sx={{ height: "100%", width: '100%' }}>
            <iframe
                ref={iframeRef}
                src="/docsApi/index.html"
                style={{width: '100%', minHeight: 'calc(100vh - 148px)', border: 'none' }}
                title="Docsify Docs"
                allow="fullscreen"
            />
        </Box>
    )
}

export default APIDocument
