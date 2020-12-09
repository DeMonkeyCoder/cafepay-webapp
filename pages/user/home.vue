<template>
  <div :dir="$dir()">
    <keep-alive>
      <component v-if="currentMainPage != 'scan'" class="" @changeView="changeViewTrigger" :is="currentMainPage"></component>
    </keep-alive>
    <navigation />
    <component v-if="currentMainPage == 'scan'" class="" @changeView="changeViewTrigger" :is="currentMainPage"></component>
  </div>
</template>

<script>
  import navigation from '~/components/user/navigation.vue'
  import scan from '~/components/user/scan.vue'
  import cpTable from '~/components/user/table.vue'
  import profile from '~/components/user/profile.vue'
  import search from '~/components/user/search.vue'
  import currentCafe from '~/components/cafe/currentCafe.vue'
  export default {
    components: {navigation, scan, cpTable, search, currentCafe, profile},
    head(){
    },
    data() {
      return {
        dynamicComponent: (this.hasActiveTable) ? 'currentCafe' :'scan'
      }
    },
    methods: {
      changeTab(componentName) {
        this.dynamicComponent = componentName
      },
      changeViewTrigger(command){
         this.dynamicComponent = command
      }
    },
    computed: {
      currentMainPage() {
        return this.$store.state.currentMainPage
      },
    },
 
    mounted(){
      var w = window.innerWidth;
      
    }
  }
</script>

<style scoped lang="sass">


</style>