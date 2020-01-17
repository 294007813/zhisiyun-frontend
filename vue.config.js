const path = require('path')
const resolve = dir => {
    return path.join(__dirname, dir)
}
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

    css: {
        loaderOptions: {

        },
    }
}