<script>
import {transformValue} from '../common.ts';
const className = 'MyTreeComponent',
      tagNamePrefix = 'my-tree';
  export default {
    data(){
      return {
        defaultProps : {
          children: 'children',
          label: 'label',
        },
        showCheckbox:false,
        expandedKeys:['Level one 2','Level two 2-1','Level three 2-2-1'], //默认展开的节点
        checkedkeys:['Level three 2-2-1'], //默认选中的节点
        tree : [
          {
            label: 'Level one 1',
            id: 'Level one 1',
            children: [
              {
                label: 'Level two 1-1',
                id: 'Level two 1-1',
                children: [
                  {
                    label: 'Level three 1-1-1',
                    id: 'Level three 1-1-1',
                  },
                ],
              },
            ],
          },
          {
            label: 'Level one 2',
            id: 'Level one 2',
            children: [
              {
                label: 'Level two 2-1',
                id: 'Level two 2-1',
                children: [
                  {
                    label: 'Level three 2-1-1',
                    id: 'Level three 2-1-1',
                  },
                ],
              },
              {
                label: 'Level two 2-2',
                id: 'Level two 2-2',
                children: [
                  {
                    label: 'Level three 2-2-1',
                    id: 'Level three 2-2-1',
                  },
                ],
              },
            ],
          },
          {
            label: 'Level one 3',
            id: 'Level one 3',
            children: [
              {
                label: 'Level two 3-1',
                id: 'Level two 3-1',
                children: [
                  {
                    label: 'Level three 3-1-1',
                    id: 'Level three 3-1-1',
                  },
                ],
              },
              {
                label: 'Level two 3-2',
                id: 'Level two 3-2',
                children: [
                  {
                    label: 'Level three 3-2-1',
                    id: 'Level three 3-2-1',
                  },
                ],
              },
            ],
          },
        ]
      }
    },
    methods:{
      setLoading(){

      },
      handleNodeClick (data){
        console.log(data)
        this.$emit('someEvent')
      },
      handleCheckChange (data,checked,indeterminate){
        console.log(data, checked, indeterminate)
      }
    },
    tagNamePrefix:'my-tree',
    get configurable(){
      return {
        className:'MyTree',
        html:{
          showCheckbox:{
            type: 'boolean',
            value: false,
          },
          tree:{
            type:'json',
            value:'[{"label":"Level one 1","id":"Level one 1","children":[{"label":"Level two 1-1","id":"Level two 1-1","children":[{"label":"Level three 1-1-1","id":"Level three 1-1-1"}]}]},{"label":"Level one 2","id":"Level one 2","children":[{"label":"Level two 2-1","id":"Level two 2-1","children":[{"label":"Level three 2-1-1","id":"Level three 2-1-1"}]},{"label":"Level two 2-2","id":"Level two 2-2","children":[{"label":"Level three 2-2-1","id":"Level three 2-2-1"}]}]},{"label":"Level one 3","id":"Level one 3","children":[{"label":"Level two 3-1","id":"Level two 3-1","children":[{"label":"Level three 3-1-1","id":"Level three 3-1-1"}]},{"label":"Level two 3-2","id":"Level two 3-2","children":[{"label":"Level three 3-2-1","id":"Level three 3-2-1"}]}]}]'
          }
        },
        css: {
          classes: '',
          style: {},
        },
        component: {
          event: [{ label: 'click', value: 'click' }],
          methods: [
            { label: 'setTree', value: 'setTree' },
            { label: 'setLoading', value: 'setLoading' },
          ],
          data: ['tree'],
          params: [],
        },
      }
    },
    extends(option){
      const {html,css,className} = option;
          // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
          tagName = `${window['MyTree'].tagNamePrefix}-${id}`;
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
        js:`class MyTree${id} extends MyTreeComponent{
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
            }
            customElements.define('${tagName}',MyTree${id});
            `
      }
    }
  }
</script>
<template>
  <el-tree 
  style="width: 200px;height: 300px;"
  :show-checkbox="showCheckbox" 
  :data="tree" 
  :props="defaultProps"
  node-key="id"
  highlight-current
  :default-expanded-keys="expandedKeys"
  :default-checked-keys="checkedkeys"
   @node-click="handleNodeClick"  
   @check-change="handleCheckChange"/>
</template>
<style>
/* 打包成web component 后 样式无法穿透 自定义组件 */
@import 'element-plus/dist/index.css';



</style>