import Axios from 'axios'
import store from 'st'
import cookie from 'js-cookie'
import conf from '~/proj-config'
let {baseApi} = conf
// console.log("conf", conf)
// console.log("axios", conf.baseApi)

let axios= Axios.create({
    baseURL: baseApi,
    withCredentials: true,
    timeout: 30000,
    // headers: {'Content-Type': 'application/json;charset=UTF-8'}
});

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    response => {
        // console.log(response)
        // console.log("cookie.get('i18next')", cookie.get('i18next'))
        let { dataLevel, dataKey } = response.config;
        let { data, msg, code } = response.data;
        let lang= cookie.get('i18next')
        store.commit('setLang', cookie.get('i18next'));

        switch (dataLevel) {
            case "all": {
                return response;
                break;
            }
            case "api":  {
                return response.data;
                break;
            }
            default: return response.data[dataKey|| 'data']
        }
    },
    error => {
        if (error && error.response) {

        } else {

        }
        return Promise.reject(error);
    }
);

export default axios;