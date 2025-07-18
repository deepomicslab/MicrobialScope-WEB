import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const MyDocument = () => (
    <Html lang="en">
        <Head>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/pdbe-molstar@3.3.0/build/pdbe-molstar-light.css"
            />
            <script
                src="https://cdn.jsdelivr.net/npm/pdbe-molstar@3.3.0/build/pdbe-molstar-plugin.js"
                defer
            />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
    </Html>
);

MyDocument.getInitialProps = async (ctx) => {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => (
                <StyleProvider cache={cache}>
                    <App {...props} />
                </StyleProvider>
            ),
        });

    const initialProps = await Document.getInitialProps(ctx);
    const style = extractStyle(cache, true);
    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                <style dangerouslySetInnerHTML={{ __html: style }} />
            </>
        ),
    };
};

export default MyDocument;
