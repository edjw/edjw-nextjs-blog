import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPocketData } from '../../data/fetchPocketQuery'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { GetStaticProps } from 'next'
import ReadingListEntry from '../../components/ReadingListEntry'

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
                <p>See what I've saved in <a href="#pocket-section">Pocket</a>, <a href="#raindrop-section">Raindrop</a>, and <a href="#feedbin-section">Feedbin</a>.</p>

                <h3 id='pocket-section'>
                    <Link href="/reading-list/pocket-articles"><a className='font-semibold'>Latest 3 Pocket articles</a></Link>
                </h3>

                {pocketData.map((item) => (
                    <ReadingListEntry key={item.id} title={item.title} url={item.url} excerpt={item.excerpt} />
                ))}


                <p className="-mt-4">
                    <Link href="/reading-list/pocket-articles">
                        <a className="font-semibold">See all Pocket links</a>
                    </Link>
                </p>

                <h3 className="mt-12" id='raindrop-section'>
                    Latest 3 Raindrop links
                </h3>

                {/* <ReadingListEntry></ReadingListEntry> */}

                <p className="-mt-4">
                    <Link href="/raindrop-links">
                        <a className="font-semibold">See all Raindrop links</a>
                    </Link>
                </p>

                <h3 className="mt-12" id='feedbin-section'>
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

export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['pocketData', numberOfArticles], (numberOfArticles) => fetchPocketData(numberOfArticles))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}