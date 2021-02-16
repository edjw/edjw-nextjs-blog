import Link from 'next/link'

export default function PostList({ posts }) {
    if (posts === 'undefined') return null

    return (
        <div>
            {!posts && <div>No posts!</div>}
            <ul>
                {posts &&
                    posts.map((post) => {
                        return (
                            <li key={post.slug}>
                                {post.date}: {` `}
                                <Link href={{ pathname: `/${post.slug}` }}>
                                    <a>{post?.title}</a>
                                </Link>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
