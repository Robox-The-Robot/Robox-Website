const path = require('path');



const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');


const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
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
                    splitname.splice(-2, 1)
                    splitname = splitname.join("/")
                    return `${splitname}.html`;
                }
                // bypass the original structure
                return '[name].html';
              },
        }),

        new CopyPlugin({
            patterns: [
                { from: "./src/_resources", to: "resources/" },
            ],
        }),
    ],
    output: {
        filename: 'public/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    
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
