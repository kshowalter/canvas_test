var path = require('path');
var webpack = require('webpack');
//var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./client/app.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].js'
  },

  //plugins: [
  //  new webpack.DefinePlugin({
  //    'process.env.NODE_ENV': JSON.stringify('dev')
  //  })
  //],

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /client/,
        //exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]

  }

};
