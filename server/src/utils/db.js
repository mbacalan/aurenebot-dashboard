const mongoose = require("mongoose");
const redis = require("redis");
const { config } = require("./config");

const redisClient = redis.createClient();

mongoose.connect(config.mongoURL || "mongodb://localhost:27017/local", ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}));

mongoose.connection.on("error", () => console.error("Error connecting to database"));
mongoose.connection.once("open", () => console.info("Successfully connected to database"));

const configSchema = new mongoose.Schema({
  server: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  nick: {
    type: String,
    required: true,
  }
});

configSchema.post("save", function savePrefix(doc) {
  redisClient.set("prefix", doc.prefix);
  redisClient.expire("prefix", 900); // 900s => 15m
});

module.exports = {
  ConfigModel: mongoose.model("config", configSchema),
  mongooseConnection: mongoose.connection
};
