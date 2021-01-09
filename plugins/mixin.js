import Vue from 'vue'
import config from '~/plugins/config.js'
Vue.mixin({
  data() {
    return {
      baseUrl: config.baseUrl,
      cloading: false,
      colors: {
        primary: '#009fe3',
        secondary: '#E91E63',
        thirdinary: '#006FB9',
        black: '#4a4a4a',
        darkGrey: '#595959',
        grey: '#717070',
        lightGrey: '#E4E4E4',
        lightblue: '#29abe2',
        blueShade: '#F2F6F9',
        green: '#20BC32',
        purple: '#8e24aa',
      }
    }
  },

  methods: {
    toaster(massage, type, position) {
      this.$buefy.toast.open({
        duration: 3000,
        message: massage,
        position,
        type: type
      })
    },
    convertPersian(str) {
      let persianNumbers = [
          /۰/g,
          /۱/g,
          /۲/g,
          /۳/g,
          /۴/g,
          /۵/g,
          /۶/g,
          /۷/g,
          /۸/g,
          /۹/g
        ],
        arabicNumbers = [
          /٠/g,
          /١/g,
          /٢/g,
          /٣/g,
          /٤/g,
          /٥/g,
          /٦/g,
          /٧/g,
          /٨/g,
          /٩/g
        ]

      if (typeof str === 'string') {
        for (let i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
        }
      }
      return str
    }
  },
  mounted() {

    // if (this.token !== null && this.user == null) {
    // this.$store.dispatch('user/retrive')
    // }
  },
  computed: {
    // ...mapState(['']),
    hasActiveTable() {
      return this.$store.state.hasActiveTable
    },
    token() {
      return this.$store.state.token
    },
    userIsloggedIn() {
      return (
        this.token != null &&
        this.token != 'undefiend' &&
        this.token != undefined
      )
    },
    tableToken() {
      return this.$store.state.table.token
    },
    globalLoading() {
      return this.$store.state.globalLoading
    },
    user() {
      return this.$store.state.user.user
    },
    table() {
      return this.$store.state.table
    },
    ordersPaid() {
      return ((this.table.payment.total_amount - this.table.payment.net_payed_amount == 0) && this.table.payment.total_amount > 0)
    },
    tokenType() {
      return this.$store.state.cafe.tokenType
    },
    errorMsg() {
      return this.$store.state.errorMessage
    },
    errorThrow() {
      return this.$store.state.errorThrow
    },
    guides(){
      return this.$store.state.guides
    },
    userIsFetched() {
      return (this.user.id) ? true : false
    },
    socketIsConnected() {
      return this.$store.state.socket.isConnected
    },
    userHasOrder(){
      return this.table.you.orders.length
    }
  },

})
