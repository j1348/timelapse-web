require('dotenv').config();
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';
const API_URL = process.env.API_URL;

module.exports = {
  devtool: 'source-map', //eval-cheap-module-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  module: {
    loaders: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', [
                  'css',
                  'sass'
              ].join('!'))
      },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', [
                  'css'
              ].join('!'))
      },{
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL)
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true,
      inject: true
    })
  ].concat(ENV === 'production' ? [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: /^\**!|^ [0-9]+ $|@preserve|@license/
        })
    ] : []),
  devServer: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    colors: true,
    publicPath: '/',
    contentBase: './',
    // historyApiFallback: true,
    proxy: {
      '/user/login': {
          target: API_URL
      },
      '/user': {
          target: API_URL
      },
      '/todo': {
          target: API_URL
      }
    }
  }
};
