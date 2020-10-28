export default ({ store }) => {
  let token = localStorage.getItem('token')
  if (token != 'undefined' && token != 'null') store.commit('setToken', token)
  
  // let tableToken = localStorage.getItem('tableToken')
  // if (tableToken != 'undefined' && tableToken != 'null') {
  //   let tableName = localStorage.getItem('tableName')
  //   let table = {
  //     number: tableName,
  //     token: tableToken
  //   }
      
  //   store.commit('table/setToken', table)
  // }

}
// window.onNuxtReady(() => {
//   console.log('Nuxt.js is ready and mounted')
// })