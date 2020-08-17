<template>
  <div id="home">
    <div class="user" v-if="loggedIn">
      Welcome {{ user.username }}#{{ user.discriminator }}
    </div>

    <div class="guest" v-if="!loggedIn">
      Welcome, Guest. Log in to gain access to the dashboard!
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['loggedIn', 'user'])
  }
}
</script>
