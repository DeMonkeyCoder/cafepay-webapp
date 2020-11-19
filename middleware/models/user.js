/** Model definition file for the Movie Class **/

import store from '../../store/index'
// const identicon = require('identicon')
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-bottts-sprites';



export default class User {
  constructor(userData = {}) {
    this.first_name = userData.first_name
    this.last_name = userData.last_name
    this.phone_number = userData.phone_number
    this.balance = userData.balance,
    this.id = userData.pk
    this.orders = []
    let avatars = new Avatars(sprites);
    this.avatar = avatars.create(this.full_name + this.id, {
      base64: true
    });
    // console.log('svg', svg);
    // identicon.generate({
    //   id: this.full_name,
    //   size: 75
    // }, (err, buffer) => {
    //   if (err) throw err
    //   this.avatar = buffer
    //   console.log('cur avatar', this.avatar);
    // })
  }

  get full_name() {
    return this.first_name + ' ' + this.last_name
  }

}
