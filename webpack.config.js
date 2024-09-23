const path = require('path');
const fs = require('fs');
const nav = fs.readFileSync('./src/partials/nav.html', 'utf8');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: 'development',
    entry: {
        dash: "./src/editor/dashboard/dashboard.js",
        workspace: "./src/editor/workspace/workspace.js",
        serialization: "./src/editor/blockly/serialization.js",
        shop: './src/shop/shop.js',
        checkout: "./src/checkout/checkout.js",
        product: "./src/product/product.js",
        cart: './src/cart/cart.js',
        home: './src/home/index.js'
    },
    // devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home',
            filename: 'view/home.html',
            nav: nav,
            template: './src/home/index.html',
            chunks: ["home"]
        }),
        new HtmlWebpackPlugin({
            title: 'Editor Dashboard',
            filename: 'view/editor/dashboard.html',
            nav: nav,
            template: './src/editor/dashboard/dashboard.html',
            chunks: ["dash"]
        }),
        new HtmlWebpackPlugin({
            title: 'Editor Workspace',
            filename: 'view/editor/workspace.html',
            template: './src/editor/workspace/workspace.html',
            nav: nav,
            chunks: ["workspace"]
        }),
        new HtmlWebpackPlugin({
            title: 'Checkout',
            filename: 'view/checkout.html',
            nav: nav,
            template: './src/checkout/checkout.html',
            chunks: ["checkout"]
        }),
        new HtmlWebpackPlugin({
            title: 'Shop',
            filename: 'view/shop.html',
            nav: nav,
            template: './src/shop/shop.html',
            chunks: ["shop"]
        }),
        new HtmlWebpackPlugin({
            title: 'Cart',
            filename: 'view/cart.html',
            nav: nav,
            template: './src/cart/cart.html',
            chunks: ["cart"]
        }),
        new HtmlWebpackPlugin({
            title: 'Product',
            filename: 'view/product.html',
            nav: nav,
            template: './src/product/product.html',
            chunks: ["product"]
        }),

        // Files
        new CopyPlugin({
            patterns: [
                { from: "src/resources", to: "resources/" },
            ],
        }),
    ],
    output: {
        filename: 'public/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {

                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,

                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                },
                generator: {
                    filename: 'public/images/[name][ext]'
                }
            },
        ],

    },
};