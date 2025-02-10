import { merge } from 'webpack-merge'

import common from "./webpack.config.js"

export default function() {
    return common().then((config) => {
        return merge(config, {
            mode: 'development',
            devtool: false,
        });
    });
}