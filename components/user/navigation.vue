<template>
  <div class="navigation-container">

      <b-modal class="simple-action-modal" :active.sync="confirmOrdersModal" has-modal-card >
        <div class="modal-card" style="width: auto">

          <section class="modal-dialog">
            <p v-html="$t('menu_page.change_order_warning')"></p>
          </section>

          <section class="modal-caption"></section>

          <section class="modal-action">
            <button class="button ma-child is-light" type="button" @click="clearOrderChanges">{{ $t('menu_page.change_reject') }}</button>
            <b-button :loading="globalLoading" class="ma-child" type="is-warning" @click="submitOrders">{{ $t('menu_page.change_approve') }}</b-button>
          </section>
          
        </div>
      </b-modal>

      
    <!-- <nuxt-link to="/user/feed" class="nav-tab home-icon center-align" :class="{'is-active': routeName == 'user-feed'}">
      <img v-show="routeName == 'user-feed'" src='@/assets/img/shape/icons/icon8/home-due.png' alt="">
      <img v-show="routeName != 'user-feed'" src='@/assets/img/shape/icons/icon8/home.png' alt="">
    </nuxt-link> -->
   
    <div @click="checkUnsubmitedOrder((hasActiveTable) ? 'currentCafe' : 'scan')" class="nav-tab qr-scan center-align" 
    :class="{'is-active': currentMainPage == 'scan' || currentMainPage == 'currentCafe'}">

      <img v-show="routeName != 'user-feed' && currentMainPage == 'scan' && !activeMenu" 
      src='@/assets/img/shape/icons/icon8/qr-code-due.png' alt="">

      <img v-show="(routeName == 'user-feed' && !hasActiveTable) || currentMainPage != 'scan' && !activeMenu" 
      src='@/assets/img/shape/icons/icon8/qr-code.png' alt="">
      <img v-show="routeName != 'user-feed' && currentMainPage == 'currentCafe' &&  activeMenu" src='@/assets/img/shape/icons/icon8/menu-due.png' alt="">
      <img  v-show="(routeName == 'user-feed' && hasActiveTable) || currentMainPage != 'currentCafe' && activeMenu" 
      src='@/assets/img/shape/icons/icon8/menu.png' alt="">
      <!-- <p v-show="routeName != 'user-feed' && !tableToken">اسکن</p>
      <p v-show="routeName != 'user-feed' && tableToken">منو</p> -->
    </div>

    <!-- <div @click="checkUnsubmitedOrder('search')" class="nav-tab center-align" :class="{'is-active': currentMainPage == 'search'}">
      <img src='@/assets/img/shape/icons/icon8/shop.png' alt="">
      <p>جست‌وجو</p>
    </div> -->

    <div @click="checkUnsubmitedOrder('cp-table')" class="nav-tab chair center-align" :class="{'is-active': currentMainPage == 'cp-table'}">
      <img v-show="routeName != 'user-feed' && currentMainPage == 'cp-table'" src='@/assets/img/shape/icons/icon8/table-due.png' alt="">
      <img v-show="routeName == 'user-feed' || currentMainPage != 'cp-table'" src='@/assets/img/shape/icons/icon8/table.png' alt="">
      <span v-if="user.table_uuid" class="has-background-danger notif-num"></span>
      <!-- <p>میز</p> -->
    </div>

    <div @click="checkUnsubmitedOrder('profile')" class="nav-tab profile center-align" :class="{'is-active': currentMainPage == 'profile'}">
      <img v-show="routeName != 'user-feed' && currentMainPage == 'profile'" src='@/assets/img/shape/icons/icon8/user-due.png' alt="">
      <img v-show="routeName == 'user-feed' || currentMainPage != 'profile'" src='@/assets/img/shape/icons/icon8/user.png' alt="">
      <!-- <span class="notif-num has-background-danger">1</span> -->
      <!-- <p>پروفایل</p> -->
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        confirmOrdersModal: false,
        tempComponentName: null
      }
    },
    methods: {
      submitOrders(){
        this.$nuxt.$emit('triggerSubmitOrders')
      },
      clearOrderChanges(){
        // to find user orders on menu

        let user = this.table.persons.find(p => p.id == this.user.id)
        this.$store.commit('cafe/clearPCA')
        this.$store.commit('cafe/bindProductCount', user)
        this.confirmOrdersModal = false
        this.triggerChangeTab(this.tempComponentName)
      },
      checkUnsubmitedOrder(componentName){
      if (this.productChangeArray.length > 0) {
            this.tempComponentName = componentName
            this.confirmOrdersModal = true
        }
        else {
          this.triggerChangeTab(componentName)
        }
      },
      triggerChangeTab(componentName) {
  
        this.tabName = componentName
        this.$store.commit('changeNavigation', componentName)
        if (this.routeName == "user-feed") this.$router.push('/user/home')
        
        // this.$emit('changeTab',componentName)
      },
    },
    computed: {
      currentMainPage() {
        return this.$store.state.currentMainPage
      },
      routeName(){
        return this.$route.name.split('__')[0]
      },
      activeMenu(){
        return this.$store.state.cafe.active
      },
      productChangeArray() {
      return this.$store.state.cafe.productChangeArray
    },
    },
    created(){
      this.$nuxt.$on('closeNavigationModal', () => this.confirmOrdersModal = false)
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

  .nav-tab
    position: relative
    .notif-num
        animation-name: blink
        animation-duration: 2s
        animation-timing-function: ease
        animation-iteration-count: infinite
        width: 18px
        height: 18px
        position: absolute
        left: calc(50% + 5px)
        top: calc(50% - 18px)

  .nav-tab
    padding-top: 15px
    flex: 1
    p
      font-size: 11px
      color: $darkGrey
      position: relative
      bottom: 5px
    img
      width: 35px

  .is-active
    // p
    //   font-weight: 500!important
    //   color: $primary

  // .home-icon
  //   img
  //     width: 34px!important
  //     height: 34px!important

  // .qr-scan
  //   img
  //     width: 32px!important
  //     position: relative
  //     top: 1px
  // .table-icon
  //   img
  //     width: 35px!important
  //     height: 35px!important

  // .chair
  //   img 
  //     // width: 40px !important
  //     width: 48px!important
  //     height: 52px
  //     position: relative
  //     bottom: 8px
  //   p
  //     bottom: 19px!important

  // .profile
  //   img
  //     // width: 28px!important
  //     position: relative
  //     top: 2px
  //   p
  //     bottom: 3px!important
</style>