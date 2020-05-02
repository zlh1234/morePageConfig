const { smart } = require('webpack-merge');
const base = require('./webpack.config');
module.exports = smart(base, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 8080,
        // open: true,
        progress: true,
        contentBase: '../dist',
        before(app) {

        },
        proxy: {

        },
        open: true,
        hot: false,
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500, // 防抖
        ignored: /node_modules/, // 不需要监控的文件路径
    }
})