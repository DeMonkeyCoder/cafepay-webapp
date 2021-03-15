import Vue from 'vue'
import VueCurrencyFilter from "vue-currency-filter";

//TODO: handle currency dynamically
Vue.use(VueCurrencyFilter, process.env.CAFEPAY_WEBAPP_DEFAULT_LOCALE == 'fa' ? {
  symbol: "تومان",
  thousandsSeparator: ",",
  fractionCount: 0,
  fractionSeparator: "0",
  symbolPosition: "back",
  symbolSpacing: true
} : {
  symbol: "$",
  thousandsSeparator: ",",
  fractionCount: 2,
  fractionSeparator: ".",
  symbolPosition: "back",
  symbolSpacing: false
});