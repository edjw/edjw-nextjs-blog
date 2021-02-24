import Link from 'next/link'

type contentLicence = {
    link: string,
    text: string,
};

export default function Footer({ repository, RSSFeed, sitemap, contentLicence }: { repository: String, RSSFeed: Boolean, sitemap: Boolean, contentLicence: contentLicence }) {
    return (

        <footer className="mt-16 prose border-t-8 border-yellow-200 dark:prose-light">
            <div className="leading-loose list-none">

                {repository && (
                    <p className="pl-0 my-2">
                        <Link href={`https://github.com/${repository}`}>
                            <a className="underline">See the code for this site</a>
                        </Link>
                    </p>
                )}

                {RSSFeed && (
                    <p className="pl-0 my-2">
                        <Link href="/feed.xml">
                            <a className="underline">See the RSS feed for this site</a>
                        </Link>

                    </p>
                )}

                {sitemap && (
                    <p className="hidden">
                        <Link href="/sitemap.xml">
                            <a>Sitemap</a>
                        </Link>
                    </p>
                )}

                {contentLicence && (
                    <p className="mt-6 text-sm">
                        Content on this website is licenced as{' '}
                        <Link href={contentLicence.link}><a>{contentLicence.text}</a></Link>. That means you can copy, adapt, and redistribute any content on this site for any purpose providing you give credit, provide a link to the licence, and indicate if you made changes.
                    </p>
                )}

            </div>

        </footer>
    )

};
