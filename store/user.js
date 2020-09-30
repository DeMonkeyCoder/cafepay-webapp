// user section includes 3 major Data-set 
// 1. user profile info can be A.retrieved B.updated C.created
// 2. user wallet transaction can be A.created (charge wallet)  B.retrieved
// 3. number that can be Changed
import Vue from 'vue'
import User from '../middleware/models/user'
export const state = () => ({
  user: {
    
  }
})

export const getters = {
  
}

export const mutations = {
  set(state, user) { 
    state.user = new User(user)
  },
  clear(state){
    state.user = {} 
  }

}

export const actions = {
 
    async retrieve(context) {
      let data = await this.$api.$get('/api/v1/user-profile/', {
        params: {}
      })
      console.log('user', data);
      context.commit('set', data)
      
    },
  
}