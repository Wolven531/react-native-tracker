const path = require("path");

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{ loader: "style-loader" },
			{
				test: /\.css$/,
				use: "css-loader",
				options: {
					modules: true
				}
			},
			{
				test: /\.ts$/,
				use: "ts-loader"
			}
		]
	},
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist")
	}
};
