<template>
  <section class="dashboard">
    <p v-if="!loggedIn">
      You must log in to see this page. Redirecting...
    </p>

    <p v-if="loggedIn">
      Welcome to Dashboard, {{ user.username }}#{{ user.discriminator }}
    </p>

    <div>
      <p>Please select a guild below</p>
      <ul>
        <li v-for="guild in guilds" :key="guild.id">
          {{ guild.name }}
        </li>
      </ul>
    </div>
  </section>
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
    ...mapState(['loggedIn', 'user', 'guilds'])
  }
}
</script>
