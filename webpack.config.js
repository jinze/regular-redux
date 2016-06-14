"use strict"

var webpack = require('webpack')
var env = process.env.NODE_ENV

var webpackConfig = {
    externals: {
        "regularjs": "Regular",
        'redux': "Redux"
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
        ]
    },
    output: {
        library: 'RegularRedux',
        libraryTarget: "umd"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ],
    devtool: "source-map",
    watch: true
};

if(env === 'production'){
    webpackConfig.plugins.push([
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ])
}


module.exports = webpackConfig
