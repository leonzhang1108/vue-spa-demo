/**
 * Created by leon on 2016/4/25.
 */
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var vue = require("vue-loader");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ProgressBarPlugin = require('progress-bar-webpack-plugin');


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
        console.log('original dist file cleared. ' + _path)
        return true
    }
    return false
}


var plugins = [
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
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new uglifyJsPlugin({
        sourceMap: false,
        mangle: true,
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new ProgressBarPlugin()
];

module.exports = function(projectName){

    var entry = ['./src/js/entry/'+projectName+'/vue-entry-demo.js'],
        buildPath = "/"+projectName+"/";

    //删除原文件
    clear('./'+projectName+'/', require('fs'))

    return {
        debug: false,
        entry: entry,
        output: {
            path: __dirname + buildPath,
            filename: 'build.js',
            publicPath: '',
            chunkFilename: "chunks/[id].chunk.[chunkhash].js"
        },
        module: {
            loaders: [
                {test: /\.vue$/, loader: 'vue'},
                {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!cssnext-loader!autoprefixer") },
                {test: /\.(jpg|png|gif)$/, loader: "file-loader?name=images/[name].[hash].[ext]" },
                {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
                {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
                {test: /\.json$/, loader: 'json' },
                {test: /\.(html|tpl)$/, loader: 'html-loader' },
                {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015!jshint-loader'}
                //{ test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'
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
        plugins: plugins
    }
}
