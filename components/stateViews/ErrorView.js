import { Stack } from "@mui/system"
import { Span } from "@/components/styledComponents/styledHTMLTags"

export const ErrorView = ({ width, height, containerSx, children }) => (
    <Stack
        sx={{
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            ...containerSx
        }}
    >
        {
            children ?
                children
                :
                <Span sx={{ fontSize: '24px', fontWeight: '500' }}>A Error Occur!</Span>
        }
    </Stack>
)
