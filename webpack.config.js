'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

var baseConfig = {
  context: path.join(__dirname, '/src/'),
  entry: {
    bundle: ['./index.js','./views/styles/index.sass'] 
  },
	output: {
		publicPath: '/'
	},
  resolve: {
	modules: [
		path.resolve('./src'),
		path.resolve('./node_modules')
	],
	alias: {
		Core: path.resolve('./src/core'),
		Views: path.resolve('./src/views'),
		Components: path.resolve('./src/views/components'),
		Pages: path.resolve('./src/views/pages')
	}
  },
  //create fast sourcemap
  devtool: 'eval',
  devServer: {
    port: 8080,
    contentBase: ['./src/index.html','./src/views/templates'],
    watchContentBase: true,
    hot: true,
    inline: true,
	historyApiFallback: true
  },
  module: {
    rules: [{
        test: /\.svg$|\.png|\.jpe?g|\.gif$/,
        loader: 'file-loader',
        options: {
          name: "img/[name].[ext]"
        },
        include: path.join(__dirname, '/assets/img')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: path.join(__dirname, '/src')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, '/src')
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader"
      //   })

      // },
      {
        test: /\.sass$|\.css$/,
        //reload if sass changed
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          //if sass and css work wrong, call style-loader
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [{
              loader: 'css-loader',
              options: {
                minimize: { discardComments: { removeAll: true } }
              }
            },
            //add postcss to css with autoprefixer
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('autoprefixer'),
                ]
              }
            },
            //add url absolute path (img and other), sass must be with sourcemap
            {
              loader: 'resolve-url-loader'
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }))
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyCSS: true,
        minifyJS: true
      }
    }),
    //create style file from css or sass
    new ExtractTextPlugin({
      filename: "style.css",
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: '../assets/fonts/', to: 'fonts/' },
      { from: '../assets/the_favicon/', to: 'the_favicon/' }
    ])
  ]
};

// export configuration
module.exports = baseConfig;