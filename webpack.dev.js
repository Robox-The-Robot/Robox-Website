import { merge } from 'webpack-merge'

import common from "./webpack.config.js"

let config = await common()

export default merge(config, {
    mode: 'development',
    devtool: false,
});