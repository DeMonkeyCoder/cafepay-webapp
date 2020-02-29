import Vue from 'vue'
import VueCurrencyFilter from "vue-currency-filter";

Vue.use(VueCurrencyFilter, {
  symbol: "",
  thousandsSeparator: ",",
  fractionCount: 0,
  fractionSeparator: "0",
  symbolPosition: "front",
  symbolSpacing: true
});