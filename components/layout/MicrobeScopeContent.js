import { CustomContent } from "@/components/styledComponents/styledLayoutComponents"
import { Box } from "@mui/system"

const MicrobeScopeContent = ({ children }) => (
    <CustomContent>
        <Box sx={{ px: '80px' }}>
            {children}
        </Box>
    </CustomContent>
)

export default MicrobeScopeContent
