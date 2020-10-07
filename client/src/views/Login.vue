<template>
  <div class="login">
    Redirecting...
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted () {
    if (this.loggedIn && this.user) {
      return this.$router.push('/servers')
    }

    if (!this.loggedIn && this.$route.query.code) {
      return this.login(this.$route.query.code)
    }

    if (!this.loggedIn && !this.$route.query.code) {
      const discordUrl = new URL('https://discord.com/api/oauth2/authorize')
      const discordParams = new URLSearchParams()

      discordParams.set('client_id', process.env.VUE_APP_CLIENT_ID)
      discordParams.set('redirect_uri', 'http://localhost:8080/login')
      discordParams.set('response_type', 'code')
      discordParams.set('scope', 'identify guilds')

      window.location = `${discordUrl}?${discordParams}`
    }
  },
  methods: {
    async login (code) {
      const response = await fetch('http://localhost:3000/auth/login/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ code }),
        credentials: 'include'
      })

      if (response.ok) {
        const user = await response.json()

        this.$store.commit('login', user)
        this.$router.push('servers')
      }
    }
  }
}
</script>

<style>
.login {
  text-align: center;
}
</style>
