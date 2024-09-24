const path = require('path');
const fs = require('fs');
const nav = fs.readFileSync('./src/_partials/nav.html', 'utf8');
const headMeta = fs.readFileSync('./src/_partials/headMeta.html', 'utf8');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        root: './src/_root/root.js',

        dash: "./src/editor/dashboard/dashboard.js",
        workspace: "./src/editor/workspace/workspace.js",
        serialization: "./src/editor/blockly/serialization.js",
        shop: './src/store/shop/shop.js',
        checkout: "./src/store/checkout/checkout.js",
        product: "./src/store/product/product.js",
        cart: './src/store/cart/cart.js',
        tutorial: './src/guides/tutorials/tutorial.js'
    },
    // devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home',
            filename: 'index.html',
            nav: nav,
            headMeta: headMeta,
            template: './src/home/index.html',
            chunks: ["root"]
        }),
        new HtmlWebpackPlugin({
            title: 'Editor Dashboard',
            filename: 'editor/index.html',
            nav: nav,
            headMeta: headMeta,
            template: './src/editor/dashboard/dashboard.html',
            chunks: ["dash", "root"]
        }),
        new HtmlWebpackPlugin({
            title: 'Editor Workspace',
            filename: 'editor/workspace/index.html',
            template: './src/editor/workspace/workspace.html',
            nav: nav,
            headMeta: headMeta,
            chunks: ["workspace", "root"]
        }),
        new HtmlWebpackPlugin({
            title: 'Checkout',
            filename: 'store/checkout/index.html',
            nav: nav,
            headMeta: headMeta,
            template: './src/store/checkout/checkout.html',
            chunks: ["checkout", "root"]
        }),
        new HtmlWebpackPlugin({
            title: 'Shop',
            filename: 'store/index.html',
            nav: nav,
            headMeta: headMeta,
            template: './src/store/shop/shop.html',
            chunks: ["shop", "root"]
        }),
        new HtmlWebpackPlugin({
            title: 'Cart',
            filename: 'store/cart/index.html',
            nav: nav,
            headMeta: headMeta,
            template: './src/store/cart/cart.html',
            chunks: ["cart", "root"]
        }),
        new HtmlWebpackPlugin({
            title: 'Product',
            filename: 'store/product/index.html',
            nav: nav,
            headMeta: headMeta,
            template: './src/store/product/product.html',
            chunks: ["product", "root"]
        }),
        new HtmlWebpackPlugin({
            title: 'Guides',
            filename: 'guides/index.html',
            nav: nav,
            headMeta: headMeta,
            template: './src/guides/guides.html',
            chunks: ["guides", "root"]
        }),

        // Tutorials
        ...fs.readdirSync('./src/guides/tutorials/').filter(f => path.extname(f) == ".html").map(file => new HtmlWebpackPlugin({
            filename: `guides/tutorials/${path.basename(file, '.html')}.html`,
            template: `./src/guides/tutorials/${path.basename(file, '.html')}.html`,
            nav: nav,
            headMeta: headMeta,
            chunks: ["root", "tutorial"]
        })),

        // Files
        new CopyPlugin({
            patterns: [
                { from: "./src/_resources", to: "resources/" },
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