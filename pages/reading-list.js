import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPocketData } from '../data/fetchPocketQuery'
import Link from 'next/link'
import Layout from '../components/Layout'
import ReadingListEntry from '../components/ReadingListEntry'

const numberOfArticles = 3
const title = 'Reading List'
const description = 'My saved Pocket articles, Raindrop links, and Feedbin stars'

export default function ReadingList() {

    const { data: pocketData } = useQuery(['pocketData', numberOfArticles], (numberOfArticles) => fetchPocketData(numberOfArticles), { staleTime: Infinity })
    return (
        <>
            <Layout pageTitle={title} description={description}>
                <h2>
                    {title}
                </h2>
                <p>See what I've saved in Pocket, Raindrop, and Feedbin.</p>

                <h3>
                    Latest 3 Pocket articles
                </h3>

                {pocketData.map((item) => (
                    <ReadingListEntry key={item.id} title={item.title} url={item.url} excerpt={item.excerpt} />
                ))}


                <p className="-mt-4">
                    <Link href="/pocket-articles">
                        <a className="font-semibold">See all Pocket links</a>
                    </Link>
                </p>

                <h3 className="mt-12">
                    Latest 3 Raindrop links
                </h3>

                {/* <ReadingListEntry></ReadingListEntry> */}

                <p className="-mt-4">
                    <Link href="/raindrop-links">
                        <a className="font-semibold">See all Raindrop links</a>
                    </Link>
                </p>

                <h3 className="mt-12">
                    Latest 3 Feedbin stars
                </h3>

                {/* <ReadingListEntry></ReadingListEntry> */}

                <p className="-mt-4">
                    <Link href="/feedbin-stars">
                        <a className="font-semibold">See all Feedbin stars</a>
                    </Link>
                </p>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['pocketData', numberOfArticles], (numberOfArticles) => fetchPocketData(numberOfArticles))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}