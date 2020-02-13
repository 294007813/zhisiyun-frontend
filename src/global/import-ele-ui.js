import Vue from "vue";
import {
    Dialog, MessageBox,
    Checkbox, CheckboxGroup, CheckboxButton,
    Button,
    Tabs, TabPane,
    DatePicker,
    TimePicker,
    Badge,
    Input,
    Form,
    FormItem,
    Tree,
    Select,
    Option,
    OptionGroup,
    Switch,
    Card,
    Divider,
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
Vue.component(TimePicker.name, TimePicker);
Vue.component(Badge.name, Badge);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Tree.name, Tree);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(OptionGroup.name, OptionGroup);
Vue.component(Switch.name, Switch);
Vue.component(Card.name, Card);
Vue.component(Divider.name, Divider);
Vue.prototype.$MessageBox = MessageBox;