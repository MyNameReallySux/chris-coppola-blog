"use strict"
const fs = require('fs')
const path = require('path')
const url = require('url')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../webpack.config')

const express = require('express')
const proxy = require('proxy-middleware')
const spdy = require('spdy')

const USE_HTTP2 = false
const ROOT_DIR = path.resolve(__dirname, '../')

const app = express()

app.use('/dist/assets', proxy(url.parse('http://localhost:8081')))
app.use('/tokens', express.static('dist/tokens/'))

if(USE_HTTP2){
	app.get('/*', function(req, res, next){
		if(!req.secure) {
			console.log('not secure')
			return res.redirect(['https://', req.get('Host'), req.url].join(''));
		}
		console.log('secure req')
		next();
	})
}

app.get('/*', function(req, res, next){
	let hasExt = req.url.indexOf('.')
	
	req.url.indexOf('.')
		? handleExtension(req.url)
		: next()
	
	function handleExtension(url){
		let ext = url.split(".").pop();
	
		let ACCEPTED = ['js', 'yml']
		
		ACCEPTED.indexOf(ext) == -1
		? accepted(ext)
		: next()
	}
	
	function accepted(ext){
		res.sendFile(path.resolve(ROOT_DIR, 'dist/index.html'))
	}
})


var server = new WebpackDevServer(webpack(config), {
	contentBase: path.resolve(ROOT_DIR, 'dist'),
	hot: true,
	quiet: false,
	noInfo: false,
	publicPath: "/",
	
	stats: { colors: true }
})

server.listen(8081, "localhost", () => {})
if(USE_HTTP2){
	const options = {
		key: fs.readFileSync(path.resolve(ROOT_DIR, '_private/server.key')),
		cert: fs.readFileSync(path.resolve(ROOT_DIR, '_private/server.crt'))
	}
	spdy
		.createServer(options, app)
		.listen(8080, (error) => {
		if (error){
			console.error(error)
			return process.exit(1)
		} else {
			console.log('Listening on port: ' + 8080 + '.')
		}
	})
} else {
	app.listen(8080, () => {
		console.log('Listening on port: ' + 8080 + '.')
	})
}


