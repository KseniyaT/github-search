const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const Dotenv = require('dotenv-webpack');
const { SourceMapDevToolPlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
    mode: process.env.NODE_ENV || 'development',
    devtool: 'inline-source-map',
    devServer: { 
	    static: {
	      directory: path.join(__dirname, './')
	    },
			historyApiFallback: true
    },
    plugins: [
      new SourceMapDevToolPlugin({
        filename: '[file].map'
      }),
      new Dotenv({
        systemvars: true,
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
      }),
      new HtmlWebpackPlugin({
          template: path.join(__dirname, 'public', 'index.html'),
          favicon: './public/favicon.ico',
          filename: 'index.html',
          manifest: './public/manifest.json',
      }),
      new HtmlWebpackInlineSVGPlugin({
        runPreEmit: true,
      }),
    ],
});