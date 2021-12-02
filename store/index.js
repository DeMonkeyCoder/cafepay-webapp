import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export const state = () => ({
  errorMessage: null,
  globalLoading: false,
  errorThrow: false,
  baseUrl: null,
  activeCafe: {},
  firstTimeActive: false,
  activeTable: {},
  hasActiveTable: false,
  fistTimeCameraActive: false,
  token: null,
  backToScan: false,
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  },
  guides: {
    changeOrderConfirm: false,
    cashierSelection: false,
  },
  currentMainPage: (state.hasActiveTable) ? 'currentCafe' : 'scan',
})

export const mutations = {
  setBaseUrl(state, baseUrl) {
    state.baseUrl = baseUrl
  },
  SOCKET_ONOPEN(state, event) {
    Vue.prototype.$socket = event.currentTarget
    state.socket.isConnected = true
    this.dispatch('table/tableConnection')
    // if (state.cafe.tokenType == 'normal') 
    // else if (state.cafe.tokenType == 'preorder') this.dispatch('table/preorderConnection')

  },
  SOCKET_ONMESSAGE(state, rawMessage) {

    state.socket.message = JSON.parse(rawMessage.data)
    let message = state.socket.message.message


    // check if message is for table watch
    let token = message.source.split('table.')[1].split('.join')[0]
    let source = message.source.split('')
    if (message.source ==
      `table.${state.table.token}.join.simple.by-token.`) {
        if ( message.status_code == 200) {
           console.log('table socket message', message.data);
            this.commit('table/setData', message.data)
        }
        else if (message.status_code == 404) {
          Vue.prototype.$disconnect()
          this.commit('table/clearData')
          this.commit('user/clearTable_uuid')
          this.commit('cafe/setType', null)
          this.commit('cafe/bindProductCount', false)
        }
       
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

  unsetIsConnectedFlag(state) {
    state.socket.isConnected = false
  },
  // setActiveTable(state, table){
  //   state.activeTable = table
  // },
  setToken(state, token) {
    state.token = token
    localStorage.setItem('token', token)
    const cookieValObject = {'token': `${token}`}
    // Works client side only
    const getDomainName = function() {
        let hostName = window.location.host;
        return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
    }
    this.$cookies.set('CafepayWebappToken', cookieValObject, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      domain: getDomainName()
    })
  },
  clearToken(state) {
    localStorage.removeItem('token')
    this.$cookies.remove('CafepayWebappToken')
    state.token = null
  },
  backToScan(state, flag){
    state.baseUrl = flag
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
  },
  setGuide(state, guide) {
      state.guides[guide.name] = guide.data
  }
}

export const actions = {
  nuxtServerInit({ commit }, { $config }) {
    commit('setBaseUrl', $config.CAFEPAY_WEBAPP_BASE_URL)
  },
  sendCode({
    commit,
    dispatch
  }, data) {
      if (data.cafe) {
          commit('cafe/setBasic', data.cafe)
          commit('setActiveTable', true)
          commit('table/setToken', {
            token: data.tableToken,
            number: 'پیش سفارش'
          })
          dispatch('cafe/retrieveMenu')
      }
      else {
      return new Promise((resolve, reject) => {
        let api = (data.hasToken) ? '$api' : '$axios'
        console.log('api type', api);
        // u need to set the table too, for api link
        this[api]
          .get('v1/table-token/' + data.tableToken + '/cafe-info/', {
            params: {},
            // headers: { Authorization: 'Token ' + this.token }
          })
          .then(res => {
            // sets pk, avatar, name and table id
            commit('cafe/setBasic', res.data)
            commit('setActiveTable', true)
            // if TYPE == 2 it's preorder and token would be table uuid
            if (res.data.type == 2){
              commit('table/setToken', {token: res.data.table.uuid, number: 'پیش سفارش'})
            }
            else {
              res.data.table['token'] = res.data.token
              // save active table state in localstorage for refresh (no longer valid)
              commit('table/setToken', res.data.table)
            }
            // execute the action for getting menu, detailed info, comments and posts
            dispatch('cafe/retrieveMenu')



           if (res.data.has_staff_order) commit('changeNavigation', 'cp-table')
           else commit('changeNavigation', 'currentCafe')
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }

  },
}
