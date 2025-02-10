import { merge } from 'webpack-merge'

import common from "./webpack.config.js"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import CompressionPlugin from "compression-webpack-plugin"

let config = await common()
const mergedConfig = merge(config, {
    mode: 'production',
    devtool: false,
    plugins: [
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
        })
    ],
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
            
        ],
    },
});
mergedConfig.module.rules = [
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
                    filename:({ filename }) => {
                        let splitname = filename.split("/")
                        if (splitname[splitname.length-3] === "product") return `public/images/${splitname[splitname.length-2]}/[name][ext][query]`
                        else return "public/images/[hash][ext][query]"
                    }
                }
            },
        ],
    },
]

export default mergedConfig