<template>
  <div :id="(person.cashier) ? 'cashier-person' : 'normal-person'" class="table-person">

    <!-- <v-tour
      v-if="first"
      name="sliderTour"
      :steps="steps"
      :options="myOptions"
      :callbacks="myCallbacks"
    ></v-tour> -->

      <v-tour
      name="cashierSelectTour"
      :steps="cashierGuideSteps"
      :options="cashierGuideOptions"
      :callbacks="cashierGuideCallback"
    ></v-tour>

    <b-modal class="simple-action-modal cashier-guide-modal" :active.sync="cashierGuideModalActive" has-modal-card >
      <div class="modal-card" style="width: auto">

        <section class="modal-dialog">
          <div>
            {{ $t('table_page.cashier_order_guide') }}
            <p>انتخاب سفارش</p>
          </div>
          <div>
            {{ $t('table_page.cashier_order_guide_2') }}
            <p>پرداخت کل سفارشات</p>
            </div>
          <div>
            {{ $t('table_page.cashier_order_guide_3') }}
            <p>پرداخت اشتراکی</p>
            </div>
        </section>

        <section class="modal-caption"></section>

        <section class="modal-action">
          <button class="button ma-child is-light" type="button" @click="cashierGuideModalActive = false">{{ $t('understood') }}</button>
        </section>
        
      </div>
    </b-modal>

    <!-- COUNT CHANGE MODAL -->
    <!-- <b-modal class="simple-action-modal" :active.sync="cashierCountModalActive" has-modal-card >
      <div class="modal-card" style="width: auto">

        <section class="modal-dialog">
          <p class="cp-b-margin">{{ $t('table_page.cashier_order') }}</p>
          <b-field dir="ltr" :label="orderTobeChange.name">
            <b-numberinput v-model="orderTobeChange.cashier_count" controls-rounded type="is-info" :min="0" 
            :max="orderTobeChange.max"></b-numberinput>
          </b-field>
        </section>

        <section class="modal-caption"></section>

        <section class="modal-action">
          <button :disabled="orderTobeChange.cashier_count == 0 || orderTobeChange.cashier_count > orderTobeChange.max " 
            class="button ma-child is-info" type="button" @click="cashierCountChange">{{ $t('table_page.chashier_count_submit') }}</button>
        </section>
        
      </div>
    </b-modal> -->

    <div  class="person-title has-background-white cp-tb-margin">
      <img :src="person.avatar" :alt="person.name" />
      <p class="cp-side-padding cp-tb-padding" v-html="$t('table_page.person_orders', { title: title.trim() })">
        
      </p>
      <span v-if="person.cashier" class="cp-tb-padding help-span">
        <b-icon @click.native="showCashierGuide" class="help-icon" icon="help"></b-icon></span>
    </div>
    <div
      class="person-orders cp-side-padding cp-tb-padding-half  has-background-white cp-card"
      :class="{ 'long-shadow': shadow }"
      v-for="(order, index) in person.orders"
      :key="index"
      :id="`order-${index}`"
      @click="selectOrderForPayment(person.cashier, index, order)"
    >
      <div class="person-orders__info">
        <div class="person-title-and-selection">
          <div class="person-order-title font-norm">{{ order.name }}</div>
          <div class="person-order-selection"></div>
        </div>

        <div class="person-total-order-info">
          <span class="person-total-order-info__payment">
            <span v-if="!person.cashier">{{ $t('table_page.person_order_count', {order_count: order.count}) }}
             | </span>
            {{ order.payment_info.total_amount | currency }}
            <!-- <span class="toman">تومان</span> -->
            </span>

            <div v-if="order.paid && history == false" 
            class="person-total-order-info__status"><span class=" green font-10 white-text cp-side-padding-half">{{ $t('table_page.person_payed') }}</span></div>
        </div>
      </div>

    <div v-if="person.cashier && !order.paid" 
      class="person-orders__select" :class="{'person-orders__select--selected': order.cashier_count}">
        <b-button class="float-btn fb-32">
          <!-- <span v-if="order.cashier_count != 0">{{order.cashier_count}}</span> -->
          <b-icon icon="check"></b-icon>
        </b-button>
    </div>
  

      <!-- <div class="person-payment">
        <span
          >پرداخت شده:‌
          <span class="g-text"
            >{{ order.payment_info.net_payed_amount | currency
            }}<span class="toman">تومان</span></span
          ></span
        >
        <span
          >پرداخت شما:‌
          <span class="p-text"
            >{{ order.my_payments.net_payed_amount | currency
            }}<span class="toman">تومان</span></span
          ></span
        >
      </div> -->

      <!-- <div
        v-if="
          order.payment_info.net_payed_amount != order.payment_info.total_amount &&
            history == false
        "
        :value="order.wish_to_pay"
        class="wish-to-pay"
      >
        <span>{{ order.wish_to_pay | currency }}</span
        ><span class="toman">تومان</span>
        <span id="wish-to-pay-text">از این محصول را میخواهید پرداخت کنید</span>
      </div> -->
<!-- 
      <div class="person-slider">
        <b-slider
          :id="`order-${index}-slider`"
          v-if="
            order.payment_info.net_payed_amount !=
              order.payment_info.total_amount && history == false
          "
          :value="order.wish_to_pay"
          @dragging="changeWishToPay($event, index, person.name)"
          @change="changeWishToPay($event, index, person.name)"
          bigger-slider-focus
          type="is-info"
          size="is-large"
          :lazy="false"
          rounded
          :min="0"
          :max="
            order.payment_info.total_amount - order.payment_info.net_payed_amount
          "
          :step="
            order.payment_info.total_amount - order.payment_info.net_payed_amount >=
              500 && order.payment_info.total_amount - order.wish_to_pay > 1000
              ? 500
              : 100
          "
        ></b-slider>
      </div> -->

      <!-- <div
        v-if="
          order.payment_info.net_payed_amount == order.payment_info.total_amount &&
            history == false
        "
        class="order-payment-done green"
      >
        <b-icon size="is-default" icon="check" type="is-light"> </b-icon>
        {{ $t('table_page.person_payed') }}
      </div> -->

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
    },
    first: {
      default: false
    }
  },
  data() {
    return {
      cashierGuideModalActive: false,
      cashierCountModalActive: false,
      orderTobeChange: {
        payment_info: {}
      },
      myOptions: {
        highlight: true,
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: false,
          buttonPrevious: this.$t('table_page.person.tour.previous'),
          buttonNext: this.$t('table_page.person.tour.how_can_i_pay'),
          buttonStop: this.$t('table_page.person.tour.got_it')
        }
      },
      myCallbacks: {
        onNextStep: this.sliderAnimate
      },
      steps: [
        {
          target: '#order-0', // We're using document.querySelector() under the hood
          content: this.$t('table_page.person.tour.person_orders_guide')
        },
        {
          target: '#order-0-slider', // We're using document.querySelector() under the hood
          content: this.$t('table_page.person.tour.person_payment_guide')
        }
        // {
        //   target: '.v-step-1',
        //   content: 'An awesome plugin made with Vue.js!'
        // },
        // {
        //   target: '[data-v-step="2"]',
        //   content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
        //   params: {
        //     placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
        //   }
        // }
      ],
      cashierGuideOptions: {
        highlight: true,
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: false,
          buttonPrevious: this.$t('menu_page.tour.previous'),
          buttonNext: this.$t('menu_page.tour.how_can_i_pay'),
          buttonStop: this.$t('menu_page.tour.got_it')
        }
      },
      cashierGuideCallback: {
        // onNextStep: this.sliderAnimate,
        onFinish: () => {
          this.$store.commit('setGuide', {name: 'cashierSelection', data: false})
          localStorage.setItem('cashierSelectionGuide', false)
          setTimeout(() => {
          this.$store.commit('table/changeChashierCount', {index: 0, cashier_count: 0})
          }, 500);
        }
      },
      cashierGuideSteps: [
        {
          target: '#cashier-person', // We're using document.querySelector() under the hood
          content: this.$t('menu_page.tour.cashier_order_select_guide'),
            params: {
            placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          }
        },
      ]
    }
  },
  methods: {
    intialCashierSelectionTour(){
      this.$tours['cashierSelectTour'].start()
      setTimeout(() => {
        this.$store.commit('table/changeChashierCount', {index: 0, cashier_count: 1})
      }, 1500);
    },
    selectOrderForPayment(cashier, index, order){
      if (!cashier || order.paid) return
      this.orderTobeChange = JSON.parse(JSON.stringify(this.person.orders[index]))
      this.orderTobeChange.index = index
      this.orderTobeChange.cashier_count = (this.orderTobeChange.cashier_count == 1) ? 0 : 1
      this.$store.commit('table/changeChashierCount', this.orderTobeChange)
      
    },
    cashierCountChange() {
      this.$store.commit('table/changeChashierCount', this.orderTobeChange)
      this.cashierCountModalActive = false
    },
    openCountModal(cashier, index){
      this.orderTobeChange = JSON.parse(JSON.stringify(this.person.orders[index]))
      this.orderTobeChange.index = index
      this.orderTobeChange.max = (this.orderTobeChange.payment_info.net_payed_amount) ? Math.ceil(this.orderTobeChange.payment_info.net_payed_amount / this.orderTobeChange.unit_amount) : this.orderTobeChange.count
      if (cashier) {
        this.cashierCountModalActive = true
      }
    },
    showCashierGuide(){
      this.cashierGuideModalActive = true
    },
    changeWishToPay(value, index, personName) {
      // for now i send peson name but later i will search by id
      this.$store.commit('table/changeWishToPay', {
        value,
        index,
        name: personName
      })
    },
    sliderAnimate(currentStep) {
        
      // if it's slider tour start the animation
      if (currentStep === 0) {
        const wish_to_pay_initial = this.person.orders[0].wish_to_pay
        setTimeout(() => {
          $('.b-slider-fill').addClass('animated-slider')
          $('.b-slider-thumb-wrapper').addClass('animated-slider')
          this.changeWishToPay(
            this.person.orders[0].payment_info.total_amount / 2,
            0,
            this.person.name
          )
        }, 500)
        setTimeout(() => {
          this.changeWishToPay(wish_to_pay_initial, 0, this.person.name)
        }, 2000)

        setTimeout(() => {
          $('.b-slider-fill').removeClass('animated-slider')
          $('.b-slider-thumb-wrapper').removeClass('animated-slider')
        }, 2500)
      }
    }
  },
  mounted() {},
  computed: {
    isTablePage() {
      return (this.$store.state.currentMainPage == 'cp-table')
    },
    firstTimeActive() {
      return this.$store.state.firstTimeActive
    },
    initialTour() {
      // it must be the first component and user must be new and page must be table
      return this.first && this.isTablePage && this.firstTimeActive
    }
  },
  watch: {
    // initialTour: {
    //   immediate: true,
    //   handler(val, old) {
    //     if (val) {
    //       setTimeout(() => {
    //         this.$tours['sliderTour'].start()
    //         this.$store.commit('setFirstTime', false)
    //       }, 500)
    //     }
    //   }
    // },
    table: {
      deep: true,
      immediate: true,
      handler(val, oldValue) {
        if (val.hasCashierOrder && this.guides.cashierSelection) {
          setTimeout(() => {
            this.intialCashierSelectionTour()
          }, 1000);
        }
      }
    },
  }
}
</script>

<style scoped lang="sass">

</style>