
<script>
import MyTree from './components/MyTree.ce.vue'
import MyDatePicker from './components/MyDatePicker.ce.vue';
// import MyDialog from './components/MyDialog.ce.vue';
import MyMessage from './components/MyMessage.ce.vue';
import MyTabs from './components/MyTab.ce.vue';

export default{
  data(){
    return {
      count:1
    }
  },
  components:{
    'my-tree':MyTree,'my-data-picker':MyDatePicker,'my-message':MyMessage,'my-tabs':MyTabs
  }
}
</script>

<template>
    <h1>App.vue</h1>
    <!-- <my-tree></my-tree>
    <my-data-picker></my-data-picker>
    <my-message></my-message>
    <my-tabs></my-tabs> -->

  
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
