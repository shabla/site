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
            'ui': path.resolve(PATH_SRC, "ui")
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
                include: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
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
        open: true
    }
};