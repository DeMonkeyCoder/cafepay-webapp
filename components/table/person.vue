<template>
  <div class="table-person">
    <div class="person-title has-background-white cp-tb-margin">
      <img :src="person.avatar" :alt="person.name">
      <p class="cp-side-padding cp-tb-padding">{{title}}</p>
    </div>
    <div class="person-orders cp-side-padding cp-tb-margin-2x cp-tb-padding long-shadow has-background-white cp-card"
     v-for="order in person.orders" :key="order.name">

      <div class="person-title-and-selection">
        <div class="person-order-title font-norm">{{order.name}}</div>
        <div class="person-order-selection"></div>
      </div>

      <div class="person-total-order-info">
        <span>مجموع:‌ {{order.count}} عدد | {{order.count * order.price | currency}} تومان</span> 
        <span>- پرداخت شده:‌ <span class="g-text">{{order.paid | currency}}</span></span>
      </div>

      <div class="person-payment">

      </div>

      <div class="wish-to-pay">
        <span>0</span> تومان از این محصول را میخواهید پرداخت کنید
      </div>

      <div class="person-slider">
        <b-slider lazy type="is-info" size="is-large" rounded :min="0" :max="order.count * order.price - order.paid" :step="500" ></b-slider>
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
      title: {
        default: null
      }
    },
    data() {
      return {
        kir: '1' 
      }
    },
  }
</script>

<style scoped lang="sass">

</style>