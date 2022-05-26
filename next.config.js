const config = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.css$/,
			use: 'raw-loader',
		});

		return config;
	},
};

module.exports = config;
