<template>
  <div class="navigation-container">
   

    <div @click="triggerChangeTab('profile')" class="nav-tab profile center-align" :class="{'is-active': tabName == 'profile'}">
      <img src='@/assets/img/shape/icons/user.png' alt="">
      <p>پروفایل</p>
    </div>

    <div @click="triggerChangeTab('cp-table')" class="nav-tab chair center-align" :class="{'is-active': tabName == 'cp-table'}">
      <img class="" src='@/assets/img/shape/icons/chair.png' alt="">
      <p>میز سفارش</p>
    </div>

    <div @click="triggerChangeTab('search')" class="nav-tab center-align" :class="{'is-active': tabName == 'search'}">
      <img src='@/assets/img/shape/icons/shop.png' alt="">
      <p>جست‌وجو</p>
    </div>

    <div @click="triggerChangeTab('scan')" class="nav-tab center-align" :class="{'is-active': tabName == 'scan'}">
      <img :style="{'op'}" src='@/assets/img/shape/icons/qr-code-color.png' alt="">
      <img v-else src='@/assets/img/shape/icons/qr-code.png' alt="">
      <p>اسکن</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sdas: 'value',
        tabName: 'scan'
      }
    },
    methods: {
      triggerChangeTab(componentName) {
        this.tabName = componentName
        this.$emit('changeTab',componentName)
      },
    },
    mounted(){
      // document.querySelectorAll('.nav-tab').addEventListener('click', this.triggerChangeTab())
    }
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

.show-icon
  opacity: 1!important

.navigation-container
  position: fixed
  display: flex
  bottom: 0
  left: 0
  right: 0
  background-color: white
  height: 60px
  box-shadow: 0px -1px 2px rgba(0,0 ,0 ,0.15)

  .nav-tab
    padding-top: 5px
    flex: 1
    p
      font-size: 11px
      color: $darkGrey
      position: relative
      bottom: 5px
    img
      width: 31px
      opacity: 0.0

  .is-active
    p
      font-weight: 500!important
      color: $primary

  .chair
    img
      width: 45px!important
      position: relative
      bottom: 6px
    p
      bottom: 19px!important

  .profile
    img
      width: 28px!important
      position: relative
      top: 2px
    p
      bottom: 3px!important
</style>