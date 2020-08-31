/** Model definition file for the Movie Class **/



export const Table = class Table {
  constructor(rawData = {}) {
    this.name = rawData.title
    this.products = []
    for (const product of rawData.products) {
      this.products.push(new Product(product))
    }
  }


}

