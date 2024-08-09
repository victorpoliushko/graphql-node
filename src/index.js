const fs = require('fs');
const path = require('path');
const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require("@prisma/client")

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parents, args, context) => {
      return context.prisma.link.findMany()
    },
    link: (parent, args) => links.find(link => link.id === args.id)
  },
  Mutation: {
    post: (parents, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      });
      return newLink;
    },
    updateLink: (parent, args) => {
      let link = links.find(link => link.id === args.id);
      link.description = args.description;
      link.url = args.url;
      return link;
    },
    deleteLink: (parent, args) => {
      return links.filter(link => link.id === args.id);
    }
  },
}

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma,
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );

