import Vue from 'vue'
import axios from 'axios'

import {
  Table
} from '../middleware/models/table'
export const state = () => ({

  table_number: null,
  token: null,
  status: null,
  paymentMethod: 'online',
  cafe: '',
  tpayment: 0,
  joinId: null,
  persons: [],
  payment: {},
  description: null,
  hasOnlinePayment: false,
  yourOrdersCost: 0,
  yourOrdersPaid: 0,
  paid: false,
  hasCashierOrder: false,
  keepAlive: false,
  you: {
    orders: []
  },
})

export const getters = {

  totalWishToPay(state) {
    let others = state.persons.reduce((sum, person) => {
      let innerSum = person.orders.reduce((innerSum, order) => order.wish_to_pay + innerSum, 0)
      return innerSum + sum
    }, 0)
    // let others = state.persons.reduce((Sum, person) => person.totalPaid + Sum, 0)
    // return others + state.you.orders.reduce((Sum, order) => order.wish_to_pay + Sum, 0)
    return others
  },



}

export const mutations = {
  setToken(state, table) {
    state.token = null
    state.table_number = null

    state.token = table.token
    state.table_number = table.number
  },
  
  setKeepAlive(state) {
    state.keepAlive = true
  },

  clearData(state) {
    this.commit('setActiveTable', false)
    this.commit('changeNavigation', 'scan')
    state.token = null
    state.table_number = null
    state.persons = []
    state.description = null
    state.joinId = null
    state.tpayment = 0
    state.paymentMethod = 'online'
    state.payment = {}
    state.hasCashierOrder = false
    state.you = {
      orders: []
    }
    
  },

  setData(state, rawData) {
    // this is raw data from socket
    // compute data by person and his orders
    // back-end doesn't give product name on table ... 
    //.. so get it from cafe store
    // first compute an array of products from categories (flatten products then)
    let products = this.state.cafe.categories.map(c => c.products)
    products = [].concat.apply([], products)
    // we pass the user id for slider to be full for user
    let table = new Table(rawData, this.state.user.user.id)
    state.persons = table.persons
    state.payment = rawData.payment_info
    state.description = rawData.description
    state.status = table.status
    state.paid = false
    state.joinId = rawData.pk
    state.paid = table.paid
    state.empty = table.empty
    state.paymentMethod = table.paymentMethod
    state.hasOnlinePayment = table.hasOnlinePayment
    state.hasCashierOrder = table.hasCashierOrder
    // we use this data to handle payment status in preorder
    state.cafe = rawData.cafe


    // bind the user's orders count to menu data
    // first we need to find the user using the app from persons array
    let user = state.persons.find(p => p.id == this.state.user.user.id)
    if (user) {
      state.you = user
      this.commit('cafe/bindProductCount', user)
    } else {
      this.commit('cafe/clearBasket')
    }

  },

  changeChashierCount(state, order) {
    // for persons being more than 1
    for (const person of state.persons) {
      if (person.cashier) {
        person.orders[order.index].cashier_count = order.cashier_count
        person.orders[order.index].wish_to_pay = order.cashier_count * order.unit_amount
      }
    }
    console.log('person cashier', state.persons);
  },

  updateTableDetail(state, data) {

  },
  setOrder(state, orderData) {
    state.yourOrdersCost = orderData.totalPrice
    state.you.orders = orderData.orders
  },
  payWholeBill(state) {
    // for (const order of state.you.orders) {
    //   order.wish_to_pay =order.payment_info.total_amount - order.payment_info.net_payed_amount
    // }
    for (const person of state.persons) {
      for (const order of person.orders) {
        order.wish_to_pay = order.payment_info.total_amount - order.payment_info.net_payed_amount
      }
    }
  },
  setDefaultPayment(state) {
    for (const person of state.persons) {
      for (const order of person.orders) {
        order.wish_to_pay = 0
      }
    }
  },
  changeWishToPay(state, orderIdentity) {

    for (const person of state.persons) {

      if (person.name == orderIdentity.name) {
        person.orders[orderIdentity.index].wish_to_pay = orderIdentity.value
        break
      }
    }
  },

  setPayment: (state, value) => state.tpayment = value,

  clearWishToPay(state) {
    // wish to pay to 0 because we dont have redirection to the bank yet
    // maybe need it for good
    for (const person of state.persons) {
      for (const order of person.orders) {
        if (order.wish_to_pay > 0) {
          order.wish_to_pay = 0
        }
      }
    }
  },
  productsPayloadSeperator(state, productChangeArray) {
    // delete capital because we don't need it


  }


}

export const actions = {
  tableConnection(context , preOrderToken) {
    let token = (preOrderToken) ? preOrderToken : context.state.token
    let joinRequest = {
      request: {
        endpoint: `table/${token}/join/simple/by-token/`,
        data: {},
        headers: {
          Authorization: "Token " + context.rootState.token
        },
        method: "WATCH"
      }
    };
    let joinRequest_str = JSON.stringify(joinRequest);
    Vue.prototype.$socket.send(joinRequest_str);

  },


  changeProductsOnTable(context, req) {

    return new Promise((resolve, reject) => {
      if (req.state == 'both') {
        context.commit("toggleLoading", true, {
          root: true
        })
        axios.all([
            axios.post(context.$config.baseUrl + `api/v1/table/${context.state.token}/products/bulk/post/`, {
              table_products: req.add
            }, {
              headers: {
                'Authorization': 'Token ' + context.rootState.token,
              }
            }, ),
            axios.post(context.$config.baseUrl + `api/v1/table/${context.state.token}/products/bulk/delete/`, {
              table_products: req.del
            }, {
              headers: {
                'Authorization': 'Token ' + context.rootState.token,
              }
            }, ),

          ])
          .then(axios.spread((add, remove) => {
            resolve(true)
            // in-case user leaves the menu keep alive the socket (dont disconnect it)
            if (context.rootState.cafe.tokenType == 'pre-order' || context.rootState.cafe.tokenType == 'delivery') context.commit('setKeepAlive')
            //... but this callback will be executed only when both requests are complete.\
            context.commit("toggleLoading", false, {
              root: true
            })
            // clear product change array
            context.commit('cafe/clearPCA', null, {
              root: true
            })
            setTimeout(() => {
              context.commit('changeNavigation', 'cp-table', {
                root: true
              })
              context.commit('cafe/changeActiveCategory', 0, {
                root: true
              })
            }, 200);


          }))
          .catch(err => {
            reject(err)
            context.commit("toggleLoading", false, {
              root: true
            })
            //... but this callback will be executed only when both requests are complete.
            context.dispatch('throwBulkError', err)

          })
      } else {
        let method = (req.state == 'addition') ? 'post' : 'delete'
        let table_products = (method == 'post') ? req.add : req.del

        this.$api.$post(`api/v1/table/${context.state.token}/products/bulk/${method}/`, {
            table_products
          })
          .then(res => {
            if (context.rootState.cafe.tokenType == 'pre-order' || context.rootState.cafe.tokenType == 'delivery') context.commit('setKeepAlive')
            resolve(res)
            context.commit('cafe/clearPCA', null, {
              root: true
            })
            setTimeout(() => {
              context.commit('changeNavigation', 'cp-table', {
                root: true
              })
              context.commit('cafe/changeActiveCategory', 0, {
                root: true
              })
            }, 200);
          })
          // clear the array of product changes


          .catch(err => {
            reject(err)
            context.dispatch('throwBulkError', err)
          })
      }
    })

  },

  throwBulkError(context, err) {
      if (err.response) {
        if (err.response.status == 400 & err.response.data.details[0].product) {
          let id = err.response.data.details[0].product
          let remaining = err.response.data.details[0].remaining
          let product = context.rootGetters["cafe/productById"](id)
          let message = (remaining > 0) ? `از محصول ${product.name} فقط ${remaining} موجود است` : `${product.name} تمام شده است`
          context.commit('errorMsg', message, {
            root: true
          })
        }
        if (err.response.status == 410) context.commit('errorMsg', 'سفارش گیری غیرفعال است', {
          root: true
        })
      }
  },

  setPaymentMethod(context, data){
    return new Promise((resolve, reject) => {
      this.$api.$post(`/api/v1/cafe/${context.state.cafe.pk}/pbr/payment/method/`, {
          pbr_payment_methods: data
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          context.commit('errorMsg', $nuxt.$i18n.t('unknown_error'), {
            root: true
          })
        })
      
    })
 
  },

  async submitPayment(context, payments) {
    // for now that we dont have backend actual payment

    // first get the orders that you wish to pay

    // context.commit('clearWishToPay')
    try {
      let data = await this.$api.$post(`/api/v1/pbr/session/create/`, {
        payments
      })
      context.commit('clearWishToPay')
      // context.commit('setPayment', 0)
      // if u wanna vefiry the payment
      context.dispatch('paymentMake', data.invoice_uuid)
    } catch (err) {
      context.commit('errorMsg', $nuxt.$i18n.t('unknown_error'), {
        root: true
      })

    }
  },
  async paymentMake(context, id) {
    try {
      let data = await this.$api.$get(`/api/v1/payment/make/${id}/`)
      window.location = data.redirect_to
      // this.app.router.push('/paymentResult')
    } catch (err) {
      context.commit('errorMsg', $nuxt.$i18n.t('unknown_error'), {
        root: true
      })
    }
  }
}
