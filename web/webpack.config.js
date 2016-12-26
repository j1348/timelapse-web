const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const API_SERVICE = 'http://127.0.0.1:7000';

module.exports = {
  devtool: 'source-map', //eval-cheap-module-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
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
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html'
    })
  ],
  devServer: {
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
    colors: true,
    // publicPath: '/',
    // contentBase: './',
    // historyApiFallback: true,
    proxy: {
      '/user/login': {
          target: API_SERVICE
      },
      '/user': {
          target: API_SERVICE
      },
      '/todo': {
          target: API_SERVICE
      }
    }
  }
};
