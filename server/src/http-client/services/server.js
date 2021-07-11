const HttpClient = require("../index");
const { config } = require("../../utils/config");

module.exports = {
  getNick: ({ server }) =>
    HttpClient.get(
      `/guilds/${server}/members/@me/nick`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bot ${config.botToken}`
        },
      }
    ),
  updateNick: ({ server, nick }) =>
    HttpClient.patch(
      `/guilds/${server}/members/@me/nick`,
      { nick },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bot ${config.botToken}`
        },
      }
    ),
};
