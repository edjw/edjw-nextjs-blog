import matter from 'gray-matter'

const getPosts = (context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
        let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
        const value = values[index]
        const postData = matter(value.default)
        return {
            title: postData.data.title,
            date: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(postData.data.date),
            markdownBody: postData.content,
            slug,
        }
    }).reverse()
    return data
}

export default getPosts