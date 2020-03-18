/** Model definition file for the Movie Class **/



export default class OrderPoll {
  constructor(rawData = {}) {
    this.id = rawData.id
    this.name = rawData.name
    this.rate = 0
    this.comment = ''
  }

}