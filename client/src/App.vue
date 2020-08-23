<template>
  <div id="app">
    <h1 class="title">
      Aurene Dashboard
    </h1>

    <nav>
      <router-link
      v-if="loggedIn"
        to="/dashboard"
      >
        Dashboard
      </router-link>

      <router-link
        v-if="loggedIn"
        to="/logout"
      >
        Logout
      </router-link>

      <router-link
        v-if="!loggedIn"
        to="/login"
      >
        Login
      </router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AureneDashboard',
  async beforeMount () {
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'include'
    })

    const user = await response.json()

    if (response.ok) {
      this.$store.commit('login', user)
    }
  },
  computed: {
    ...mapState(['loggedIn', 'user'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
