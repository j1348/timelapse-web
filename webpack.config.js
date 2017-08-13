require('dotenv').config();
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ENV = process.env.NODE_ENV || 'development';
const API_URL = process.env.API_URL;

const faviconPlugin = new FaviconsWebpackPlugin({
    // Your source logo
    logo: './logo.png',
    // The prefix for all image files (might be a folder or a name)
    prefix: 'icons-[hash]/',
    // Emit all stats of the generated icons
    emitStats: false,
    // The name of the json containing all favicon information
    statsFilename: 'iconstats-[hash].json',
    // Generate a cache file with control hashes and
    // don't rebuild the favicons until those hashes change
    persistentCache: true,
    // Inject the html into the html-webpack-plugin
    inject: true,
    // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
    background: '#fff',
    // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
    title: 'Webpack App',

    // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
    icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false
    }
});

module.exports = {
    devtool: 'source-map', //eval-cheap-module-source-map',
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './',
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                    fallback: 'style-loader?sourceMap',
                    use: [
                    'css-loader?sourceMap',
                    'postcss-loader?sourceMap',
                    'sass-loader?sourceMap',
                    ],
                }),
        },{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src'),
        }]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'dummy.html' },
            { from: '_redirects' }
        ]),
        faviconPlugin,
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: JSON.stringify(process.env.API_URL),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
            disable: ENV === 'production',
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            hash: true,
            inject: true
        })
    ].concat(ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourcemap: false,
            compress: {
                warnings: false,
            },
            comments: /^\**!|^ [0-9]+ $|@preserve|@license/
        })
    ] : []),
    stats: {
    colors: true,
    },
    devServer: {
        port: process.env.PORT || 8000,
        host: '0.0.0.0',
        publicPath: '/',
        disableHostCheck: true,
        contentBase: './',
        historyApiFallback: true,
        proxy: [{
            path: '/user/login',
            logLevel: 'debug',
            target: API_URL,
        }, {
            path: '/user',
            logLevel: 'debug',
            target: API_URL,
        }, {
            path: '/todo',
            logLevel: 'debug',
            target: API_URL,
        }]
    }
};
