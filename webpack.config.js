import path from 'path'
import { getAllProducts, getProductList } from './stripe.js';
import fs from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const productPage = fs.readFileSync('./src/pages/store/product/template.ejs', 'utf8');
const products = await getProductList()
for (const product of products) {
    fs.writeFileSync(`./src/pages/store/product/TEMPLATE_${product.name.replaceAll(" ", "-").toLowerCase()}.html`, productPage);
}





import HtmlBundlerPlugin from 'html-bundler-webpack-plugin'


import CopyPlugin from "copy-webpack-plugin"


export default {
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
                if (splitname[splitname.length-1].slice(0,9) === "TEMPLATE_") {
                    splitname[splitname.length-1] = splitname[splitname.length-1].slice(9)
                    splitname = splitname.join("/")
                    return `${splitname}.html`
                }
                // bypass the original structure
                return '[name].html';
            },
            data: {
                products,
                imageMap: {
                    "robox-kit-1.0": fs.readdirSync("./src/pages/store/product/robox-kit-1.0"),
                    "robox-kit-2.0": fs.readdirSync("./src/pages/store/product/robox-kit-2.0")
                }
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
};
