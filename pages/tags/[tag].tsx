import slugify from 'slugify'
import { titleCase } from "title-case";
import Layout from '../../components/Layout'
import PostList from '../../components/PostList'
import { GetStaticProps, GetStaticPaths } from 'next'

import allPosts from '../../data/allBlogposts'

export const config = {
    unstable_runtimeJS: false,
}

export default function TagPage({ tagName, tagPosts }) {
    return (
        <>
            <Layout pageTitle={tagName} description={`Blogposts about ${tagName}`}>
                <h2>{tagName}</h2>
                <p>
                    These are the blogposts I've tagged as <em>{tagName}</em>.
                </p>
                <PostList posts={tagPosts} />
            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {

    const tagName = String(context.params.tag).replace('-', ' ')

    const tagPosts = allPosts
        .filter((post) => post.tags != null)
        .filter((post) => post.tags.includes(tagName))

    return {
        props: {
            tagPosts,
            tagName: titleCase(tagName),
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {


    // the state of this
    const postTags = Array.from(
        new Set(
            allPosts
                .map((post) => post.tags)
                .flat()
                .filter((tag) => tag != null)
                .map((tag) => slugify(tag))
        )
    )

    const paths = postTags.map((tag) => `/tags/${tag}`)

    return {
        paths, // An array of path names, and any params
        fallback: false, // so that 404s properly appear if something's not matching
    }
}


