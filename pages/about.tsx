import Layout from '../components/Layout'

import getPage from '../utils/getPage'
import pageMarkdown from '../static-pages/about.md'
import { GetStaticProps } from 'next'

export const config = {
    unstable_runtimeJS: false,
}

export default function About({ title, description, content, ...props }) {
    return (
        <>
            <Layout pageTitle={title} description={description}>
                <h2>
                    {title}
                </h2>
                <div
                    dangerouslySetInnerHTML={{ __html: content }}>
                </div>
            </Layout>

        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const page = await getPage(pageMarkdown)
    return {
        props: {
            title: page.data.title,
            description: page.data.socialDescription,
            content: page.data.markdownBody
        },
    }
}

