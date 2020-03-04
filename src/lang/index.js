import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "./en/home";
import zh from "./zh/home";

import mobileEn from "@/pages/home-config/config/en";
import mobileZh from "@/pages/home-config/config/zh";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh",
  messages: {
    en: { mobileLang: mobileEn, ...en },
    zh: { mobileLang: mobileZh, ...zh }
  },
  missing(locale, key, vm) {
    // console.log("locale, key, vm, values: ", locale, key, vm)
  }
});

export default i18n;
