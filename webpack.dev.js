/**
 * Created by leon on 2016/4/25.
 */
var path = require('path');
var vue = require("vue-loader");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var entry = ['./src/js/entry/ansteel/vue-entry-demo.js'],
    buildPath = "/ansteel/";


var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new HtmlWebpackPlugin({
        template: "src/html/index.html",
        filename: "index.html",
        hash: true
    }),

    //new ExtractTextPlugin("style.css", {
    //    allChunks: true,
    //    disable: false
    //}),

    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
    }),
    new OpenBrowserPlugin({
        url: 'http://localhost:2216'
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
            {test: /\.css$/, loader: "style-loader!css-loader!autoprefixer" },
            {test: /\.(jpg|png|gif)$/, loader: "file-loader?name=images/[name].[hash].[ext]"},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,loader: "url-loader?limit=10000&minetype=application/font-woff"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {test: /\.json$/, loader: 'json'},
            {test: /\.(html|tpl)$/, loader: 'html-loader'}
            //{test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015'}
        ]
    },
    //vue: {
    //    loaders: {
    //        css: ExtractTextPlugin.extract("css")
    //    }
    //},
    resolve: {
        extension: ['', '.js'],
        alias: {}
    },
    plugins: plugins,
    devtool: '#source-map',
    jshint: {
        // any jshint option http://www.jshint.com/docs/options/
        // i. e.
        camelcase: true,

        // jshint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // jshint to not interrupt the compilation
        // if you want any file with jshint errors to fail
        // set failOnHint to true
        failOnHint: false,

        // custom reporter function
        reporter: function(errors) { }
    }
};
