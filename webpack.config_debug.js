var path = require("path")
var webpack = require('webpack');
var config = require(path.join(__dirname, 'webpack.config'));


config.plugins[0] = new webpack.HotModuleReplacementPlugin();
config.watch = true;
config.debug = true;
config.devtool = 'cheap-module-eval-source-map';

module.exports = config;