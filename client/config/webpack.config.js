var VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;
var webpack = require("webpack");
var path = require("path");
var HappyPack = require('happypack');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
var {BundleAnalyzerPlugin}  = require('webpack-bundle-analyzer');
// var SimpleProgressPlugin    = require('webpack-simple-progress-plugin');

module.exports = {
  mode : 'production',
  watch: true,
  entry: {
    server : path.join(__dirname,'../src/server.js'),
    client : path.join(__dirname,'../src/client.js'),
  },
  output: {
    filename: '[name]/[name].min.js',
    path : path.join(__dirname,'../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: 'happypack/loader?id=js',
      },{
        test: /\.vue$/,
        use: 'vue-loader',
        exclude:[/\vue\.vue/]
      },{
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      },
    ]
  },
  stats: {
    exclude: [
       "node_modules",
       "bower_components",
       "./src",
       path.join(__dirname,"../src"),
    ]
  },
  performance: { hints: false },
  plugins:[
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 1234
    // }),
    new HappyPack({
      id:'js',
      threads:4,
      loaders: [{
          loader : 'babel-loader',
          query  : {
            presets: ['es2015'],
            cacheDirectory : true
          }
      }]
    }),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({context: process.cwd(),manifest: require(path.join(__dirname,'../dist/js/jquery.json')),}),
    new webpack.DllReferencePlugin({context: process.cwd(),manifest: require(path.join(__dirname,'../dist/js/vue.json')),}),
    new webpack.DllReferencePlugin({context: process.cwd(),manifest: require(path.join(__dirname,'../dist/js/vue_lib.json')),}),
    new webpack.DllReferencePlugin({context: process.cwd(),manifest: require(path.join(__dirname,'../dist/js/lib.json')),})
  ],
}