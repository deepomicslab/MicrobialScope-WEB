import { Layout, message } from "antd"
import MicrobeScopeHeader from "@/components/layout/MicrobeScopeHeader"
import MicrobeScopeContent from "@/components/layout/MicrobeScopeContent"
import MicrobeScopeFooter from "@/components/layout/MicrobeScopeFooter"
import BrowserAlert from "@/components/feedbackComponents/BrowserAlert"
import { MessageContext } from "@/components/context/MessageContext"

const MicrobeScopeLayout = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage()

    return (
        <MessageContext.Provider value={messageApi}>
            <Layout>
                <MicrobeScopeHeader/>
                <MicrobeScopeContent>
                    {contextHolder}
                    {children}
                </MicrobeScopeContent>
                <MicrobeScopeFooter/>
                <BrowserAlert/>
            </Layout>
        </MessageContext.Provider>
    )
}

export default MicrobeScopeLayout
