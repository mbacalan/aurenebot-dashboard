<template>
  <section class="dashboard">
    <p v-if="!loggedIn">
      You must log in to see this page. Redirecting...
    </p>

    <div v-if="loggedIn">
      <p>
        Welcome to your dashboard, {{ user.username }}#{{ user.discriminator }}
      </p>

      <p>You are managing {{ guild.name }}</p>
      <label>
        Bot Nick:
        <input type="text" maxlength="20" v-model="nick">
      </label>

      <button type="submit" @click.prevent="updateNick">
        Submit
      </button>

      <label>
        Bot Prefix:
        <input type="text" maxlength="1" v-model="prefix">
      </label>

      <button type="submit" @click.prevent="updatePrefix">
        Submit
      </button>
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
  data () {
    return {
      nick: '',
      prefix: ''
    }
  },
  computed: {
    ...mapState(['loggedIn', 'user']),
    guild () {
      return this.user.guilds.find(guild => guild.id === this.$route.params.id)
    }
  },
  methods: {
    async updateNick () {
      const nick = this.nick

      const response = await fetch(`http://localhost:3000/servers/${this.$route.params.id}/updatenick/`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ nick }),
        credentials: 'include'
      })

      if (response.ok) {
        const user = await response.json()

        this.$store.commit('login', user)
        this.$router.push('servers')
      }
    },

    async updatePrefix () {
      const prefix = this.prefix

      const response = await fetch(`http://localhost:3000/servers/${this.$route.params.id}/updateprefix/`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ prefix }),
        credentials: 'include'
      })

      if (response.ok) {
        console.log('prefix is ' + this.prefix)
      }
    }
  }
}
</script>
