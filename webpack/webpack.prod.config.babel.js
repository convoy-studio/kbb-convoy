import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import common from './common'

export default {
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      ...common.vendor,
      './client/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'all.min.js'
  },
  resolve: {
    root: path.resolve( __dirname, '..', 'client' ),
    extensions: [
      '',
      '.js'
    ],
    alias: common.alias
  },
  module: {
    preLoaders: common.preLoaders,
    loaders: common.loaders
  },
  postcss: common.postcss,
  plugins: [
    common.htmlWebpackPlugin,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(false),
      '__PROD__': JSON.stringify(true)
    }),
    common.webpackProvide,
    new CopyWebpackPlugin([
      { from: 'static' }
    ],
    { ignore: ['.DS_Store', '.keep'] }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log']
      }
    }),
    // new ExtractTextPlugin('all.min.css', { allChunks: true }),
    new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '..') })
  ]
}
