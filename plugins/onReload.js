export default ({ app, store }) => {
  let localStorageToken = localStorage.getItem("token");
  if (!!localStorageToken && localStorageToken != 'null' && localStorageToken != 'undefined') {
    const cookieValObject = {'token': `${localStorageToken}`}
    // Works client side only
    const getDomainName = function() {
        let hostName = window.location.host;
        return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
    }
    app.$cookies.set('CafepayWebappToken', cookieValObject, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      domain: getDomainName()
    })
  }

  let token = app.$cookies.get('CafepayWebappToken')
  if (!!token) store.commit('setToken', token.token)
  
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