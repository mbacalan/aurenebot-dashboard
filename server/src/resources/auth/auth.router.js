const { Router } = require("express");
const authController = require("./auth.controller");

const authRouter = Router();

authRouter.post("/login", authController.login.bind(authController));
authRouter.post("/logout", authController.logout.bind(authController));

module.exports = authRouter;
