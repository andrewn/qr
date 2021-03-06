var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'static')
  },
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
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
