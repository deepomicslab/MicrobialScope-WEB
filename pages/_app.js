import "@/styles/globals.css"
import Head from "next/head"
import { ConfigProvider } from "antd"
import { StyleProvider } from "@ant-design/cssinjs"
import theme from '/theme/theme'
import MicrobeScopeLayout from "@/components/layout/MicrobeScopeLayout"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

export default function App({ Component, pageProps }) {
    return (
        <ConfigProvider theme={theme}>
            <StyleProvider layer>
                <DndProvider backend={HTML5Backend}>
                    <Head>
                        <title>MicrobialScope</title>
                        <meta name="description" content="MicrobialScope"/>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link rel="icon" href="/microbial_logo.png"/>
                    </Head>
                    <MicrobeScopeLayout>
                        <Component {...pageProps} />
                    </MicrobeScopeLayout>
                </DndProvider>
            </StyleProvider>
        </ConfigProvider>
    )
}
