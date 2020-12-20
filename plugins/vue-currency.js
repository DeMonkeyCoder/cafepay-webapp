import Vue from 'vue'
import VueCurrencyFilter from "vue-currency-filter";
import config from './config'
//TODO: handle currency dynamically
Vue.use(VueCurrencyFilter, config.defaultLocale == 'fa' ? {
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