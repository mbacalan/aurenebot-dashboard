const { gql } = require("apollo-server-express");
const { ServerService } = require("../http-client/services");
const { ConfigModel } = require("../utils/db");

const typeDefs = gql`
  type Config {
    server: String
    nick: String
    prefix: String
  }

  type Query {
    getConfig(server: String!): Config
  }

  type Mutation {
    updateNick(server: String!, nick: String!): Config
    updatePrefix(server: String!, prefix: String!): Config
  }
`;

const resolvers = {
  Query: {
    getConfig: async (parent, args) => {
      const config = await ConfigModel.find({ server: args.server });

      return config[0];
    },
  },
  Mutation: {
    updateNick: async (parent, args) => {
      await ServerService.updateNick({ server: args.server, nick: args.nick });

      const nick = ConfigModel.findOneAndUpdate({ server: args.server }, { nick: args.nick }).exec();

      return await nick;
    },
    updatePrefix: async (parent, args) => {
      const prefix = ConfigModel.findOneAndUpdate({ server: args.server }, { prefix: args.prefix }).exec();

      return await prefix;
    }
  }
};

module.exports = {
  typeDefs, resolvers
};
