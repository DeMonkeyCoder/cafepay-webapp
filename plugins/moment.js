import Vue from 'vue';
import moment from 'moment-jalaali'
moment.loadPersian({
  // usePersianDigits: true,
  dialect: 'persian-modern'
})
Vue.filter('cmoment', (value, arg) => {
  return moment(value, "YYYY-M-D HH:mm:ss ").format(arg)
});

Vue.use(require('vue-moment-jalaali'))