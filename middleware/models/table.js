/** Model definition file for the Movie Class **/

const identicon = require('identicon')

export const socketTable = class socketTable {
  constructor(rawData = {}, products = {}) {

    console.log('products in table model', products);
    
    this.persons = this.productsByPerson(rawData.bill_products, products)

  }

  productsByPerson(arr, products) {
    let personRawProduct_noProperty = [...arr.reduce((acc, obj) =>
      acc.set(obj.user_profile.pk, (acc.get(obj.user_profile.pk) || []).concat(obj)), new Map).values()];

    let personRawProduct = []
    personRawProduct_noProperty.forEach(orders => {
      // make orders from product class
      let newOrders = []
      let user_name;
      let userId;
      orders.forEach(order => {
        let findProduct = products.find(x => x.pk == order.product)

        // build new object with addition of wish to pay and name of product
        let prodObj = {
          ...order,
          wish_to_pay: 0,
          name: findProduct.name,
        }
        // user info is in each order so remove it from them and add to parent (person)
        user_name = (order.is_staff) ? 'صندوق دار' : order.user_profile.full_name
        userId = order.user_profile.pk
        // user_name = order.user_profile.full_name
        delete prodObj.user_profile

        newOrders.push(prodObj)
      });
      // we need to calculate total price of the orders of a person and total payment on them
      let totalPrice = newOrders.reduce(
        (total, order) => order.payment_info.total_amount + total, 0)

      let totalPaid = newOrders.reduce(
        (total, order) => order.payment_info.payed_amount + total, 0)
        let avatar;
        console.log('user',user_name);
        
        identicon.generate({
            id: user_name,
            size: 75
          }, (err, buffer) => {
            if (err) throw err
            avatar = buffer
          }),

      // push new person along side his products
      personRawProduct.push({
        totalPrice,
        totalPaid,
        avatar,
        name: user_name.slice(0, 20),
        orders: newOrders,
        id: userId
      })
    });
    return personRawProduct
  }




}

// export const Product = class Product {
//   constructor(product = {}, products = []) {
//     let localProduct = products.find(x => x.pk = product.pk)
//     this.name = rawData.title
//     this.name = 'پیتزا قارچ و گوشت'
//     this.original_price = 45000
//     this.discount = 0
//     this.paid = 0
//     this.wish_to_pay = 0
//     this.you_paid = 0
//     this.price = 45000
//     this.count = 2
//   }


// }
