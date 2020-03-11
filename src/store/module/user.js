import i18n from 'la'
import moment from "moment";
export default {
    state: {
       lang: "zh",
        userinfo: {},
        connectsid: ''
    },
    getters: {
        userId: state => {
            return state.userinfo._id
        },
        userInfo: state => state.userinfo
    },
    mutations: {
        setLang(state, lan){
            i18n.locale= state.lang = lan|| 'zh';
            moment.locale(lan == "zh" ? "zh-cn" : lan)
            // console.log("moment.locales()", moment.locales())
        },
        setUser(state, data){
            state.userinfo= data
        },
        setSid(state, sid){
            // sessionStorage.setItem("connect.sid", sid)
            state.connectsid= sid
        }
    },
    actions:{

    },
}