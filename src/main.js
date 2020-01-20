import Vue from 'vue'
import App from './global/App.vue'
import router from './global/router'
import store from './store'
import './global/directive'
import ECharts from 'vue-echarts'

import '@/assets/styles/init.css'
import '@/assets/font-awesome/css/font-awesome.min.css'
import '@/assets/styles/ele-ui-cover/index.scss'
import '@/assets/styles/zsy-style.scss'
// import 'element-ui/lib/theme-chalk/index.css';
import { Dialog, MessageBox, Checkbox, CheckboxGroup, CheckboxButton, Button, Tabs, TabPane} from 'element-ui';
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/gauge'

Vue.component('v-chart', ECharts)
Vue.component(Dialog.name, Dialog);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(CheckboxButton.name, CheckboxButton);
Vue.component(Button.name, Button);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.config.productionTip = false;
Vue.prototype.$MessageBox = MessageBox;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
