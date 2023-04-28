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
    methods:{
        open(){
            ElMessage({
                message:this.message,
                type:this.type
            })
        },
    },
    tagNamePrefix:'my-date',
    get configurable(){
      return {
        className:'MyMessage',
        html:{
            message:{
                type: 'string',
                value: 'this is a message.',
            },
            type: {
                type: 'array',
                options: [
                { label: 'message', value: 'message' },
                { label: 'success', value: 'success' },
                { label: 'warning', value: 'warning' },
                { label: 'error', value: 'error' },
                ],
                value: 'message',
            },
        },
        css: {
          classes: '',
          style: {},
        },
        component: {
          event: [],
          methods: [{ label: 'open', value: 'open' },],
          data: [],
          params: [],
        },
      }
    },
    extends(option){
      const {html,css,className} = option;
          // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
          tagName = `${window['MyMessage'].tagNamePrefix}-${id}`;
      let config = {};
      Object.keys(html)
        .map((key) => {
          config[key] = transformValue(html[key])
        })
        .join('\n');
      return {
        tagName:`${tagName}`,
        // vue 前缀
        html:`<${tagName} _data="_instance.ctx._.data" _methods="_instance.ctx"></${tagName}>`,
        js:`class MyMessage${id} extends MyMessageComponent{
              constructor(){
                super();
                let vm = document.querySelector('${tagName}');
                setTimeout(()=>{
                  let params = ${JSON.stringify(config)};
                  console.log(params)
                  Object.keys(params).map(key=>{
                    vm._instance.ctx._.data[key] = params[key]
                  })
                });
              }
              set message(value){
                vm._instance.ctx._.data.message = value;
              }
              set type(value){
                vm._instance.ctx._.data.type = type;
              }
            }
            customElements.define('${tagName}',MyMessage${id});
            `
      }
    }
  }



</script>
