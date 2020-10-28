import Vue from 'vue'
import Vuex from 'vuex'
import  baseUrl from '~/plugins/baseUrl.js'


Vue.use(Vuex)

export const state = () => ({
  errorMessage: null,
  globalLoading: false,
  errorThrow: false,
  baseUrl: baseUrl.baseUrl,
  activeCafe: {},
  firstTimeActive: false,
  activeTable: {},
  hasActiveTable: false,
  fistTimeCameraActive: false,
  token: null,
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  },
  currentMainPage: (state.hasActiveTable) ? 'currentCafe' : 'scan',
})

export const mutations = {
  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget
    state.socket.isConnected = true
    this.dispatch('table/tableConnection')

  },
  SOCKET_ONMESSAGE(state, rawMessage) {

    state.socket.message = JSON.parse(rawMessage.data)
    let message = state.socket.message.message


    // check if message is for table watch
    if (message.source ==
      `table.${state.table.token}.join.simple.by-token.` && message.status_code == 200) {
        console.log('table socket message', message.data);
      this.commit('table/setData', message.data)
    } else if (message.data.pk == undefined) {
      this.commit('table/clearData')
      this.commit('cafe/bindProductCount', false)
    }

  },
  SOCKET_ONCLOSE(state, event) {
    console.log('server is disconnected');

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
    history.pushState({
      state: PageName
    }, '/user/home?' + PageName)
  },
  errorMsg(state, err) {
    state.errorThrow = true
    state.errorMessage = err
    // setTimeout(() => {
    // }, 200); 
  },
  unsetErrorFlag(state){
    state.errorThrow = false
  },
  setFirstTime(state , flag){
    state.firstTimeActive = flag
  },
  setFirstTimeCameraActive(state, flag) {
    state.fistTimeCameraActive = flag
  }
}

export const actions = {


  sendCode({
    commit,
    dispatch
  }, tableToken) {
    return new Promise((resolve, reject) => {
      // u need to set the table too, for api link
      this.$api
        .get('api/v1/table-token/' + tableToken + '/cafe-info/', {
          params: {},
          // headers: { Authorization: 'Token ' + this.token }
        })
        .then(res => {
          
          // sets pk, avatar, name and table id
          commit('cafe/setBasic', res.data.cafe)
          // execute the action for getting menu, detailed info, comments and posts
          dispatch('cafe/retrieveMenu')

          commit('setActiveTable', true)
          res.data.table['token'] = res.data.token
          // save active table state in localstorage for refresh
          commit('table/setToken', res.data.table)

          // attach token to table
          commit('changeNavigation', 'currentCafe')
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })

  },
}
