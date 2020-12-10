<template>
  <div class="payment-result-container">

      <img src="@/assets/img/shape/payment-logo.png" alt="">
      <div class="cp-card cp-side-padding cp-tb-padding has-background-white shadow-xl">
        <div id="trigger"></div>
        <!-- <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 37 37" style="enable-background:new 0 0 37 37;" xml:space="preserve">
        <path class="circ path" style="fill:none;stroke:#20BC32;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;" d="
          M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
          />
        <polyline class="tick path" style="fill:none;stroke:#20BC32;stroke-width:2.5;stroke-linejoin:round;stroke-miterlimit:10;" points="
          11.6,20 15.9,24.2 26.4,13.8 "/>
        </svg> -->
        <p v-if="info.status != 200">{{info.description}}</p>
        <p class="font-18" v-if="info.status == 200">پرداخت با <span class="font-norm font-18 g-text">موفقیت</span> انجام شد</p>
        <p class="font-18" v-if="info.status != 200">پرداخت با <span class="font-norm font-18 s-text">خطا</span> روبه رو شد</p>
        <p v-if="info.status == 200" class="">مبلغ پرداخت شده: <span class="total-price">{{info.amount | currency}}<span class="toman">تومان</span></span></p>
        <p :dir="$dir()" v-if="info.status != 200">شماره تراکنش:‌</p>
        <p v-if="info.status != 200">{{info.uuid}}</p>
        <b-button expanded @click="backtoapp" class="back-to-app bcp-btn-large" type="is-info">بازگشت به اپلیکیشن</b-button>

    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import lottie from 'lottie-web';
import successfullPayment1 from '~/assets/img/27572-success-animation.json'
import errorAnimation from '~/assets/img/error.json'
  export default {
    data() {
      return {
        successfullPayment1,
        errorAnimation
      }
    },
    methods: {
      backtoapp() {
        this.$store.commit('table/clearWishToPay')
        // #preorder
        if (this.info.table_type == 2) {
          // unset isConnected flag manually because disconnect is async
          this.$store.commit('unsetIsConnectedFlag')
          // we dont want user to go back to table so we clear table
          Vue.prototype.$disconnect()
          this.$store.commit('table/clearData')
          this.$store.commit('cafe/bindProductCount', false)
          this.$router.push(`/user/liveorder/${this.info.table_uuid}`)
        }
        else {
          this.$store.commit('changeNavigation', 'cp-table')
          this.$router.push('/user/home')
        }

      },
    },
    computed: {
      payment() {
        return this.$store.state.table.payment
      },
      info(){
        return this.$route.query
      }
    },
    mounted(){
      setTimeout(() => {
    let animationData;
    if (this.info.status == 200) animationData = successfullPayment1
    else animationData = errorAnimation

    let successAnime = lottie.loadAnimation({
      container: document.getElementById('trigger'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData, // the path to the animation json
    });
    successAnime.play()
      }, 500);
      // $(".trigger").toggleClass("drawn")
    }
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'
#trigger
  width: 100%
.payment-result-container
  .back-to-app
    margin-top: $margin
  img
    width: 50%
    margin-bottom: $margin * 2
  height: 90vh
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  .cp-card
    width: 80%
    text-align: center
    border-radius: 10px
    .total-price
      font-size: 18px
      .toman
        font-size: 14px
        color: $grey
        position: relative
        right: 3px
  .circ
    opacity: 0
    stroke-dasharray: 130
    stroke-dashoffset: 130
    -webkit-transition: all 1s
    -moz-transition: all 1s
    -ms-transition: all 1s
    -o-transition: all 1s
    transition: all 1s
    
  .tick
    stroke-dasharray: 50
    stroke-dashoffset: 50
    -webkit-transition: stroke-dashoffset 1s 0.5s ease-out
    -moz-transition: stroke-dashoffset 1s 0.5s ease-out
    -ms-transition: stroke-dashoffset 1s 0.5s ease-out
    -o-transition: stroke-dashoffset 1s 0.5s ease-out
    transition: stroke-dashoffset 1s 0.5s ease-out
  
  .drawn + svg .path
    opacity: 1
    stroke-dashoffset: 0

  svg
    width: 70px
    
</style>