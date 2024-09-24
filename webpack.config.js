const path = require('path');
const fs = require('fs');
const nav = fs.readFileSync('./src/_partials/nav.html', 'utf8');
const headMeta = fs.readFileSync('./src/_partials/headMeta.html', 'utf8');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
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
            title: 'Guide',
            filename: 'view/guide.html',
            nav: nav,
            template: './src/pages/guides/guide.html',
            chunks: ["root", "guide"]
        }),


        new HtmlWebpackPlugin({
            title: 'Home',
            filename: 'index.html',
            nav: nav,
            headMeta: headMeta,
            template: './src/home/index.html',
            chunks: ["home"]
        }),
        new HtmlWebpackPlugin({
            title: 'Editor Dashboard',
            filename: 'editor/index.html',
            nav: nav,
            template: './src/pages/editor/dashboard/dashboard.html',
            chunks: ["dash"]
        }),
        new HtmlWebpackPlugin({
            title: 'Editor Workspace',
            filename: 'editor/workspace/index.html',
            template: './src/editor/workspace/workspace.html',
            nav: nav,
            chunks: ["workspace"]
        }),
        new HtmlWebpackPlugin({
            title: 'Checkout',
            filename: 'store/checkout/index.html',
            nav: nav,
            template: './src/pages/checkout/checkout.html',
            chunks: ["checkout"]
        }),
        new HtmlWebpackPlugin({
            title: 'Shop',
            filename: 'store/index.html',
            nav: nav,
            template: './src/pages/shop/shop.html',
            chunks: ["shop"]
        }),
        new HtmlWebpackPlugin({
            title: 'Cart',
            filename: 'store/cart/index.html',
            nav: nav,
            template: './src/pages/cart/cart.html',
            chunks: ["cart"]
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
        new HtmlWebpackPlugin({
            title: '404',
            filename: '404.html',
            nav: nav,
            template: './src/pages/product/product.html',
            chunks: ["product"]
        }),

        // Files
        new CopyPlugin({
            patterns: [
                { from: "./src/_resources", to: "resources/" },
                { from: "./src/_images", to: "public/images/" },
            ],
        }),

        // CSS Anti-FOUC
        new MiniCssExtractPlugin()
    ],
    output: {
        filename: 'public/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "[name][ext]",
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
                use: [MiniCssExtractPlugin.loader, 'css-loader'], //"style-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: {
                        urlFilter: (attribute, value, resourcePath) => {
                            if (/public/.test(value)) {
                                return false;
                            }
            
                            return true;
                        },
                    },
                },
            },
            {
                test: /\.html$/,
                type: "asset/resource",
                generator: {
                  filename: "[name][ext]",
                },
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
                    filename: 'public/images/[name][ext]',
                    publicPath: "images"
                }
            },
        ],

    },
};