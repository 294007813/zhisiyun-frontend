import Vue from 'vue'
import store from './store'
import App from './global/App.vue'
import router from './global/router'
import axios from './global/axios'
import moment from "moment";
import util from './global/util'
import conf from '~/proj-config'
import { Loading } from 'element-ui';
import './global/directive'
import './global/init'
import './global/import-echart'
import './global/import-ele-ui'

import '@/assets/styles/init.css'
import '@/assets/font-awesome/css/font-awesome.min.css'
import '@/assets/styles/ele-ui-cover/index.scss'
import '@/assets/styles/zsy-style.scss'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$axios= axios
Vue.prototype.$f= {
  moment,
  loading:Loading.service,
  ...util
}
Vue.prototype.$conf= conf

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
