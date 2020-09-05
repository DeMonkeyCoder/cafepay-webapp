import Vue from 'vue'
import {
  Category
} from '../middleware/models/cafe'

export const state = () => ({
  pk: null,
  name: null,
  avatar: null,
  productChangeArray: [],
  info: {},
  posts: {},
  categories: [],
  currentProduct: {},
  productsFork: [],
  productPageActive: false
})

export const getters = {
  productsFlatten: state => {
    let products = state.categories.map(c => c.products)
    return [].concat.apply([], products)
  }
}

export const mutations = {
  setBasic(state, cafe) {
    state.rate = (cafe.rate) ? cafe.rate : 4
    state.pk = cafe.pk
    state.name = cafe.name
    state.avatar = cafe.avatar

  },
  clear(state) {
    state.summery = {}
    state.info = {}
    state.posts = {}
    state.categories = []
  },
  changeCount(state, setting) {
    state.categories[setting.categoryIndex].products[setting.productIndex].count += setting.count
  },

  setMenu(state, menu) {
    for (const category of menu.categories) {
      state.categories.push(new Category(category))
    }
  },

  setCurrentProduct(state, product) {
    state.currentProduct = product
    state.productPageActive = true
  },
  clearProduct(state) {
    state.currentProduct = {}
    state.productPageActive = false
  },

  bindProductCount(state, user) {
    for (const cateogry of state.categories) {
      for (const product of cateogry.products) {
        let matchedOrder = user.orders.find(p => p.product == product.pk)
        if (matchedOrder) {
          // check if order has payments for reduce order count
          product.reduceLimit = Math.ceil(matchedOrder.payment_info.payed_amount / matchedOrder.unit_amount)
          product.count = matchedOrder.count
        }
      }
    }
    // fork menu for detect changes
    // let productsForkStr = JSON.stringify(this.getters.productsFlatten)
    // state.productsFork = JSON.parse(productsForkStr)
  },

  changeDetection(state, product) {
    // let's see if its already exist in product change array
    let MatchIndex = state.productChangeArray.findIndex(p => p.product == product.id)

    if (MatchIndex != -1) {
      // if it exist find it on the array and change it
      state.productChangeArray[MatchIndex].count += product.count
      state.productChangeArray[MatchIndex].capital += product.count * product.price
      if ( state.productChangeArray[MatchIndex].count == 0 ) {
         state.productChangeArray = state.productChangeArray.filter(p => p.product != product.id)
      }

    }
    else {
      // if not push it to the array
      state.productChangeArray.push({product: product.id, count: product.count, capital: product.count * product.price})

    }
    console.log('rpoduct change array', state.productChangeArray);
    

  },

  flattenProducts(state) {
    stateproducts = state.categories.map(c => c.products)
  }
}

export const actions = {
  async retrieveMenu(context) {
    try {
      let data = await this.$axios.$get(`/api/v1/cafe/${context.state.pk}/category-based-menu/active/`, {
        params: {},
        headers: {
          'Authorization': 'Token ' + context.rootState.token,
        }
      })
      console.log('cafe menu', data);
      context.commit('setMenu', data)
      // after retrieving the menu we need to establish a connection with socket to retrieve table data
      // why after menu data ? because we need menu data for build table data
      // if sina give me the name of product with table data then we don't need this sequence anymore
      // connect to socket
      Vue.prototype.$connect()
    } catch (err) {

    }


  },
}
