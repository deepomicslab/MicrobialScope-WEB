import { Box } from "@mui/system"
import { Span } from "@/components/styledComponents/styledHTMLTags"

export const TooltipWrapper = ({ children }) => (
    <Box sx={{ margin: "0px 0 0", lineHeight: 1 }}>
        <Box sx={{ margin: "0px 0 0", lineHeight: 1 }}>
            {children}
        </Box>
        <Box sx={{ clear: "both" }}/>
    </Box>
)

export const TooltipHeader = ({ headerName }) => (
    <Box sx={{
        fontSize: 18,
        textAlign: "center",
        color: "#666",
        fontWeight: 800,
        lineHeight: "1.5"
    }}>
        {headerName}
    </Box>
)

export const TooltipItem = ({ groupName, groupValue }) => (
    <Box sx={{ margin: '10px 0 0', lineHeight: 1 }}>
        <Box sx={{ margin: '0 0 0', lineHeight: 1 }}>
            <Span sx={{
                fontSize: 14,
                color: "#666",
                fontWeight: 400,
                marginLeft: 2
            }}>
                {groupName}
            </Span>
            <Span sx={{
                float: "right",
                marginLeft: 20,
                fontSize: 14,
                color: "#666",
                fontWeight: 900
            }}>
                {groupValue}
            </Span>
            <Box sx={{ clear: "both" }}/>
        </Box>
        <Box sx={{ clear: "both" }}/>
    </Box>
)
