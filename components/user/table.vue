<template>
  <div>
    <div v-if="hasActiveTable" class="has-active-table">
      <b-modal
        class="table-options-modal simple-action-modal"
        :active.sync="isTableOptionsModalActive"
        has-modal-card
        :can-cancel="true"
      >
        <div class="modal-card" style="width: auto">
          <section class="modal-card-body">
            <div class="field last-checkbox-field">
              <b-checkbox v-model="fullPayment" size="is-large" type="is-info">پرداخت کل فاکتور</b-checkbox>
            </div>
            <b-button
              @click="changeTableOptions"
              expanded
              class="change-table-options-btn"
              size="is-medium"
              type="is-info"
            >اعمال تغییرات</b-button>
          </section>
        </div>
      </b-modal>

      <div dir="ltr" id="pay-checkout">
        <div @click="paymentCheckout" dir="rtl" class="pc-child pay-checkout-btn green">
          <b-icon class="credit-card-icon" icon="credit-card" type="is-light"></b-icon>پرداخت آنلاین
        </div>
        <div class="pc-child pay-checkout-info cp-side-padding">
          <div dir="rtl" class="total-price cp-side-margin font-norm">
            {{totalWishToPay | currency}}
            <span class="toman">تومان</span>
          </div>
          <div @click="showOptionsModal" class>
            <b-icon icon="dots-vertical" type></b-icon>
          </div>
        </div>
      </div>

      <div class="table-header cp-header cp-tb-padding cp-side-padding">
        <div class="info">
          <img :src="cafe.avatar" alt />
          <p class="cafe-name cp-tb-padding cp-side-padding">{{cafe.name}}</p>
          <h5 class="table-number cp-tb-padding cp-side-padding">{{table.table_number}} میز شماره</h5>
        </div>
        <div
          @click="$store.commit('changeNavigation', 'currentCafe')"
          class="go-back cp-tb-padding"
        >
          <b-icon size="is-medium" icon="chevron-left" type="is-light"></b-icon>
        </div>
      </div>

      <div class="table-status-bar long-shadow cp-side-margin cp-header-card has-background-white">
        <p>
          پرداخت شده:‌
          <span
            class="g-text font-norm total-payment"
          >{{$store.getters['table/ordersTotalPaid'] | currency}}</span> تومان از
          <span class="total-cost">{{$store.getters['table/ordersTotalCost'] | currency}}</span> تومان
        </p>
      </div>

      <div class="persons-on-table cp-side-margin-2x">
        <div class="you">
          <person :person="table.you" title="شما" />
        </div>
        <div class="others">
          <div class="cp-tb-margin" v-for="person in table.persons" :key="person.name">
            <person :person="person" :title="person.name" />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-active-table">
      <div>
        <img src="@/assets/img/shape/icons/burger.svg" alt />
        <p class="cp-side-margin-2x">
          برای مشاهده میز به تب
          <span @click="$store.commit('changeNavigation', 'scan')" class="p-text">اسکن</span> بروید
        </p>
        <p>و QR مربوط به میز را اکسن کنید</p>
      </div>
    </div>
  </div>
</template>

<script>
import person from '~/components/table/person.vue'
export default {
  components: { person },
  data() {
    return {
      key: 1,
      isTableOptionsModalActive: false,
      fullPayment: false
    }
  },
  computed: {
    cafe() {
      return this.$store.state.cafe.summery
    },
    table() {
      return this.$store.state.table
    },
    totalWishToPay() {
      return this.$store.getters['table/totalWishToPay']
    }
    // ordersTotalCost(){
    //   let others = this.table.persons.reduce( (Sum, person) => person.totalPrice + Sum,  0)
    //   return others + this.table.yt
    // }
  },
  methods: {
    paymentCheckout() {
      setTimeout(() => {
        this.$store.commit('table/submitPayment', this.totalWishToPay)
      }, 200)
      this.$router.push('/paymentResult')

      // this.cloading = true
      // setTimeout(() => {
      //   this.cloading = false
      // }, 1000);
    },
    showOptionsModal() {
      this.isTableOptionsModalActive = true
    },
    changeTableOptions() {
      if (this.fullPayment) this.$store.commit('table/payWholeBill')
      else this.$store.commit('table/setDefaultPayment')
      this.isTableOptionsModalActive = false
    }
  },
  mounted() {
    if (this.totalWishToPay > 0)
      document
        .getElementById('pay-checkout')
        .classList.add('pay-checkout-is-shown')
  },
  watch: {
    totalWishToPay(val, old) {
      if (document.getElementById('pay-checkout') != null) {
        if (val > 0) {
          document
            .getElementById('pay-checkout')
            .classList.add('pay-checkout-is-shown')
        } else {
          document
            .getElementById('pay-checkout')
            .classList.remove('pay-checkout-is-shown')
        }
      }
    }
  }
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