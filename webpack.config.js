const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const env = process.env.NODE_ENV
console.log(env)
const entries = getEntry('src/{*.js,**/index.js}');
const config = {
  mode: env,
  entry: entries,
  output: {
    'path':path.resolve(__dirname, 'dist'),
    'publicPath':'../',
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
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath:'/',
    hot: true,
    openPage: 'index'
  },
  resolve: { alias: { vue: 'vue/dist/vue.esm.js' } },
  module: {
    rules: [{
      test: /\.less|\.css$/, 
      use: [{
        loader: env == 'development'?'style-loader':MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: "url-loader?limit=8192&name=images/[name].[ext]"
    },{
      test: /\.vue$/i,
      loader: "vue-loader"
    }]
  },
  plugins: [ 
    ...HtmlWebpackPlugins(),
    new VueLoaderPlugin()
  ]
}
if(env == 'production') {
  config.plugins.push(new MiniCssExtractPlugin({ filename: "[name].css"}),)
}
console.log(config.mode,66)
module.exports = config;

function getEntry(globPath,common=[]){
  var files = glob.sync(globPath),entries={};
  files.forEach(function(item,index,arr){
    var extname = path.extname(item);
    var basename = path.basename(item,extname);
    common.push('./'+item);
    entries[basename] = common;
  })
  console.log(entries)
  return entries;
}

function HtmlWebpackPlugins(){
  const htmlfile = glob.sync('src/*/index.html')

  return htmlfile.map(function(item){
    const entriesName = item.split('/')[1]
    const conf = {
      filename:entriesName+'/index.html',
      template:item,
      chunks:['runtime','common',entriesName+'/index']
    }
    return new HtmlWebpackPlugin(conf)
  })
}
function getEntry(globPath,common=[]){
  var files = glob.sync(globPath),entries={};
  files.forEach(function(item,index,arr){
    const entriesName = item.split('/')[1]
    entries[entriesName+'/index'] = './'+item;
  })
   console.log(entries)
  return entries;

}