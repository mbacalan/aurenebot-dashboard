const axios = require("axios");

class DiscordRequests {
  constructor() {
    if (!DiscordRequests.instance) {
      this.axiosInstance = axios.create({
        baseURL: "https://discord.com/api",
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      });

      DiscordRequests.instance = this;
    }

    return DiscordRequests.instance;
  }

  getInstance() {
    return this.axiosInstance;
  }

  setHeaders(headers) {
    this.axiosInstance.defaults.headers.common = headers;
  }
}

const discordAxiosInstance = new DiscordRequests();

Object.freeze(discordAxiosInstance);

module.exports = discordAxiosInstance;
