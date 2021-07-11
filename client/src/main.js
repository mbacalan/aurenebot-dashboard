import Vue from 'vue'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import App from './App.vue'
import router from './router'
import store from './store'

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:3000/graphql'
  })
})

Vue.use(VueApollo)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
