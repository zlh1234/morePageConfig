const path = require('path');
const Uglify = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, './src/js/index.js'),
        detail: path.resolve(__dirname, './src/js/detail.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
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
        new HtmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: 'index.html',
            template: path.resolve(__dirname, './src/pages/index.html'),
            chunksSortMode: 'manual',
            chunks: ['index'],
            excludeChunks: ['node_modules'],
            hash: true,
        }),
        new HtmlWebpackPlugin({
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            filename: 'detail.html',
            template: path.resolve(__dirname, './src/pages/detail.html'),
            chunksSortMode: 'manual',
            chunks: ['detail'],
            excludeChunks: ['node_modules'],
            hash: true,
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.css', '.less', '.json'],
        alias: {
            '@': path.join(__dirname, './src')
        }
    }
}