import allPosts from '../data/allBlogposts'
import siteData from '../data/siteconfig'
const { url: siteURL, title: siteTitle, description: siteDescription } = siteData
import markdownToHtml from '../utils/md2HTML'

async function generateRss(posts) {
    const itemsList = await Promise.all(allPosts.map(generateRssItem))

    return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
      <channel>
        <title>${siteTitle}</title>
        <link>${siteURL}</link>
        <description>${siteDescription}</description>
        <language>en</language>
        <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
        <atom:link href="${siteURL}/feed.xml" rel="self" type="application/rss+xml"/>

        ${itemsList.join('')}

        </channel>
    </rss>
  `
}

async function generateRssItem(post) {
    const content = await markdownToHtml(post.markdownBody || '')

    return `
    <item>
      <guid>${siteURL}/posts${post.slug}</guid>
      <title>${post.title}</title>
      <link>${siteURL}/posts/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <content type="html">${content}</content>
    </item>
  `
}

export default function RSSFeed() { };


RSSFeed.getInitialProps = async ({ res }) => {
    res.setHeader('Content-Type', 'text/xml');
    res.write(await generateRss(allPosts));
    res.end();
}
