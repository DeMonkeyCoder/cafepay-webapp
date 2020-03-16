export const state = () => ({
    orders: [{
        date: 'یکشنبه ۱۹ بهمن ۱۳۹۸ ۱۲:۵۴',
        bill: 144000,
        cafeName: 'کافه هدایت',
        id: 1,
        persons: [
            {
              name: 'علی علی بیگی',
              avatar: 'https://avatars0.githubusercontent.com/u/23187274?s=460&v=4',
              totalPrice: 128000,
              totalPaid: 34000,
              orders: [{
                name: 'پیتزا پپرونی',
                original_price: 38000,
                discount: 0,
                paid: 34000,
                wish_to_pay: 0,
                you_paid: 0,
                price: 38000,
                count: 1
              } 
            ]
            },
            {
              name: 'امیرعرفان',
              avatar: 'https://avatars0.githubusercontent.com/u/35772794?s=460&v=4',
              totalPrice: 128000,
              totalPaid: 34000,
              orders: [{
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
              }, ]
            }
        ],
        avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg'
      },
      {
        date: 'سه‌شنبه ۲۱ بهمن ۱۳۹۸ ۲۰:۳۳',
        bill: 67000,
        cafeName: 'کافه فردوسی',
        id: 2,
        persons: [{
            name: 'علی علی بیگی',
            avatar: 'https://avatars0.githubusercontent.com/u/23187274?s=460&v=4',
            totalPrice: 128000,
            totalPaid: 34000,
            orders: [{
              name: 'پیتزا پپرونی',
              original_price: 38000,
              discount: 0,
              paid: 34000,
              wish_to_pay: 0,
              you_paid: 0,
              price: 38000,
              count: 1
            }]
          },
        ],
        avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg'
      },
      {
        date: 'جمعه ۱۷ بهمن ۱۳۹۸ ۲۱:۱۰',
        bill: 275000,
        cafeName: 'رستوران باغ‌شاه',
        id: 3,
        avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg'
      },
      {
        date: 'سه‌شنبه ۱۴ بهمن ۱۳۹۸ ۱۸:۲۲',
        bill: 122000,
        cafeName: 'کافه هدایت',
        id: 4,
        avatar: 'https://icoff.ee/cafe/wp-content/uploads/2014/10/6.-Hedayat-Cafe-Restaurant-%DA%A9%D8%A7%D9%81%D9%87-%D8%B1%D8%B3%D8%AA%D9%88%D8%B2%D8%A7%D9%86-%D9%87%D8%AF%D8%A7%DB%8C%D8%AA.jpg'
      }
    ],
    currentOrder: {
      persons: []
    }
})

export const getters = {

}

export const mutations = {
  get(state, id) {
    state.currentOrder = state.orders.find(or => or.id == id)
  },
  getAll(state){}


}

export const actions = {

}