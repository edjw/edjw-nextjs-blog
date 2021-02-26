import siteData from '../data/siteconfig'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router'

const { title: siteTitle, description, url, author: { twitterUsername }, repository, RSSFeed, sitemap, contentLicence } = siteData

export default function Layout({ children, pageTitle, description, ...props }) {
    const router = useRouter()
    const currentPath = router.asPath
    const currentURL = `${url}${currentPath}`
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <title>{pageTitle || siteTitle}</title>
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />


                {/* Twitter */}
                <meta name="twitter:card" content="summary" key="twcard" />
                <meta name="twitter:creator" content={twitterUsername} key="twhandle" />

                {/* Open Graph */}
                <meta property="og:url" content={currentURL} key="ogurl" />
                {/* <meta property="og:image" content={previewImage} key="ogimage" /> */}
                <meta property="og:site_name" content={siteTitle} key="ogsitename" />
                <meta property="og:title" content={pageTitle} key="ogtitle" />
                <meta property="og:description" content={description} key="ogdesc" />
                <link rel="alternate" type="application/rss+xml" title="RSS feed for Ed Johnson-Williams’ blog" href="/feed.xml" />
            </Head>

            <div className="container grid h-screen max-w-4xl px-4 pt-4 mx-auto bg-white grid-cols-full grid-rows-auto-1-auto dark:bg-trueGray-800">

                <Header title={siteTitle} currentPath={currentPath} />

                <main className="mt-8 prose dark:prose-light">
                    {children}
                </main>

                <Footer
                    repository={repository}
                    RSSFeed={RSSFeed}
                    sitemap={sitemap}
                    contentLicence={contentLicence}
                />

            </div>
        </>
    )
}