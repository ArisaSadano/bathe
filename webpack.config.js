const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const ESLintPlugin = require('eslint-webpack-plugin');
// import ESLintPlugin from 'eslint-webpack-plugin';
// import path from 'path';
const MODE = 'production';
const enabledSourceMap = MODE === 'development';

module.exports = {
  mode: MODE,

  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|ts)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                plugins: [['autoprefixer', {grid: true}]],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },
  // cache: {
  //   type: 'filesystem',
  //   buildDependencies: {
  //     config: [__filename],
  //   },
  // },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '${__dirname}/assets/css/style.css',
    }),
    new ESLintPlugin({
      extensions: ['.js', '.ts'],
      exclude: 'node_modules',
    }),
  ],
};
