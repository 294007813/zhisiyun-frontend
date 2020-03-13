const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}

// console.log("process.env", JSON.stringify(process.env))
process.env.VUE_APP_ENV= process.env.npm_lifecycle_script.split("-env:")[1]
let proconf= process.env.NODE_ENV=="production"?{
    outputDir: "pcindex",
    // assetsDir: "pcindex",
    publicPath: "/pcindex/"
} : {}
module.exports = {
    ...proconf,
    runtimeCompiler: true,  //运行时构建
    chainWebpack: config => {
        //快捷路径，样式内引用要在前面加上'～'
        config.resolve.alias
            .set('~', resolve('/'))
            .set('@', resolve('src'))
            .set('pu', resolve('/public'))
            .set('as', resolve('src/assets'))
            .set('co', resolve('src/components'))
            .set('gl', resolve('src/global'))
            .set('pa', resolve('src/pages'))
            .set('st', resolve('src/store'))
            .set('la', resolve('src/lang'))
            .set('li', resolve('src/lib'))
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "as/styles/zsy-base.scss";`
            }
        },
    },

    devServer: {
        host: "0.0.0.0",
        // open: false,
        port: 8888,
        proxy: {
            "/api-proxy/": {
                target: 'https://ensure.zhisiyun.com/',
                // target: 'http://127.0.0.1:3000/',
                changeOrigin: true,
                pathRewrite: {"^/api-proxy/": ''},
                // pathRewrite: function (path, req) {
                //     let p= path.replace('/api-proxy/', '')
                //     // .replace('admin/', '')
                //     // console.log("p", p)
                //     return p
                // },
                secure: false,
                // autoRewrite: true,
                // followRedirects: true,
                // selfHandleResponse: true,
                onProxyReq: function(onProxyReq, req, res) {
                    // onProxyReq.setHeader( "Cookie",
                    //     "connect.sid=s%3AavZ3w22t0bKveMybAHSytJk34RVMpxyz.gcSNHZKNOa7Z8Gqz6DPbTtbX3ueIq1q9%2F4RkoSaZlv0")
                },
                onProxyRes: function(proxyRes, req, res) {
                    var cookies = proxyRes.headers['set-cookie'];
                    console.log("cookies", JSON.stringify(cookies))
                }
                    // cookieDomainRewrite: {
                //     // ".zhisiyun.com": "",
                //     // "ensure.zhisiyun.com": "",
                //     "*": "localhost",
                // }
            },
            [`/lo-gin/`]: {
                target: 'http://ensure.zhisiyun.com/',
                pathRewrite: {[`^/lo-gin/`]: ''},
                secure: false
            },
        }
        /**
            location /api-proxy/ {
               proxy_pass http://ensure.zhisiyun.com/;
            }
         **/
    }
}