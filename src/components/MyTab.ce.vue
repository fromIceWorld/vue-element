<template>
    <div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane v-for="(tab,index) in tabs" :key="tab.value" :label="tab.label" :name="tab.value">
                <slot :name="tranSlot(index)"></slot>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {transformValue} from '../common.ts';

export default {
    data(){
        return {
            activeName:'0',
            tabs : [
                {label:'tab0',value:'tab0'},
                {label:'tab1',value:'tab1'},
                {label:'tab2',value:'tab2'},
                {label:'tab3',value:'tab3'},
                {label:'tab4',value:'tab4'},]
        }
    },
    methods:{
        handleClick(e){
            console.log(e)
        },
        tranSlot(index){
            return 'slot' + index
        }
    },
    tagNamePrefix:'my-tabs',
    get configurable(){
      return {
            className: 'MyTabs', // 暴露出的组件class名称【组件可以注册到window上，并把配置同时暴露】
            html: {
                position: {
                  type: 'array',
                  options: [
                      { value: 'top', label: 'top' },
                      { value: 'left', label: 'left' },
                      { value: 'right', label: 'right' },
                      { value: 'bottom', label: 'bottom' },
                  ],
                  value: 'top',
                },
                tabs: {
                    type: 'list',
                    options: ['tab0', 'tab1'],
                    value: 'tab0',
                },
            },
            css: {
                classes: '',
                style: {},
                width: {
                type: 'number',
                value: 800,
                postfix: 'px',
                },
                height: {
                type: 'number',
                value: 400,
                postfix: 'px',
                },
            },
            component: {
                event: [],
                methods: [],
                data: [],
                params: [],
            },
        }
    },
    extends(option){
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
      tagName = `${MyTabs.tagNamePrefix}-${id}`;
    const { html: config, css, className } = option;
    return {
      html: `<${tagName} _data="_instance.ctx._.data" _methods="_instance.ctx"></${tagName}>`,
      js: `class MyTabs${id} extends MyTabsComponent{
              constructor(){
                super();
                let vm = document.querySelector('${tagName}');
                setTimeout(()=>{
                  vm._instance.ctx._.data['tabs'] = ${transformValue(config['tabs'])};
                });
              }
         }
         customElements.define('${tagName}',MyTabs${id});
         `,
    };
  }
}
</script>
<style>
/* 打包成web component 后 样式无法穿透 自定义组件 */
@import 'element-plus/dist/index.css';



</style>