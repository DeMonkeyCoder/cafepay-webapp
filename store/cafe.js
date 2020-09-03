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
  productPageActive: false
})

export const getters = {

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
  clearProduct(state, product) {
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
    console.log('tada find your user', user);

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
    } catch {

    }


  },
}
