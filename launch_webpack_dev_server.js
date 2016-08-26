process.title = "webpack_dev_server_launcher";
var port = 6061;
var path = require("path")

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require(path.join(__dirname, 'webpack.config_debug'));

config.entry.app.unshift("webpack-dev-server/client?http://localhost:" + port + "/", "webpack/hot/dev-server");

new WebpackDevServer(webpack(config), {
    hot: true,
    publicPath: '/' + config.output.publicPath,
    historyApiFallback: true
}).listen(port, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }
    console.log(config.plugins[0].constructor.name);
    console.log(config.devtool);
    console.log('Listening at http://localhost:' + port + '/');
});