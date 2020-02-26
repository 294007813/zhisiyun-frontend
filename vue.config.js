const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const conf = require('./proj-config')
let {baseApi}= conf

module.exports = {
    runtimeCompiler: true,  //运行时构建
    chainWebpack: config => {
        //快捷路径，样式内引用要在前面加上'～'
        config.resolve.alias
            .set('~', resolve('/'))
            .set('@', resolve('src'))
            .set('as', resolve('src/assets'))
            .set('co', resolve('src/components'))
            .set('gl', resolve('src/global'))
            .set('pa', resolve('src/pages'))
            .set('st', resolve('src/store'))
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
                target: 'https://ensure.zhisiyun.com/',
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
                // onProxyReq: function(proxyRes, req, res) {
                //     proxyRes.setHeader( "Cookie", "connect.sid=s%3A4V_wjs55vj4CDDthKccwutJDPjqsFNFS.%2BoUA3i0mde3iiQP9zHzuRQY43Aj7dJ0gVik1sG7OrCM; i18next=zh; connect.sid=s%3AXdR_WV-aQfczh8MKrLDtkd_Gqk97jJ0j.GV0Mms0mxepkyoVZdVhY07pazN0n1jeuPy5cvRCntLo")
                // },
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