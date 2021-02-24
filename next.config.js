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
                source: '/',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: ' X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'same-origin',
                    },

                ],
            },
        ]
    },
}