<template>
  <div class="navigation-container">

      
    <nuxt-link to="/user/feed" class="nav-tab home-icon center-align" :class="{'is-active': $route.name == 'user-feed'}">
      <img v-show="$route.name == 'user-feed'" src='@/assets/img/shape/icons/home-5.png' alt="">
      <img v-show="$route.name != 'user-feed'" src='@/assets/img/shape/icons/home.png' alt="">
    </nuxt-link>
   
    <div @click="triggerChangeTab((hasActiveTable) ? 'currentCafe' : 'scan')" class="nav-tab qr-scan center-align" 
    :class="{'is-active': currentMainPage == 'scan' || currentMainPage == 'currentCafe'}">

      <img v-show="$route.name != 'user-feed' && currentMainPage == 'scan' && !tableToken" src='@/assets/img/shape/icons/qr-code-color.png' alt="">
      <img v-show="($route.name == 'user-feed' && !hasActiveTable) || currentMainPage != 'scan' && !tableToken" src='@/assets/img/shape/icons/qr-code.png' alt="">

      <img v-show="$route.name != 'user-feed' && currentMainPage == 'currentCafe' && tableToken" src='@/assets/img/shape/icons/menu-color-5.png' alt="">
      <img  v-show="($route.name == 'user-feed' && hasActiveTable) || currentMainPage != 'currentCafe' && tableToken" src='@/assets/img/shape/icons/menu.png' alt="">
      <!-- <p v-show="$route.name != 'user-feed' && !tableToken">اسکن</p>
      <p v-show="$route.name != 'user-feed' && tableToken">منو</p> -->
    </div>

    <!-- <div @click="triggerChangeTab('search')" class="nav-tab center-align" :class="{'is-active': currentMainPage == 'search'}">
      <img src='@/assets/img/shape/icons/shop.png' alt="">
      <p>جست‌وجو</p>
    </div> -->

    <div @click="triggerChangeTab('cp-table')" class="nav-tab chair center-align" :class="{'is-active': currentMainPage == 'cp-table'}">
      <img v-show="$route.name != 'user-feed' && currentMainPage == 'cp-table'" src='@/assets/img/shape/icons/chair-color.png' alt="">
      <img v-show="$route.name == 'user-feed' || currentMainPage != 'cp-table'" src='@/assets/img/shape/icons/chair-1.png' alt="">
      <!-- <p>میز</p> -->
    </div>

    <div @click="triggerChangeTab('profile')" class="nav-tab profile center-align" :class="{'is-active': currentMainPage == 'profile'}">
      <img v-show="$route.name != 'user-feed' && currentMainPage == 'profile'" src='@/assets/img/shape/icons/user-color.svg' alt="">
      <img v-show="$route.name == 'user-feed' || currentMainPage != 'profile'" src='@/assets/img/shape/icons/user.png' alt="">
      <!-- <span class="notif-num has-background-danger">1</span> -->
      <!-- <p>پروفایل</p> -->
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
        if (this.$route.name == "user-feed") this.$router.push('/user/home')
        
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
  transition: 0.5s
  z-index: 105
  border-radius: 25px 25px 0 0
  position: fixed
  display: flex
  bottom: 0
  left: 0
  right: 0
  background-color: white
  height: 65px
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

  .home-icon
    img
      width: 34px!important
      height: 34px!important

  .qr-scan
    img
      width: 32px!important
      position: relative
      top: 1px
  .table-icon
    img
      width: 35px!important
      height: 35px!important

  .chair
    img 
      // width: 40px !important
      width: 48px!important
      height: 52px
      position: relative
      bottom: 8px
    p
      bottom: 19px!important

  .profile
    img
      // width: 28px!important
      position: relative
      top: 2px
    p
      bottom: 3px!important
</style>