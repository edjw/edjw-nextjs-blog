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
                        value: `default-src 'self';`,
                    },

                ],
            },
        ]
    },
}