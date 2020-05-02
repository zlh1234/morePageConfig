//页面配置
const path = require('path');
const routes = [
    { //首页
        html_path: path.resolve(__dirname, '../src/pages/index.html'),
        js_path: path.resolve(__dirname, '../src/js/index.js'),
        filename: 'index.html',
        chunks: 'index',
    },
    { //详情
        html_path: path.resolve(__dirname, '../src/pages/detail.html'),
        js_path: path.resolve(__dirname, '../src/js/detail.js'),
        filename: 'detail.html',
        chunks: 'detail',
    }
];
module.exports = routes;