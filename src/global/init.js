import axios from "gl/axios";
import store from "st";
import cookie from 'js-cookie'

if(process.env.VUE_APP_ENV=='dev'){
  axios.post("/login", {
    client: "demo12",
    username: "00001",
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
axios.get("/api/feishu/base/info").then(data=>{
  store.commit("setUser", data[0]);
})

axios.get("/pc/get_task_and_im_count", {dataLevel:'api'}).then(data=>{
  store.commit("setTaskMessageCount", data);
})