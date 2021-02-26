import { titleCase } from "title-case";
import slugify from 'slugify'
import matter from 'gray-matter'
import readingTime from 'reading-time'

import Link from 'next/link'

import Layout from '../../components/Layout'
import markdownToHtml from '../../utils/md2HTML'

import allPosts from '../../data/allBlogposts'

import { GetStaticProps, GetStaticPaths } from 'next'

export default function BlogPost({ title, date, tags, socialDescription, markdownBody, readingTime }) {
    if (!title) return <></>

    return (
        <>
            <Layout pageTitle={title} description={socialDescription}>
                <article className="prose h-entry dark:prose-light">
                    {/* <!-- h-entry things --> */}
                    <div className="hidden">
                        {/* <a href="{{ page.url }}"></a> */}
                        <time className="dt-published">{new Date(date).toUTCString()}</time>
                        {tags.map((tag, index) => (
                            <a key={index} className="p-category" href={`/tags/${slugify(tag)}`}>{titleCase(tag)}</a>
                        ))}
                        <a rel="author" href="https://edjohnsonwilliams.co.uk">Ed Johnson-Williams</a>
                    </div>
                    {/* <!-- End of h-entry things --> */}

                    <h2 className="-mt-0 p-name">
                        {title}
                    </h2>

                    <section>
                        <p className="my-1">
                            <span>Published: </span>
                            <time>{date}</time>
                        </p>

                        <p className="my-1">
                            <span>Reading time: </span>
                            {readingTime}
                        </p>


                        {(tags.length > 0) &&

                            <p className="flex gap-2 my-1">
                                <span>Tagged as:</span>{' '}

                                {tags.map((tag, index) => (
                                    <Link href={`/tags/${slugify(tag)}`} key={index}>
                                        <a>{titleCase(tag)}</a>
                                    </Link>
                                ))}

                            </p>}

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

    const content = await import(`../../posts/${postname}.md`)
    const postData = matter(content.default)

    return {
        props: {
            title: postData.data.title || '',
            date: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(postData.data.date),
            socialDescription: postData.data.socialDescription || '',
            tags: postData.data.tags || '',
            markdownBody: await markdownToHtml(postData.content),
            readingTime: readingTime(postData.content).text,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {


    const paths = allPosts.map((post) => `${post.slug}`)


    return {
        paths, // An array of path names, and any params
        fallback: false, // so that 404s properly appear if something's not matching
    }
}
