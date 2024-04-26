const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/dash/index.js',
        print: './src/print/print.js',
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Dash',
            filename: 'view/dash.html',
            template: './src/dash/index.html',
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            title: 'Print',
            filename: 'view/print.html',
            template: './src/print/print.html',
            chunks: ["print"]
        }),
    ],
    output: {
        filename: 'public/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

        ],

    },
};