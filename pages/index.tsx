import Link from 'next/link'
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

        <section className='px-8 py-1 text-gray-900 bg-yellow-50'>
          <p>
            My personal site
          </p>

          <p>
            Some tech, some politics, some shapenote music
          </p>
        </section>


        <div className="mt-10 prose">
          <h2>A few blogposts I like</h2>

          <p>
            A selection of my blogposts. You can also {' '}
            <Link href="/all-posts">
              <a className="font-semibold">see all blogposts</a>
            </Link>
            .
          </p>

          <PostList posts={featuredPosts} showYears={false} />

          <p>
            <Link href="/all-posts">
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

