export default ({ store }) => {
  let token = localStorage.getItem('token')
  if (token != 'undefined') store.commit('setToken', token)
}
// window.onNuxtReady(() => {
//   console.log('Nuxt.js is ready and mounted')
// })