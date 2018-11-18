// webpack integration and configuration
// by Anton
const webpack = require('webpack')
const fs	  = require('fs')
const path    = require('path')
const process = require('process')

module.exports = env => {
	let config = {
		entry   : './client/src/index.js',
		output  : {
			path       : path.resolve(process.cwd(), './client/build/'),
			publicPath : 'client/build',
			filename   : 'index.js'
		},
		devtool : 'source-map',
		mode    : env.mode == 'build'? 'production': 'development',
		module  : {
			rules : [{
				test	: /\.js$/,
				loader	: 'babel-loader',
				query	: {presets: ['stage-0']},
				exclude	: /node_modules/
			},{
				test    : /\.(sass)$/,
				loaders : [
					'style-loader',
					'css-loader',
					'sass-loader?sourceMap'],
				exclude	: /node_modules/
			},{
				test: /\.(ttf|svg)$/,
				loader: 'file-loader?name=./graphic/[name].[ext]',
				exclude	: /node_modules/
			},{
				test: /\.(jpg|png|svg)$/,
				loader: 'url-loader',
				exclude	: /node_modules/
			}]
		},
		plugins : []
	}
	// watch
	if (env.mode == 'watch' || env.mode == 'extern')
		Object.assign(config, {
			plugins   : [new webpack.HotModuleReplacementPlugin()],
			devServer : {
				contentBase : './',
				stats       : 'errors-only',
				inline      : true,
				hot         : true,
				port        : 8000
			}
		})
	// extern
	if (env.mode == 'extern') config.devServer.host = require('ip').address()
	// adjustments
	config.plugins.push(new webpack.ExternalsPlugin('commonjs', ['electron']))
	return config
}
