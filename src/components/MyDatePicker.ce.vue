<template>
  <el-date-picker
      v-model="date"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      @change="changeTime"
      style="width: -webkit-fill-available;"
      class="data-picker"
      :popper-class="theme"
      :class="theme"
      :format="format"
      :value-format="format"
      :type="type"
    />
</template>
<script>
import {transformValue} from '../common.ts';
  export default {
    data(){
      return {
        type:"daterange",
        format:'YYYY-MM-DD',
        date:null,
        theme:"dark-night-blue" 
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
                type: 'json',
                value: '["2024","2024"]',
              },
              theme:{
                type: 'select',
                options:[
                  {label:'默认',value:''},
                  {label:'暗夜蓝',value:'dark-night-blue'},
                ],
                value:''
              },
              type:{
                type: 'select',
                options:[
                  {label:'日期选择',value:''},
                  {label:'daterange',value:'daterange'},
                  {label:'datetimerange',value:'datetimerange'},
                  {label:'monthrange',value:'monthrange'},
                ],
                value:'daterange'
              },
              format:{
                type: 'extend-select',
                options:[
                  {label:'YYYY-MM',value:'YYYY-MM'},
                  {label:'YYYY/MM/DD',value:'YYYY/MM/DD'},
                  {label:'YYYY-MM-DD',value:'YYYY-MM-DD'},
                  {label:'YYYY-MM-DD HH:mm:ss',value:'YYYY-MM-DD HH:mm:ss'},
                ],
                value:'YYYY/MM/DD'
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
.dark-night-blue{
  width: -webkit-fill-available;
    border: 1px solid #2477d6;
    opacity: .8;
    border-radius: 4px;
    box-shadow: none !important;
    color: #9bc6ff;
    background-image: linear-gradient(0deg, #095bb8 1%, rgb(7 7 8 / 44%) 100%), linear-gradient(#021c3f, #021c3f);
}
.dark-night-blue .el-input__icon{
    color: #1290e8;
    font-size: 16px;
   }
.dark-night-blue .el-range-separator{
    color: #9bc6ff;
   }
.dark-night-blue .el-range-input{
    color: #9bc6ff;
   }
   .dark-night-blue.el-range-editor {
    border: 2px solid #2f77d4;
   }
</style>