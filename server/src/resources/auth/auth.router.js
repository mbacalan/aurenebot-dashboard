const { Router } = require('express');
const { authDiscordUser } = require('./auth.controller');

const authRouter = Router();

authRouter.post('/', authDiscordUser);

module.exports = {
  authRouter
}
