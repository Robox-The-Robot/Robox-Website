import path from 'path'
import { getAllProducts, getProductList } from './stripe.js';
import fs from "fs"
import { fileURLToPath } from 'url'

import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html'

import {unified} from 'unified'
import { MarkdownToHtmlPlugin } from './plugins/md-to-html.js';


import { Eta } from 'eta'
const eta = new Eta({
  async: false, 
  useWith: true,
  views: process.cwd(), // directory that contains templates
});


const processor = await unified()
  .use(remarkParse)
  .use(remarkHtml, {sanitize: false})



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cacheProducts = true


const productMap = {}


const productPage = fs.readFileSync('./src/pages/store/product/template.ejs', 'utf8');



if (cacheProducts) {
    fs.writeFileSync("products.json", JSON.stringify(await getProductList()), "utf8")
}

const products = cacheProducts ? await getProductList() : JSON.parse(fs.readFileSync("products.json"))

for (const product of products) {
    let filename = product.name.replaceAll(" ", "-").toLowerCase()
    fs.writeFileSync(`./src/pages/store/product/TEMPLATE_${filename}.html`, productPage);
    if (!fs.existsSync(`./src/pages/store/product/images/${filename}`)) {
        fs.mkdirSync(`./src/pages/store/product/images/${filename}`);
        console.warn(`Images do not exist for ${product.name}`)
    }
    productMap[filename] = fs.readdirSync(`./src/pages/store/product/images/${filename}`).map((file) => `${path.parse(file).name}.webp`)
}

fs.readdir("src/pages/guides/tutorials", { withFileTypes: true }, (err, files) => {  
    files.forEach((file) => {
        const fullPath = path.join("src/pages/guides/tutorials", file.name);
        if (file.isFile() && fullPath.endsWith('.md')) {
            processor.process(fs.readFileSync(fullPath, "utf-8"))
            .then(html => {
                fs.writeFileSync(`src/pages/guides/tutorials/GUIDE_${file.name}.html`, `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <%~ include('src/_partials/headMeta.html') %>\n
                            <title>Robox Guides</title>
                            <meta name="description" content="">
                        </head>
                    <body>
                        <%~ include('src/_partials/nav.html') %>\n
                        ${String(html)}
                    </body>
                `);
            })
            .catch(error => {
                console.log(error)
            })
        }
    });
})



import HtmlBundlerPlugin from 'html-bundler-webpack-plugin'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
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
                imageMap: productMap
            },
            loaderOptions: {
                beforePreprocessor: (content, { resourcePath, data }) => {
                    if (resourcePath.includes('/TEMPLATE_')) {
                        //Getting the product name (the +9 is the length of TEMPLATE)
                        let currentProduct = resourcePath.substring(resourcePath.lastIndexOf("TEMPLATE_") + 9, resourcePath.lastIndexOf(".html"));
                        console.log(`src/pages/store/product/descriptions/${currentProduct}`)
                        if (!fs.existsSync(`src/pages/store/product/descriptions/${currentProduct}.md`)) {
                            console.warn(`Description does not exist for ${currentProduct}`)
                            data.description = ""
                        }
                        else {
                            processor.process(fs.readFileSync(`src/pages/store/product/descriptions/${currentProduct}.md`, "utf-8"))
                            .then(html => {
                                data.description = String(html)
                            })
                            .catch(error => {
                                data.description = ""
                            })
                           
                        }
                        data.images = productMap[currentProduct]
                        data.product = products.filter((product) => product.name.replaceAll(" ", "-").toLowerCase() === currentProduct)[0]
                    }

                },
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/_resources", to: "resources/" },
                { from: "**/*", to: "public/images/", toType:"dir", context: "./src/pages/store/product/images/" },
            ],
        }),
    ],
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
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new ImageMinimizerPlugin({ //The optimiser for the thumbnail photos
                generator: [
                    {
                        type: "asset",
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        filter: (source, sourcePath) => {
                            let splitSourcePath = sourcePath.split("/")
                            if (splitSourcePath.length < 3) return false
                            return splitSourcePath[splitSourcePath.length-3] === "images"
                        },
                        filename: "[path]thumb-[name][ext]",

                        options: {
                            
                            encodeOptions: {
                                webp: {
                                    quality: 100,
                                },
                            },
                            resize: {
                                enabled: true,
                                height: 70*2,
                                width: 115*2,
                            },
                        },
                    },
                    {
                        type: "asset",
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        filter: (source, sourcePath) => {
                            let splitSourcePath = sourcePath.split("/")
                            if (splitSourcePath.length < 3) return false
                            return splitSourcePath[splitSourcePath.length-3] === "images"
                        },
                        filename: "[path][name][ext]",

                        options: {
                            encodeOptions: {
                                webp: {
                                    quality: 90,
                                },
                            },
                        },
                    },
                ],
            }),
          ],
      },
    output: {
        filename: 'public/js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
};
