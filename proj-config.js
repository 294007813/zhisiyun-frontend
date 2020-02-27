import c from "./config"

const conf={
    ...c,
    ...c.env[process.env.VUE_APP_ENV]
}
delete conf.env
// console.log("conf", conf)
// console.log("process.env.VUE_APP_ENV",process.env.VUE_APP_ENV)
export default  Object.freeze(conf)