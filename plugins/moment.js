import Vue from 'vue'

const moment = require('jalali-moment')
moment.locale(process.env.CAFEPAY_WEBAPP_DEFAULT_LOCALE)
Vue.filter('cmoment', (value, arg) => {
  return moment(value, "YYYY-M-D HH:mm:ss").format(arg)
});
Vue.prototype.moment = moment