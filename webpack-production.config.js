var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // contexts: path.join(__dirname, 'your-app'),
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'static'
      }
    ]),
    new ExtractTextPlugin("bundle.css")
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader")
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      }
    ]
  },
  postcss: function() {
    return {
      defaults: []
    };
  }
};
