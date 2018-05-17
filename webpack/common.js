import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import meta from '../client/data/meta'
const autoprefixer = require('autoprefixer')
const rucksack = require('rucksack-css')

const env = process.env.NODE_ENV
const template = { 
  PROD: 'client/templates/index-prod.tpl.ejs',
  DEV: 'client/templates/index-dev.tpl.ejs'
}[env]

export default {
  vendor: [
    'gsap',
    // path.resolve(__dirname, '..', 'static/libs/import_a_file.js'),
    'pixi.js',
    'dom-hand',
    'react',
    'react-dom'
  ],
  alias: {
    'assetsFolder': path.resolve(__dirname, '..', 'static/assets'),
    'dataFolder': path.resolve(__dirname, '..', 'static/data'),
    'AppStore': path.resolve(__dirname, '..', 'client/store/'),
    'AppActions': path.resolve(__dirname, '..', 'client/actions/'),
    'AppConstants': path.resolve(__dirname, '..', 'client/constants/'),
    'Dispatcher': path.resolve(__dirname, '..', 'client/base/dispatcher/'),
    'WindowStore': path.resolve(__dirname, '..', 'client/base/stores/WindowStore.js'),
    'WindowConstants': path.resolve(__dirname, '..', 'client/base/constants/WindowConstants.js'),
    'WindowActions': path.resolve(__dirname, '..', 'client/base/actions/WindowActions.js'),
    'RouterStore': path.resolve(__dirname, '..', 'client/base/stores/RouterStore.js'),
    'RouterConstants': path.resolve(__dirname, '..', 'client/base/constants/RouterConstants.js'),
    'RouterActions': path.resolve(__dirname, '..', 'client/base/actions/RouterActions.js')
  },
  preLoaders: [
    {
      test: /\.js?$/,
      exclude: [/node_modules/, /client\/vendor/, /static\/libs/],
      loader: 'eslint'
    }
  ],
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true // important for performance
      }
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', 'postcss-loader', 'sass']
    },
    {
      test: /\.(woff|woff2|ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    },
    {
      test: /\.png$/,
      loader: "url-loader?mimetype=image/png" 
    }
  ],
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
    rucksack()
  ],
  htmlWebpackPlugin: new HtmlWebpackPlugin({
    template: template,
    inject: 'body',
    filename: 'index.html',
    hash: true,
    environment: process.env.NODE_ENV,
    meta: meta
  }),
  webpackProvide: new webpack.ProvidePlugin({
    'React': 'react',
    'ReactDOM': 'react-dom',
    'dom': 'dom-hand',
    'PIXI': 'pixi.js'
  })
}