<template>
  <div class="navigation-container">
   
    <div @click="triggerChangeTab((hasActiveTable) ? 'currentCafe' : 'scan')" class="nav-tab center-align" 
    :class="{'is-active': currentMainPage == 'scan' || currentMainPage == 'currentCafe'}">
      <img v-if="currentMainPage == 'scan' || currentMainPage == 'currentCafe'" src='@/assets/img/shape/icons/qr-code-color.png' alt="">
      <img v-else src='@/assets/img/shape/icons/qr-code.png' alt="">
      <p>اسکن</p>
    </div>

    <!-- <div @click="triggerChangeTab('search')" class="nav-tab center-align" :class="{'is-active': currentMainPage == 'search'}">
      <img src='@/assets/img/shape/icons/shop.png' alt="">
      <p>جست‌وجو</p>
    </div> -->

    <div @click="triggerChangeTab('cp-table')" class="nav-tab chair center-align" :class="{'is-active': currentMainPage == 'cp-table'}">
      <img v-if="currentMainPage == 'cp-table'" src='@/assets/img/shape/icons/chair-color.png' alt="">
      <img v-else src='@/assets/img/shape/icons/chair.png' alt="">
      <p>میز</p>
    </div>

    <div @click="triggerChangeTab('profile')" class="nav-tab profile center-align" :class="{'is-active': currentMainPage == 'profile'}">
      <img v-if="currentMainPage == 'profile'" src='@/assets/img/shape/icons/user-color.svg' alt="">
      <img v-else src='@/assets/img/shape/icons/user.png' alt="">
      <!-- <span class="notif-num has-background-danger">1</span> -->
      <p>پروفایل</p>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      triggerChangeTab(componentName) {
        this.tabName = componentName
        this.$store.commit('changeNavigation', componentName)
        
        // this.$emit('changeTab',componentName)
      },
    },
    computed: {
      currentMainPage() {
        return this.$store.state.currentMainPage
      }
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
  z-index: 105
  // border-radius: 1rem 1rem 0 0
  border-radius: 25px 25px 0 0
  position: fixed
  display: flex
  bottom: 0
  left: 0
  right: 0
  background-color: white
  height: 75px
  box-shadow: 0px 0px 3px rgba(0,0 ,0 ,0.05)

  .nav-tab.profile
    position: relative
    .notif-num
      width: 23px
      height: 23px
      position: absolute
      left: calc(50% - 30px)
      top: calc(50% - 15px)

  .nav-tab
    padding-top: 15px
    flex: 1
    p
      font-size: 11px
      color: $darkGrey
      position: relative
      bottom: 5px
    img
      width: 31px

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