export const state = () => ({

    table_number: 3,
    persons: [
      {
        name: 'امیرعرفان',
        avatar: 'https://avatars0.githubusercontent.com/u/35772794?s=460&v=4',
        totalPrice: 83000,
        totalPaid: 34000,
        orders: [
          {
            name: 'پیتزا پپرونی',
            original_price: 38000,
            discount: 0,
            paid: 34000,
            wish_to_pay: 0,
            price: 38000,
            count: 1
          }, {
            name: 'پیتزا قارچ و گوشت',
            original_price: 45000,
            discount: 0,
            paid: 0,
            wish_to_pay: 0,
            price: 45000,
            count: 2
          },
        ]
      }
    ],
    
    yourOrdersCost: 0,
    yourOrdersPaid: 0,
    you: {
      orders: []
    },
})

export const getters = {
  ordersTotalCost(state) {
    let others = state.persons.reduce( (Sum, person) => person.totalPrice + Sum,  0)
    return others + state.yourOrdersCost
  },
  ordersTotalPaid(state) {
    let others = state.persons.reduce((Sum, person) => person.totalPaid + Sum, 0)
    return others + state.yourOrdersPaid
  }
}

export const mutations = {
  newPerson(state, person) {
    state.you = person
  },
  updateTableDetail(state, data){

  },
  setOrder(state, orderData) {
    state.yourOrdersCost = orderData.totalPrice
    state.you.orders = orderData.orders
  }
}

export const actions = {

}