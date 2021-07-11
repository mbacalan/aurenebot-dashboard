const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schema");
require("dotenv").config({ path: ".env.local" });

const { config } = require("./utils/config");
const { mongooseConnection } = require("./utils/db");

const userRouter = require("./resources/user/user.router");
const authRouter = require("./resources/auth/auth.router");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start();

server.applyMiddleware({ app });

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen({ port: 3000 }, () =>
  console.log("🚀 Server ready at http://localhost:3000")
);
