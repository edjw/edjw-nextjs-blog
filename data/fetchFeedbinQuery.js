import fetch from 'node-fetch'

import { useQuery } from 'react-query'

const authToken = process.env.feedbinAuthToken

const fetchFeedbinData = async () => {
    const starredEntries = await fetch(`https://api.feedbin.com/v2/entries.json?starred=true`, {
        headers: {
            Authorization: `Basic ${authToken}`
        }
    });

    const starredEntriesJSON = await starredEntries.json();

    const feedbinData = starredEntriesJSON.map(entry => ({
        id: entry.id,
        title: entry.title,
        author: entry.author,
        summary: entry.summary,
        // content: entry.content.replace(/\n|\\"|\/"/g, ""),
        url: entry.url,
        published: entry.published,
        created_at: entry.created_at
    })).reverse();
    return feedbinData;

}

const useFeedbinData = async () => {

    return useQuery('feedbinData', () => fetchFeedbinData())
}

export { useFeedbinData, fetchFeedbinData }