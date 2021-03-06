import navigation from "../data/navigation.json"
import Link from 'next/link'


interface navItem {
    url: string
    text: string
    attribute?: string
}

export default function Navigation() {

    return (
        <nav className="grid w-9/12 grid-cols-3 mt-8 mb-4 prose list-none sm:w-6/12 md:w-6/12 gap-y-2 dark:prose-light">
            {navigation.map(({ url, text, attribute }: navItem, index) => (
                <Link href={url} key={index}>
                    <a className="w-full p-1 text-lg transition duration-300 ease-in-out border-b-2 border-transparent hover:border-yellow-200 hover:bg-yellow-100 hover:bg-opacity-20 dark:hover:border-gray-800 dark:hover:bg-yellow-200 dark:hover:bg-opacity-100" rel={attribute}>{text}</a>
                </Link>
            ))}

            {/* {% if section == nav.section %} aria-current="page"{% endif %} */}

        </nav >
    )
};
