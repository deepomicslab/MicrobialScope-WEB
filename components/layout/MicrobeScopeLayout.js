import { Layout } from "antd"
import MicrobeScopeHeader from "@/components/layout/MicrobeScopeHeader"
import MicrobeScopeContent from "@/components/layout/MicrobeScopeContent"
import MicrobeScopeFooter from "@/components/layout/MicrobeScopeFooter"

const MicrobeScopeLayout = ({children}) => (
    <Layout>
        <MicrobeScopeHeader/>
        <MicrobeScopeContent>
            {children}
        </MicrobeScopeContent>
        <MicrobeScopeFooter/>
    </Layout>
)

export default MicrobeScopeLayout
