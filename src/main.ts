import ElementPlus from 'element-plus';
import { createApp, defineCustomElement } from 'vue';
import MyTree from './components/MyTree.ce.vue';

import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
let vm = app.mount('#app');

// @ts-ignore
window['vm'] = vm;
// 定义web component
const MyVueTree = defineCustomElement(MyTree);
console.log('MyTree', MyTree);

// vue 打包完的web component 形式不统一，需改造。
// @ts-ignore
MyVueTree.extends = MyTree.extends;
(window as any)['VueDefineCustomElement'] = defineCustomElement;
(window as any)['MyTreeComponent'] = MyVueTree;
(window as any)['MyTree'] = MyTree;
customElements.define('my-vue-tree', MyVueTree);
// document.body.append(document.createElement('my-vue-tree'));
