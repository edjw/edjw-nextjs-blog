import Link from 'next/link'
import { GetStaticProps } from 'next'

import Layout from '../components/Layout'
import PostList from '../components/PostList'

import getPosts from '../utils/getPosts'

export default function Index({ featuredPosts, title, description, ...props }) {

  return (
    <>
      <Layout pageTitle={title} description={description || title}>

        <section>
          <p>
            My personal site
        </p>

          <p className="mt-2">
            Some tech, some politics, some shapenote music
            </p>
        </section>


        <div className="mt-8 prose" >
          <h2 className="-mb-2" >A few posts I like</h2>

          <PostList posts={featuredPosts} showYears={false} />

          <p>
            <Link href="/all-posts" >
              <a className="font-semibold"> See all posts </a>
            </Link>
          </p>
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


  const featuredPosts = allPosts.filter((post) => post.featured === true)


  return {
    props: {
      featuredPosts
    },
  }
}

