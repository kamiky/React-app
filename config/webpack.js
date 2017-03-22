var path = require('path')

module.exports = {
	entry: path.resolve(__dirname, '../app/App.jsx'),
	output: {
		path: path.resolve(__dirname, '../app/'),
		filename: "bundle.js"
	},
  	devtool: 'inline-source-map',
	module: {
		loaders: [
		{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['react', 'es2015']
			}
		},
		{
			test: /\.scss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader']
		},
		]
	},
	resolve: {
		alias: {
			'_app': path.resolve(__dirname, '../app')
		}
	}
};