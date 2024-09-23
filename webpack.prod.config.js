const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        dash: {
            import: ['./src/dash/index.js'],
        },
        serialization: "./src/blockly/serialization.js",
        shop: './src/shop/shop.js',
        workspace: "./src/workspace/workspace.js",
        checkout: "./src/checkout/checkout.js",
    },
    // devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home',
            filename: 'home/home.html',
            template: './src/home/index.html',
            chunks: ["home"]
        }),
        new HtmlWebpackPlugin({
            title: 'Dash',
            filename: 'view/dash.html',
            template: './src/dash/index.html',
            chunks: ["dash"]
        }),
        new HtmlWebpackPlugin({
            title: 'Workspace',
            filename: 'view/workspace.html',
            template: './src/workspace/workspace.html',
            chunks: ["workspace"]
        }),
        new HtmlWebpackPlugin({
            title: 'Checkout',
            filename: 'view/checkout.html',
            template: './src/checkout/checkout.html',
            chunks: ["checkout"]
        }),
        new HtmlWebpackPlugin({
            title: 'Shop',
            filename: 'view/shop.html',
            template: './src/shop/shop.html',
            chunks: ["shop"]
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
        }),
        new MiniCssExtractPlugin()
    ],
    output: {
        filename: 'public/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    optimization: {
        runtimeChunk: 'single',
        usedExports: true,
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {

                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,

                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                },
                generator: {
                    filename: 'public/images/[name].[hash:8][ext]'
                }
            },
        ],

    },
};