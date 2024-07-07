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
        filename: 'public/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                },
                generator: {
                    filename: 'images/[name].[hash:8][ext]'
                }
            },
        ],

    },
};