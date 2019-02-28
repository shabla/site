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
            constants: path.resolve(PATH_SRC, 'constants'),
            actions: path.resolve(PATH_SRC, 'actions'),
            reducers: path.resolve(PATH_SRC, 'reducers'),
            selectors: path.resolve(PATH_SRC, 'selectors'),
            hooks: path.resolve(PATH_SRC, 'hooks'),
            ui: path.resolve(PATH_SRC, 'ui'),
            styles: path.resolve(PATH_SRC, 'styles'),
            assets: path.resolve(PATH_SRC, 'assets')
        }
    },
    devtool: 'eval-source-map',
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
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
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
        port: 8080,
        host: '0.0.0.0',
        open: true
    }
};