const { Router } = require("express");
const serversController = require("./servers.controller");

const serversRouter = Router({ mergeParams: true });

serversRouter.patch("/changenick", serversController.changeNick);

module.exports = serversRouter;
