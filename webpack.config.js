'use strict';

require('dotenv').config({ path: `${__dirname}/.dev.env` });
const production = process.env.NODE_ENV === 'production';

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

let plugins = [
  new ExtractTextWebpackPlugin('bundle-[hash].css'),
  new HtmlWebpackPlugin({ template: `${__dirname}/src/index.html` }),
  new DefinePlugin({
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    __DEBUG__: JSON.stringify(!production),
    __API_URL__: JSON.stringify(process.env.API_URL),
  }),
];

if (production) {
  plugins = plugins.concat([
    new CleanPlugin(['build']),
    new UglifyPlugin(),
  ]);
}

module.exports = {
  plugins,
  devServer: {
    historyApiFallback: true,
  },
  devtool: production ? undefined : 'source-map',
  entry: `${__dirname}/src/main.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle-[hash].js',
    publicPath: process.env.CDN_URL,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextWebpackPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(png|jpg|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'image/[name].[hash].[ext]',
          },
        }],
      },
    ],
  },
};
