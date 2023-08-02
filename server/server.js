// #####################################################################
// 
// 
//
// Clayton Skaggs July 2023
// 
// ---------------------------------------------------------------------

const { ApolloServer, gql } = require("@apollo/server");
const express = require("express");

const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { ApolloServerPluginLandingPageDisabled } = require('@apollo/server/plugin/disabled');

// import cors from 'cors';
const cors = require("cors");
const http = require('http');
// import cors from 'cors';
// const bodyParser = require("body-parser");
const bodyParser = require('body-parser');
// const { json } = require("json");
const path = require('path');
const helmet = require("helmet");

const { expressMiddleware } = require("@apollo/server/express4");

const mySQLport = process.env.mySQLport || 3001;
const graphQLport = process.env.PORT || 4001;

//* DB Connections
const db = require('./db/mongoConnection');


//* DB Schema / Seeds
const { typeDefs, resolvers } = require('./db/schemas');
// const seedAll = require('./db/seeds/index');


//* Create Base "App"
const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: 
    [ApolloServerPluginDrainHttpServer({ httpServer })]
    // [ApolloServerPluginLandingPageDisabled()],
});

var corsOptions = {
  origin: 'https://boardclubapp-production-api.up.railway.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//* Apply Configuration to App
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const server = new ApolloServer({ typeDefs, resolvers });

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 40,
});

app.use(limiter);

app.options('*', cors()) // include before other routes

//* Seed Function
async function seedServer() {

  try {
    await seedAll();
    console.log('\n\x1b[42m----- SEEDING COMPLETE/VALID -----\x1b[0m\n');
  } catch (error) {
    console.log('\n\x1b[41m----- SEEDING FAILED! -----\x1b[0m\n');
    console.log(error);
  }
}


//* Production Check
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

//Setup Home Page Link
// app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // console.log("\nPATH: " + path.join(__dirname, '../client/public/index.html'))
  // res.sendFile(path.join(__dirname, '../client/public/index.html'));
// });

console.log("\n\x1b[34mServer Import Complete \nStarting Connections...\x1b")


//* Starts all backend servers and DB connections
async function serverStart() {

  //* Start ApolloServer
  // await server.start()
  await server.start();

  //* Start GraphQLServer
  app.use(
    '/',
    cors(corsOptions),
    // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
    bodyParser.json({ limit: '50mb' }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
    helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net", "unpkg.com"],
    },
    }),
  );

  // await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  // await console.log(`🚀 Server ready at http://localhost:4000/`);

  //* Apollo Middleware Insert
  // app.use('/graphql', cors(), json(), expressMiddleware(server));
  
  // await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  // console.log("🚀 Server ready at http://localhost:4000/");

  //* Apollo Middleware Insert
  // server.applyMiddleware({ app });

  //* Start mongoDB Connection
  db.once('open', () => {


    // * Start SQL Connection
    // sequelize.sync({ force: false }).then(() => {
      // app.listen(mySQLport, () => {
        console.log("\n~~~       Server Status       ~~~")
        console.log('~~~ MongoDB Database [' + "\x1b[32mOnline\x1b[0m" + '] ~~~')
        // console.log('~~~ SQL Database     [' + "\x1b[32mOnline\x1b[0m" + '] ~~~')
        // console.log('\x1b[30m~~~ SQL Connection Valid [' + mySQLport + '] ~~~\x1b[0m\n')

    // * Start GraphQL Server
        app.listen(graphQLport, () => {
          console.log(`~~~ GraphQL API      [` + "\x1b[32mOnline\x1b[0m" + `] ~~~ \n\n\x1b[33m`);
          // console.log(`API Live:\x1b[0m http://localhost:${graphQLport}${server.graphqlPath}\n\n`);
          console.log(`API Live:\x1b[0m http://localhost:${graphQLport}`);

          //  ! Seed SWITCH
          // seedServer();

        })
      // });
    // });

  })
}



//* ========== Main ===========

// * Main Server Call
console.log("\n\x1b[34mStart Server...\x1b[0m")
serverStart();
console.log("\x1b[33mServer Start Complete!\x1b[0m")
//* ========== EOM ===========

// console.log("\n\x1b[32m=======================\x1b")
// console.log("\x1b[32m= ~~~ CLEAN EXIT! ~~~ =\x1b")
// console.log("\x1b[32m=======================\x1b\n")
