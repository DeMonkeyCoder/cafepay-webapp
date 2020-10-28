import Vue from 'vue'
import axios from 'axios'

import {
  socketTable
} from '../middleware/models/table'
export const state = () => ({

  table_number: null,
  token: null,
  tpayment: 0,
  persons: [],
  payment: {},
  yourOrdersCost: 0,
  yourOrdersPaid: 0,
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
  newPerson(state, person) {
    state.you = person
  },

  clearData(state) {
    this.commit('setActiveTable', false)
    this.commit('changeNavigation', 'scan')
    state.token = null
    state.table_number = null
    state.persons = []
    state.tpayment = 0
    state.payment = {}
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
    let table = new socketTable(rawData, products, this.state.user.user.id)
    state.persons = table.persons
    state.payment = rawData.payment_info

    // bind the user's orders count to menu data
    // first we need to find the user using the app from persons array
    let user = table.persons.find(p => p.id == this.state.user.user.id)
    if (user) this.commit('cafe/bindProductCount', user)

  },

  updateTableDetail(state, data) {

  },
  setOrder(state, orderData) {
    state.yourOrdersCost = orderData.totalPrice
    state.you.orders = orderData.orders
  },
  payWholeBill(state) {
    // for (const order of state.you.orders) {
    //   order.wish_to_pay =order.payment_info.total_amount - order.payment_info.payed_amount
    // }
    for (const person of state.persons) {
      for (const order of person.orders) {
        order.wish_to_pay = order.payment_info.total_amount - order.payment_info.payed_amount
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
    let PayloadGeneral = productChangeArray.map(x => {
      return {
        product: x.product,
        count: x.count
      }
    })
    let deletionPayload = PayloadGeneral.filter(x => x.count < 0)
      .map(y => {
        return {
          count: y.count * -1,
          product: y.product
        }
      })
    let additionPayload = PayloadGeneral.filter(x => x.count > 0)

    // console.log('deletion', deletionPayload, 'additon', additionPayload);
    // define states of requests , maybe both deletation and addition or one of them alone
    let requestState;
    if (additionPayload.length && deletionPayload.length) requestState = 'both'
    if (additionPayload.length && !deletionPayload.length) requestState = 'addition'
    if (deletionPayload.length && !additionPayload.length) requestState = 'deletion'
    // console.log('request state', requestState);

    this.dispatch('table/changeProductsOnTable', {
      add: additionPayload,
      del: deletionPayload,
      state: requestState
    })

  }


}

export const actions = {
  tableConnection(context) {
    let joinRequest = {
      request: {
        endpoint: `table/${context.state.token}/join/simple/by-token/`,
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

  async changeProductsOnTable(context, req) {

    if (req.state == 'both') {
      context.commit("toggleLoading", true, {
        root: true
      })
      axios.all([
          axios.post(context.rootState.baseUrl + `api/v1/table/${context.state.token}/products/bulk/post/`, {
            table_products: req.add
          }, {
            headers: {
              'Authorization': 'Token ' + context.rootState.token,
            }
          }, ),
          axios.post(context.rootState.baseUrl + `api/v1/table/${context.state.token}/products/bulk/delete/`, {
            table_products: req.del
          }, {
            headers: {
              'Authorization': 'Token ' + context.rootState.token,
            }
          }, ),

        ])
        .then(axios.spread((add, remove) => {
          //... but this callback will be executed only when both requests are complete.\
          context.commit("toggleLoading", false, {
            root: true
          })
          context.commit('cafe/clearPCA', null, {
            root: true
          })
          setTimeout(() => {
            context.commit('changeNavigation', 'cp-table', {
              root: true
            })
          }, 200);

        }))
        .catch(err => {
          context.commit("toggleLoading", false, {
            root: true
          })
          //... but this callback will be executed only when both requests are complete.
          if (err.response) {
            context.commit('errorMsg', err.response.data, {
              root: true
            })
          }

        })
    } else {
      let method = (req.state == 'addition') ? 'post' : 'delete'
      let table_products = (method == 'post') ? req.add : req.del
      try {
        let data = await this.$api.$post(`api/v1/table/${context.state.token}/products/bulk/${method}/`, {
          table_products
        })
        // clear the array of product changes
        context.commit('cafe/clearPCA', null, {
          root: true
        })
        setTimeout(() => {
          context.commit('changeNavigation', 'cp-table', {
            root: true
          })
        }, 200);

      } catch (err) {
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
        }
      }
    }


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
      context.commit('errorMsg', 'خطایی رخ داده، مجددا امتحان کنید', {
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
      context.commit('errorMsg', 'خطایی رخ داده، مجددا امتحان کنید', {
        root: true
      })
    }
  }
}
