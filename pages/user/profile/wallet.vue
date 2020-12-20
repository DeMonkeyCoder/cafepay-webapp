<template>
  <div :dir="$dir()">
    <div class="cp-header cp-tb-padding cp-side-padding">
      <div @click="$router.go(-1)" class="go-back cp-tb-padding">
        <b-icon size="is-medium" icon="chevron-left" type="is-light"></b-icon>
      </div>
    </div>

    <div
      class="profile-info-bar cp-side-padding cp-tb-padding long-shadow cp-side-margin cp-header-card has-background-white"
    >
      <div class="info">
        <img class="no-pic" src="@/assets/img/shape/icons/wallet.png" alt />
        <h4 class="header cp-tb-padding cp-side-padding">موجودی و تراکنش‌ها</h4>
        <p :dir="$dir()" class="detail cp-tb-padding cp-side-padding">
          موجودی:
          <span class="p-text font-18">{{user.balance | currency}}</span>
          <!-- <span class="toman">تومان</span> -->
        </p>
      </div>
    </div>

    <section class="content-below-profile-bar cp-side-margin">
      <div class="charge-wallet cp-b-margin-2x">
        <div class="amout-options cp-b-margin">
          <div class="cp-side-padding-half" v-for="amount in amountOptions" :key="amount">
            <span @click="changePayAmount(amount)" class="font-16 cp-btn cp-btn-primary-inverted">
              {{amount | currency}}
              <!-- <span class="toman">تومان</span> -->
            </span>
          </div>
        </div>

        <b-field>
          <b-input id="amountInput" inputmode="numeric" v-model="payAmount" class="cp-input cp-input-primary" 
          placeholder="مبلغ را وارد کنید" icon="toman"></b-input>
        </b-field>
        <b-button :disabled="payAmount == null || payAmount == ''" class="bcp-btn bcp-btn-large btn-font-bold"
         type="is-success" expanded>پرداخت</b-button>

      </div>

      <div class="transaction-list">
        <header class="font-16 font-norm cp-b-margin">لیست تراکنش‌ها</header>
        <div class="cp-card ta-card has-background-white cp-padding cp-b-margin" v-for="ta in transactions" :key="ta.date">
          <span class="ta-date font-12 grey-text">
            {{ta.date | cmoment('LLLL')}}
          </span>
          <span class="ta-status" 
          :class="{'g-text': ta.status_type == 0, 'p-text': ta.status_type == 1}">
          {{ta.status}}</span>
          &nbsp;-&nbsp;
          <span class="ta-amount font-16" 
          >
          {{ta.amount | currency}}
          <!-- <span class="wallet-toman font-12">تومان</span> -->
          </span>
          
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AutoNumeric from '@/node_modules/autonumeric/dist/autoNumeric.min.js'
export default {
  data() {
    return {
      amountOptions: [30000, 50000, 100000],
      payAmount: null,
      autoNumbricElement: null,
      tomanElement: null,
      transactions: [
        {
          date: "2020-09-27 22:10:48",
          amount: 12000,
          status_type: 0,
          status: 'افزایش موجودی'
        },
        {
          date: "2019-11-23 22:10:48",
          amount: 18000,
          status_type: 1,
          status: 'کسر از موجودی'
        },
        {
          date: "2019-09-27 22:10:48",
          amount: 27000,
          status_type: 1,
          status: 'کسر از موجودی'
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    },

  },
  methods: {
    changePayAmount(amount) {
      this.payAmount = amount
      this.autoNumbricElement.set(amount)
      this.tomanElement.style.color = this.colors.primary
    },
  },
  mounted() {
    this.autoNumbricElement = new AutoNumeric('.cp-input > input', {decimalPlaces: 0,digitGroupSeparator : ','})
    setTimeout(() => {
      this.tomanElement = document.getElementById('amountInput').nextElementSibling
      this.tomanElement.innerHTML = 'تومان'
      this.tomanElement.style.setProperty("font-weight", "600", "important")
      this.tomanElement.style.fontSize = '12px'
      this.tomanElement.style.left = "10px"
      this.tomanElement.style.paddingTop = "1.25rem"
    }, 100);
    
  }
}
</script>

<style scoped lang="sass">
// Normalize/Reset only elements used


// Mixin for shadow button with block sliding up
  // $easing: cubic-bezier(0.4, 0, 0.2, 1)



</style>