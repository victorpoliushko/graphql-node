import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from "@prisma/client";
import { feed as Query } from './resolvers/Query.js';
import { Mutation } from './resolvers/Mutation.js';
import { links as User } from './resolvers/User.js';
import { postedBy as Link } from './resolvers/Link.js';
import { getUserId } from './utils.js';
import { fileURLToPath } from 'url';
// import { PubSub } from 'apollo-server';
// import { newLink as Subscription } from './resolvers/Subscription.js';

// const pubsub = new PubSub()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolvers = {
  Query,
  Mutation,
  // Subscription,
  User,
  Link
}

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      // pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null
    };
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
