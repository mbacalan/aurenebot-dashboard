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
      state.loggedIn = true
      state.user = user
    },
    logout (state) {
      state.loggedIn = false
      state.user = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
