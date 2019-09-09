module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/public'
	},
	devServer: {
		contentBase: './public'
	}
};