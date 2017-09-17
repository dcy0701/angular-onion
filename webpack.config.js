const path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'onion.js',
		path: path.resolve(__dirname, 'dist'),
        library: 'onion',
        libraryTarget: 'umd'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader?cacheDirectory',
			exclude: [/node_modules/]
		}]
    }
};
