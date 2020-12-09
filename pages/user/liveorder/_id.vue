<template>
  <div class="live-preorder">
    <header class="live-preorder__header">
      <nuxt-link :to="localePath('/user/home')"><div class="live-preorder__header__btn">
        <b-button
          class="float-btn shadow-lg"
          type="is-dark"
          inverted
          icon-right="home"
        />
      </div>
      </nuxt-link>
      <div class="live-preorder__header__info normal-radius">
        <p class="font-norm normal-radius" dir="rtl">
          سفارش فعلی: <span class="p-text font-16 font-bold">{{table.cafe.name}}</span>
        </p>
      </div>
    </header>
    <section
      class="live-preorder__content"
      :class="{
        'live-preorder__content--status-0': table.status == 'waiting',
        'live-preorder__content--status-1': table.status == 'preparing',
        'live-preorder__content--status-2': table.status == 'ready',
        'live-preorder__content--status-3': table.status == 'rejected',
      }"
    >
      <!-- سفارش ثبت شده، در انتظار تایید -->
      <div class="live-preorder__content__status status">
        <div id="animation-order-status"></div>
        <p>{{ statusText }}</p>
      </div>
      <!-- در حال آماده سازی -->
      <!-- سفارش شما حاضر -->
      <!-- سفارش تایید نشد، تماس با پشتیبانی -->
      <div
        class="live-preorder__content__orders fix-animation-gap cp-card has-background-white"
      >
      <ul v-for="(person, i) in table.persons" :key="i" dir="rtl" class="cp-padding">
        <li class="live-preorder__content_orders__order" v-for="(order, j) in person.orders" :key="j">
          <p class="font-norm font-16">{{order.name}}</p>
          <p>{{order.count}} عدد | {{order.payment_info.total_amount | currency}}<span class="toman">تومان</span></p>
        </li>
        <li class="live-preorder__content__orders__totalAmount">
          <p class="font-18 font-bold">مجموع: {{table.payment.total_amount | currency}}<span class="toman">تومان</span></p>
        </li>
      </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import foodReady from '~/assets/img/food-ready.json'
import preparingFood from '~/assets/img/animations/preparing-food.json'
import declined from '~/assets/img/animations/sad-empty-box.json'
import waiting from '~/assets/img/animations/timer-1.json'

import lottie from 'lottie-web'
export default {
  data() {
    return {
      foodReady,
      preparingFood,
      declined,
      waiting,
      statusText: '',
    }
  },
  computed: {
     table() {
      return this.$store.state.table
    },
  },
  watch: {
    table: {
      deep: true,
      immediate: false,
      handler(val, oldValue) {
        let animationData = null
        document.getElementById('animation-order-status').innerHTML = ''
        console.log('table generated in liveorder', val);
        switch (val.status) {
          case 'waiting':
            animationData = waiting
            this.statusText = 'در انتظار تایید توسط پذیرنده'
            break
          case 'preparing':
            animationData = this.preparingFood
            this.statusText = 'در حال آماده‌سازی سفارش شما'
            break
          case 'ready':
            this.statusText = '!سفارش شما آماده است'
            animationData = this.foodReady
            break
          case 'rejected':
            animationData = this.declined
            this.statusText = 'سفارش شما توسط پذیرنده رد شد'
            break

          default:
            break
        }
        if (animationData) {
          
          setTimeout(() => {
            let preloader = lottie.loadAnimation({
              container: document.getElementById('animation-order-status'), // the dom element that will contain the animation
              renderer: 'svg',
              loop: true,
              autoplay: true,
              animationData, // the path to the animation json
            })
            preloader.play()
          }, 200)
        }
      }
    },
  },
  beforeMount() {
     this.$store.commit('cafe/setType', 'pre-order')
     this.$store.commit('table/setToken', {token: this.$route.params.id, number: 'پیش سفارش'})
      if (!this.$store.state.socket.isConnected)Vue.prototype.$connect()

  },
  mounted() {
 
  },
}
</script>

<style scoped>
</style>