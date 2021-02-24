import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPocketData } from '../data/fetchPocketQuery'
import Layout from '../components/Layout'

const numberOfArticles = 0 // 0 is unlimited
const title = 'Pocket articles'
const description = 'My saved Pocket articles'

export default function Pocket({ title, description }) {

    const { data: pocketData } = useQuery(['pocketData', numberOfArticles], () => fetchPocketData(numberOfArticles), { staleTime: Infinity })

    return (
        <>
            <Layout pageTitle={title} description={description}>

                <p>
                    This is a list of the {data.length} {' '}
                    {data.length > 50 ?
                        <a
                            href="https://github.com/edjw/edjw-blog/blob/a528443b33ce24de27097d6f1e9ac74ed817e851/_includes/layouts/reading-list.njk#L7-L11">(🤦‍♂️‍‍‍‍)</a> : ""}{' '}

  links that are currently saved in {' '}
                    <a href="https://getpocket.com">my Pocket account</a>. I have excluded links
  that I have tagged as 'private'. The Pocket article links only work if you've
  got a Pocket account.
            </p>

                {data.map(({ title, url, authors, excerpt, id, tags }) => (

                    <section key={id} className="mt-4 border-t-2 border-yellow-200">
                        <p>
                            <a href={url}>{title ? title : url}</a>
                            {authors && " by "}
                            {authors &&
                                authors.map((author, index) => (
                                    <span key={index}>
                                        <i>{author}</i>{index != authors.length - 1
                                            ? index != authors.length - 2
                                                ? ","
                                                : " and "
                                            : ""}
                                    </span>
                                ))}
                        </p>

                        {/*  This should be small not p  */}
                        <p>
                            <a
                                href={`https://app.getpocket.com/read/${id}`}
                                aria-label={`Read ${title ? title : 'article'}${authors
                                    && ' by '} ${authors && authors} on Pocket`}>Pocket article link
                        </a>
                        </p>

                        {excerpt &&
                            <p><em>Summary: </em>{excerpt}</p>
                        }

                        {/* this should be small not p */}
                        <p>
                            {tags &&

                                <i>Tags: </i>}

                            {tags &&
                                tags.map((tag, index) => (
                                    <span key={index}>{tag}{index != tags.length - 1 && ", "}</span>
                                ))
                            }

                        </p>


                    </section>

                ))
                }
            </Layout>

        </>

    )
}
export async function getStaticProps() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['pocketData', numberOfArticles], () => fetchPocketData(numberOfArticles))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}