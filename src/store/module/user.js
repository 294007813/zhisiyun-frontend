import i18n from 'la'
export default {
    state: {
       lang: "zh"
    },
    getters: {

    },
    mutations: {
        setLang(state, lan){
            i18n.locale= state.lang = lan|| 'zh';
        },
    },
    actions:{

    },
}