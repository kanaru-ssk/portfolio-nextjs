const config = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.css$/,
			use: 'raw-loader',
		});

		return config;
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
};

module.exports = config;
