<script>
import {transformValue} from '../common.ts';
  export default {
    data(){
      return {
        date:null,
        get time(){
        return {
          start:(this.date || [])[0],
          end:(this.date || [])[1]
        }
        }
      }
    },
    methods:{
      changeTime (data){
        const [start,end] = data;
        console.log(start,end)
        this.$emit('changeTime')
      },

    },
    tagNamePrefix:'my-date',
    get configurable(){
      return {
        className:'MyDatePicker',
        html:{
          date:{
            type: 'string',
            value: '',
          },
        },
        css: {
          classes: '',
          style: {},
        },
        component: {
          event: [{ label: 'change', value: 'change' }],
          methods: [
          ],
          data: ['time'],
          params: [],
        },
      }
    },
    extends(option){
      const {html,css,className} = option;
          // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
          tagName = `${window['MyDatePicker'].tagNamePrefix}-${id}`;
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
        js:`class MyDatePicker${id} extends MyDatePickerComponent{
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
              get date(){
                let vm = document.querySelector('${tagName}');
                return {
                  start:(vm._instance.ctx._.data.date || [])[0],
                  end:(vm._instance.ctx._.data.date || [])[1]
                }
              }
            }
            customElements.define('${tagName}',MyDatePicker${id});
            `
      }
    }
  }
</script>
<template>
  <el-date-picker
      v-model="date"
      type="datetimerange"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      @change="changeTime"
    />
</template>
<style>
/* 打包成web component 后 样式无法穿透 自定义组件 */
@import 'element-plus/dist/index.css';



</style>