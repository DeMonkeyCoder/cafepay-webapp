import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
    loading: false,
    activeCafe: {},
    activeTable: {},
    activeCafeFlag: false,
    token: null
})
  
export const mutations = {
    toggleLoading (state, flag) {state.loading = flag},
    setActiveCafe(state, cafe) {
      state.activeCafe = cafe
      state.activeCafeFlag = true
    },
    setActiveTable(state, table){
      state.activeTable = table
    },
    setToken(state, token){
      state.token = token
      localStorage.setItem('token', token)
    },
    clearToken(state){
      localStorage.removeItem('token')
      state.token = null
    }
}

export const actions = {

}