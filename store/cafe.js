import Vue from 'vue'
import {
  Category
} from '../middleware/models/cafe'

export const state = () => ({
  pk: null,
  name: null,
  avatar: null,

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
          let locked_count = Math.ceil(matchedOrder.payment_info.payed_amount / matchedOrder.unit_amount)
          product.count = matchedOrder.count - locked_count
        }
      }
    }
    // fork menu for detect changes
    let productsForkStr = JSON.stringify(this.getters.productsFlatten)
    state.productsFork = JSON.parse(productsForkStr)
  },

  changeDetection(state, product) {
    // compare menu product count with its fork
    let productMenu = this.getters.productsFlatten.find(p => p.id)
    let productFork = state.productsFork.find(p => p.id)
    let change = productFork.count - productMenu.count

    // we need to separate addition from deletion if its addition we store the chanage
    // then on submit btn send changes to the server
    // if its deletion we dispatch it on every delete click and notify user
    switch (change) {
      case value:

        break;

      case value:

        break;

      case value:

        break;

      default:
        break;
    }
    let method = product.count == 1 ? 'POST' : 'DELETE'
    if (product.count == 1) {
      // addition here

    } else {
      // deletion here
      // this.dispatch('table/changeProductsOnTable', {
      //   method,
      //   productId
      // })
    }
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
