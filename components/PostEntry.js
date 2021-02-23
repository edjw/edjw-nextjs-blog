import Link from 'next/link'

export default function PostEntry({ post }) {
    const { date, title, slug } = post
    return (
        <>
            <section className="p-8 my-10 prose border-t-8 border-yellow-200 shadow-lg dark:prose-light dark:bg-gray-800">
                <p className="m-0 text-base">{date}</p>
                <h3 className="mt-1">
                    <Link href={slug}>
                        <a>{title}</a>
                    </Link>
                </h3>
            </section>
        </>
    )

};

