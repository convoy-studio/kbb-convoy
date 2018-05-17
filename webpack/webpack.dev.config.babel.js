import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import common from './common'

export default {
  cache: true,
  context: path.resolve(__dirname, '..'),
  devtool: 'eval',
  entry: {
    vendor: common.vendor,
    app: [
      './client/index.js'
    ]
  },
  externals: {
    'TweenLite': 'TweenLite'
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
    pathinfo: true
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
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', // chunkName
      'vendor.bundle.js' // filename
    ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(true),
      '__PROD__': JSON.stringify(false)
    }),
    common.webpackProvide,
    new CopyWebpackPlugin([
      { from: 'static' }
    ],
    { ignore: ['.DS_Store', '.keep'] })
  ]
}
