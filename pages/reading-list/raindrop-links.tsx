import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchRaindropData } from '../../data/fetchRaindropQuery'
import Layout from '../../components/Layout'
import ReadingListEntry from '../../components/ReadingListEntry'
import { GetStaticProps } from 'next'

const title = 'Raindrop Links'
const description = 'My saved articles in Raindrop'

export const config = {
    unstable_runtimeJS: false,
}

export default function Raindrop() {
    const { data: raindropData } = useQuery(
        'raindropData',
        () => fetchRaindropData(), { staleTime: Infinity })
    return (
        <>
            <Layout pageTitle={title} description={description}>
                <h2>{title}</h2>
                <p>
                    These are the {raindropData.length} links that I've saved on <a href="https://raindrop.io">Raindrop, my bookmarking service</a>.
                </p>

                {raindropData.map(({ title, excerpt, url }, index) => (
                    <ReadingListEntry key={index} url={url} title={title} excerpt={excerpt} />
                ))}

            </Layout>
        </>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('raindropData', fetchRaindropData)

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}