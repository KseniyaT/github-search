const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const Dotenv = require('dotenv-webpack');
const { SourceMapDevToolPlugin } = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: { 
    	path: path.join(__dirname, "build"), 
    	filename: "index.bundle.js",
    	publicPath: "/",
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: "inline-source-map",
    devServer: { 
	    static: {
	      directory: path.join(__dirname, "./")
	    },
			historyApiFallback: true
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader'],
            },
            {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules|\.d\.ts$/,
              use: ['ts-loader'],
              use: {
		            loader: 'ts-loader',
		            options: {
			            compilerOptions: {
			            	noEmit: false,
			          	},
		          	},
		          },
            },
            {
              test: /\.(css|s[ac]ss)$/,
              use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
              test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
              use: ['file-loader'],
            },
        ],
    },
    plugins: [
      new SourceMapDevToolPlugin({
        filename: "[file].map"
      }),
      new Dotenv({
        systemvars: true,
      }),
      new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx"],
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
};