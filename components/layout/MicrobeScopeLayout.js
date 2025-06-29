import { Layout } from "antd"
import MicrobeScopeHeader from "@/components/layout/MicrobeScopeHeader"
import MicrobeScopeContent from "@/components/layout/MicrobeScopeContent"
import MicrobeScopeFooter from "@/components/layout/MicrobeScopeFooter"
import BrowserAlert from "@/components/feedbackComponents/BrowserAlert"

const MicrobeScopeLayout = ({children}) => (
    <Layout>
        <MicrobeScopeHeader/>
        <MicrobeScopeContent>
            {children}
        </MicrobeScopeContent>
        <MicrobeScopeFooter/>
        <BrowserAlert/>
    </Layout>
)

export default MicrobeScopeLayout
