module.exports = {
    target: 'serverless',
    reactStrictMode: true,
    webpack: function (config) {
        config.module.rules.push(
            {
                test: /\.md$/,
                use: 'raw-loader',
            },
        )
        return config
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: `default-src 'none'; connect- src 'self' https://vitals.vercel-insights.com/v1/vitals; img-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'`,

                    },

                ],
            },
        ]
    },
}