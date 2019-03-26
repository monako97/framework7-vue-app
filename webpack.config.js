const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
require("@babel/register");
module.exports = {
    entry:{
        entry: ['./src/js/app.js']
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'dist'),
        openPage: 'html/index.html', //指定第一次打开的路径
        host:'localhost',
        port:8090,
        inline: true,//设置为true，当源文件改变时会自动刷新页面
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name]-[hash:8].js'
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Nyapass',
            minify:{ collapseWhitespace: true, removeAttributeQuotes: true },
            template: path.resolve(__dirname,'./src/html/index.html'),
            filename: './html/index.html',
            hash: true,
            chunksSortMode: 'none'
        }),
        new ExtractTextPlugin('./css/index.css'),//分离css 
        new CopyWebpackPlugin([{ //静态资源输出
            from:path.resolve(__dirname,'./src/assets'), // 资源路径
            to:'./assets' // 输出路径
        }]),
    ],
    resolve: {
        alias: { // 修改vue包配置文件中被导入时的路径
            "vue$": "vue/dist/vue.js"
        }
    },
    module:{ 
        rules:[
            { // 处理.vue文件的loader
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/, // 配置处理css文件的规则
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader'],
                    publicPath: '../' // 解决背景图路径问题
                })
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000, // 文件大与该大小时以路径形式引入，否则转换为base64格式
                        name: '[hash:8]-[name].[ext]' // 原先叫什么文件名，输出后还是叫什么文件名，避免文件名重复，在前面拼接8位hash值
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2|otf)$/, // 处理字体文件
                use: 'url-loader?limit = 100000'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    }
};