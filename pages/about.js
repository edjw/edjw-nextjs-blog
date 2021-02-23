import Layout from '../components/Layout'

import getPage from '../utils/getPage'
import pageMarkdown from '../static-pages/about.md'

const About = ({ title, description, content, ...props }) => {
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

export default About

export async function getStaticProps() {

    const page = await getPage(pageMarkdown)
    return {
        props: {
            title: page.data.title,
            description: page.data.socialDescription,
            content: page.data.markdownBody
        },
    }
}

