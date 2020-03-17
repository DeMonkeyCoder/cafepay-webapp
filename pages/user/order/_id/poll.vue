<template>
  <div dir="rtl">
      <div class="cp-header cp-tb-padding cp-side-padding">
        <div @click="(prevRoute == 'user-order-id-detail') ? $router.go(-2) : $router.go(-1)" class="go-back cp-tb-padding">
          <b-icon size="is-medium" icon="chevron-left" type="is-light">
          </b-icon>
        </div>
      </div>

      <div  class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white">
         <div class="info">
           <rate-icon :isSecondary="ActiveTab == 1" class="no-pic" />
          <h4 class="header cp-tb-padding cp-side-padding">امتیازدهی</h4>
          <p dir="rtl" class="detail cp-tb-padding cp-side-padding">
            به <span class="p-text" :class="{'is-secondary-text': ActiveTab == 1}">کافه هدایت</span></p>
        </div>
      </div>

      <div class="content-below-profile-bar poll-content cp-side-margin">

        <b-tabs :class="{'is-secondary-tab': ActiveTab == 1}" v-model="ActiveTab" class="" dir="ltr" type="is-toggle" expanded>
            <b-tab-item label="سفارشات" >
              <div class="orders cp-b-margin">
                <div class="single-order cp-b-margin cp-card has-background-white" 
                v-for="singleOrder in orders" :key="singleOrder.name">
                  <p>{{singleOrder.name}}</p>
                </div>
              </div>
            </b-tab-item>
            <b-tab-item class="secondary-tab" label="موارد کلی"> موراد کلی</b-tab-item>
        </b-tabs>

      </div>





      <div class="order-fix-button" :class="{'is-secondary-btn': ActiveTab == 1}">
        <b-button expanded type=""  class="go-to-poll-btn">ثبت نظر و امتیاز</b-button>
      </div>

 
  </div>
</template>

<script>
import rateIconSVG from '@/components/profile/rateHeaderIcon.vue'
  export default {
    components: {'rate-icon' :rateIconSVG},
    data() {
      return {
        prevRoute: null,
        ActiveTab: 0
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user 
      },
      orders(){
        let orders = []
        for (const person of this.$store.state.orderHistory.currentOrder.persons) {
          orders = orders.concat(person.orders)
        }
        return orders
      },
    },
    mounted(){
      this.$store.commit('orderHistory/get', this.$route.params.id)
    },

    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.prevRoute = from.name
      })
    },
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'

.order-fix-button
  background-color: $primary
  transition: 0.25s
  button
    border: none
    transition: 0.25s
    background-color: $primary
    color: white
    height: 100%
    span 
      font-size: 16px!important

.is-secondary-btn
  background-color: $secondary!important
  transition: 0.25s
  button
    transition: 0.25s
    background-color: $secondary!important

.is-secondary-text
  color: $secondary!important
  transition: 0.25s

.no-pic
  img
  width: 60px
  height: 60px
  position: relative
  top: 8px
  display: inline-block
  // opacity: 0
  // transition: opacity 0.25s

.active-header-img
  opacity: 1!important
  transition: opacity 0.25s

.fade-enter-active, .fade-leave-active 
  transition: opacity .25s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0

.detail
  span
    transition: 0.25s


</style>