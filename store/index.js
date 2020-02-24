import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const state = () => ({
    loading: false,
    activeCafe: {},
    activeTable: {}
})
  
export const mutations = {
    toggleLoading (state, flag) {state.loading = flag},
    setActiveCafe(state, cafe) {
      state.activeCafe = cafe
    },
    setActiveTable(state, table){
      state.activeTable = table
    }
}

export const actions = {

}