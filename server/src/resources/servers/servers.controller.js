const discordAxios = require("../../utils/axios");
const { config } = require("../../utils/config");

const discordApi = discordAxios.getInstance();

exports.changeNick = async function(req, res) {
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
};
