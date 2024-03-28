<template>
    <div style="min-height: 10px;" :style="{height:height+'px'}">
        <el-tabs :tab-position="position" v-model="activeName" class="demo-tabs" :class="{ noHeader: noHeader }" @tab-click="handleClick">
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
            noHeader:false,
            position:'top',
            activeName:'tab0',
            tabs : [
                {label:'tab0',value:'tab0'},
                {label:'tab1',value:'tab1'},
                ],    
        }
    },
    // web component 组件配置项应用到组件
    applyData(){
      // 判断当前组件是否运行在 web components环境
      const shadowRoot = this.$el.parentNode;
      if(!shadowRoot || shadowRoot.nodeType !== 11){
        return
      }
      const host = this.$el.parentNode.host;
      const option = host.option;
      Object.keys(option).forEach(key=>{
        this[key] = option[key]
      })
    },
    mounted(){
      // 应用web components 配置项
      this.applyData();
    },
    methods:{
        // web component 组件配置项应用到组件
        applyData(){
          const shadowRoot = this.$el.parentNode;
          if(!shadowRoot || shadowRoot.nodeType !== 11){
            return
          }
          const host = this.$el.parentNode.host;
          const option = host.option;
          Object.keys(option).forEach(key=>{
            this[key] = option[key]
          })
        },
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
            html: [
              {
                name:'基础配置',
                config:{
                noHeader: {
                  type: 'boolean',
                  value: false,
                },
                position: {
                  type: 'select',
                  options: [
                      { value: 'top', label: 'top' },
                      { value: 'left', label: 'left' },
                      { value: 'right', label: 'right' },
                      { value: 'bottom', label: 'bottom' },
                  ],
                  value: 'top',
                },
                tabs: {
                    type: 'tags',
                    options: [{label:'tab0',value:'tab0'}, {label:'tab1',value:'tab1'}],
                    value:'tab0'
                }
            }
              }
            ],
            component: {
                event: [],
                methods: [],
                data: ['activeName'],
            },
        }
    },
    extends(option){
    // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
      tagName = `${MyTabs.tagNamePrefix}-${id}`;
    const { html, className } = option;
    let config = {};
    const {noHeader,position,tabs} = html[0].config;
    config['noHeader'] = noHeader.value;
    config['position'] = position.value;
    config['tabs'] = tabs.options;
    config['activeName'] = tabs.value;
    return {
      html: `<${tagName}></${tagName}>`,
      js: `class MyTabs${id} extends MyTabsComponent{
              constructor(){
                super();
              }
              get option(){
                return ${JSON.stringify(config)};
              }
              set activeName(value){
                this._instance.ctx._.data.activeName = value;
              }
              get activeName(){
                return this._instance.ctx._.data.activeName;
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

.noHeader .el-tabs__header{
  display: none;
}


</style>