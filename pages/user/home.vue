<template>
  <div dir="rtl">
    <component :is="dynamicComponent"></component>
    <navigation @changeTab="changeTab" />
  </div>
</template>

<script>
  import navigation from '~/components/user/navigation.vue'
  import scan from '~/components/user/scan.vue'
  import cpTable from '~/components/user/table.vue'
  import search from '~/components/user/search.vue'
  export default {
    components: {navigation, scan, cpTable, search},
    head(){
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    data() {
      return {
        dynamicComponent: 'scan'
      }
    },
    methods: {
      changeTab(componentName) {
        this.dynamicComponent = componentName
      },
    },
    mounted(){
      var w = window.innerWidth;
      console.log('w',w);
      
    }
  }
</script>

<style scoped lang="sass">

</style>