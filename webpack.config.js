let webpack = require('webpack')
let path = require('path')
let CircularDependencyPlugin = require('circular-dependency-plugin')

let ROOT_DIR = path.resolve(__dirname);

let APP_DIR = 		path.resolve(ROOT_DIR, 'client/src');
let ASSETS_DIR = 	path.resolve(ROOT_DIR, 'dist/assets');
let CLIENT_DIR = 		path.resolve(ROOT_DIR, 'client');
let BUILD_DIR = 	path.resolve(ROOT_DIR, 'dist');
let MODULES_DIR = path.resolve(ROOT_DIR, 'node_modules');

module.exports = {
	entry: [
		"babel-polyfill",
		'webpack-dev-server/client?http://localhost:8081',
		'webpack/hot/dev-server',
		"./client/index.jsx"
	],
	output: {
		path: ASSETS_DIR,
		filename: "app.bundle.js",
		publicPath: '/'
	},
	module: {
		loaders : [{
			test : /\.jsx?/,
			exclude : MODULES_DIR,
			loader : 'babel-loader'
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true
		  })
			
	],
	devtool: 'eval-source-map',
	resolve: {
		extensions: ['.js', '.jsx', 'json'],
		alias: {
			'@root': 		path.resolve(APP_DIR),
			'@core': 		path.resolve(APP_DIR, "core"),
			'@components': 	path.resolve(APP_DIR, "components"),
			'@libs': 		path.resolve(APP_DIR, "libs"),
			'@views': 		path.resolve(APP_DIR, "views")
		},
	},
	devServer: {
		hot: true,
		inline: true
	}
}