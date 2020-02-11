import Vue from 'vue'
import moment from "moment";
import App from './global/App.vue'
import router from './global/router'
import axios from './global/axios'
import store from './store'
import './global/directive'
import './global/init'
import './global/import-echart'
import './global/import-ele-ui'


import '@/assets/styles/init.css'
import '@/assets/font-awesome/css/font-awesome.min.css'
import '@/assets/styles/ele-ui-cover/index.scss'
import '@/assets/styles/zsy-style.scss'

import conf from '~/proj-config'


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$axios= axios
Vue.prototype.$fun= {
  moment,
}
Vue.prototype.$conf= conf

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
