/**
 * Created by leon on 2016/4/25.
 */
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var vue = require("vue-loader");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var entry = ['./src/js/entry/vue-entry-demo.js'],
    buildPath = "/dist/";


var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new HtmlWebpackPlugin({
        template: "src/html/index.html",
        filename: "index.html",
        hash: true
    }),

    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),

    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
    }),
    new OpenBrowserPlugin({
        url: 'http://localhost:1108'
    })
];


module.exports = {
    debug: true,
    entry: entry,
    output: {
        path: __dirname + buildPath,
        filename: 'build.js',
        publicPath: '',
        chunkFilename: "chunks/[id].chunk.[chunkhash].js"
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue-loader'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!cssnext-loader")},
            {test: /\.(jpg|png|gif)$/, loader: "file-loader?name=images/[name].[hash].[ext]"},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "url-loader?limit=10000&minetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {test: /\.json$/, loader: 'json'},
            {test: /\.(html|tpl)$/, loader: 'html-loader'},
            {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015'}
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css")
        }
    },
    resolve: {
        extension: ['', '.js'],
        alias: {}
    },
    plugins: plugins,
    devtool: '#source-map'
};
