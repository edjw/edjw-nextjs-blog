import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'


class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {

        // const shouldRenderScripts =
        //     this.props.unstable_runtimeJS || process.env.NODE_ENV !== 'production'

        return (
            <Html lang="en">
                <Head />
                <body className='dark:bg-trueGray-800'>
                    <Main />
                    <NextScript />
                    {/* {shouldRenderScripts ? <NextScript /> : null} */}
                </body>
            </Html>
        )
    }
}

export default MyDocument