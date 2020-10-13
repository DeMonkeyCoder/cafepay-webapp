/** Model definition file for the Movie Class **/



export const Category = class Category {
  constructor(rawData = {}) {
    this.name = rawData.title
    this.products = []
    for (const product of rawData.products) {
      this.products.push(new Product(product))
    }
  }


}



export const Product = class Product {
  constructor(rawData = {}) {
    this.name = rawData.name
    this.pk = rawData.pk
    if (rawData.images.length > 0) {
      let avatar = rawData.images.find(img => img.is_avatar == true)
      console.log('avatar', avatar)
      if (avatar) this.avatar = avatar.image
      else this.avatar = rawData.images[0].image
    }
    else this.avatar = null
    this.description = rawData.description
    this.price = rawData.price
    this.rate = rawData.rate
    this.original_price = rawData.original_price
    this.discount = rawData.discount,
    this.count = 0
    // reduce limit refers to limitation of delete product due to payment
    this.reduceLimit = 0
  }


}


export const Order = class Order {
  constructor(product = {}) {
    this.name = product.name
    this.price = product.price
    this.original_price = product.original_price
    this.discount = product.discount,
    this.count = product.count
    this.paid = (product.paid) ? product.paid : 0
    this.you_paid = (product.you_paid) ? product.you_paid : 0
    this.wish_to_pay = ( this.count * this.price ) - this.paid
  }


}