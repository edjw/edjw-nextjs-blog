import Layout from '../components/Layout'
import PostList from '../components/PostList'
import getPosts from '../utils/getPosts'
import { GetStaticProps } from 'next'

export default function AllPosts({ allPosts, ...props }) {
    return (
        <>
            <Layout pageTitle='All posts' description="Ed Johnson-Williams' blogposts">
                <div className="prose dark:prose-light">
                    <h2 className="-mb-4">All blogposts</h2>
                    <PostList posts={allPosts} showYears={true} />
                </div>

            </Layout>

        </>
    )
}


export const getStaticProps: GetStaticProps = async (context) => {
    const allPosts = ((context) => {
        return getPosts(context)
    })
        // directory, recursive?, extension to look for
        (require.context('../posts', false, /\.md$/))


    return {
        props: {
            allPosts
        },
    }
}