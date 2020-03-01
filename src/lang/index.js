import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "./en/home";
import zh from "./zh/home";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh",
  messages: {en, zh},
  missing(locale, key, vm){
    console.log("locale, key, vm, values: ", locale, key, vm)
  }
});

export default i18n;
