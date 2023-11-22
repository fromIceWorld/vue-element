<template>
  <el-tree 
  :show-checkbox="showCheckbox" 
  :data="tree" 
  :props="defaultProps"
  node-key="id"
  highlight-current
  :default-expanded-keys="expandedKeys"
  :default-checked-keys="checkedkeys"
   @node-click="handleNodeClick"  
   @check-change="handleCheckChange"
   style="height: -webkit-fill-available;"
   />
</template>
<script>
import {transformValue} from '../common.ts';
  export default {
    data(){
      return {
        that:null,
        defaultProps : {
          children: 'children',
          label: 'label',
        },
        level:0,
        id:null,
        showCheckbox:false,
        expandedKeys:['Level one 2','Level two 2-1','Level three 2-2-1'], //默认展开的节点
        checkedkeys:['Level three 2-2-1'], //默认选中的节点
        tree : [
          {
            label: 'Level one 1',
            id: 'Level one 1',
            level:'tab0',
            children: [
              {
                label: 'Level two 1-1',
                id: 'Level two 1-1',
                level:'tab1',
                children: [
                  {
                    label: 'Level three 1-1-1',
                    id: 'Level three 1-1-1',
                    level:'tab2',
                  },
                ],
              },
            ],
          },
          {
            label: 'Level one 2',
            id: 'Level one 2',
            level:'tab0',
            children: [
              {
                label: 'Level two 2-1',
                id: 'Level two 2-1',
                level:'tab1',
                children: [
                  {
                    label: 'Level three 2-1-1',
                    id: 'Level three 2-1-1',                    level:'tab2',

                  },
                ],
              },
              {
                label: 'Level two 2-2',
                id: 'Level two 2-2',
                level:'tab1',
                children: [
                  {
                    label: 'Level three 2-2-1',
                    id: 'Level three 2-2-1',                    level:'tab2',

                  },
                ],
              },
            ],
          },
          {
            label: 'Level one 3',
            id: 'Level one 3',
            level:'tab0',
            children: [
              {
                label: 'Level two 3-1',
                id: 'Level two 3-1',
                level:'tab1',
                children: [
                  {
                    label: 'Level three 3-1-1',
                    id: 'Level three 3-1-1',                    level:'tab2',

                  },
                ],
              },
              {
                label: 'Level two 3-2',
                id: 'Level two 3-2',
                level:'tab1',
                children: [
                  {
                    label: 'Level three 3-2-1',
                    id: 'Level three 3-2-1',
                    level:'tab2',
                  },
                ],
              },
            ],
          },
        ],
        get levelParams(){
          return {level:this.level}
          },
        get idParams(){
            return {id:this.id}
          }
      }
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
        Object.keys(option || {}).forEach(key=>{
          this[key] = option[key]
        })
      },
      setLoading(){

      },
      handleNodeClick (data){
        const {level,id} = data;
        this.level = level;
        this.id = id;
        this.$emit('click')
      },
      handleCheckChange (data,checked,indeterminate){
        console.log(data, checked, indeterminate)
      }
    },
    tagNamePrefix:'my-tree',
    get configurable(){
      return {
        className:'MyTree',
        html:[{
          name:'基础配置',
          config:{
          showCheckbox:{
            type: 'boolean',
            value: false,
          },
          tree:{
            type:'json',
            value:'[{"label":"Level one 1","id":"Level one 1","level":"tab0","children":[{"label":"Level two 1-1","id":"Level two 1-1","level":"tab1","children":[{"label":"Level three 1-1-1","id":"Level three 1-1-1","level":"tab2"}]}]},{"label":"Level one 2","id":"Level one 2","level":"tab0","children":[{"label":"Level two 2-1","id":"Level two 2-1","level":"tab1","children":[{"label":"Level three 2-1-1","id":"Level three 2-1-1","level":"tab2"}]},{"label":"Level two 2-2","id":"Level two 2-2","level":"tab1","children":[{"label":"Level three 2-2-1","id":"Level three 2-2-1","level":"tab2"}]}]},{"label":"Level one 3","id":"Level one 3","level":"tab0","children":[{"label":"Level two 3-1","id":"Level two 3-1","level":"tab1","children":[{"label":"Level three 3-1-1","id":"Level three 3-1-1","level":"tab2"}]},{"label":"Level two 3-2","id":"Level two 3-2","level":"tab1","children":[{"label":"Level three 3-2-1","id":"Level three 3-2-1","level":"tab2"}]}]}]' 
          },
      }
        }],
        component: {
          event: [{ label: 'click', value: 'click' }],
          methods: [
            { label: 'setTree', value: 'setTree' },
            { label: 'setLoading', value: 'setLoading' },
          ],
          data: ['tree','level','id','levelParams','idParams'],
          params: [],
        },
    }},
    extends(option){
      const {html,className} = option;
          // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
    const id = String(Math.random()).substring(2),
          tagName = `${window['MyTree'].tagNamePrefix}-${id}`;
      let config = {};
      Object.keys(html[0].config)
        .map((key) => {
          config[key] = transformValue(html[0].config[key])
        })
        .join('\n');
      return {
        tagName:`${tagName}`,
        // vue 前缀
        html:`<${tagName} _data="_instance.ctx._.data" _methods="_instance.ctx"></${tagName}>`,
        js:`class MyTree${id} extends MyTreeComponent{
              constructor(){
                super();
              }
              get option(){
                return ${JSON.stringify(config)};
              }
            }
            customElements.define('${tagName}',MyTree${id});
            `
      }
    }
  }
</script>

<style>
/* 打包成web component 后 样式无法穿透 自定义组件 */
@import 'element-plus/dist/index.css';



</style>