import fetch from 'node-fetch'
import has from "lodash/has"
import map from "lodash/map"
import { useQuery } from 'react-query'

function getAuthorName(author) {
    return author.name ? author.name : null;
}
function getTagName(tag) {
    return tag.tag ? tag.tag : null;
}

const fetchPocketData = async ({ queryKey }) => {
    const [_, numberOfArticles] = queryKey
    const pocketLinks = await fetch(`https://getpocket.com/v3/get?consumer_key=${process.env.POCKET_API_KEY}&access_token=${process.env.POCKET_ACCESS_TOKEN}&sort=newest&detailType=complete&count=${numberOfArticles}`);
    const pocketLinksJSON = await pocketLinks.json();

    let pocketData = Object.values(pocketLinksJSON.list).reduce((allItems, item) => {
        if (!(has(item.tags, "private"))) {
            allItems.push({
                id: item.item_id,
                title: item.resolved_title || null,
                url: item.resolved_url,
                excerpt: item.excerpt || null,
                tags: item.tags ? map(item.tags, getTagName) : null,
                authors: item.authors ? map(item.authors, getAuthorName) : null
            })
        }
        return allItems
    }, []).reverse();

    return pocketData;

}

const usePocketData = async () => {

    return useQuery(['pocketData', numberOfArticles], () => fetchPocketData(numberOfArticles))
}

export { usePocketData, fetchPocketData }