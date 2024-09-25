const path = require('path');



const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');


const CopyPlugin = require("copy-webpack-plugin");


const config = {
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
        new MiniCssExtractPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
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
module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.module.rules = [
            {
                test: /\.css$/i,
                use: [new CssMinimizerPlugin(), 'css-loader'], //"style-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ico|png|jp?g|svg)/,
                oneOf: [
                    // inline image using `?inline` query
                    {
                        resourceQuery: /inline/,
                        type: 'asset/inline',
                    },
                    {
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                            maxSize: 1024,
                            },
                        },
                        generator: {
                            filename: 'assets/img/[name].[hash:8][ext]',
                        },
                    },
                ],
            },
        ]
    }
  
    if (argv.mode === 'production') {

    }
  
    return config;
  };