import slugify from 'slugify'
import { titleCase } from "title-case";
import Link from 'next/link'
import { GetStaticProps } from 'next'

import Layout from '../../components/Layout'

import allPosts from '../../data/allBlogposts'

const title = 'Tags'
const description = 'Tags from my blog posts'

export const config = {
    unstable_runtimeJS: false,
}

export default function Tags({ tags, ...props }) {
    return (
        <>
            <Layout pageTitle={title} description={description}>
                <h2>Tags</h2>

                <p>A list of tags used in blogposts on my website</p>

                <section className='mt-8'>

                    <ul>
                        {tags.map((tag) => (
                            <li key={tag.slug} className='mt-4'>
                                <Link href={`/tags/${tag.slug}`}>
                                    <a>
                                        {tag.tag}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {


    // the state of this
    const postTags = Array.from(
        new Set(
            allPosts
                .map((post) => post.tags)
                .flat()
                .filter((tag) => tag != null)
                .sort()
        )
    )


    const tags = postTags.map((tag: string) => ({
        tag: titleCase(tag),
        slug: slugify(tag)
    }))

    return {
        props: {
            tags
        },
    }
}

