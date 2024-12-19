import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import typeDefs from './schemas/typeDefs.js';
import resolvers from './resolvers/index.js';
import { sequelize } from './models/index.js';

dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers });

sequelize.sync().then(() => {
    server
    .listen({ port: 9000 })
    .then(serverInfo => console.log(`Server running at ${serverInfo.url}`));
});