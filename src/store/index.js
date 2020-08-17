import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    user: {}
  },
  mutations: {
    login (state, user) {
      state.user = user
      state.loggedIn = true
    }
  }
})

export default store
