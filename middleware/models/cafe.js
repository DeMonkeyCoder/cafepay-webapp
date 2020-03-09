/** Model definition file for the Movie Class **/



export const Category = class Category {
  constructor(rawData = {}) {
    this.name = rawData.name
    this.products = []
    for (const product of rawData.products) {
      this.products.push(new Product(product))
    }
  }


}



export const Product = class Product {
  constructor(rawData = {}) {
    this.name = rawData.name
    this.avatar = rawData.avatar
    this.description = rawData.description
    this.price = rawData.price
    this.rate = rawData.rate
    this.original_price = rawData.original_price
    this.discount = rawData.discount,
    this.count = 0
  }


}