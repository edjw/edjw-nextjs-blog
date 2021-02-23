export default function ReadingListEntry({ url, title, excerpt, publication }) {

    return (
        <>
            <section className="prose readingListItem dark:prose-light dark:bg-gray-800">
                <p className="leading-tight">
                    <a href={url} >
                        {title}
                    </a>
                </p>
                {excerpt &&
                    <p className="-mt-4">{excerpt}</p>
                }

                {publication &&
                    <p className="-mt-4">{publication}</p>
                }

            </section>
        </>
    )

};
