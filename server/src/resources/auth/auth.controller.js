const FormData = require("form-data");
const axios = require("axios");
const { urls } = require("../../urls");

exports.authDiscordUser = async function(req, res) {
  if (!req.body.code) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const form = new FormData();

  form.append("client_id", process.env.CLIENT_ID);
  form.append("client_secret", process.env.CLIENT_SECRET);
  form.append("grant_type", "authorization_code");
  form.append("code", req.body.code);
  form.append("redirect_uri", urls.discordRedirectUrl);
  form.append("scope", "identify guilds");

  try {
    const { data: tokens } = await axios.post(urls.discordUserUrl, form, { headers: form.getHeaders() });
    const { data: user } = await axios.get(urls.discordUserUrl, {
      headers: {
        authorization: `Bearer ${tokens.access_token}`
      }
    });

    req.session.discordTokens = tokens;
    req.session.discordUser = user;
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error"
    });
  }
};
