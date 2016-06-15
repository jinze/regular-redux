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
    {
      apply: function apply(compiler) {
        compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
          this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
          return false
        })
      }
    },
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if(env === 'production'){
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  )
}


module.exports = webpackConfig
