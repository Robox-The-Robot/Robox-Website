const path = require('path');
const fs = require('fs');
const nav = fs.readFileSync('./src/_partials/nav.html', 'utf8');
const headMeta = fs.readFileSync('./src/_partials/headMeta.html', 'utf8');

const partialList = {
    headMeta: headMeta,
    nav: nav,
}

const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    // devtool: 'inline-source-map',
    resolve: {
        alias: {
            "@images": path.join(__dirname, 'src/_images/'),
            "@partials": path.join(__dirname, 'src/_partials/'),
            "@root": path.join(__dirname, 'src/_root/')
        }
    },
    plugins: [
        
        new HtmlBundlerPlugin({
            entry: "src/pages/",
            js: {
                filename: 'public/js/[name].[contenthash:8].js', // output into dist/assets/js/ directory
            },
            css: {
                filename: 'public/css/[name].[contenthash:8].css', // output into dist/assets/css/ directory
            },
            filename: ({ filename, chunk: { name } }) => {
                let splitname = name.split("/")
                if (splitname[splitname.length-1] === 'index') {
                    console.log(splitname)
                    splitname.splice(-2, 1)
                    splitname = splitname.join("/")
                    console.log(splitname)
                    return `${splitname}.html`;
                }
                // bypass the original structure
                return '[name].html';
              },
        }),
        // new HtmlWebpackPlugin({
        //     title: 'Home',
        //     filename: 'index.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     template: './src/home/index.html',
        //     chunks: ["root"]
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Editor Dashboard',
        //     filename: 'editor/index.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     template: './src/editor/dashboard/dashboard.html',
        //     chunks: ["dash", "root"]
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Editor Workspace',
        //     filename: 'editor/workspace/index.html',
        //     template: './src/editor/workspace/workspace.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     chunks: ["workspace", "root"]
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Checkout',
        //     filename: 'store/checkout/index.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     template: './src/store/checkout/checkout.html',
        //     chunks: ["checkout", "root"]
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Shop',
        //     filename: 'store/index.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     template: './src/store/shop/shop.html',
        //     chunks: ["shop", "root"]
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Cart',
        //     filename: 'store/cart/index.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     template: './src/store/cart/cart.html',
        //     chunks: ["cart", "root"]
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Product',
        //     filename: 'store/product/index.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     template: './src/store/product/product.html',
        //     chunks: ["product", "root"]
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'Guides',
        //     filename: 'guides/index.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     template: './src/guides/guides.html',
        //     chunks: ["guides", "root"]
        // }),
        // new HtmlWebpackPlugin({
        //     title: '404',
        //     filename: '404.html',
        //     nav: nav,
        //     headMeta: headMeta,
        //     template: './src/404/404.html',
        //     chunks: ["root"]
        // }),

        // // Tutorials
        // ...fs.readdirSync('./src/guides/tutorials/').filter(f => path.extname(f) == ".html").map(file => new HtmlWebpackPlugin({
        //     filename: `guides/tutorials/${path.basename(file, '.html')}.html`,
        //     template: `./src/guides/tutorials/${path.basename(file, '.html')}.html`,
        //     nav: nav,
        //     headMeta: headMeta,
        //     chunks: ["root", "tutorial"]
        // })),

        // Files
        // new CopyPlugin({
        //     patterns: [
        //         { from: "./src/_resources", to: "resources/" },
        //         { from: "./src/_images", to: "public/images/" },
        //     ],
        // }),

        // CSS Anti-FOUC
        new MiniCssExtractPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "all"
    //     }
    // },
    module: {
        rules: [
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
                type: 'asset/resource',
            },
        ],

    },
};