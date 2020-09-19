<template>
  <div>
    <div class="cp-header cp-tb-padding cp-side-padding">
      <div @click="$store.commit('changeNavigation', 'currentCafe')" class="go-back cp-tb-padding">
        <!-- <b-icon size="is-medium" icon="chevron-left" type="is-light">
        </b-icon>-->
      </div>
    </div>

    <div
      class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white"
    >
      <div class="info">
        <img :src="user.avatar" :alt='user.first_name' />
        <h4 class="header cp-tb-padding cp-side-padding">{{user.full_name}}</h4>
        <p dir="ltr" class="detail cp-tb-padding cp-side-padding">
          موجودی:
          <span class="p-text font-18">{{user.balance | currency}}</span>
          <span class="toman">تومان</span>
        </p>
      </div>
    </div>

      <b-modal class="simple-action-modal" :active.sync="exitModalActive" has-modal-card >
        <div class="modal-card" style="width: auto">

          <section class="modal-dialog">
            <p>آیا میخواهید از حساب کاربری خود خارج شوید؟</p>
          </section>

          <section class="modal-caption"></section>

          <section class="modal-action">
            <button class="button ma-child is-light" type="button" @click="closeModal(false)">خیر</button>
            <b-button class="ma-child" type="is-danger" @click="closeModal(true)">خروج از حساب کاربری</b-button>
          </section>
          
        </div>
      </b-modal>

    <div class="profile-navigation cp-side-padding">
      <ul>

        <!-- <nuxt-link to="/user/profile/staffrequest">
          <li class="cp-card staff-request has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/shopping-cart.png" alt />
            درخواست‌ها
          <span class="notif-num has-background-danger">1</span>
          </li>
        </nuxt-link> -->

        <nuxt-link to="/user/profile/orderlist">
          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/shopping-cart.png" alt />
            لیست سفارشات
          </li>
        </nuxt-link>

        <nuxt-link to="/user/profile/wallet">
          <li class="cp-card navigation has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/wallet.png" alt />
            افزایش موجودی
          </li>
        </nuxt-link>

        <nuxt-link to="/user/profile/information">
          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/user-info-1.svg" alt />
            اطلاعات کاربری
          </li>
        </nuxt-link>

        <li class="cp-card has-background-white disable-profile-navigator cp-side-padding cp-tb-padding">
          <img src="@/assets/img/shape/icons/remote-assistance.svg" alt />
          پشتیبانی
        </li>

        <li class="cp-card has-background-white disable-profile-navigator cp-side-padding cp-tb-padding">
          <img src="@/assets/img/shape/icons/love.svg" alt />
          مورد علاقه‌ها
        </li>
        <li
          id="cafepay-li-profile"
          class="cp-card has-background-white disable-profile-navigator cp-side-padding cp-tb-padding"
        >
          <img src="@/assets/img/shape/logo-icon-1.png" alt />
          کافه پی
        </li>
        <li @click="exitModalActive = true" class="cp-card has-background-white cp-side-padding cp-tb-padding">
          <img src="@/assets/img/shape/icons/logout.svg" alt />
          خروج از حساب کاربری
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exitModalActive: false
    }
  },
  methods: {
    closeModal(changeCommand) {
      this.exitModalActive = false
      if (changeCommand) {
        setTimeout(() => {
          this.$store.commit('user/clear')
          this.$store.commit('clearToken')
        }, 500);
        this.$router.push('/')
      }
  
    },
  },
  computed: {
    user() {
      return this.$store.state.user.user
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'


.profile-navigation
  position: relative 
  bottom: 2 * $margin
  ul
    a 
      color: $black
    li
      margin-bottom: $margin
      display: flex
      align-items: center
      font-size: 16px
      img
        margin-left: 10px
        width: 25px
        height: 25px

    li#cafepay-li-profile
      padding-top: calc(0.75rem - 3px)!important
      padding-bottom: calc(0.75rem - 4px)!important
      img
        width: 24px
        height: auto!important

</style>