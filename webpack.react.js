/**
 * Created by leon on 2016/4/24.
 */
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require("path");

var DIST_PATH = path.join(__dirname, 'dist');
var BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
    entry: {
        addComment: './js/src/react-demo/addComment.js',
        index: './html/react.html'
    },
    output: {
        path: DIST_PATH,
        filename: '[name].js'
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            }, {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }, {
                test: /\.less$/,
                loader: "style!css!less"
            },{
                test: /\.css$/, loader: "style!css"
            },{
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000',
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    plugins: [
        /* new uglifyJsPlugin({
         compress: {
         warnings: false
         }
         }),*/
        new OpenBrowserPlugin({
            url: 'http://localhost:3000'
        })

        //new CommonsChunkPlugin("common.js")
    ]

};
