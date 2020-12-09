import Vue from 'vue'
import config from './config'
const moment = require('jalali-moment')
moment.locale(config.defaultLocale)
Vue.filter('cmoment', (value, arg) => {
  return moment(value, "YYYY-M-D HH:mm:ss").format(arg)
});
Vue.prototype.moment = moment