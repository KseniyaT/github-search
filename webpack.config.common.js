const { Configuration } = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
};
