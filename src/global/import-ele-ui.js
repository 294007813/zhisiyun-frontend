import Vue from "vue";
import {
    Dialog, MessageBox,
    Checkbox, CheckboxGroup, CheckboxButton,
    Button,
    Tabs, TabPane,
    DatePicker,
    Badge
} from 'element-ui';

Vue.component(Dialog.name, Dialog);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(CheckboxButton.name, CheckboxButton);
Vue.component(Button.name, Button);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Badge.name, Badge);
Vue.prototype.$MessageBox = MessageBox;