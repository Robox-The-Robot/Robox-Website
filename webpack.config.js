const path = require('path');
const fs = require('fs');
const nav = fs.readFileSync('./src/partials/nav.html', 'utf8');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        dash: "./src/pages/editor/dashboard/dashboard.js",
        workspace: "./src/pages/editor/workspace/workspace.js",
        serialization: "./src/pages/editor/blockly/serialization.js",
        shop: './src/pages/shop/shop.js',
        checkout: "./src/pages/checkout/checkout.js",
        product: "./src/pages/product/product.js",
        cart: './src/pages/cart/cart.js',
        home: './src/home/index.js',
        guides: './src/pages/guides/guides.js',
        tutorial: './src/pages/guides/tutorials/tutorial.js'
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
            template: './src/pages/editor/dashboard/dashboard.html',
            chunks: ["dash"]
        }),
        new HtmlWebpackPlugin({
            title: 'Editor Workspace',
            filename: 'view/editor/workspace.html',
            template: './src/pages/editor/workspace/workspace.html',
            nav: nav,
            chunks: ["workspace"]
        }),
        new HtmlWebpackPlugin({
            title: 'Checkout',
            filename: 'view/checkout.html',
            nav: nav,
            template: './src/pages/checkout/checkout.html',
            chunks: ["checkout"]
        }),
        new HtmlWebpackPlugin({
            title: 'Shop',
            filename: 'view/shop.html',
            nav: nav,
            template: './src/pages/shop/shop.html',
            chunks: ["shop"]
        }),
        new HtmlWebpackPlugin({
            title: 'Cart',
            filename: 'view/cart.html',
            nav: nav,
            template: './src/pages/cart/cart.html',
            chunks: ["cart"]
        }),
        new HtmlWebpackPlugin({
            title: 'Product',
            filename: 'view/product.html',
            nav: nav,
            template: './src/pages/product/product.html',
            chunks: ["product"]
        }),
        new HtmlWebpackPlugin({
            title: 'Guides',
            filename: 'view/guides/index.html',
            nav: nav,
            template: './src/pages/guides/guides.html',
            chunks: ["guides"]
        }),

        // Tutorials
        ...fs.readdirSync('./src/pages/guides/tutorials/').filter(f => path.extname(f) == ".html").map(file => new HtmlWebpackPlugin({
            filename: `view/guides/tutorials/${path.basename(file, '.html')}.html`,
            template: `./src/pages/guides/tutorials/${path.basename(file, '.html')}.html`,
            nav: nav,
            chunks: ["tutorial"]
        })),

        // Files
        new CopyPlugin({
            patterns: [
                { from: "./src/resources", to: "resources/" },
                { from: "./src/_images", to: "public/images/" },
            ],
        })
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
                exclude: [
                  path.resolve(__dirname, './src/_images/')
                ],

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