const FormData = require("form-data");
const discordAxios = require("../../utils/axios");
const { config } = require("../../utils/config");

const discordApi = discordAxios.getInstance();

class Controller {
  constructor() {
    this.data = new Map([
      ["client_id", process.env.CLIENT_ID],
      ["client_secret", process.env.CLIENT_SECRET],
      ["grant_type", "authorization_code"],
      ["redirect_uri", config.discordRedirectUrl],
      ["scope", "identify guilds"],
    ]);
    this.formData = new FormData();
  }

  async login(req, res) {
    if (!req.body.code) {
      return res.sendStatus(401);
    }

    this.data.set("code", req.body.code);

    for (let [key, value] of this.data) {
      this.formData.append(key, value);
    }

    try {
      const { data: tokens } = await discordApi.post(
        "/oauth2/token",
        this.formData,
        { headers: this.formData.getHeaders() }
      );

      discordAxios.setHeaders({ Authorization: `Bearer ${tokens.access_token}` });

      const { data: user } = await discordApi.get(config.discordUserUrl);
      let { data: guilds } = await discordApi.get(config.discordGuildsUrl);

      guilds = guilds.filter(guild => guild.owner == true);

      req.session.dTokens = tokens;
      req.session.dUser = {
        ...user,
        guilds
      };

      return res.json(req.session.dUser);
    } catch (err) {
      console.log(err);

      return res.sendStatus(500);
    }
  }

  async logout(req, res) {
    req.session.dTokens = null;
    req.session.dUser = null;

    return res.sendStatus(200);
  }
}

module.exports = new Controller();
