import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const state = () => ({
    loading: false,
    activeCafe: {},
    activeTable: {},
    activeCafeFlag: false
})
  
export const mutations = {
    toggleLoading (state, flag) {state.loading = flag},
    setActiveCafe(state, cafe) {
      state.activeCafe = cafe
      state.activeCafeFlag = true
    },
    setActiveTable(state, table){
      state.activeTable = table
    }
}

export const actions = {

}