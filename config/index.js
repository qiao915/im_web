var path = require('path')

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/im-web/',
		//assetsPublicPath: './',
		productionSourceMap: process.env.NODE_ENV !== 'production',  //去除map文件
		productionDebugger: process.env.NODE_ENV !== 'production',   //去除 debugger
		productionConsole: process.env.NODE_ENV !== 'production',    //去除 console

		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: process.env.npm_config_report
	},
	dev: {
		env: require('./dev.env'),
		port: 8080,
		autoOpenBrowser: true,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/api': {
				target: 'http://192.168.0.7/api/', // 接口的域名
				// target: 'http://juke-test.kuick.cn/api/', // 本地接口/
				// secure: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		cssSourceMap: false
	}
}
