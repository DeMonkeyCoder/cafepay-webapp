/** Model definition file for the Movie Class **/

import store from '../../store/index'
const identicon = require('identicon')

export default class User {
  constructor(userData = {}) {
    this.first_name = userData.first_name
    this.last_name = userData.last_name
    this.phone_number = userData.phone_number
    this.wallet_amount = 12000,
    this.orders = []
    identicon.generate({
      id: this.phone_number,
      size: 75
    }, (err, buffer) => {
      if (err) throw err
      this.avatar = buffer
    })
  }

  get full_name() {
    return this.first_name + ' ' + this.last_name
  }

}
