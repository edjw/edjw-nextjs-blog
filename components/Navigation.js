import navigation from "../data/navigation.json"
import Link from 'next/link'

export default function Navigation() {

    return (
        <nav className="flex flex-wrap my-8 prose list-none gap-y-4 sm:w-2/4 dark:prose-light">
            {navigation.map((item, index) => (
                <Link href={item.url} key={index}>
                    <a className="w-1/3 p-1 text-lg no-underline transition duration-300 ease-in-out border-b-2 border-transparent min-w-min hover:border-yellow-200 hover:bg-yellow-100 hover:bg-opacity-20 dark:hover:border-gray-800 dark:hover:bg-yellow-200 dark:hover:bg-opacity-100">{item.text}</a>
                </Link>
            ))}


            {/* {% if section == nav.section %} aria-current="page"{% endif %} */}



        </nav >
    )
};
