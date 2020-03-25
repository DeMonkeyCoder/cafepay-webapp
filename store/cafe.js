import {  Category } from '../middleware/models/cafe'

export const state = () => ({
  summery: {},
  info: {},
  posts: {},
  categories: [],
  currentProduct: {},
  productPageActive: false
})

export const getters = {

}

export const mutations = {
  set(state, cafe) {
    state.summery = {
      name: cafe.name,
      avatar: cafe.avatar,
      rate: cafe.rate,
      table: cafe.table
    }
    for (const category of cafe.products_by_category) {
      state.categories.push(new Category(category))
    }
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

  setCurrentProduct(state, product){
    state.currentProduct = product
    state.productPageActive = true
  },
  clearProduct(state, product){
    state.currentProduct = {}
    state.productPageActive = false
  }

}

export const actions = {

}