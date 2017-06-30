const path = require('path');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
    devServer: {
    openPage: '',
    open: true,
    port: 9000,
  },
    module: {
        rules: [
            {
                test: [/\.js$/ , /\.jsx$/],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader',  'sass-loader']
            }
        ]
    },

  plugins: [HtmlWebpackPluginConfig]
  
}

