const express = require('express');
const proxy = require('http-proxy-middleware');
const secretKey = '0d8901075b53d85e4b686cee7b9704f4';

const app = express();
const darkSkyProxy = proxy({
	target: 'https://api.darksky.net',
	changeOrigin: true,
	pathRewrite(path) {
		return path
			.replace(/^\/api\/darksky/, '')
			.replace('access_key', secretKey);
	}
});

app.use('/api/darksky', darkSkyProxy);
app.use(express.static('public'));

app.listen(8080);