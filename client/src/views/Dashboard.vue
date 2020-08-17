<template>
  <div class="container">
    <div v-if="!loggedIn">
      You must log in to see this page. Redirecting...
    </div>

    <div v-if="loggedIn">
      Welcome to Dashboard, {{ user.username }}#{{ user.discriminator }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  mounted () {
    if (!this.loggedIn) {
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    }
  },
  computed: {
    ...mapState(['loggedIn', 'user'])
  }
}
</script>
