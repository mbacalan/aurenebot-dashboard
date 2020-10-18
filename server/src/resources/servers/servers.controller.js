const discordAxios = require("../../utils/axios");
const { config } = require("../../utils/config");
const { ConfigModel } = require("../../utils/db");

const discordApi = discordAxios.getInstance();

class Controller {
  async updateNick(req, res) {
    try {
      await discordApi.patch(
        `/guilds/${req.params.serverId}/members/@me/nick`,
        {
          nick: req.body.nick
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bot ${config.botToken}`
          },
        }
      );

      return res.sendStatus(200);
    } catch (err) {
      console.log(err);

      return res.sendStatus(500);
    }
  }

  async updatePrefix(req, res) {
    try {
      await ConfigModel.deleteMany({});

      await ConfigModel.create({
        prefix: req.body.prefix
      });

      return res.sendStatus(200);
    } catch (err) {
      console.log(err);

      return res.sendStatus(500);
    }
  }
}

module.exports = new Controller();
