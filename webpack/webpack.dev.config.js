const path = require('path');
const webpack = require('webpack');

const PATH_SRC = path.resolve('./src');
const PATH_DIST = path.resolve('./dist');

module.exports = {
    entry: PATH_SRC,
    output: {
        path: PATH_DIST,
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            components: path.resolve(PATH_SRC, 'components'),
            ui: path.resolve(PATH_SRC, 'ui')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: PATH_DIST,
        hot: true,
        clientLogLevel: 'error',
        port: 80,
        host: '0.0.0.0'
    }
};