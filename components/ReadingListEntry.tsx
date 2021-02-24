export default function ReadingListEntry({ url, title, excerpt = false, publication = false }: { url: string, title: string, excerpt?: string | boolean, publication?: string | boolean }) {

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
