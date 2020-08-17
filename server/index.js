const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const FormData = require('form-data')
const axios = require('axios')
require('dotenv').config({ path: './.env.local' })

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  methods: ['POST']
}))
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false
}))

app.post('/auth', async function (req, res) {
  if (req.session.discordUser) {
    return res.json(req.session.discordUser)
  }

  if (req.body.code) {
    const tokenUrl = 'https://discord.com/api/oauth2/token'
    const userUrl = 'https://discord.com/api/users/@me'
    const form = new FormData()

    form.append('client_id', process.env.CLIENT_ID)
    form.append('client_secret', process.env.CLIENT_SECRET)
    form.append('grant_type', 'authorization_code')
    form.append('code', req.body.code)
    form.append('redirect_uri', 'http://localhost:8080/login')
    form.append('scope', 'identify guilds')

    try {
      const { data: tokens } = await axios.post(tokenUrl, form, { headers: form.getHeaders() })
      const { data: user } = await axios.get(userUrl, {
        headers: {
          authorization: `Bearer ${tokens.access_token}`
        }
      })

      req.session.discordUser = user
      return res.json(user)
    } catch (err) {
      return res.status(500).json({
        message: err
      })
    }
  }

  return res.status(401).json({
    message: 'Unauthorized'
  })
})

app.listen(3000, () => console.log('Listening on localhost:3000'))
