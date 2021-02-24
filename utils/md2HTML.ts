import remark from 'remark'
import html from 'remark-html'
import footnotes from 'remark-footnotes'

export default async function markdownToHtml(markdown) {
    const result = await remark()
        .use(html)
        .use(footnotes, { inlineNotes: true })
        .process(markdown)
    return result.toString()
}
