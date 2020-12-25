<template>
  <div>
    <div
      v-if="showInitialTableView"
      class="no-active-table"
    >
      <div>
        <img src="@/assets/img/shape/icons/burger.svg" alt />
        <div @click="$store.commit('changeNavigation', 'scan')" v-html="$t('table_page.scan_first_message')">

        </div>
      </div>
    </div>

    <div
      v-if="showOrderingIsDisabled"
      class="no-active-table"
    >
      <div>
        <img src="@/assets/img/ordering.png" alt="" />
        <p class="no-ordering-text">{{ $t('table_page.ordering_unavailable') }}</p>
      </div>
    </div>

    <div v-if="showPreOrder" class="cp-padding">
      <header class="font-18 font-bold cp-b-margin">{{ $t('table_page.preorder.current_orders') }}</header>
      <nuxt-link :to="localePath('/user/liveorder/'+ user.table_uuid)"><div class="preorders-in-table cp-card has-background-white cp-padding">
        <div class="preorders-in-table__info">
          <p class="preorders-in-table__info__cafe-name">
            {{ $t('table_page.preorder.order_from') }}:
            <span class="font-norm p-text">{{ table.cafe.name }}</span>
          </p>
          <p dir="ltr" class=" font-bold preorders-in-table__info__status" :class="{'p-text': table.status == 'ready' && ordersPaid}">{{ statusText }}</p>
          <p class="preorders-in-table__info__not-paid" v-if="!ordersPaid">{{ $t('table_page.preorder.payment_is_not_done') }}</p>
        </div>

        <div class="preorders-in-table__status"
            :class="{
              'preorders-in-table__status--payment': table.status == 'payment',
              'preorders-in-table__status--waiting': table.status == 'waiting',
              'preorders-in-table__status--preparing': table.status == 'preparing',
              'preorders-in-table__status--ready': table.status == 'ready',
              'preorders-in-table__status--rejected': table.status == 'rejected',
            }">
          <span class="preorder-status-span"></span>
          <div v-if="ordersPaid"><b-button class="preorder-status-detail-btn" type="is-light" icon-right="chevron-left">{{ $t('table_page.preorder.details') }}</b-button></div>
          <b-button v-else @click="goToTokenAndPay" type="is-info">{{ $t('table_page.preorder.checkout') }}</b-button>
        </div>
      </div>
      </nuxt-link>
    </div>

    <div
      v-if="showTableOrders"
      class="has-active-table"
    >
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
                >{{ $t('table_page.checkout_all_items') }}</b-checkbox
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
        class="pre-invoice-modal"
        :active.sync="preInvoiceActive"
        full-screen 
        has-modal-card
        :can-cancel="true"
      >
        <div class="modal-card" style="width: auto">
          <section class="modal-dialog  cp-side-padding-2x cp-tb-padding">
            <div id="pre-invoice-animation"></div>
            <ol class="order-summery">
              <li v-for="order in ordersToPay" :key="order.pk">
                <p class="order-summery__name">{{ order.name }}</p>
                <p class="order-summery__amount value-fix-padding">
                  {{ order.amount | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
            </ol>

            <ul class="payment-summery">
              <li>
                <p class="pre-invoice-modal__name">{{ $t('table_page.sub_total_amount') }}</p>
                <p class="pre-invoice-modal__amount">
                  {{ totalWishToPayOrder | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
              <li>
                <p class="pre-invoice-modal__name font-l">{{ $t('table_page.service_fee') }}</p>
                <p class="pre-invoice-modal__amount font-l">
                  {{ cafepayFee | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
              <li>
                <p class="pre-invoice-modal__name font-bold">{{ $t('table_page.final_total_amount') }}</p>
                <p class="pre-invoice-modal__amount font-bold">
                  {{ totaltoPay | currency }}
                  <!-- <span class="toman">تومان</span> -->
                </p>
              </li>
            </ul>

            <div v-if="tokenType == 'pre-order'" class="preorder-warning">
              <div>
                <b-icon size="is-medium" icon="alert-circle-outline"></b-icon>
              </div>
              <p>
                {{ $t('table_page.self_pickup_warning') }}
              </p>
            </div>

            <div class="pre-invoice-modal__payment-method cp-t-margin-2x">
              <header class="font-bold font-18 cp-b-margin">{{ $t('table_page.choose_payment_method') }}</header>

              <div
                v-if="$i18n.locale == 'fa'"
                :class="{'shadow-md': paymentMethod == 'online', 'method-selected': paymentMethod == 'online'}" @click="paymentMethod = 'online'"
                class="pre-invoice-modal__payment-method__online cp-side-padding-half cp-tb-padding normal-radius">
                <div class="pre-invoice-modal__payment-method__online__img">
                  <img src="@/assets/img/pasargaad.png" alt="">
                </div>
                <div class="pre-invoice-modal__payment-method__online__text">
                  <p class="font-16">پرداخت آنلاین</p>
                  <p class="font-bold">درگاه بانک پاسارگاد</p>
                </div>
                <div v-if="paymentMethod == 'online'" class="pre-invoice-modal__payment-method__online__check">
                  <b-icon
                  icon="check"
                  size="is-medium">
                  </b-icon>
                </div>
              </div>

              <div v-if="tokenType != 'pre-order'" :class="{'shadow-md': paymentMethod == 'cash', 'method-selected': paymentMethod == 'cash'}" @click="paymentMethod = 'cash'"
              class="pre-invoice-modal__payment-method__cash cp-b-margin cp-side-padding-half cp-tb-padding normal-radius">
                <div class="pre-invoice-modal__payment-method__cash__img">
                  <img src="@/assets/img/credit-card-payment.png" alt="">
                </div>
                <div class="pre-invoice-modal__payment-method__cash__text">
                  <p class="font-16">{{ $t('table_page.checkout_cash_or_credit') }}</p>
                  <p class="font-bold">{{ $t('table_page.pay_to_cashier') }}</p>
                </div>
                <div v-if="paymentMethod == 'cash'" class="pre-invoice-modal__payment-method__cash__check">
                  <b-icon
                  icon="check"
                  size="is-medium">
                  </b-icon>
                </div>
              </div>
            </div>
          </section>
          <section class="modal-action cp-padding-2x">
            <b-button
              @click="paymentCheckout"
              :loading="globalLoading"
              class="ma-child"
              type="is-success"
              >{{(paymentMethod == 'cash') ? $t('table_page.checkout_cash_submit_button') : $t('table_page.checkout_online_submit_button') }}
            </b-button>
          </section>
        </div>
      </b-modal>

      <div id="pay-checkout" class="pay-checkout-is-shown">
        <b-button v-if="table.paymentMethod == 'online'"
          :disabled="totalWishToPayOrder == 0 "
          @click="showPreInvoice"
          :loading="globalLoading"
          class="button shadow-lg-bb bcp-btn cp-btn-submit-order"
          size="is-medium"
          type="is-success"
          >{{  $t('table_page.checkout') }} ({{ totalWishToPayOrder | currency }})</b-button
        >
        <span v-else class="message-warning font-16 font-norm">{{$t('table_page.checkout_CASH_message')}}</span>
      </div>

 

      <!-- <v-tour name="myTour" :steps="steps" :options="{ highlight: true }"></v-tour> -->
      
  <div class="table-header cp-header cp-tb-padding cp-side-padding">
        <!-- <div class="table-top-section">
          <div
            class="table-top-section__name  cp-tb-padding-half cp-side-padding"
          >
            <h5 class="">
              میز:  <span class="font-norm"> {{ table.table_number }} </span>
            </h5>
          </div>

          <div class="table-top-section__edit-orders">
            <b-button @click="goToMyOrderInMenu" type="is-danger" inverted>ویرایش سفارشات</b-button>
          </div>
        </div> -->

        <div
          id="table-status-bar"
          class="table-status-bar long-shadow cp-padding cp-header-card has-background-white"
        >
          <div class="table-top-section">
          <div
            class="table-top-section__name  cp-tb-padding-half cp-side-padding"
          >
            <h5 class="">
              {{ $t('table_page.table') }}: <span class="font-norm">{{ table.table_number }}</span>
            </h5>
          </div>

          <div class="table-top-section__edit-orders">
            <b-button @click="goToMyOrderInMenu" class="shadow-b" type="is-warning" inverted >{{ $t('table_page.edit_order') }}</b-button>
          </div>
        </div>

          <!-- <div class="table-status-bar__actions">
            <div class="table-status-bar__actions__pay-whole-bill">
              <b-button  type="is-light" inverted>پرداخت کل سفارش</b-button>
            </div>

            <div class="table-status-bar__actions__order-description">
              <b-button  type="is-light" inverted>ثبت توضیحات</b-button>
            </div>
          </div> -->

          <div
            id="table-status-bar-progress-wrapper"
            class="table-status-bar__info cp-tb-padding-half"
          >
            <p v-if="PaymentProgress != 100">
              {{ $t('table_page.payment_status_header_payed') }}:
              <span class="p-text font-norm total-payment">{{
                table.payment.payed_amount | currency
              }}</span>
              {{ $t('table_page.payment_status_header_of') }}
              <span class="total-cost">{{
                table.payment.total_amount | currency
              }}</span>
              <!-- تومان -->
            </p>

            <p
              :class="{ 'complete-payment-p': PaymentProgress }"
              v-if="PaymentProgress == 100"
              class="font-norm total-payment"
            >
              {{ $t('table_page.table_payment_done') }}
            </p>
            <b-icon
              v-if="PaymentProgress == 100"
              class="g-text payment-completed-icon"
              icon="sticker-check"
            ></b-icon>
          </div>
        </div>
      </div>

      <!-- <div class="table--status"></div> -->

      <div v-if="table.persons.length == 0" class="empty-table">
        {{ $t('table_page.no_orders_on_your_table') }}
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
      preInvoiceActive: false,
      hasPreOrder: true,
      preorders: [{}],
      //TODO: get bill preferred payment method from server
      paymentMethod: (this.$i18n.locale == 'fa') ? 'online' : 'cash'
    }
  },
  computed: {
    cafe() {
      return this.$store.state.cafe
    },
    cafepayFee() {
      return this.totalWishToPayOrder * this.cafe.cafepay_fee
    },
    totaltoPay() {
      return this.totalWishToPayOrder + this.cafepayFee
    },

    totalWishToPayOrder() {
      return this.$store.getters['table/totalWishToPay']
    },

    statusText() {
      let text
      
      switch (this.table.status) {
        case 'waiting':
          text = this.$t('table_page.preorder.states.waiting')
          break
        case 'confirmed':
          text = this.$t('table_page.preorder.states.confirmed')
          break
        case 'preparing':
          text = this.$t('table_page.preorder.states.preparing')
          break
        case 'ready':
          text = this.$t('table_page.preorder.states.ready')
          break
        case 'rejected':
          text = this.$t('table_page.preorder.states.rejected')
          break

        default:
          break
      }
      
      return text
    },


    showPreOrder(){
      let check = (this.user.table_uuid && (this.ordersPaid && this.hasActiveTable || !this.hasActiveTable)  )
      return check
    },

    showTableOrders(){
      return (this.hasActiveTable && this.tokenType !== 'menu-only' && ( !this.ordersPaid  || !this.user.table_uuid ) )
    },

    showInitialTableView(){
      return (!this.hasActiveTable && this.tokenType != 'pre-order' && !this.user.table_uuid)
    },

    showOrderingIsDisabled(){
      return (this.hasActiveTable && this.tokenType == 'menu-only' && !this.user.table_uuid)
    },

    PaymentProgress() {
      let percent =
        (this.table.payment.net_payed_amount / this.table.payment.total_amount) *
        100

      if (percent == NaN) return 0
      return percent.toFixed(0)
    },
    // ordersTotalCost(){
    //   let others = this.table.persons.reduce( (Sum, person) => person.totalPrice + Sum,  0)
    //   return others + this.table.yt
    // }
  },
  methods: {
    goToMyOrderInMenu(){
      setTimeout(() => {
        this.$store.commit('cafe/changeActiveCategory', 0)
        this.$nuxt.$emit('changeActiveCategory', 0)
      }, 300);
      this.$store.commit('changeNavigation', 'currentCafe')

    },

    goToTokenAndPay(e) {
      e.preventDefault();
      // get cafe info from table socket massage
      let cafe =  {
        cafe: this.table.cafe,
        type: 'pre-order'
      }
      this.$store.dispatch('sendCode', { tableToken: this.user.table_uuid, hasToken :this.userIsloggedIn, cafe } )
    },
    showPreInvoice() {
      // first generate it
      this.ordersToPay = []
      this.ordersToPayforServer = []
      for (const person of this.table.persons) {
        for (const order of person.orders) {
          if (order.wish_to_pay > 0) {
            this.ordersToPayforServer.push({
              pbr: order.pk,
              amount: order.wish_to_pay,
            })

            let productExist = this.ordersToPay.findIndex(
              (o) => o.product == order.product
            )
            if (productExist != -1)
              this.ordersToPay[productExist].amount += order.wish_to_pay
            else
              this.ordersToPay.push({
                pbr: order.pk,
                amount: order.wish_to_pay,
                name: order.name,
                product: order.product,
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
          animationData: this.preInvoiceAnimation, // the path to the animation json
        })
        preInvoiceAnime.play()
      }, 200)
    },
    paymentCheckout() {
      if (this.paymentMethod == 'cash') {
        let pbrList = this.ordersToPayforServer.map(x => {return {pbr: x.pbr, preferred_payment_method: '1'}})
        console.log('pbr list', pbrList);
        this.$store.dispatch('table/setPaymentMethod', pbrList)
        .then(res => {
          this.preInvoiceActive = false
          this.toaster(this.$t('table_page.cash_checkout_type_submitted'), 'is-info', 'is-bottom')
        })
      }
      else this.$store.dispatch('table/submitPayment', this.ordersToPayforServer)
      // this.$router.push('/paymentResult')
    },
    showOptionsModal() {
      this.isTableOptionsModalActive = true
    },
    changeTableOptions() {
      if (this.fullPayment) this.$store.commit('table/payWholeBill')
      else this.$store.commit('table/setDefaultPayment')
      this.isTableOptionsModalActive = false
    },
  },
  mounted() {},
  watch: {
    PaymentProgress: {
      immediate: true,
      handler(val, old) {},
    },
  },
}
</script>

<style scoped lang="sass">
</style>