// user section includes 3 major Data-set 
// 1. user profile info can be A.retrieved B.updated C.created
// 2. user wallet transaction can be A.created (charge wallet)  B.retrieved
// 3. number that can be Changed
import User from '../middleware/models/user'
export const state = () => ({
  user: {
    first_name: 'علی',
    last_name: 'بیگی',
    full_name: 'علی علی بیگی',
    phone_number: '09170540081',
    avatar: 'https://avatars0.githubusercontent.com/u/23187274?s=460&v=4',
    wallet: {
      amount: 78000,
      transactions: []
    },
    wallet_amount: 78000

  }
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