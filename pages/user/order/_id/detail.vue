<template>
  <div dir="$dir()">
      <div class="cp-header cp-tb-padding cp-side-padding">
        <div @click="$router.go(-1)" class="go-back cp-tb-padding">
          <b-icon size="is-medium" icon="chevron-left" type="is-light">
          </b-icon>
        </div>
      </div>

      <div  class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white">
         <div class="info">
          <img class="no-pic" src="@/assets/img/shape/icons/order-detail.png" alt="">
          <h4 class="header cp-tb-padding cp-side-padding">جزییات سفارش</h4>
          <p dir="$dir()" class="detail cp-tb-padding cp-side-padding">
            در <span class="p-text">{{order.cafeName}}</span></p>
        </div>
      </div>


      <div class="persons-history cp-side-margin">
          <div class="person-history " v-for="person in order.persons" :key="person.name">
            <person :shadow="false" :history="true" :person='person' :title="person.name" />
          </div>
      </div>


      <div class="order-fix-button">
        <nuxt-link :to="'/user/order/' +$route.params.id + '/poll'" class="go-to-poll-btn">امتیازدهی به {{order.cafeName}}</nuxt-link>
      </div>

 
  </div>
</template>

<script>
  import person from '~/components/table/person.vue'
  export default {
    components: {person},
    data() {
      return {
      }
    },
    computed: {
      user() {
        return this.$store.state.user.user 
      },
      order(){
        return this.$store.state.orderHistory.currentOrder
      },
    },
    mounted(){
        this.$store.commit('orderHistory/get', this.$route.params.id)
    }
  }
</script>

<style scoped lang="sass">
@import '~/assets/sass/variables.sass'
.persons-history
  position: relative 
  bottom: 3 * $margin
  .person-history
    margin-bottom: $margin
    display: flex
    flex-direction: column

  .detail
    direction: rtl!important

.order-fix-button
  background-color: $primary
  a
    color: white
    font-size: 16px

</style>