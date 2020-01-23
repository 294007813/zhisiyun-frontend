import Vue from 'vue'
import App from './global/App.vue'
import router from './global/router'
import store from './store'
import './global/directive'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
