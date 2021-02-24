import { useRef } from 'react'
import PostEntry from './PostEntry'
import getYear from '../utils/getYear'

export default function PostList({ posts, showYears = true }) {
    let year = useRef('')
    let postYear = useRef('')

    function setPostYear(date: String): void {
        postYear.current = getYear(date)
    }
    function setYear(date: String): void {
        year.current = getYear(date)
    }


    if (posts === 'undefined') return null
    if (!posts) {
        return (
            <div>No posts here</div>
        )
    }
    return (

        <>

            {posts &&

                posts.map((post, index) => (

                    <div key={index}>


                        {showYears && setPostYear(post.date)}

                        {showYears && year.current != postYear.current && (
                            <p className='mt-10 -mb-6 text-lg font-bold'>
                                {postYear.current}
                            </p>
                        )}

                        {showYears && setYear(post.date)}

                        <PostEntry post={post}></PostEntry>

                    </div>
                ))
            }
        </>

    )
};
