import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import Layout from '../components/Layout'
import PostList from '../components/PostList'

import allPosts from '../data/allBlogposts'

const title = "Ed Johnson Williams' website"
const description = "Ed Johnson Williams' website"

export default function Index({ featuredPosts, ...props }) {
  return (
    <>
      <Layout pageTitle={title} description={description}>
        <Head>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
          <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
          <link rel="token_endpoint" href="https://tokens.indieauth.com/token" />
        </Head>

        <section className='px-8 py-4 prose text-gray-900 border-t-4 border-yellow-200 bg-yellow-50 dark:bg-gray-800 dark:prose-light'>
          <p>
            My personal site
          </p>

          <p>
            Some tech, some politics, some shapenote music
          </p>
        </section>


        <div className="mt-10">
          <h2>A few blogposts I like</h2>

          <p>
            A selection of my blogposts. You can also {' '}
            <Link href="/blog">
              <a className="font-semibold">see all blogposts</a>
            </Link>
            .
          </p>

          <PostList posts={featuredPosts} showYears={false} />

          <p>
            <Link href="/blog">
              <a className="font-semibold">See all blogposts</a>
            </Link>
          </p>
        </div>

      </Layout>

    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {

  const featuredPosts = allPosts.filter((post) => post.featured === true)

  return {
    props: {
      featuredPosts
    },
  }
}

