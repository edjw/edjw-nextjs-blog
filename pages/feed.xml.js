import allPosts from '../data/allBlogposts'
import siteData from '../data/siteconfig'
const { url: siteURL, title: siteTitle, description: siteDescription, author: { name } } = siteData
import markdownToHtml from '../utils/md2HTML'

async function generateRss(posts) {
  const itemsList = await Promise.all(allPosts.map(generateRssItem))

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
      <title>${siteTitle}</title>
      <link href="${siteURL}" rel="self"/>
      <description>${siteDescription}</description>
      <language>en</language>
      <updated>${new Date(posts[0].date).toISOString()}</updated>
      <author>
        <name>${name}</name>
      </author>
      ${itemsList.join('')}
</feed>
  `
}

async function generateRssItem(post) {
  const content = await markdownToHtml(post.markdownBody || '')

  return `
    <entry>
      <title>${post.title}</title>
      <link href="${siteURL}/posts/${post.slug}"/>
      <updated>${new Date(post.date).toUTCString()}</updated>
      <content type="html"><![CDATA[${content}]]></content>
    </entry>
  `
}

export default function RSSFeed() { };


RSSFeed.getInitialProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml');
  res.write(await generateRss(allPosts));
  res.end();
}
