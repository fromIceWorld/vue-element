<template>
    <p></p>
</template>
<script>
import { ElMessage } from 'element-plus'
import {transformValue} from '../common.ts';
 export default {
    data(){
      return {
        message:'this is a message.',
        type:'success'
      }
    },
    mounted(){
      // 应用web components 配置项
      this.applyData();
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
        open(){
            ElMessage({
                message:this.message,
                type:this.type
            })
        },
    },
    tagNamePrefix:'my-message',
    get configurable(){
      return {
        className:'MyMessage',
        html:[{
          name:'基础配置',
          config:{
            message:{
                type: 'string',
                value: 'this is a message.',
            },
            type: {
                type: 'select',
                options: [
                { label: 'info', value: 'info' },
                { label: 'success', value: 'success' },
                { label: 'warning', value: 'warning' },
                { label: 'error', value: 'error' },
                ],
                value: 'info',
            },
        }
        }],
        component: {
          event: [],
          methods: [{ label: 'open', value: 'open' },],
          data: ['message','type'],
        },
      }
    },
    extends(option){
      const {html,className} = option;
          // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
          tagName = `${window['MyMessage'].tagNamePrefix}-${id}`;
      let config = {};
      Object.keys(html[0].config)
        .map((key) => {
          config[key] = transformValue(html[0].config[key])
        })
        .join('\n');
      return {
        tagName:`${tagName}`,
        // vue 前缀
        html:`<${tagName}></${tagName}>`,
        js:`class MyMessage${id} extends MyMessageComponent{
              constructor(){
                super();
              }
              get option(){
                return ${JSON.stringify(config)};
              }
              open(){
                this._instance.ctx.open();
              }
              get message(){
                return this._instance.data.message;
              }
              set message(value){
                this._instance.data.message = value;
              }
              get type(){
                return this._instance.data.type;
              }
              set type(value){
                this._instance.data.type = value;
              }
            }
            customElements.define('${tagName}',MyMessage${id});
            `
      }
    }
  }
</script>
<style>
/* 打包成web component 后 样式无法穿透 自定义组件 */
@import 'element-plus/dist/index.css';
</style>