import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/init.css'
import '@/assets/font-awesome/css/font-awesome.min.css'
import '@/assets/styles/ele-ui-cover/index.scss'
// import 'element-ui/lib/theme-chalk/index.css';
import { Dialog, MessageBox, Checkbox, CheckboxGroup, CheckboxButton } from 'element-ui';

Vue.component(Dialog.name, Dialog);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(CheckboxButton.name, CheckboxButton);
Vue.config.productionTip = false;
Vue.prototype.$MessageBox = MessageBox;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
