/**
 * Created by leon on 2016/4/24.
 */
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require("path");
var text = require("extract-text-webpack-plugin")
var html = require('html-webpack-plugin')

function clear(_path, _fs) {
    if (_fs.existsSync(_path)) {
        _fs.readdirSync(_path).forEach(function (_file, _index) {
            var _curPath = _path + "/" + _file
            if (_fs.statSync(_curPath).isDirectory()) {
                clear(_curPath, _fs)
            } else {
                _fs.unlinkSync(_curPath)
            }
        });
        _fs.rmdirSync(_path)
        return true
    }
    return false
}
clear('./dist/', require('fs'))


var config = {}

config.entry = {
    bundle: './js/src/vue-demo/vue-demo.js'
    //"index": './html/index.html'
}

config.output = {
    path: './dist/static',
    publicPath: "/static/",
    filename: '[name].js'
}

config.module = {
    loaders: [
        {
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
        css: text.extract("css"),
        js: 'babel'
    }
}

config.resolve = {
    alias: {
        jquery: "jquery"
    }
}

config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new uglifyJsPlugin({
        sourceMap: false,
        mangle: true,
        compress: {
            warnings: false
        }
    }),
    new html({
        title: "Vue-spa-Demo",
        filename: '../index.html',
        template: './html/index.html',
        inject: 'body',
        hash: 'true'
    }),
    new text("style.css", {
        allChunks: true,
        disable: false
    }),
    new CommonsChunkPlugin("common.js"),
    new OpenBrowserPlugin({
        url: 'http://localhost:3000'
    })
]
module.exports = config
