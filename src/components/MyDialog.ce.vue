<template>
    <el-dialog v-model="visible" :title="title">
        <slot></slot>
    </el-dialog>
</template>
<script>
import {transformValue} from '../common.ts';
 export default {
    data(){
      return {
        visible:false,
        title:'',
      }
    },
    methods:{
        open(){
            this.visible = true
        },
        close(){
            this.visible = false
        },
        changeVisible(){
            this.visible = !this.visible
        }
    },
    tagNamePrefix:'my-dialog',
    get configurable(){
      return {
        className:'MyDialog',
        html:{
            visible:{
                type: 'boolean',
                value: false,
            },
            title:{
                type: 'string',
                value: '',
            },
        },
        css: {
            style: {
            display: 'flex',
            'flex-direction': '',
            },
            border: {
            type: 'boolean',
            value: false,
            },
            width: {
            type: 'string',
            value: '100%',
            },
            height: {
            type: 'string',
            value: '',
            },
            'border-width': {
            type: 'number',
            value: 1,
            postfix: 'px',
            },
            'border-style': {
            type: 'array',
            options: [
                { label: 'none', value: 'none' },
                { label: 'solid', value: 'solid' },
                // { label: 'dotted', value: 'dotted' },
                { label: 'dashed', value: 'dashed' },
                // { label: 'double', value: 'double' },
                // { label: 'groove', value: 'groove' },
            ],
            value: 'solid',
            },
            'border-color': {
            type: 'string',
            value: '#b1a7a7d9',
            },
            'padding-top': {
            type: 'number',
            value: 10,
            postfix: 'px',
            },
            'padding-right': {
            type: 'number',
            value: 10,
            postfix: 'px',
            },
            'padding-bottom': {
            type: 'number',
            value: 10,
            postfix: 'px',
            },
            'padding-left': {
            type: 'number',
            value: 10,
            postfix: 'px',
            },
        },
        component: {
          event: [],
          methods: [
            { label: 'open', value: 'open' },
            { label: 'close', value: 'close' },
            { label: 'changeVisible', value: 'changeVisible' },
        ],
          data: [],
          params: [],
        },
      }
    },
    extends(option){
      const {html,css,className} = option;
          // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
          tagName = `${window['MyDialog'].tagNamePrefix}-${id}`;
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
        js:`class MyDialog${id} extends MyDialogComponent{
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
              open(){
                vm._instance.ctx._.data.visible = true;
              }
              close(){
                vm._instance.ctx._.data.visible = false;
              }
              changeVisible(){
                vm._instance.ctx._.data.visible = !vm._instance.ctx._.data.visible
              }
            }
            customElements.define('${tagName}',MyDialog${id});
            `
      }
    }
  }
</script>
<style>
@import 'element-plus/dist/index.css';

</style>