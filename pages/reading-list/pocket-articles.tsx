import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPocketData } from '../../data/fetchPocketQuery'
import Layout from '../../components/Layout'
import { GetStaticProps } from 'next'

const numberOfArticles = 0 // 0 is unlimited
const title = 'Pocket articles'
const description = 'My saved Pocket articles'

export const config = {
    unstable_runtimeJS: false,
}

export default function Pocket() {

    const { data: pocketData } = useQuery(
        ['pocketData', numberOfArticles],
        (numberOfArticles) => fetchPocketData(numberOfArticles), { staleTime: Infinity })

    return (
        <>
            <Layout pageTitle={title} description={description}>
                <h2>{title}</h2>
                <p>
                    This is a list of the {pocketData.length} {' '}
                    {pocketData.length > 50 ?
                        <a
                            href="https://github.com/edjw/edjw-blog/blob/a528443b33ce24de27097d6f1e9ac74ed817e851/_includes/layouts/reading-list.njk#L7-L11">(🤦‍♂️‍‍‍‍)</a> : ""}{' '}

  links that are currently saved in {' '}
                    <a href="https://getpocket.com">my Pocket account</a>. I have excluded links
  that I have tagged as 'private'. The Pocket article links only work if you've
  got a Pocket account.
            </p>

                {pocketData.map(({ title, url, authors, excerpt, id, tags }) => (

                    <section key={id} className="rprose readingListItem dark:prose-light dark:bg-gray-800">

                        <p className='mb-0'>
                            <a href={url} className='font-semibold'>{title ? title : url}</a>
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


                        { excerpt &&
                            <p className='mb-2'><em>Summary: </em>{excerpt}</p>
                        }

                        <p className='mt-0'>
                            <a href={`https://app.getpocket.com/read/${id}`}
                                aria-label={`Read ${title ? title : 'article'}${authors
                                    && ' by '} ${authors && authors} on Pocket`}
                                className="text-gray-600">
                                Read on Pocket
                            </a>
                        </p>

                        <p className="text-gray-500">

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
export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(['pocketData', numberOfArticles], (numberOfArticles) => fetchPocketData(numberOfArticles))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}