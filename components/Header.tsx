import Link from 'next/link'
import Navigation from './Navigation'

export default function Header({ title, currentPath }) {
    return (
        <>
            <header>
                <div className="flex items-center">
                    <h1 className="mr-6 text-4xl prose dark:prose-light">
                        <Link href="/">
                            <a className="text-4xl leading-relaxed no-underline border-b-8 border-yellow-200 hover:border-transparent h-card" rel="me"

                            // {(currentPath === "/") && 'aria-current="page"}


                            >
                                {title}

                            </a>
                        </Link>

                    </h1>

                    <button id="themeButton" className="w-6 h-6 mt-2.5 dark:text-white" aria-label='Toggle theme'></button>

                </div>

                <Navigation />

            </header>

        </>
    )
}
