<template>
  <div :dir="$dir()">
      <div class="cp-header cp-tb-padding cp-side-padding">
        <div @click="$router.go(-1)" class="go-back cp-tb-padding">
          <b-icon size="is-medium" icon="chevron-left" type="is-light">
          </b-icon>
        </div>
      </div>

      <div  class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white">
         <div class="info">
          <img class="no-pic" src="@/assets/img/shape/icons/shopping-cart.png" alt="">
          <h4 class="header cp-tb-padding cp-side-padding">سفارشات من</h4>
          <p :dir="$dir()" class="detail cp-tb-padding cp-side-padding">
            <span class="p-text font-18">{{orders.length}}</span> سفارش موفق</p>
        </div>
      </div>

       <div class="content-below-profile-bar cp-side-margin">
        <div class="orders-history ">
          <div class="order-history has-background-white cp-card cp-side-padding cp-tb-padding" 
          v-for="oh in orders" :key="oh.id">
            <div class="oh-info">
              <img :src="oh.avatar" alt="">
              <div class="oh-content cp-side-padding">
                <p class="oh-header font-16 font-norm ">{{oh.cafeName}}</p>
                <p class="oh-detail font-14">
                  {{oh.date}} - {{oh.bill | currency}}<span class="toman font-12">تومان</span>
                </p>
              </div>
            </div>
            <div class="oh-actions">
              <nuxt-link id="go-to-order-detail" :to="localePath('/user/order/' + oh.id + '/detail')">جزییات</nuxt-link>
              <nuxt-link id="go-to-order-poll" :to="localePath('/user/order/' + oh.id + '/poll')">ثبت نظر و امتیاز</nuxt-link>
            </div>
          </div>
        </div>
      </div>

 
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      user() {
        return this.$store.state.user.user 
      },
      orders(){
        return this.$store.state.orderHistory.orders
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

.order-history
  margin-bottom: $margin
  display: flex
  flex-direction: column
  .oh-info
    display: flex
    img
      width: 50px
      width: 50px
      border-radius: 25px
  .oh-actions
    display: flex
    margin: 0.75rem -0.75rem -0.75rem -0.75rem
    a
      flex: 1
      text-align: center
      padding: 5px
    a#go-to-order-detail
      color: $black
      background-color: $lightGrey
      border-radius: 0 0 5px 0

    a#go-to-order-poll 
      color: white
      background-color: $primary
      border-radius: 0 0 0 5px

.detail
  // direction: rtl!important

</style>