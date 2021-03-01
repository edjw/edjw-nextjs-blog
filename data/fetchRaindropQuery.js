import fetch from 'node-fetch'

import { useQuery } from 'react-query'

const authToken = process.env.RAINDROP_ACCESS_TOKEN;

const fetchRaindropData = async () => {
    const raindropLinks = await fetch("https://api.raindrop.io/rest/v1/raindrops/0", {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

    const raindropLinksJSON = await raindropLinks.json();


    const raindropData = raindropLinksJSON.items.map(item => ({
        title: item.title,
        url: item.link,
        excerpt: item.excerpt,
    }));

    return raindropData;

}

const useRaindropData = async () => {
    return useQuery('raindropData', fetchRaindropData)
}

export { useRaindropData, fetchRaindropData }