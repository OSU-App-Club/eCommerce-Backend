const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

const typeDefs = require('./schema');
const resolvers = require('./resolvers')
const DataBase = require('./database');

const knexConfig = {
  client: "mysql",
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'test',
    password: 'password',
    database: 'ecommerce'
  }
}

const db = new DataBase(knexConfig);

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => {
      return {
        database: db
      };
    }
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/',
  });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);