'use strict';

const webpack = require('webpack');
const path = require('path');

var baseConfig = {
  context: path.join(__dirname, '/test/'),
  entry: 'mocha-loader!./test.setup.webpack.jsx',
	output: {
		publicPath: '/test/'
	},
  resolve: {
	modules: [
		path.resolve('./src'),
		path.resolve('./test'),
		path.resolve('./node_modules')
	],
	alias: {
		Core: path.resolve('./src/core'),
		Views: path.resolve('./src/views'),
		Components: path.resolve('./src/views/components'),
		Pages: path.resolve('./src/views/pages'),
		Templates: path.resolve('./src/views/templates')
	}
  },
  //create fast sourcemap
  devtool: 'eval',
  devServer: {
    port: 8081,
    hot: false,
    inline: true,
	historyApiFallback: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      }
    ]
  }
};

// export configuration
module.exports = baseConfig;