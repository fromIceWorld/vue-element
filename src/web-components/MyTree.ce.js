import { createApp, defineCustomElement } from 'vue';
import MyTree from '../components/MyTree.ce.vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

const app = createApp(MyTree);
app.use(ElementPlus, {
    locale: zhCn,
});
// 阻止子应用挂载，会影响集成环境

const MyTreeComponent = defineCustomElement(MyTree);
export { MyTree, MyTreeComponent, app };
