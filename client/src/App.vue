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

      <a
        v-if="loggedIn"
        href="#"
        @click="this.logout"
      >
        Logout
      </a>

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
    const response = await fetch('http://localhost:3000/user', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'include'
    })

    if (response.ok) {
      const user = await response.json()

      this.$store.commit('login', user)
    }
  },
  methods: {
    async logout () {
      const request = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
      })

      if (request.ok) {
        this.$store.commit('logout')
        this.$router.push('home')
      }
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
