<template>
  <el-date-picker
      v-model="date"
      type="datetimerange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      @change="changeTime"
      style="width: -webkit-fill-available;"
    />
</template>
<script>
import {transformValue} from '../common.ts';
  export default {
    data(){
      return {
        date:null,
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
      changeTime (data){
        const [start,end] = data;
        this.$emit('change')
      },

    },
    tagNamePrefix:'my-date',
    get configurable(){
      return {
        className:'MyDatePicker',
        html:[
          {
            name:'基础配置',
            config:{
              date:{
                type: 'string',
                value: '',
              },
            }
          }
        ],
        component: {
          event: [{ label: 'change', value: 'change' }],
          methods: [],
          data: ['time'],
        },
      }
    },
    extends(option){
      const {html,className} = option;
          // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
          tagName = `${window['MyDatePicker'].tagNamePrefix}-${id}`;
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
        js:`class MyDatePicker${id} extends MyDatePickerComponent{
              constructor(){
                super();
              }
              get option(){
                return ${JSON.stringify(config)};
              }
              get time(){
                return this._instance.ctx._.data.date
              }
              set time(value){
                this._instance.ctx._.data.date = value
              }
            }
            customElements.define('${tagName}',MyDatePicker${id});
            `
      }
    }
  }
</script>

<style>
/* 打包成web component 后 样式无法穿透 自定义组件 */
@import 'element-plus/dist/index.css';
</style>