const { Router } = require("express");
const authController = require("./auth.controller");

const authRouter = Router();

authRouter.post("/", authController.authDiscordUser);

module.exports = authRouter;
