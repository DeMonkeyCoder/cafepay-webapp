import Vue from 'vue'
import {
  socketTable
} from '../middleware/models/table'
export const state = () => ({

  table_number: 3,
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
    state.token = table.token
  },
  newPerson(state, person) {
    state.you = person
  },

  setData(state, rawData) {
    // this is raw data from socket
    // compute data by person and his orders
    // back-end doesn't give product name on table ... 
    //.. so get it from cafe store
    // first compute an array of products from categories (flatten products then)
    let products = this.state.cafe.categories.map(c => c.products)
    products = [].concat.apply([], products)
    let table = new socketTable(rawData, products)
    state.persons = table.persons
    state.payment = rawData.payment_info

    // bind the user's orders count to menu data
    // first we need to find the user using the app from persons array
    let user = table.persons.find(p => p.id == this.state.user.user.id)
    console.log('table !', table);
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

  async changeProductsOnTable(context, command) {
    
    try {
      let data = await this.$axios.
      $post(`table/${context.state.token}/products/bulk/${command.method}/`, {
        payments
      }, {
        headers: {
          'Authorization': 'Token ' + context.rootState.token,
        }
      })
      console.log('invoice data', data);
      context.dispatch('paymentVerify', data.invoice_uuid)
    } catch (err) {

    }
    let addProductRequest = {
      request: {
        endpoint: `table/${context.state.token}/product/${command.productId}/`,
        data: {},
        headers: {
          Authorization: "Token " + context.rootState.token
        },
        method: command.method
      }
    };

    let addProductRequest_str = JSON.stringify(addProductRequest);
    console.log('add product', addProductRequest_str);
    Vue.prototype.$socket.send(addProductRequest_str);

  },

  async submitPayment(context, payload) {
    // for now that we dont have backend actual payment

    // first get the orders that you wish to pay
    let payments = []
    for (const person of context.state.persons) {
      for (const order of person.orders) {
        if (order.wish_to_pay > 0) {
          payments.push({
            pbr: order.pk,
            amount: order.wish_to_pay
          })
        }
      }
    }
    context.commit('setPayment', payload)
    // context.commit('clearWishToPay')
    try {
      let data = await this.$axios.$post(`/api/v1/pbr/session/create/`, {
        payments
      }, {
        headers: {
          'Authorization': 'Token ' + context.rootState.token,
        }
      })
      console.log('invoice data', data);
      context.dispatch('paymentVerify', data.invoice_uuid)
    } catch (err) {

    }
  },
  async paymentVerify(context, id) {
    try {
      let data = await this.$axios.$get(`/api/v1/payment/verify/${id}/`, {
        headers: {
          'Authorization': 'Token ' + context.rootState.token,
        }
      })
      this.app.router.push('/paymentResult')
    } catch (err) {

    }
  }
}
