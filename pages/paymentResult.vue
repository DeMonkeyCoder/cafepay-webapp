<template>
  <div class="payment-result-container">

      <img src="@/assets/img/shape/payment-logo.png" alt="">
      <div class="cp-card cp-side-padding cp-tb-padding has-background-white short-shadow">
        <div id="trigger"></div>
        <svg version="1.1" id="tick" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 37 37" style="enable-background:new 0 0 37 37;" xml:space="preserve">
        <path class="circ path" style="fill:none;stroke:#20BC32;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;" d="
          M30.5,6.5L30.5,6.5c6.6,6.6,6.6,17.4,0,24l0,0c-6.6,6.6-17.4,6.6-24,0l0,0c-6.6-6.6-6.6-17.4,0-24l0,0C13.1-0.2,23.9-0.2,30.5,6.5z"
          />
        <polyline class="tick path" style="fill:none;stroke:#20BC32;stroke-width:2.5;stroke-linejoin:round;stroke-miterlimit:10;" points="
          11.6,20 15.9,24.2 26.4,13.8 "/>
        </svg>
        <p>پرداخت با <span class="font-norm g-text">موفقیت</span> انجام شد</p>
        <p class="">مبلغ پرداخت شده: <span class="total-price">{{payment | currency}}<span class="toman">تومان</span></span></p>
        <b-button expanded @click="backtoapp" class="back-to-app" type="is-info">بازگشت به اپلیکیشن</b-button>

    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      backtoapp() {
        this.$store.commit('changeNavigation', 'cp-table')
        this.$router.push('user/home')
        this.$store.commit('setPayment', 0)
      },
    },
    computed: {
      payment() {
        return this.$store.state.table.payment
      },
    },
    mounted(){
      setTimeout(() => {
        
        document.getElementById('trigger').classList.add('drawn')
      }, 500);
      // $(".trigger").toggleClass("drawn")
    }
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'
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