<template>
  <div>
      <div class="cp-header cp-tb-padding cp-side-padding">
        <div @click="$store.commit('changeNavigation', 'currentCafe')" class="go-back cp-tb-padding">
          <!-- <b-icon size="is-medium" icon="chevron-left" type="is-light">
          </b-icon> -->
        </div>
      </div>

      <div class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white">
         <div class="info">
          <img :src="user.avatar" alt="">
          <h4 class="header cp-tb-padding cp-side-padding">{{user.full_name}}</h4>
          <p dir="ltr" class="detail cp-tb-padding cp-side-padding">
             موجودی: <span class="p-text font-18">{{user.wallet_amount | currency}}</span><span class="toman">تومان</span></p>
        </div>
      </div>

      <div class="profile-navigation cp-side-padding">
        <ul>
          <nuxt-link to="/user/profile/orderlist"><li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/shopping-cart.png" alt="">
            لیست سفارشات
          </li></nuxt-link>

          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/wallet.png" alt="">
            افزایش موجودی
          </li>

          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/user-info-1.svg" alt="">
            اطلاعات کاربری
          </li>

          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/remote-assistance.svg" alt="">
            پشتیبانی
          </li>

          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/love.svg" alt="">
            مورد علاقه‌ها
          </li>
          <li id="cafepay-li-profile" class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img  src="@/assets/img/shape/logo-icon-1.png" alt="">
            کافه پی
          </li>

        </ul>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        xyz: 1
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user 
      },
    },
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