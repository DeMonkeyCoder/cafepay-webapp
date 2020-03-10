<template>
  <div>
    <div v-if="hasActiveTable" class="has-active-table">
      <div class="table-header cp-header cp-tb-padding cp-side-padding">
        <div class="info">
          <img :src="cafe.avatar" alt="">
          <p class="cafe-name cp-tb-padding cp-side-padding">{{cafe.name}}</p>
          <h5 class="table-number cp-tb-padding cp-side-padding">{{table.table_number}} میز شماره</h5>
        </div>
        <div @click="$store.commit('changeNavigation', 'currentCafe')" class="go-back cp-tb-padding">
          <b-icon
            size="is-medium"
            icon="chevron-left"
            type="is-light">
          </b-icon>
        </div>
      </div>

      <div class="table-status-bar long-shadow cp-side-margin cp-header-card has-background-white">
        <p>پرداخت شده:‌ <span class="g-text font-norm total-payment">
          {{$store.getters['table/ordersTotalPaid'] | currency}}</span> تومان از 
        <span class="total-cost">{{$store.getters['table/ordersTotalCost'] | currency}}</span> تومان</p>
      </div>

      <div class="persons-on-table cp-side-margin-2x">
        <div class="you">
          <person :person='table.you' title="سفارشات شما" />
        </div>
        <div class="others">
          <div class="cp-tb-margin" v-for="person in table.persons" :key="person.name">
            <person :person='person' :title="'سفارشات' + ' ' +person.name" />
          </div>
        </div>
      </div>

    </div>

    <div v-else class="no-active-table">
      <div>
        <img src="@/assets/img/shape/icons/burger.svg" alt="">
        <p class="cp-side-margin-2x">برای مشاهده میز به تب <span @click="$store.commit('changeNavigation', 'scan')"
         class="p-text">اسکن</span> بروید</p>
        <p> و QR مربوط به میز را اکسن کنید</p>
      </div>
    </div>
  </div>
</template>

<script>
  import person from '~/components/table/person.vue'
  export default {
    components: {person},
    data() {
      return {
        key: 1,
        isCancelTableModalActive: false
      }
    },
    computed: {
      cafe() {
        return this.$store.state.cafe.summery 
      },
      table() {
        return this.$store.state.table
      },
      // ordersTotalCost(){
      //   let others = this.table.persons.reduce( (Sum, person) => person.totalPrice + Sum,  0)
      //   return others + this.table.yt
      // }
 
    },
  }
</script>

<style scoped lang="sass">
.no-active-table
  position: absolute
  top: 0
  bottom: 65px
  display: flex
  justify-content: center
  align-items: center
  div
    text-align: center
    img
      width: 40%
      margin: auto


</style>