var path = require('path')

module.exports = {
	entry: path.resolve(__dirname, '../app/modules/App/App.jsx'),
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
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		},
		{
			test: /\.scss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader']
		},
		{ 
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader?limit=100000&publicPath=../&name=assets/public/[name].[ext]'
		},

		]
	},
	resolve: {
		alias: {
			'_app': path.resolve(__dirname, '../app'),
			'_modules': path.resolve(__dirname, '../app/modules'),
			'_components': path.resolve(__dirname, '../app/components'),
			'styles': path.resolve(__dirname, '../app/assets/styles')
		}
	}
};
