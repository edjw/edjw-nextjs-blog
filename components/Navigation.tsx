import navigation from "../data/navigation.json"
import Link from 'next/link'


interface navItem {
    url: string
    text: string
    attribute?: string
}

export default function Navigation() {

    return (
        <nav className="grid grid-cols-3 mt-8 mb-4 prose list-none sm:w-1/3 gap-y-4 gap-x-1 dark:prose-light">
            {navigation.map(({ url, text, attribute }: navItem, index) => (
                <Link href={url} key={index}>
                    <a className="p-1 text-lg transition duration-300 ease-in-out border-b-2 border-transparent min-w-min hover:border-yellow-200 hover:bg-yellow-100 hover:bg-opacity-20 dark:hover:border-gray-800 dark:hover:bg-yellow-200 dark:hover:bg-opacity-100" rel={attribute}>{text}</a>
                </Link>
            ))}

            {/* {% if section == nav.section %} aria-current="page"{% endif %} */}

        </nav >
    )
};
