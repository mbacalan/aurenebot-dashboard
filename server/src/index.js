const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

const { config } = require("./utils/config");
const { mongooseConnection } = require("./utils/db");
require("dotenv").config({ path: ".env.local" });
require("./utils/db");

const userRouter = require("./resources/user/user.router");
const authRouter = require("./resources/auth/auth.router");
const serversRouter = require("./resources/servers/servers.router");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(session({
  secret: process.env.CLIENT_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection })
}));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/servers/:serverId", serversRouter);

app.listen(3000, function startServer() {
  console.log("Listening on localhost:3000");
});
