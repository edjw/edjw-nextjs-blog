import getPosts from '../utils/getPosts'
const allPosts = ((context) => {
    return getPosts(context)
})
    // directory, recursive?, extension to look for
    (require.context('../posts', false, /\.md$/))

export default allPosts