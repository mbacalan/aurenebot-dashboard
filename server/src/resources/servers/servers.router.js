const { Router } = require("express");
const serversController = require("./servers.controller");

const serversRouter = Router({ mergeParams: true });

serversRouter.patch("/updatenick", serversController.updateNick);
serversRouter.patch("/updateprefix", serversController.updatePrefix);

module.exports = serversRouter;
