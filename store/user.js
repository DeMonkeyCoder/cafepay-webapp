// user section includes 3 major Data-set 
// 1. user profile info can be A.retrieved B.updated C.created
// 2. user wallet transaction can be A.created (charge wallet)  B.retrieved
// 3. number that can be Changed
import User from '../middleware/models/user'
export const state = () => ({
  user: {}
})

export const getters = {
  
}

export const mutations = {
  set(state, user) { 
    state.user = new User(user)
  },

}

export const actions = {

}