import has from "lodash/has"
import map from "lodash/map"

function getAuthorName(author) {
    return author.name ? author.name : null;
}
function getTagName(tag) {
    return tag.tag ? tag.tag : null;
}

export async function getStaticProps(context) {
    const pocketLinks = await fetch(`https://getpocket.com/v3/get?consumer_key=${process.env.POCKET_API_KEY}&access_token=${process.env.POCKET_ACCESS_TOKEN}&sort=newest&detailType=complete`); const pocketLinksJSON = await pocketLinks.json();

    // Reduce instead of .filter().map()
    let data = Object.values(pocketLinksJSON.list).reduce((allItems, item) => {
        if (!(has(item.tags, "private"))) {
            allItems.push({
                id: item.item_id,
                title: item.resolved_title ? item.resolved_title : null,
                url: item.resolved_url,
                excerpt: item.excerpt ? item.excerpt : null,
                tags: item.tags ? map(item.tags, getTagName) : null,
                authors: item.authors ? map(item.authors, getAuthorName) : null
            })
        }
        return allItems
    }, []).reverse();

    if (!data) {
        return {
            notFound: true,
        }
    }


    return {
        props: { data }, // will be passed to the page component as props
    }
}


function Pocket({ data }) {


    return (
        <>
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
        </>

    )
}




export default Pocket
