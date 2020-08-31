import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  globalLoading: false,
  activeCafe: {},
  activeTable: {},
  hasActiveTable: false,
  token: null,
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  },
  currentMainPage: (state.hasActiveTable) ? 'currentCafe' : 'scan'
})

export const mutations = {
  SOCKET_ONOPEN(state, event) {
    console.log('event', event);
    Vue.prototype.$socket = event.currentTarget
    state.socket.isConnected = true


    this.dispatch('table/tableConnection')

  },
  SOCKET_ONMESSAGE(state, message) {

    state.socket.message = JSON.parse(message.data)
    console.log('socket message', state.socket.message);

  },
  SOCKET_ONCLOSE(state, event) {
    state.socket.isConnected = false
  },
  SOCKET_ONERROR(state, event) {
    console.error(state, event)
  },
  // default handler called for all methods

  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    console.info(state, count)
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.socket.reconnectError = true;
  },
  toggleLoading(state, flag) {
    state.globalLoading = flag
  },
  setActiveTable(state, flag) {
    state.hasActiveTable = flag
  },
  // setActiveTable(state, table){
  //   state.activeTable = table
  // },
  setToken(state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  clearToken(state) {
    localStorage.removeItem('token')
    state.token = null
  },
  changeNavigation(state, PageName) {
    state.currentMainPage = PageName
  }
}

export const actions = {

}
