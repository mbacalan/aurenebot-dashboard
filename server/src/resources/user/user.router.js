const { Router } = require("express");
const userController = require("./user.controller");

const userRouter = Router();

userRouter.get("/", userController.getUser);

module.exports = userRouter;
