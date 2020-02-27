<template>
  <div dir="rtl">
    <div class="cafe-header cp-header"></div>
    <cafe-navigator :cafeId="cafe.pk" class="cp-full-width" @changeTabTrigger="changeTab" />
    <!-- <keep-alive><component :cafeId="cafe.id" @changeView="changeViewTrigger" :is="dynamicComponent"></component></keep-alive> -->
    
  </div>
</template>

<script>

  import cafeNavigator from '~/components/cafe/cafeNavigator.vue'
  export default {
    components: {cafeNavigator},
    head(){

    },
    data() {
      return {
        dynamicComponent: 'cpMenu'
      }
    },
    methods: {
      changeTab(componentName) {
        this.dynamicComponent = componentName
      },
      changeViewTrigger(command){
        alert(command)
      },

    },
    computed: {
      cafe() {
        return this.$store.state.activeCafe 
      },
    },
    mounted(){
      var w = window.innerWidth;
      console.log('w',w)
      
    }
  }
</script>

<style scoped lang="sass">



</style>