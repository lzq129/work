const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = {
  mode: 'none',
  entry: {
      'index': './src/index.js', 
    },
  output: {
    'path':path.resolve(__dirname, 'dist'),
    'publicPath':'./',
    'filename': '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  module: {
    rules: [{
      test: /\.less|\.css$/, 
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: "url-loader?limit=8192&name=images/[name].[ext]"
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "/[name].css"}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks:['runtime','common','index']
    })
  ]
}
module.exports = config;
