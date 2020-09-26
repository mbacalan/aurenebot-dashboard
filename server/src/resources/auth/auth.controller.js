const FormData = require("form-data");
const axios = require("axios");
const { urls } = require("../../urls");

exports.login = async function(req, res) {
  if (!req.body.code) {
    return res.sendStatus(401);
  }

  const form = new FormData();

  form.append("client_id", process.env.CLIENT_ID);
  form.append("client_secret", process.env.CLIENT_SECRET);
  form.append("grant_type", "authorization_code");
  form.append("code", req.body.code);
  form.append("redirect_uri", urls.discordRedirectUrl);
  form.append("scope", "identify guilds");

  try {
    const { data: tokens } = await axios.post(urls.discordTokenUrl, form, { headers: form.getHeaders() });
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

    return res.sendStatus(500);
  }
};

exports.logout = async function(req, res) {
  req.session.discordTokens = null;
  req.session.discordUser = null;

  return res.sendStatus(200);
};
