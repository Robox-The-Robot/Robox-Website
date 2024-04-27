const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        dash: './src/dash/index.js',
        serialization: "./src/blockly/serialization.js",
        workspace: "./src/workspace/workspace.js"
    },
    devtool: 'inline-source-map',
    plugins: [
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
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource',

            },
        ],

    },
};