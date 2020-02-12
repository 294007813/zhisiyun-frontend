import Axios from 'axios'
import {baseApi} from '~/proj-config'

// console.log("baseApi", baseApi)

let axios= Axios.create({
    baseURL: baseApi,
    // withCredentials: true,
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
        const { data, code } = response.data;
        if (code == 200) {
            return data;
        }
        return response.data;
        // return response;
    },
    error => {
        if (error && error.response) {

        } else {

        }
        return Promise.reject(error);
    }
);

export default axios;