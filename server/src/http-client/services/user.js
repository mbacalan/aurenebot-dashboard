const HttpClient = require("../../http-client");

module.exports = {
  login: ({ email, password }) =>
    HttpClient.post("/login", { email, password }),
};
