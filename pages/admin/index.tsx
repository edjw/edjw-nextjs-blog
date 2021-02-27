import Head from 'next/head'
export default function Admin({ ...props }) {
    return (
        <>
            <Head>
                <link href="/config.yml" type="text/yaml" rel="cms-config-url"></link>
                <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
                {/* Include Netlify Identity for authentication */}
                <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
                <script type="module" src="/admin/preview-templates/index.js"></script>
            </Head>
        </>
    )
}