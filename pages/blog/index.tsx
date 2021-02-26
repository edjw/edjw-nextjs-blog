import Layout from '../../components/Layout'
import PostList from '../../components/PostList'
import { GetStaticProps } from 'next'

import allPosts from '../../data/allBlogposts'

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


    return {
        props: {
            allPosts
        },
    }
}