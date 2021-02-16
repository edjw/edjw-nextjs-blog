import Link from 'next/link'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

import getPosts from '../utils/getPosts'

const Index = ({ posts, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={title} description={description}>
        <Link href='pocket-articles'><a>Pocket articles</a></Link>
        <main>
          <PostList posts={posts} />
        </main>
        <p>
          You can look at the repository for this project{' '}
          <a href="https://github.com/cassidoo/next-netlify-blog-starter">
            here
          </a>
          , and a tutorial on how to build it {` `}
          <a href="https://url.netlify.com/ByVW0bCF8">here</a>.
        </p>
      </Layout>

    </>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    return getPosts(context)
  })(require.context('../posts', true, /\.md$/))

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
    },
  }
}
