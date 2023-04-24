import ElementPlus from 'element-plus';
import { createApp, defineCustomElement } from 'vue';
import MyDatePicker from './components/MyDatePicker.ce.vue';
import MyTree from './components/MyTree.ce.vue';

import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
// 阻止子应用挂载，会影响集成环境
// let vm = app.mount('#app');

// @ts-ignore
// window['vm'] = vm;
// 定义web component
const MyVueTree = defineCustomElement(MyTree);
const MyVueDatePicker = defineCustomElement(MyDatePicker);

// vue 打包完的web component 形式不统一，需改造。
// // @ts-ignore
// MyVueTree.extends = MyTree.extends;
// // @ts-ignore
// MyVueTree.configurable = MyTree.configurable;
// // @ts-ignore
// MyVueTree.configurable = MyTree.configurable;
(window as any)['VueDefineCustomElement'] = defineCustomElement;
(window as any)['MyTreeComponent'] = MyVueTree;
(window as any)['MyTree'] = MyTree;
(window as any)['MyDatePickerComponent'] = MyVueDatePicker;
(window as any)['MyDatePicker'] = MyDatePicker;

const registerEl = (tagName: string, cla: CustomElementConstructor) => {
    if (customElements.get(tagName)) {
        console.warn('企图注册相同名称的标签:', tagName);
    } else {
        customElements.define(tagName, cla);
    }
};
registerEl('my-vue-tree', MyVueTree);
registerEl('my-vue-date', MyVueDatePicker);

// document.body.append(document.createElement('my-vue-tree'));
