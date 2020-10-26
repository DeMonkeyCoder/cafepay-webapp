<template>
  <div class="table-person">
    <v-tour
      v-if="first"
      name="sliderTour"
      :steps="steps"
      :options="myOptions"
      :callbacks="myCallbacks"
    ></v-tour>

    <div class="person-title has-background-white cp-tb-margin">
      <img :src="person.avatar" :alt="person.name" />
      <p class="cp-side-padding cp-tb-padding">
        سفارشات <span class="font-norm p-text">{{ title }}</span>
      </p>
    </div>
    <div
      class="person-orders cp-side-padding cp-side-margin cp-tb-padding-half  has-background-white cp-card"
      :class="{ 'long-shadow': shadow }"
      v-for="(order, index) in person.orders"
      :key="order.pk"
      :id="`order-${index}`"
    >
      <div class="person-title-and-selection">
        <div class="person-order-title font-norm">{{ order.name }}</div>
        <div class="person-order-selection"></div>
      </div>

      <div class="person-total-order-info">
        <span
          >مجموع:‌ {{ order.count }} عدد |
          {{ order.payment_info.total_amount | currency
          }}<span class="toman">تومان</span></span
        >
      </div>

      <div class="person-payment">
        <span
          >پرداخت شده:‌
          <span class="g-text"
            >{{ order.payment_info.payed_amount | currency
            }}<span class="toman">تومان</span></span
          ></span
        >
        <span
          >پرداخت شما:‌
          <span class="p-text"
            >{{ order.my_payments.payed_amount | currency
            }}<span class="toman">تومان</span></span
          ></span
        >
      </div>

      <div
        v-if="
          order.payment_info.payed_amount != order.payment_info.total_amount &&
            history == false
        "
        :value="order.wish_to_pay"
        class="wish-to-pay"
      >
        <span>{{ order.wish_to_pay | currency }}</span
        ><span class="toman">تومان</span>
        <span id="wish-to-pay-text">از این محصول را میخواهید پرداخت کنید</span>
      </div>

      <div class="person-slider">
        <b-slider
          :id="`order-${index}-slider`"
          v-if="
            order.payment_info.payed_amount !=
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
            order.payment_info.total_amount - order.payment_info.payed_amount
          "
          :step="
            order.payment_info.total_amount - order.payment_info.payed_amount >=
              500 && order.payment_info.total_amount - order.wish_to_pay > 1000
              ? 500
              : 100
          "
        ></b-slider>
      </div>

      <div
        v-if="
          order.payment_info.payed_amount == order.payment_info.total_amount &&
            history == false
        "
        class="order-payment-done green"
      >
        <b-icon size="is-default" icon="check" type="is-light"> </b-icon>
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
    },
    first: {
      default: false
    }
  },
  data() {
    return {
      myOptions: {
        highlight: true,
        useKeyboardNavigation: false,
        labels: {
          buttonSkip: false,
          buttonPrevious: 'قبلی',
          buttonNext: 'چگونه پرداخت کنم؟',
          buttonStop: 'فهمیدم!'
        }
      },
      myCallbacks: {
        onNextStep: this.sliderAnimate
      },
      steps: [
        {
          target: '#order-0', // We're using document.querySelector() under the hood
          content: `سفارشات هر فرد با اطلاعات پرداختی آن در این قسمت قابل مشاهده است`
        },
        {
          target: '#order-0-slider', // We're using document.querySelector() under the hood
          content: `با کشیدن این اسلاید به سمت چپ و یا راست مبلغی که میخواهید پرداخت کنید را مشخص کنید`
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
      ]
    }
  },
  methods: {
    changeWishToPay(value, index, personName) {
      // for now i send peson name but later i will search by id
      this.$store.commit('table/changeWishToPay', {
        value,
        index,
        name: personName
      })
    },
    sliderAnimate(currentStep) {
      console.log(
        '[Vue Tour] A custom nextStep callback has been called on step ' +
          (currentStep + 1)
      )
      // if it's slider tour start the animation
      if (currentStep === 0) {
        setTimeout(() => {
          $('.b-slider-fill').addClass('animated-slider')
          $('.b-slider-thumb-wrapper').addClass('animated-slider')
          this.changeWishToPay(
            this.person.orders[0].payment_info.total_amount / 2,
            0,
            this.person.name
          )
        }, 1000)
        setTimeout(() => {
          this.changeWishToPay(0, 0, this.person.name)
        }, 2500)

        setTimeout(() => {
          $('.b-slider-fill').removeClass('animated-slider')
          $('.b-slider-thumb-wrapper').removeClass('animated-slider')
        }, 3500)
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
    initialTour: {
      immediate: true,
      handler(val, old) {
        if (val) {
          setTimeout(() => {
            this.$tours['sliderTour'].start()
            this.$store.commit('setFirstTime', false)
          }, 500)
        }
      }
    }
  }
}
</script>

<style scoped lang="sass">

</style>