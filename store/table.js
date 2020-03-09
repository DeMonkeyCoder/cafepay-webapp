export const state = () => ({
  table: {
    persons: [],
    you: {
      orders: []
    },
    totalPrice: ''
  }
})

export const getters = {

}

export const mutations = {
  newPerson(state, person) {
    state.table.you = person
  },
  updateTableDetail(state, data){

  },
  setOrder(state, orderData) {
    state.you.totalPrice = orderData.totalPrice
    state.you.orders = orderData.orders
  }
}

export const actions = {

}