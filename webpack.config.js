const { env: { NODE_ENV = 'development' } = {} } = process;
const { resolve } = require('path');
const webpack = require('webpack');
const MCEP = require('mini-css-extract-plugin');
const HWP = require('html-webpack-plugin');
const { CleanWebpackPlugin: CWP } = require('clean-webpack-plugin');
const ELP = require('eslint-webpack-plugin');

const isDev = NODE_ENV === 'development';
const resolvePath = (path = '') => resolve(`${process.cwd()}/${path}`);
const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const CleanWebpackPlugin = new CWP();
const EslintWebpackPlugin = new ELP();
const MiniCssExtractPlugin = new MCEP();
const HtmlWebpackPlugin = new HWP({
  template: resolvePath('public/index.html'),
  filename: 'index.html',
});

const plugins = (() => {
  const plugins = [
    CleanWebpackPlugin,
    EslintWebpackPlugin,
    HtmlWebpackPlugin
  ];
  if (isDev)  {
    plugins.push(HotModuleReplacementPlugin);
  } else {
    plugins.push(MiniCssExtractPlugin);
  }
  return plugins;
})();

module.exports = ({
  entry: resolvePath('src/index.jsx'),
  output: {
    path: resolvePath('build'),
    filename: '[name].bundle.js'
  },
  mode: NODE_ENV,
  plugins,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.(?:js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(?:ttf|svg)$/,
        type: 'asset/inline'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MCEP.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ],
  },
});
