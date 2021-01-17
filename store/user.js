// user section includes 3 major Data-set 
// 1. user profile info can be A.retrieved B.updated C.created
// 2. user wallet transaction can be A.created (charge wallet)  B.retrieved
// 3. number that can be Changed
import Vue from 'vue'
import User from '../middleware/models/user'
import {
  Table
} from '../middleware/models/table'
export const state = () => ({
  history: {
    next: null,
    count: 0,
    data: []
  },
  user: {

  }
})

export const getters = {

}

export const mutations = {
  set(state, user) {
    state.user = new User(user)
  },
  clear(state) {
    state.user = {}
  },
  clearHistory(state) {
    state.history = {
      next: null,
      count: 0,
      data: []
    }
  },
  setHistory(state, payload) {
          state.history.count = payload.res.count
          state.history.next = payload.res.next
          for (let i = 0; i < payload.res.results.length; i++) {
            let rawOrder = payload.res.results[i]
            let table = new Table(rawOrder, this.state.user.id)
            table.payment = rawOrder.payment_info.total_amount
            table.cafe = rawOrder.cafe.name
            table.date = rawOrder.datetime
            table.id = rawOrder.pk

            //TODO: this was added to show bill products in order list. not sure if
            // it should be here
            table.payment_info = rawOrder.payment_info
            table.bill_products = rawOrder.bill_products
            table.is_closed = rawOrder.is_closed
            table.is_preorder = true
            if(rawOrder.bill_products.filter(order => order.get_status_display == 'Canceled').length > 0) {
              table.status = 'Canceled'
            } else if(rawOrder.bill_products.filter(order => order.get_status_display == 'Pending').length > 0) {
              table.status = 'Pending'
            } else if(rawOrder.bill_products.filter(order => order.get_status_display == 'Accepted').length > 0) {
              table.status = 'Accepted'
            } else if(rawOrder.bill_products.filter(order => order.get_status_display == 'Kitchen').length > 0) {
              table.status = 'Kitchen'
            } else if(rawOrder.bill_products.filter(order => order.get_status_display == 'Ready').length > 0) {
              table.status = 'Ready'
            } else if(rawOrder.bill_products.filter(order => order.get_status_display != 'Delivered').length == 0) {
              table.status = 'Delivered'
            } else {
              table.status = 'Unknown'
            }

            state.history.data.push(table)

          }
          console.log('history res', state.history)
  },
  clearTable_uuid(state) {
    state.user.table_uuid = null
  },
  setTable_uuid(state, data) {
    state.user.table_uuid = data
  }
  

}

export const actions = {

  getOrderHistory(context , next) {
    return new Promise((resolve, reject) => {
      let url;
      url = (next) ? context.state.history.next.split('cafepay.app')[1] : '/api/v1/user-profile/orders/history/'
      this.$api.$get(url, {
          params: {}
        }).then(res => {
          if(!next) {
            context.commit('clearHistory')
          }
          context.commit('setHistory', {res , next})
          // context.commit('setHistoryOrder', res)
          resolve(res)
        })

        .catch(err => {
          reject(err)

        })
    })
  },

  retrieve(context) {
    return new Promise((resolve, reject) => {

      this.$api.$get('/api/v1/user-profile/', {
          params: {}
        }).then(res => {
          context.commit('set', res)
          if (res.active_table_uuid) {
            context.commit('cafe/setType', 'pre-order', {
              root: true
            })
            context.commit('table/setToken', {
              token: res.active_table_uuid,
              number: 'پیش سفارش'
            }, {root: true})
            Vue.prototype.$connect()
          }
          resolve(res)
        })

        .catch(err => {
          reject(err)

        })
    })


  },

}
