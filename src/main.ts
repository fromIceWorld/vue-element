import ElementPlus from 'element-plus';
import { createApp, defineCustomElement } from 'vue';
import App from './App.vue';
import MyDatePicker from './components/MyDatePicker.ce.vue';
// import MyDialog from './components/MyDialog.ce.vue';
import MyMessage from './components/MyMessage.ce.vue';
import MyTabs from './components/MyTab.ce.vue';
import MyTree from './components/MyTree.ce.vue';

const app = createApp(App);
app.use(ElementPlus);
// 阻止子应用挂载，会影响集成环境
// let vm = app.mount('#app');

(window as any)['VueDefineCustomElement'] = defineCustomElement;

// @ts-ignore
// window['vm'] = vm;
// 定义web component
const MyVueTree = defineCustomElement(MyTree);
const MyVueDatePicker = defineCustomElement(MyDatePicker);
const MyVueMessage = defineCustomElement(MyMessage);
const MyVueTabs = defineCustomElement(MyTabs);
// const MyVueDialog = defineCustomElement(MyDialog);

// vue 打包完的web component 形式不统一，需改造。
// // @ts-ignore
// MyVueTree.extends = MyTree.extends;
// // @ts-ignore
// MyVueTree.configurable = MyTree.configurable;
// // @ts-ignore
// MyVueTree.configurable = MyTree.configurable;

// tree
(window as any)['MyTreeComponent'] = MyVueTree;
(window as any)['MyTree'] = MyTree;
// DatePicker
(window as any)['MyDatePickerComponent'] = MyVueDatePicker;
(window as any)['MyDatePicker'] = MyDatePicker;
// Message
(window as any)['MyMessageComponent'] = MyVueMessage;
(window as any)['MyMessage'] = MyMessage;
// tabs
(window as any)['MyTabsComponent'] = MyVueTabs;
(window as any)['MyTabs'] = MyTabs;

const registerEl = (tagName: string, cla: CustomElementConstructor) => {
    if (customElements.get(tagName)) {
        console.warn('企图注册相同名称的标签:', tagName);
    } else {
        customElements.define(tagName, cla);
    }
};
registerEl('my-vue-tree', MyVueTree);
registerEl('my-vue-date', MyVueDatePicker);
registerEl('my-vue-message', MyVueMessage);
registerEl('my-vue-tabs', MyVueTabs);
// registerEl('my-vue-dialog', MyVueDialog);

// document.body.append(document.createElement('my-vue-tree'));
console.log('vue@3.2.47 + element-plus@2.3.0 应用加载。');
