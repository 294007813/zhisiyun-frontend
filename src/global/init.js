import axios from "gl/axios";
import store from "st";
import moment from "moment";
import async from "async";
import _ from "underscore"
window.async= async
window.moment= moment
window._= _
// import cookie from 'js-cookie'

if(process.env.VUE_APP_ENV=='dev'){
axios.post("/login", {
  client: "001",
  username: "0003",
  password: "000000"
  // client: "HYFZ",
  // username: "000003",
  // password: "000000"
});
}

//获取显示语言
axios.get("/api/feishu/base/getlanguage").then(data => {
  if (data) {
    store.commit("setLang", data);
  }
});
axios.get("/api/feishu/base/info").then(data => {
  store.commit("setUser", data[0]);
});

axios.get("/pc/get_task_and_im_count", { dataLevel: "api" }).then(data => {
  store.commit("setTaskMessageCount", data);
})

moment.updateLocale('zh', {
  months : [
    "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月",
  ]
});
