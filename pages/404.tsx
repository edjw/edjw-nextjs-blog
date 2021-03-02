import Link from 'next/link'
import Layout from '../components/Layout'

const title = "Sorry, that page doesn't exist"

export const config = {
    unstable_runtimeJS: false,
}

export default function FourOhFour() {
    return (
        <>
            <Layout pageTitle={title} description={title}>

                <h2>{title}</h2>

                <p>That link doesn't work and it's probably my fault. Sorry about that.</p>

                <p>Hopefully you can find what you're looking with one of these links below.</p>

                <p>
                    <Link href="/">
                        <a>Go to the homepage</a>
                    </Link>
                </p>

                <p>
                    <Link href="/blog">
                        <a>See a list of all blogposts</a>
                    </Link>
                </p>

                <p>
                    <Link href="/tags">
                        <a>See a list of all blogpost tags</a>
                    </Link>
                </p>

                <p>
                    <Link href="/reading-list">
                        <a>See my reading lists</a>
                    </Link>
                </p>
            </Layout>
        </>
    )
}