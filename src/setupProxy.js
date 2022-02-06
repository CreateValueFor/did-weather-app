const proxy = require('http-proxy-middleware');



module.exports = function (app) {
    app.use(
        '/cur',
        proxy.createProxyMiddleware({
            target: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst',
            changeOrigin: true,
            pathRewrite: {
                '^/cur': ''
            }
        })
    )
    app.use(
        proxy.createProxyMiddleware('/pre', {
            target: 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
            changeOrigin: true,
            pathRewrite: {
                "^/pre": "",
            },

        })
    );
    app.use(
        proxy.createProxyMiddleware('/air', {
            // target: 'http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst',
            target: 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty',
            changeOrigin: true,
            pathRewrite: {
                "^/air": "",
            }
        })
    )
}