const { smart } = require('webpack-merge');
const base = require('./webpack.config');
const Uglify = require('uglifyjs-webpack-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
module.exports = smart(base, {
    mode: 'production',
    optimization: {
        minimizer: [
            new Uglify({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCss()
        ],
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                },
                vendor: {
                    priority: 1,
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,
                }
            }
        }
    },
})