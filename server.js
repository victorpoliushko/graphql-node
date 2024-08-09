// var express = require("express")
// var { createHandler } = require("graphql-http/lib/use/express")
// var { buildSchema } = require("graphql")
// var { ruruHTML } = require("ruru/server")
 
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//     quoteOfTheDay: String
//     rollDice(numDice: Int!, numSides: Int = 6): [Int]
//     user(name: String): User
//     getDie(numSides: Int!): RandomDie
//     getMessage(id: ID!): Message
//     messages: [Message]
//   }

//   type User {
//     name: String
//     age: Int
//   }

//   type RandomDie {
//     roll(numRolls: Int!): [Int]
//     rollOnce: Int
//   }

//   input MessageInput {
//     content: String
//     author: String
//   }

//   type Mutation {
//     setMessage(message: String): String
//     createMessage(input: MessageInput): Message
//     updateMessage(id: ID!, input: MessageInput): Message
//   }

//   type Message {
//     id: ID!
//     content: String
//     author: String
//   }
// `)

// class Message {
//   constructor(id, { content, author }) {
//     this.id = id
//     this.content = content
//     this.author = author
//   }
// }

// class RandomDie {
//   constructor(numSides) {
//     this.numSides = numSides
//   }
 
//   rollOnce() {
//     return 1 + Math.floor(Math.random() * this.numSides)
//   }
 
//   roll({ numRolls }) {
//     var output = []
//     for (var i = 0; i < numRolls; i++) {
//       output.push(this.rollOnce())
//     }
//     return output
//   }
// }

// class User {
//   constructor(name) {
//     this.name = name
//   }

//   age() {
//     return Math.floor(Math.random() * 60);
//   }
// }

// const fakeDatabase = {};
 
// // The root provides a resolver function for each API endpoint
// var root = {
//   hello() {
//     return "Hello world!"
//   },
//   quoteOfTheDay() {
//     return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within"
//   },
//   rollDice: ({ numDice, numSides }) => {
//     var output = []
//     for (var i = 0; i < numDice; i++) {
//       output.push(1 + Math.floor(Math.random() * (numSides || 6)))
//     }
//     return output
//   },
//   user: (args) => new User(args.name),
//   getDie: ({ numSides }) => new RandomDie(numSides || 0),
//   setMessage: ({ message }) => {
//     fakeDatabase.message = message;
//     return message;
//   },
//   getMessage: ({ id }) => {
//     if (!fakeDatabase[id]) {
//       throw new Error("no message exists with id " + id)
//     }
//     return new Message(id, fakeDatabase[id])
//   },
//   createMessage({ input }) {
//     // Create a random id for our "database".
//     var id = require("crypto").randomBytes(10).toString("hex")
 
//     fakeDatabase[id] = input
//     return new Message(id, input)
//   },
//   updateMessage({ id, input }) {
//     if (!fakeDatabase[id]) {
//       throw new Error("no message exists with id " + id)
//     }
//     // This replaces all old data, but some apps might want partial update.
//     fakeDatabase[id] = input
//     return new Message(id, input)
//   },
//   messages() {
//     return Object.keys(fakeDatabase).map(key => new Message(key, fakeDatabase[key]));
//   }
// }

// var app = express()
 
// // Create and use the GraphQL handler.
// app.all(
//   "/graphql",
//   createHandler({
//     schema: schema,
//     rootValue: root
//   })
// )

// // Serve the GraphiQL IDE.
// app.get("/", (_req, res) => {
//     res.type("html")
//     res.end(ruruHTML({ endpoint: "/graphql" }))
// })
 
// // Start the server at port
// app.listen(4000)
// console.log("Running a GraphQL API server at http://localhost:4000/graphql")
