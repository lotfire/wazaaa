// Configuration Webpack
// =====================

var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var fs = require('fs')
var Path = require('path')
var rimraf = require('rimraf')
var webpack = require('webpack')

var inProduction = process.env.NODE_ENV === 'production'
var outputFolder = Path.resolve(__dirname, 'public')

if (fs.existsSync(outputFolder)) {
  rimraf.sync(outputFolder + '/**')
} else {
  fs.mkdirSync(outputFolder)
}


module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      Path.resolve(__dirname, 'src/client/application.js')
    ]
  },
  output: {
    path: outputFolder,
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction,
      debug: !inProduction,
      options: {
        postcss: [autoprefixer()]
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader']
        })
      },
      {
        test: /\.jade$/,
        use: { loader: 'jade-loader' }
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|eot|ttf)$/,
        use: { loader: 'url-loader', options: { limit: 10000 } }
      }
    ]
  },
  devtool: inProduction ? 'source-map' : 'inline-source-map'
}
