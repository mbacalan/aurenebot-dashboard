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

      <p>Current Nick is <b>{{ currentNick }}</b></p>
      <p>Current Prefix is <b>{{ currentPrefix }}</b></p>
      <label>
        Bot Nick:
        <input type="text" v-model="nick">
      </label>

      <button type="submit" @click.prevent="updateNick">
        Submit
      </button>

      <label>
        Bot Prefix:
        <input type="text" v-model="prefix">
      </label>

      <button type="submit" @click.prevent="updatePrefix">
        Submit
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import gql from 'graphql-tag'

const UPDATE_NICK = gql`mutation ($server: String!, $nick: String!) {
  updateNick(server: $server, nick: $nick) {
    nick
  }
}`

const UPDATE_PREFIX = gql`mutation ($server: String!, $prefix: String!) {
  updatePrefix(server: $server, prefix: $prefix) {
    prefix
  }
}`

const GET_CONFIG = gql`query ($server: String!) {
  getConfig(server: $server) {
    nick,
    prefix
  }
}`

export default {
  name: 'Dashboard',
  async mounted () {
    if (!this.loggedIn) {
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    }

    const response = await this.$apollo.query({
      query: GET_CONFIG,
      variables: { server: String(this.$route.params.id) }
    })

    if (response?.data) {
      this.currentNick = response.data.getConfig.nick
      this.currentPrefix = response.data.getConfig.prefix
    }
  },
  data () {
    return {
      currentNick: '',
      currentPrefix: '',
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
      const response = await this.$apollo.mutate({
        mutation: UPDATE_NICK,
        variables: { server: String(this.$route.params.id), nick: this.nick }
      })

      if (response?.data) {
        this.currentNick = response.data.updateNick.nick
      }
    },

    async updatePrefix () {
      const response = await this.$apollo.mutate({
        mutation: UPDATE_PREFIX,
        variables: { server: String(this.$route.params.id), prefix: this.prefix }
      })

      if (response?.data) {
        this.currentPrefix = response.data.updatePrefix.prefix
      }
    }
  }
}
</script>
