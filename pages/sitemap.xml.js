import allPosts from '../data/allBlogposts'
import siteData from '../data/siteconfig'
const { url: siteURL } = siteData

const createSitemap = (allPosts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allPosts
        .map(({ slug }) => {
            return `
                    <url>
                        <loc>${`${siteURL}${slug}`}</loc>
                    </url>
                `;
        })
        .join('')}
    </urlset>
    `;

export default function Sitemap() { };


Sitemap.getInitialProps = async ({ res }) => {
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(allPosts));
    res.end();
}
