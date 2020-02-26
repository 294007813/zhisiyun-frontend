import Axios from 'axios'
import {baseApi} from '~/proj-config'

// console.log("baseApi", baseApi)

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

        let { dataLevel, dataKey } = response.config;
        let { data, msg, code } = response.data;
        switch (dataLevel) {
            case "all": {return response; break;}
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