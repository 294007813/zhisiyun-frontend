import Vue from "vue";
import VueI18n from "vue-i18n";
import ElementLocale from 'element-ui/lib/locale'
import en from "./en/home";
import zh from "./zh/home";

import mobileEn from "@/pages/home-config/config/en";
import mobileZh from "@/pages/home-config/config/zh";
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh",
  messages: {
    en: { mobileLang: mobileEn, ...en, ...enLocale},
    zh: { mobileLang: mobileZh, ...zh, ...zhLocale}
  },
  missing(locale, key, vm) {
    // console.log("locale, key, vm, values: ", locale, key, vm)
  }
});
ElementLocale.i18n((key, value) => i18n.t(key, value))
export default i18n;
