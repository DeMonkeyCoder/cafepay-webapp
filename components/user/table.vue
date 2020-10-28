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
              <b-checkbox v-model="fullPayment" size="is-large" type="is-info"
                >پرداخت کل فاکتور</b-checkbox
              >
            </div>
            <b-button
              @click="changeTableOptions"
              expanded
              class="change-table-options-btn"
              size="is-medium"
              type="is-info"
              >اعمال تغییرات</b-button
            >
          </section>
        </div>
      </b-modal>

      <b-modal
        class="pre-invoice-modal simple-action-modal"
        :active.sync="preInvoiceActive"
        has-modal-card
        :can-cancel="true"
        
      >
        <div class="modal-card" style="width: auto">
          <section class="modal-dialog">
            <div id="pre-invoice-animation"></div>
            <ol class="order-summery">
              <li v-for="order in ordersToPay" :key="order.pk">
                <p class="pre-invoice-modal__name">{{ order.name }}</p>
                <p class="pre-invoice-modal__amount value-fix-padding">
                  {{ order.amount | currency }} <span class="toman">تومان</span>
                </p>
              </li>
            </ol>

            <ul class="payment-summery">
              <li>
                <p class="pre-invoice-modal__name">مجموع سفارشات</p>
                <p class="pre-invoice-modal__amount">
                  {{ totalWishToPayOrder | currency }}
                  <span class="toman">تومان</span>
                </p>
              </li>
              <li>
                <p class="pre-invoice-modal__name font-l">خدمات</p>
                <p class="pre-invoice-modal__amount font-l">
                  {{ cafepayFee | currency }}
                  <span class="toman">تومان</span>
                </p>
              </li>
              <li>
                <p class="pre-invoice-modal__name font-bold">جمع کل</p>
                <p class="pre-invoice-modal__amount font-bold">
                  {{ totaltoPay | currency }}
                  <span class="toman">تومان</span>
                </p>
              </li>
            </ul>
          </section>
          <section class="modal-action">
            <b-button
              @click="paymentCheckout"
              :loading="globalLoading"
              class="ma-child"
              type="is-success"
              >پرداخت آنلاین
            </b-button>
          </section>
        </div>
      </b-modal>

      <div id="pay-checkout" class="pay-checkout-is-shown">
        <b-button :disabled="(totalWishToPayOrder == 0)"
          @click="showPreInvoice"
          :loading="globalLoading"
          class="button shadow-lg-bb bcp-btn cp-btn-submit-order"
          size="is-medium"
          type="is-success"
          >پرداخت سفارشات ({{ totalWishToPayOrder | currency }})</b-button
        >
      </div>

      <!-- <div dir="ltr" id="pay-checkout">
        <b-button
          :loading="globalLoading"
          @click="paymentCheckout"
          class="checkCode-btn pay-checkout-btn bcp-btn bcp-btn-large"
          expanded
          type="is-info"
          >پرداخت آنلاین</b-button
        > -->

      <!-- <div @click="paymentCheckout" dir="rtl" class="pc-child pay-checkout-btn green">
          <b-icon class="credit-card-icon" icon="credit-card" type="is-light"></b-icon>پرداخت آنلاین
        </div>-->
      <!-- <div class="pc-child pay-checkout-info cp-side-padding">
          <div dir="rtl" class="total-price cp-side-margin font-norm">
            {{ totalWishToPay | currency }}
            <span class="toman">تومان</span>
          </div>
          <div @click="showOptionsModal" class>
            <b-icon icon="dots-vertical" type></b-icon>
          </div>
        </div>
      </div> -->

      <!-- <v-tour name="myTour" :steps="steps" :options="{ highlight: true }"></v-tour> -->

      <div class="table-header cp-header cp-tb-padding cp-side-padding">
        <div class="info">
          <img
            :src="
              cafe.avatar == null ? cafeDefaultImage : baseUrl + cafe.avatar
            "
            alt
          />
          <p class="cafe-name cp-tb-padding cp-side-padding">{{ cafe.name }}</p>
          <h5 class="table-number cp-tb-padding cp-side-padding">
            {{ table.table_number }}
          </h5>
        </div>
        <div
          @click="$store.commit('changeNavigation', 'currentCafe')"
          class="go-back cp-tb-padding"
        >
          <b-icon size="is-medium" icon="chevron-left" type="is-light"></b-icon>
        </div>
      </div>

      <div
        id="table-status-bar"
        class="table-status-bar long-shadow cp-side-margin cp-header-card has-background-white"
      >
        <div id="table-status-bar-progress-wrapper" class></div>
        <p v-if="PaymentProgress != 100">
          باقی‌مانده:
          <span class="p-text font-norm total-payment">{{
            (table.payment.total_amount - table.payment.payed_amount) | currency
          }}</span>
          از
          <span class="total-cost">{{
            table.payment.total_amount | currency
          }}</span>
          تومان
        </p>

        <p
          :class="{ 'complete-payment-p': PaymentProgress }"
          v-if="PaymentProgress == 100"
          class="font-norm total-payment"
        >
          پرداخت میز کامل شده است
        </p>
        <b-icon
          v-if="PaymentProgress == 100"
          class="g-text payment-completed-icon"
          icon="sticker-check"
        ></b-icon>
      </div>

      <!-- <div class="table--status"></div> -->

      <div v-if="table.persons.length == 0" class="empty-table">
        سفارشی برروی میز شما وجود ندارد
      </div>

      <div class="persons-on-table cp-side-margin-2x">
    
        <!-- <div class="you">
          <person :person="table.you" title="شما" />
        </div>-->
        <div class="others">
          <div
            class="cp-tb-margin"
            v-for="(person, index) in table.persons"
            :key="person + '-' + index"
          >
            <person
              :first="index == 0 ? true : false"
              :person="person"
              :title="person.name"
            />
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
            >اسکن</span
          >
          بروید
        </p>
        <p>و بارکد مربوط به میز را اسکن کنید</p>
        <p>یا کد میز را وارد نمایید</p>
      </div>
    </div>
  </div>
</template>

<script>
import person from '~/components/table/person.vue'
import lottie from 'lottie-web'
import preInvoiceAnimation from '~/assets/img/28970-download.json'
import cafeDefaultImage from '@/assets/img/cafe-default.png'
export default {
  components: { person },
  data() {
    return {
      key: 1,
      isTableOptionsModalActive: false,
      fullPayment: false,
      cafeDefaultImage,
      preInvoiceAnimation,
      ordersToPay: [],
      ordersToPayforServer: [],
      preInvoiceActive: false
    }
  },
  computed: {
    cafe() {
      return this.$store.state.cafe
    },
    cafepayFee() {
      return this.totalWishToPayOrder * (this.cafe.cafepay_fee)
    },
    totaltoPay() {
      return this.totalWishToPayOrder + this.cafepayFee
    },
    table() {
      return this.$store.state.table
    },
    totalWishToPayOrder() {
      return this.$store.getters['table/totalWishToPay']
    },

    PaymentProgress() {
      let percent =
        (this.table.payment.payed_amount / this.table.payment.total_amount) *
        100

      if (percent == NaN) return 0
      return percent.toFixed(0)
    }
    // ordersTotalCost(){
    //   let others = this.table.persons.reduce( (Sum, person) => person.totalPrice + Sum,  0)
    //   return others + this.table.yt
    // }
  },
  methods: {
    showPreInvoice() {
      // first generate it
      this.ordersToPay = []
      this.ordersToPayforServer = []
      for (const person of this.table.persons) {
        for (const order of person.orders) {
          if (order.wish_to_pay > 0) {
            this.ordersToPayforServer.push({
              pbr: order.pk,
              amount: order.wish_to_pay
            })

            let productExist = this.ordersToPay.findIndex(
              o => o.product == order.product
            )
            if (productExist != -1)
              this.ordersToPay[productExist].amount += order.wish_to_pay
            else
              this.ordersToPay.push({
                pbr: order.pk,
                amount: order.wish_to_pay,
                name: order.name,
                product: order.product
              })
          }
        }
      }
      this.preInvoiceActive = true
      setTimeout(() => {
   
        let preInvoiceAnime = lottie.loadAnimation({
          container: document.getElementById('pre-invoice-animation'), // the dom element that will contain the animation
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: this.preInvoiceAnimation // the path to the animation json
        })
        preInvoiceAnime.play()
      }, 200)
    },
    paymentCheckout() {
      this.$store.dispatch('table/submitPayment', this.ordersToPayforServer)
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
  mounted() {
  },
  watch: {
    // 'table.persons': {
    //   immediate: true,
    //   handler(newVal){
    //     if (newVal.length > 0) {
    //       setTimeout(() => {
    //         this.$tours['myTour'].start()
    //       }, 1000);
    //     }
    //   }

    // },
    PaymentProgress: {
      immediate: true,
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

    // totalWishToPayOrder: {
    //   immediate: true,
    //   handler(val, old) {
    //     if (document.getElementById('pay-checkout') != null) {
    //       if (val > 0) {
    //         // document.getElementById('pay-checkout').classList.add('pay-checkout-is-shown')
    //         setTimeout(() => {
    //           $('#pay-checkout').addClass('pay-checkout-is-shown')
    //         }, 100);
    //       } else {
    //               setTimeout(() => {
    //           $('#pay-checkout').removeClass('pay-checkout-is-shown')
    //         }, 100);
    //       }
    //     }
    //   }
    // }
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