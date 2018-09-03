const path = require('path');
const webpack = require('webpack');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
    mode : 'production',
    context: process.cwd(),
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.less', '.css'],
        modules: [__dirname, 'node_modules']
    },

    entry: {
        jquery  : ['jquery','amcharts3'],
        vue     : ['vue','vue-router','vuex',],
        vue_lib : ['element-ui','v-calendar','vue-resource'],
        lib     : ['socket.io-client','bootstrap','axios'],
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dist/js/'),
        library: '[name]'
    },
    plugins : [
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 4321
        // }),
        new webpack.ProvidePlugin({
            
        }),
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname,'../dist/js/[name].json')
        })
    ],
    performance: {
        hints : false,
    },
};