import Link from 'next/link'
import matter from 'gray-matter'

import Layout from '../components/Layout'
import getSlugs from '../utils/getSlugs'
import markdownToHtml from '../utils/md2HTML'

import { GetStaticProps, GetStaticPaths } from 'next'

export default function BlogPost({ title, date, tags, socialDescription, markdownBody }) {
    if (!title) return <></>

    return (
        <>
            <Layout pageTitle={title} description={socialDescription}>
                {/* <div className="back">
                    ←{' '}
                    <Link href="/">
                        <a>Back to post list</a>
                    </Link>
                </div> */}
                <article className="prose h-entry dark:prose-light">

                    {/* <!-- h-entry things --> */}
                    <div className="hidden">
                        <a href="{{ page.url }}"></a>
                        <time className="dt-published">{date}</time>
                        {/* need to be iso8061 date */}
                        <a rel="author" href="https://edjohnsonwilliams.co.uk">Ed Johnson-Williams</a>
                    </div>
                    {/* <!-- End of h-entry things --> */}

                    <h2 className="-mt-0 p-name">
                        {title}
                    </h2>

                    <section>
                        <p className="my-1">
                            <span>Published:</span>
                            <time>{date}</time>
                        </p>

                        {/* <p className="my-1">
                            <span>Reading time:</span>
                            {content | readingTime}
                        </p> */}


                        {(tags.length > 0) &&

                            <p className="flex gap-2 my-1">
                                <span>Tagged as:</span>{' '}

                                {tags.map((tag, index) => (
                                    <Link href={`tags/${tag}`} key={index}>
                                        <a className=''>{tag}</a>
                                    </Link>
                                ))}

                            </p>}

                        {/* {tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))} */}


                    </section>

                    <div className="e-content"
                        dangerouslySetInnerHTML={{ __html: markdownBody }}>
                    </div>
                </article>
            </Layout>

        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { postname } = context.params

    const content = await import(`../posts/${postname}.md`)
    const postData = matter(content.default)

    return {
        props: {
            title: postData.data.title || '',
            date: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(postData.data.date),
            socialDescription: postData.data.socialDescription || '',
            tags: postData.data.tags || '',
            markdownBody: await markdownToHtml(postData.content),
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const blogSlugs = ((context) => {
        return getSlugs(context)
    })
        // directory, recursive, filetype
        (require.context('../posts', true, /\.md$/))

    const paths = blogSlugs.map((slug) => `/${slug}`)

    return {
        paths, // An array of path names, and any params
        fallback: false, // so that 404s properly appear if something's not matching
    }
}
