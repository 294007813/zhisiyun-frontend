const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
const conf = require('./proj-config')
let {baseApi}= conf

// var  devServer= {
//         port: 8888,
//         proxy: {
//             [`${baseApi}/`]: {
//         target: 'https://ensure.zhisiyun.com/',
//         pathRewrite: {[`^${baseApi}/`]: ''},
//     secure: false
// },
// }
// }
//
// console.log("devServer", JSON.stringify(devServer) )

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
                // target: 'https://ensure.zhisiyun.com/',
                target: 'http://127.0.0.1:3000/',
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
            },
            [`/lo-gin/`]: {
                target: 'http://ensure.zhisiyun.com/',
                pathRewrite: {[`^/lo-gin/`]: ''},
                secure: false
            },

        }
    }
}