import "@/styles/globals.css"
import Head from "next/head"
import { ConfigProvider } from "antd"
import { StyleProvider } from "@ant-design/cssinjs"
import theme from '/theme/theme'
import MicrobeScopeLayout from "@/components/layout/MicrobeScopeLayout"

export default function App({ Component, pageProps }) {
  return (
      <ConfigProvider theme={theme}>
        <StyleProvider layer>
          <Head>
            <title>MicrobialScope</title>
            <meta name="description" content="MicrobialScope"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
          <MicrobeScopeLayout>
            <Component {...pageProps} />
          </MicrobeScopeLayout>
        </StyleProvider>
      </ConfigProvider>
  )
}
