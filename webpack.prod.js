const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");


const mergedConfig = merge(common, {
    mode: 'production',
    devtool: false,
    plugins: [
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
        })
    ],
    optimization: {
        usedExports: true,
        splitChunks: {
            cacheGroups: {
                scripts: {
                    test: /\.(js|ts)$/,
                    chunks: 'all',
                },
            },
        },
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
});
mergedConfig.module.rules = [
    {
        test: /\.css$/i,
        use: ['css-loader'], //"style-loader"
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
    },
    {
        test: /\.(ico|png|jp?g|svg)/,
        oneOf: [
            // inline image using `?inline` query
            {
                resourceQuery: /inline/,
                type: 'asset/inline',
            },
            {
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                    maxSize: 1024,
                    },
                },
                generator: {
                    filename: 'assets/img/[name].[hash:8][ext]',
                },
            },
        ],
    },
]

module.exports = mergedConfig