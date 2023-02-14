 const path = require('path');
 const { merge } = require('webpack-merge');
 const common = require('./webpack.config.common.js');
 const ESLintPlugin = require('eslint-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');

 module.exports = merge(common, {
  mode: process.env.NODE_ENV || 'production',
   plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'public', 'index.html'),
        favicon: './public/favicon.ico',
        filename: 'index.html',
        manifest: './public/manifest.json',
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new CleanWebpackPlugin(),
  ], 
 });
