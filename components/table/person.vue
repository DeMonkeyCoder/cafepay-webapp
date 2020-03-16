<template>
  <div class="table-person">
    <div class="person-title has-background-white cp-tb-margin">
      <img :src="person.avatar" :alt="person.name">
      <p class="cp-side-padding cp-tb-padding">سفارشات <span class="font-norm p-text">{{title}}</span></p>
    </div>
    <div class="person-orders cp-side-padding cp-side-margin cp-tb-padding-half  has-background-white cp-card"
    :class="{'long-shadow': shadow}"
     v-for="(order, index) in person.orders" :key="order.name">

      <div class="person-title-and-selection">
        <div class="person-order-title font-norm">{{order.name}}</div>
        <div class="person-order-selection"></div>
      </div>

      <div class="person-total-order-info">
        <span>مجموع:‌ {{order.count}} عدد | {{order.count * order.price | currency}}<span class="toman">تومان</span></span> 
        
      </div>

      <div class="person-payment">
        <span>پرداخت شده:‌ <span class="g-text">{{order.paid | currency}}<span class="toman">تومان</span></span></span>
        <span>پرداخت شما:‌ <span class="p-text">{{order.you_paid | currency}}<span class="toman">تومان</span></span></span>
      </div>

      <div v-if="order.paid != order.count * order.price && history == false" :value="order.wish_to_pay" class="wish-to-pay">
        <span>{{order.wish_to_pay | currency}}</span><span class="toman">تومان</span> 
        <span id="wish-to-pay-text">از این محصول را میخواهید پرداخت کنید</span>
      </div>

      <div class="person-slider">
        <b-slider v-if="order.paid != order.count * order.price && history == false" :value="order.wish_to_pay" @change="changeWishToPay($event, index, person.name)" lazy type="is-info" size="is-large" rounded :min="0" :max="order.count * order.price - order.paid" :step="500" ></b-slider>
      </div>

      <div v-if="order.paid == order.count * order.price && history == false" class="order-payment-done green">
        <b-icon
            size="is-default"
            icon="check"
            type="is-light">
          </b-icon>
        پرداخت شده
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      person: {
        default: {}
      },
      history: {
        default: false
      },
      shadow: {
        default: true
      },
      title: {
        default: null
      }
    },
    data() {
      return { 
      }
    },
    methods: {
      changeWishToPay(value, index , personName) {
        // for now i send peson name but later i will search by id
        this.$store.commit('table/changeWishToPay', {value, index, name: personName})
      },
    },
    mounted(){
    }
  }
</script>

<style scoped lang="sass">

</style>