import Link from 'next/link'
import matter from 'gray-matter'

import Layout from '../components/Layout'
import getSlugs from '../utils/getSlugs'
import markdownToHtml from '../utils/md2HTML'

export default function BlogPost({ siteTitle, title, date, tags, socialDescription, markdownBody }) {
    if (!title) return <></>

    return (
        <>
            <Layout pageTitle={`${siteTitle} | ${title}`}>
                <div className="back">
                    ←{' '}
                    <Link href="/">
                        <a>Back to post list</a>
                    </Link>
                </div>
                <article>
                    <h1>{title}</h1>
                    <p>
                        <time>{date}</time>
                    </p>
                    <p>
                        {/* {tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))} */}
                    </p>
                    <div className="prose lg:prose-xl"
                        dangerouslySetInnerHTML={{ __html: markdownBody }}>
                    </div>
                </article>
            </Layout>

        </>
    )
}

export async function getStaticProps({ ...context }) {
    const { postname } = context.params

    const content = await import(`../posts/${postname}.md`)
    const config = await import(`../siteconfig.json`)
    const postData = matter(content.default)

    return {
        props: {
            siteTitle: config.title,
            title: postData.data.title,
            date: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(postData.data.date),
            socialDescription: postData.data.socialDescription || '',
            tags: postData.data.tags || '',
            markdownBody: await markdownToHtml(postData.content),
        },
        revalidate: 1

    }
}

export async function getStaticPaths() {
    const blogSlugs = ((context) => {
        return getSlugs(context)
    })(require.context('../posts', true, /\.md$/))

    const paths = blogSlugs.map((slug) => `/${slug}`)

    return {
        paths, // An array of path names, and any params
        fallback: false, // so that 404s properly appear if something's not matching
    }
}
