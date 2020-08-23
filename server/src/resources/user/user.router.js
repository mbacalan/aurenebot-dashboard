const { Router } = require('express');
const { getDiscordUser } = require('./user.controller');

const userRouter = Router();

userRouter.get('/', getDiscordUser);

module.exports = {
  userRouter
}
