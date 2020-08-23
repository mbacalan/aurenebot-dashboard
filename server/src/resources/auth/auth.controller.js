const FormData = require('form-data');
const axios = require('axios');

async function authDiscordUser (req, res) {
  if (!req.body.code) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

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

    req.session.discordTokens = tokens
    req.session.discordUser = user
    return res.json(user)
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Server error'
    })
  }
};

module.exports = {
  authDiscordUser
}
