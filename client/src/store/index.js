import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {}
  },
  mutations: {
    login (state, user) {
      state.user = user
      state.loggedIn = true
    }
  },
  actions: {
  },
  modules: {
  }
})
