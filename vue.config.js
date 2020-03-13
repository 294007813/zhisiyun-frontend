const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
// const conf = require('./proj-config')
// let {baseApi}= conf
// console.log("process.env.area", JSON.stringify(process.env) )
// console.log("process.env.npm_lifecycle_script", JSON.stringify(process.env.npm_lifecycle_script) )
process.env.VUE_APP_ENV= process.env.npm_lifecycle_script.split("-env:")[1]

module.exports = {
    // assetsDir: "pcindex",
    // publicPath: process.env.VUE_APP_ENV=="production" ? "/pcindex/": "/",
    publicPath: "./",
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
        // proxy: {
        //     [`${baseApi}/`]: {
        //         target: 'http://ensure.zhisiyun.com/',
        //         pathRewrite: {[`^${baseApi}/`]: ''},
        //         secure: false
        //     },
        // },
        // allowedHosts: ['https://ensure.zhisiyun.com/'],
        // public: 'https://ensure.zhisiyun.com/',
        // disableHostCheck: true,
        proxy: {
            "/api-proxy/": {
                target: 'http://pcensure.sec.zhisiyun.com/',
                // target: 'http://127.0.0.1:3000/',
                changeOrigin: true,
                // pathRewrite: {"^/api-proxy/": ''},
                pathRewrite: function (path, req) {
                    let p= path.replace('/api-proxy/', '')
                    // .replace('admin/', '')
                    // console.log("p", p)
                    return p
                },
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