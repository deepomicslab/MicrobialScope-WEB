import { CustomContent } from "@/components/styledComponents/styledLayoutComponents"
import { Container } from "@mui/system"

const MicrobeScopeContent = ({ children }) => (
    <CustomContent>
        <Container maxWidth="xl">
            {children}
        </Container>
    </CustomContent>
)

export default MicrobeScopeContent
