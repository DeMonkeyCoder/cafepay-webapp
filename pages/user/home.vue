<template>
  <div dir="rtl">
    <keep-alive><component @changeView="changeViewTrigger" :is="dynamicComponent"></component></keep-alive>
    <navigation @changeTab="changeTab" />
  </div>
</template>

<script>
  import navigation from '~/components/user/navigation.vue'
  import scan from '~/components/user/scan.vue'
  import cpTable from '~/components/user/table.vue'
  import search from '~/components/user/search.vue'
  import currentCafe from '~/components/cafe/currentCafe.vue'
  export default {
    components: {navigation, scan, cpTable, search, currentCafe},
    head(){
    },
    data() {
      return {
        dynamicComponent: (this.activeCafeFlag) ? 'currentCafe' :'scan'
      }
    },
    methods: {
      changeTab(componentName) {
        this.dynamicComponent = componentName
      },
      changeViewTrigger(command){
         this.dynamicComponent = 'currentCafe'
      }
    },
    mounted(){
      var w = window.innerWidth;
      console.log('w',w);
      
    }
  }
</script>

<style scoped lang="sass">

</style>