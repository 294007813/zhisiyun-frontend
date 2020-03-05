import axios from "gl/axios";
import store from "st";

axios.post("/login", {
  client: "demo12",
  username: "00001",
  password: "000000"

  // client: "001",
  // username: "0062",
  // password: "000000"
});

//获取显示语言
axios.get("/api/feishu/base/getlanguage").then(data => {
  if (data) {
    store.commit("setLang", data);
  }
});
