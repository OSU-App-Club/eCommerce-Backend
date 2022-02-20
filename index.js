require('dotenv').config()

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

const typeDefs = require('./schema');
const resolvers = require('./resolvers')
const MyDatabase = require('./db-wrapper');
const tunnel = require('tunnel-ssh')

const knexConfig = {
  client: "mysql",
  connection: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }
}

const tunnelConfig = {
  host:process.env.SSH_HOST,
  port:22,
  username:process.env.SSH_USER,
  privateKey:require('fs').readFileSync('./app-dev-ec2-backend.pem')
}

const forwardConfig = {
  srcHost:'localhost',
  srcPort:3306,
  dstHost:knexConfig.host,
  dstPort:knexConfig.port
}

const db = new MyDatabase(knexConfig);

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