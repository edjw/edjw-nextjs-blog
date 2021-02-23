import matter from 'gray-matter'

const getPosts = (context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const dateOptions = {
        day: '2-digit', month: 'long', year: 'numeric'
    }
    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', dateOptions);

    const data = keys.map((key, index) => {
        let slug = `/${key.replace(/^.*[\\\/]/, '').slice(0, -3)}`
        const value = values[index]
        const postData = matter(value.default)

        const postDate = new Date(postData.data.data)
        return {
            title: postData.data.title,
            date: dateTimeFormat.format(postDate),
            markdownBody: postData.content,
            featured: postData.data.featured || false,
            slug,
        }
    }).reverse()
    return data
}

export default getPosts
