const path = require('path');
const Uglify = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const routes = require('./routes');
let entry = {};
let htmlPlugin = [];
for (const item of routes) {
    entry[item.chunks] = item.js_path;
    htmlPlugin.push(
        new HtmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: item.filename,
            template: item.html_path,
            chunksSortMode: 'manual',
            chunks: [item.chunks],
            excludeChunks: ['node_modules'],
            hash: true,
        })
    )
}
module.exports = {
    mode: 'development',
    entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, '../node_modules'),
                query: {
                    'presets': ['latest']
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                use: [
                    // 'url-loader?limit=1024&name=img/[name].[hash:8].[ext]&publicPath=/img',
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1*1.04,
                            name: 'img/[name].[hash:8].[ext]',
                            // publicPath: './',
                        }
                    },
                    'image-webpack-loader',
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'less-loader',
                ]
            }
        ]
    },
    plugins: [
        new Uglify(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].[hash:8].css',
        }),
        new CleanWebpackPlugin(),
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/assets'), //打包的静态资源目录地址
            to: path.resolve(__dirname, '../dist/assets'), //打包到dist下面的assets
        }]),
        ...htmlPlugin
    ],
    resolve: {
        extensions: ['.js', '.css', '.less', '.json'],
        alias: {
            '@': path.join(__dirname, '../src')
        }
    }
}