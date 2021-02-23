module.exports = {
    target: 'serverless',
    webpack: function (config) {
        config.module.rules.push(
            {
                test: /\.md$/,
                use: 'raw-loader',
            },
            // {
            //     test: /\.md$/,
            //     use: 'file-loader'
            // }
        )
        return config
    },
}