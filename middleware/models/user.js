/** Model definition file for the Movie Class **/

import store from '../../store/index'

export default class Movie {
  constructor(userData = {}) {
    this.first_name = userData.first_name
    this.last_name = userData.last_name
    this.avatar = userData.avatar
    this.phone_number = userData.phone_number
    this.wallet_amount = userData.wallet.amount
  }

  get full_name() {
    return this.first_name + ' ' + this.last_name
  }
}