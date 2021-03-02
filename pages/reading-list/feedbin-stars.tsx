import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchFeedbinData } from '../../data/fetchFeedbinQuery'
import Layout from '../../components/Layout'
import ReadingListEntry from '../../components/ReadingListEntry'
import { GetStaticProps } from 'next'

const title = 'Feedbin stars'
const description = 'My starred articles in Feedbin'

export const config = {
    unstable_runtimeJS: false,
}

export default function Feedbin() {
    const { data: feedbinData } = useQuery(
        'feedbinData',
        () => fetchFeedbinData(), { staleTime: Infinity })
    return (
        <>
            <Layout pageTitle={title} description={description}>
                <h2>{title}</h2>
                <p>
                    These are the {feedbinData.length} articles that I've starred on <a href="https://feedbin.com">Feedbin, my RSS reader</a>.
                </p>

                {feedbinData.map(({ title, author, summary, url }, index) => (
                    <ReadingListEntry key={index} url={url} title={title} excerpt={summary} publication={author} />
                ))}

            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('feedbinData', () => fetchFeedbinData())

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}