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

        }),
        new HtmlWebpackPlugin({
            title: 'Print',
            filename: 'view/print.html',
            template: './src/print/print.html'
            
        }),
    ],
    output: {
        filename: 'public/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
};