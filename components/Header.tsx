import Link from 'next/link'
import Navigation from './Navigation'
import ThemeToggleButton from './themeToggleButton'

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

                    <ThemeToggleButton />
                </div>

                <Navigation />

            </header>

        </>
    )
}
