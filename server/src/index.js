const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const { urls } = require("./urls");
require("dotenv").config({ path: ".env.local" });

const userRouter = require("./resources/user/user.router");
const authRouter = require("./resources/auth/auth.router");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: urls.corsOrigin,
  credentials: true,
  methods: ["POST"]
}));
app.use(session({
  secret: process.env.CLIENT_SECRET,
  resave: true,
  saveUninitialized: false
}));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, function startServer() {
  console.log("Listening on localhost:3000");
});
