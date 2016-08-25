var path = require("path")
var webpack = require('webpack');
var config = require(path.join(__dirname, 'webpack.config'));


config.plugins[0] = new webpack.HotModuleReplacementPlugin();
config.debug = true;
config.devtool = 'source-map';

module.exports = config;