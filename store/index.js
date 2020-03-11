import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    loading: false,
    activeCafe: {},
    activeTable: {},
    hasActiveTable: false,
    token: null,
    currentMainPage: (state.hasActiveTable) ? 'currentCafe' : 'scan'
})
  
export const mutations = {
    toggleLoading (state, flag) {state.loading = flag},
    setActiveTable(state, flag) {
      state.hasActiveTable = flag
    },
    // setActiveTable(state, table){
    //   state.activeTable = table
    // },
    setToken(state, token){
      state.token = token
      localStorage.setItem('token', token)
    },
    clearToken(state){
      localStorage.removeItem('token')
      state.token = null
    },
    changeNavigation(state, PageName) {
      state.currentMainPage = PageName
    }
}

export const actions = {

}