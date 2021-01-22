/** Model definition file for the Movie Class **/

// const identicon = require('identicon')
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-bottts-sprites';

export const Table = class Table {
  constructor(rawData = {}, currentUserId = {}) {


    let data = this.productsByPerson(rawData.bill_products, currentUserId)
    let myProfileOnTable = data.personRawProduct.find(p => p.id == currentUserId)
    if (myProfileOnTable && data.personRawProduct.length > 1) {
      data.personRawProduct = data.personRawProduct.filter(p => p.id != currentUserId)
      data.personRawProduct.unshift(myProfileOnTable)
      console.log('persons no order', data.personRawProduct);
    }
    this.persons = data.personRawProduct
    this.paid = data.paid
    this.status = data.status
    this.paymentMethod = data.paymentMethod
    this.hasOnlinePayment = data.hasOnlinePayment
    


  }

  setOrderStatus(order, table){
            // fall in chain
    if (!order.is_ready) table.status = 'preparing'
    if (!order.sent_to_kitchen) table.status = 'confirmed'
    if (!order.is_accepted) table.status = 'waiting'

  }

  setPaymentStatus(order, table) {
      // ONLINE = '0'
      // POS = '1'
      // CASH = '2'
      // CARD_TO_CARD = '3'
      // set method
      if (order.preferred_payment_method == 0 && order.payment_info.net_payed_amount != order.payment_info.total_amount) table.hasOnlinePayment = true
      if (order.preferred_payment_method != 0) table.paymentMethod = 'cash'
      
  }

  setAggregate(newOrders, person) {
    person.totalPrice = newOrders.reduce(
      (total, order) => order.payment_info.total_amount + total, 0)

    person.totalPaid = newOrders.reduce(
      (total, order) => order.payment_info.net_payed_amount + total, 0)
  }


  setUserInfo(order, person) {
    person.name = order.user_profile.full_name.slice(0, 20)
    if (order.is_staff) {
      person.name = 'صندوق دار'
      if (!person.cashier) person.cashier = true
    }
   person.id = order.user_profile.pk
  }


  separateCashierOrders(newOrders, prodObj) {
    // payment_info: Object
    // net_amount: 148000
    // net_payed_amount: 74000
    // payed_amount: 74000
    // payed_amount_cash: 0
    // payed_amount_online: 74000
    // payed_amount_pos: 0
    // refund_amount: 0
    // total_amount: 222000
    // total_count: 3
    console.log('prod obj', prodObj);
    let total_amount = prodObj.payment_info.total_amount / prodObj.payment_info.total_count
    
    for (let i = 0; i < prodObj.count; i++) {
      // modify payment-info:
      // first we need to copy object
      let prodTemp = JSON.parse(JSON.stringify(prodObj))
      prodTemp.payment_info.total_amount = total_amount
      prodTemp.count = 1

      if (!prodObj.payment_info.net_payed_amount) {
         prodTemp.payment_info.net_payed_amount = 0
         prodTemp.payment_info.payed_amount = 0
         prodTemp.payment_info.net_amount = prodTemp.unit_amount
      }
      else {
        prodObj.payment_info.net_payed_amount -= prodObj.unit_amount
        prodObj.payment_info.payed_amount -= prodObj.unit_amount

        prodTemp.payment_info.net_payed_amount = prodTemp.unit_amount
        prodTemp.payment_info.payed_amount = prodTemp.unit_amount
        prodTemp.payment_info.net_amount = 0
        
      }
      
      newOrders.push(prodTemp)
    }
    
  }

  productsByPerson(arr, currentUserId) {
    let personRawProduct_noProperty = [...arr.reduce((acc, obj) =>
      acc.set(obj.user_profile.pk, (acc.get(obj.user_profile.pk) || []).concat(obj)), new Map).values()];

    let table = {
      status: (personRawProduct_noProperty.length) ? 'ready' : 'no_order',
      paid: true,
      paymentMethod: 'online',
      hasOnlinePayment: false
    }
    let personRawProduct = []

    personRawProduct_noProperty.forEach(orders => {
      // make orders from product class
      let person = {
        name: null,
        identiconId: null,
        id: null,
        avatar: null,
        totalPrice: null,
        totalPaid: null,
        cashier: false
      }
      let newOrders = []

      orders.forEach(order => {
        let wish_to_pay;
        // fall in chain
        this.setOrderStatus(order, table)
        this.setPaymentStatus(order, table)
        this.setUserInfo(order, person)
        
        // if order is belong to user (not others) slider will be full
        if (person.id == currentUserId) wish_to_pay = order.payment_info.total_amount - order.payment_info.net_payed_amount
        else wish_to_pay = 0

        // generate id for identicon base on full_name + phone number
        person.identiconId = order.user_profile.full_name + person.id


        // build new object with addition of wish to pay and name of product
        let prodObj = {
          ...order,
          wish_to_pay,
          cashier_count: 0,
          name: order.product_data.name,
        }
        // user info is in each order so remove it from them and add to parent (person)
        delete prodObj.user_profile

        // separate orders of cashier for a better user selection
        if (prodObj.count > 1 && order.is_staff) this.separateCashierOrders(newOrders, prodObj)
        else newOrders.push(prodObj)
      });
      // we need to calculate total price of the orders of a person and total payment on them
      this.setAggregate(newOrders, person)
      
      if (table.paid) {
        if (person.totalPaid != person.totalPrice) table.paid = false
      }

      // avatar setup
      let avatars = new Avatars(sprites);
      person.avatar = avatars.create(person.identiconId, {
        base64: true
      });
      
      delete person.identiconId

      // push new person along side his products
      personRawProduct.push({
        ...person,
        orders: newOrders,
      })
    });

    return {
      ...table,
      personRawProduct
    }
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
