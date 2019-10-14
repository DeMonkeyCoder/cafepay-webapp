import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export const state = () => ({
    loading: false,
})
  
export const mutations = {
    toggleLoading (state, flag) {state.loading = flag},
}

export const actions = {

}