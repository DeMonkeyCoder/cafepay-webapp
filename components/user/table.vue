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
        <b-button
          :loading="globalLoading"
          @click="paymentCheckout"
          class="checkCode-btn pay-checkout-btn bcp-btn bcp-btn-large"
          expanded
          type="is-info"
        >پرداخت آنلاین</b-button>

        <!-- <div @click="paymentCheckout" dir="rtl" class="pc-child pay-checkout-btn green">
          <b-icon class="credit-card-icon" icon="credit-card" type="is-light"></b-icon>پرداخت آنلاین
        </div>-->
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
          <img :src="(cafe.avatar == null) ? cafeDefaultImage : cafe.avatar " alt />
          <p class="cafe-name cp-tb-padding cp-side-padding">{{cafe.name}}</p>
          <h5 class="table-number cp-tb-padding cp-side-padding">{{table.table_number}}</h5>
        </div>
        <div
          @click="$store.commit('changeNavigation', 'currentCafe')"
          class="go-back cp-tb-padding"
        >
          <b-icon size="is-medium" icon="chevron-left" type="is-light"></b-icon>
        </div>
      </div>

      <div class="table-status-bar long-shadow cp-side-margin cp-header-card has-background-white">
        <div id="table-status-bar-progress-wrapper" class></div>
        <p v-if="PaymentProgress != 100">
          باقی‌مانده:
          <span
            class="g-text font-norm total-payment"
          >{{table.payment.total_amount - table.payment.payed_amount | currency}}</span> تومان از
          <span class="total-cost">{{table.payment.total_amount | currency}}</span> تومان
        </p>

        <p :class="{'complete-payment-p': PaymentProgress}" v-if="PaymentProgress == 100" class="font-norm total-payment">پرداخت میز کامل شده است</p>
        <b-icon
          v-if="PaymentProgress == 100"
          class="g-text payment-completed-icon"
          icon="sticker-check"
        ></b-icon>
      </div>

      <!-- <div class="table--status"></div> -->

      <div
        v-if="table.persons.length == 0"
        class="empty-table"
      >سفارشی برروی میز سفارش شما وجود ندارد</div>

      <div class="persons-on-table cp-side-margin-2x">
        <!-- <div class="you">
          <person :person="table.you" title="شما" />
        </div>-->
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
          ابتدا به بخش
          <span
            @click="$store.commit('changeNavigation', 'scan')"
            class="p-text"
          >اسکن</span> بروید
        </p>
        <p>و بارکد مربوط به میز را اسکن کنید</p>
        <p>یا کد میز را وارد نمایید</p>
      </div>
    </div>
  </div>
</template>

<script>
import person from '~/components/table/person.vue'
import cafeDefaultImage from '@/assets/img/cafe-default.png'
export default {
  components: { person },
  data() {
    return {
      key: 1,
      isTableOptionsModalActive: false,
      fullPayment: false,
      cafeDefaultImage
    }
  },
  computed: {
    cafe() {
      return this.$store.state.cafe
    },
    table() {
      return this.$store.state.table
    },
    totalWishToPay() {
      return this.$store.getters['table/totalWishToPay']
    },

    PaymentProgress() {
      let percent =
        (this.table.payment.payed_amount / this.table.payment.total_amount) *
        100
      console.log('percent', percent.toFixed(0))

      if (percent == NaN) return 0
      return percent.toFixed(0)
    }
    // ordersTotalCost(){
    //   let others = this.table.persons.reduce( (Sum, person) => person.totalPrice + Sum,  0)
    //   return others + this.table.yt
    // }
  },
  methods: {
    paymentCheckout() {
      this.$store.dispatch('table/submitPayment', this.totalWishToPay)
      // this.$router.push('/paymentResult')
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
  mounted() {},
  watch: {
    immediate: true,
    PaymentProgress: {
      handler(val, old) {
      //   function paymentDOMCheck(params) {
      //     let progressBar = document.getElementById(
      //       'table-status-bar-progress-wrapper'
      //     )
      //     if (progressBar == null) paymentDOMCheck()
      //     else {
      //         progressBar.style.width = `${val}%`
      //         if (val == 100)
      //           progressBar.style.borderRadius = '10px 10px 10px 10px'
      //     }
      //   }
      //   paymentDOMCheck()
      }
    },

    totalWishToPay: {
      immediate: true,
      handler(val, old) {
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
}
</script>

<style scoped lang="sass">
.no-active-table
  position: absolute
  top: 0
  left: 0
  right: 0
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