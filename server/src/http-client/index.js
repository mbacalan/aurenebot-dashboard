const axios = require("axios");
const Services = require("./services");

class HttpClient {
  constructor() {
    this.client = axios.create({
      baseURL: "https://discord.com/api",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    this.middlewares = [];
  }

  get(url, config = {}) {
    return this.client.get(url, config);
  }

  post(url, data = {}, config = {}) {
    return this.client.post(url, data, config);
  }

  put(url, data = {}, config = {}) {
    return this.client.put(url, data, config);
  }

  patch(url, data = {}, config = {}) {
    return this.client.patch(url, data, config);
  }

  delete(url, config = {}) {
    return this.client.delete(url, config);
  }

  request(config = {}) {
    return this.client.request(config);
  }

  async call(service, action, params = {}) {
    return await Services[`${service}Service`][action](params);
  }

  use(middleware) {
    this.middlewares.push(middleware);

    if (middleware.request) {
      this.client.interceptors.request.use(middleware.request);
    }
  }
}

module.exports = new HttpClient();
