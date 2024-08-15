import { GraphQLServer, PubSub } from "graphql-yoga";
import Comment from "./resolvers/Comment";
import User from "./resolvers/User";
import Post from "./resolvers/Post";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import db from "./db";

const pubSub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: { Query, Mutation, Subscription, User, Post, Comment },
  context: {
    db,
    pubSub,
  },
});

server.start(() => {
  console.log("server is up");
});
