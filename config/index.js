module.exports = {
    base: {
        assetsPath: 'static'
    },
    dev: {
        env: 'development',
        publicPath: '/',
        host: '0.0.0.0',
        port: '8080',
        assetsPath: 'static',
        devtool: 'cheap-module-eval-source-map',
        proxyTable: {}
    },
    build: {
        env: 'production',
        publicPath: './',
        assetsPath: 'static',
        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    }
}