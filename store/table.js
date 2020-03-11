export const state = () => ({

    table_number: 3,
    payment: 0,
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
            you_paid: 0,
            price: 38000,
            count: 1
          }, {
            name: 'پیتزا قارچ و گوشت',
            original_price: 45000,
            discount: 0,
            paid: 0,
            wish_to_pay: 0,
            you_paid: 0,
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
  },
  totalWishToPay(state) {
    let others = state.persons.reduce((sum, person) => {
      let innerSum = person.orders.reduce((innerSum, order) => order.wish_to_pay + innerSum, 0)
      return innerSum + sum
    }, 0)
    // let others = state.persons.reduce((Sum, person) => person.totalPaid + Sum, 0)
    return others + state.you.orders.reduce((Sum, order) => order.wish_to_pay + Sum, 0)
  },
  
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
  },
  changeWishToPay(state, orderIdentity) {
    if (state.you.name == orderIdentity.name) {
      state.you.orders[orderIdentity.index].wish_to_pay = orderIdentity.value
    }
    else {
      for (const person of state.persons) {
        if (person.name == orderIdentity.name) {
          person.orders[orderIdentity.index].wish_to_pay = orderIdentity.value
          break
        }
      }
    }
  },
  setPayment: (state, value) => state.payment = value,
  submitPayment(state, payload){
    state.payment = payload
    // your orders
    state.yourOrdersPaid += state.you.orders.reduce( (sum, order) => order.wish_to_pay + sum, 0)
      for (const order of state.you.orders) {
         if( order.wish_to_pay > 0) {
           order.you_paid += order.wish_to_pay
           order.paid += order.you_paid
           order.wish_to_pay = 0 
         } 
      }
      
    // other orders
    for (const person of state.persons) {
      person.totalPaid += person.orders.reduce((sum, order) => order.wish_to_pay + sum, 0)
      for (const order of person.orders) {
        if (order.wish_to_pay > 0) {
          order.you_paid += order.wish_to_pay
          order.paid += order.you_paid
          order.wish_to_pay = 0
        }
      }
    }
  },
}

export const actions = {

}