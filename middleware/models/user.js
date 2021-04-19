/** Model definition file for the Movie Class **/

import store from '../../store/index'
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
    this.address = userData.address
    this.table_uuid = userData.active_table_uuid
    this.date_joined = userData.date_joined
    let avatars = new Avatars(sprites);
    this.avatar = avatars.create(this.full_name + this.id, {
      base64: true
    });
  }

  get full_name() {
    return this.first_name + ' ' + this.last_name
  }

}
