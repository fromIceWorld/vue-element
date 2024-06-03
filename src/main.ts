import { createApp } from 'vue';
// import MyDialog from './components/MyDialog.ce.vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import '../index.css';
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus, {
    locale: zhCn,
});
debugger;
// 阻止子应用挂载，会影响集成环境
app.mount('#app');

// document.body.append(document.createElement('my-vue-tree'));
console.log('vue@3.2.47 + element-plus@2.3.0 应用加载。');
