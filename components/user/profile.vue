<template>
  <div>
      <div class="cp-header cp-tb-padding cp-side-padding">
        <div @click="$store.commit('changeNavigation', 'currentCafe')" class="go-back cp-tb-padding">
          <!-- <b-icon
            size="is-medium"
            icon="chevron-left"
            type="is-light">
          </b-icon> -->
        </div>
      </div>
      <div class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white">
         <div class="info">
          <img :src="user.avatar" alt="">
          <h4 class="user-name cp-tb-padding cp-side-padding">{{user.full_name}}</h4>
          <p dir="ltr" class="table-number cp-tb-padding cp-side-padding">
             اعتبار: <span class="p-text wallet-amount">{{user.wallet_amount | currency}}</span><span class="toman">تومان</span></p>
        </div>
      </div>
      <div class="profile-navigation cp-side-padding">
        <ul>
          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/shopping-cart.png" alt="">
            لیست سفارشات
          </li>

          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/wallet.png" alt="">
            اعتبار
          </li>

          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/wallet.png" alt="">
            اطلاعات کاربری
          </li>

          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/wallet.png" alt="">
            پشتیبانی
          </li>

          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/wallet.png" alt="">
            مورد علاقه‌ها
          </li>
          <li class="cp-card has-background-white cp-side-padding cp-tb-padding">
            <img src="@/assets/img/shape/icons/wallet.png" alt="">
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
.profile-info-bar
  display: flex
  position: relative
  bottom: 54px
  // height: 60px
  .info
    flex: 1
    height: 75px
    img
      width: 75px
      height: 75px
      border-radius: 50px
    .user-name, .user-rate
      position: absolute
      display: inline-block
    .user-name
      font-size: 18px
      font-weight: 500!important
    .user-rate
      top: $margin * 3
    .wallet-amount
      font-size: 18px

    .go-back
      flex: 1
  .table-number
    position: absolute
    display: inline-block
    top: $margin * 3
    font-size: 16px
    direction: ltr

.profile-navigation
  position: relative 
  bottom: 2 * $margin
  ul
    li
      margin-bottom: $margin
      display: flex
      align-items: center
      font-size: 16px
      img
        margin-left: 10px
        width: 25px
        height: 25px
</style>