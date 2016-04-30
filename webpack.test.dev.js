/**
 * Created by leon on 2016/4/25.
 */
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require("path");

var DIST_PATH = path.join(__dirname, 'dist');
var BUILD_PATH = path.join(__dirname, 'build');


var config = {}

config.entry = {
    bundle: './js/src/vue-demo/vue-demo.js'
    //"index": './html/index.html'
}

config.output = {
    path: DIST_PATH,
    filename: '[name].js'
}

config.devtool = "source-map"
config.module = {
    loaders: [
        {
            test: /bootstrap\/js\//,
            loader: 'imports?jQuery=jquery'
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            //query: {
            //    compact: false
            //},
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }, {
            test: /\.html$/,
            //loader: 'file?name=[name].[ext]'
            loader: 'html-loader'
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.css$/, loader: "style!css"
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
            loader: 'url-loader?limit=10000',
        }, {
            test: /\.vue$/,
            loader: 'vue'
        },
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ]
}
config.vue = {
    loaders: {
        js: 'babel',
        css: 'style!css!autoprefixer',
    }
}

config.plugins = [

    new OpenBrowserPlugin({
        url: 'http://localhost:3000'
    }),
    new CommonsChunkPlugin("common.js")
]
config.resolve = {
    alias: {
        jquery: "jquery"
    }
}


module.exports = config
