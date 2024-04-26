const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        dash: './src/dash/index.js',
        serialization: "./src/serialization.js"
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Dash',
            filename: 'view/dash.html',
            template: './src/dash/index.html',
            chunks: ["dash"]
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