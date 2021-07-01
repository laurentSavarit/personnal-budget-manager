require('dotenv').config();
const express = require('express');
const router = require("./app/router");
const app = express();
const expressSwagger = require("express-swagger-generator")(app);
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./app/graphql/typeDefs");
const resolvers = require("./app/graphql/resolvers");

//options for express swagger generator
const options = {
    swaggerDefinition: {
        info: {
            description: 'API REST for budget management',
            title: 'Personnal Budget Manager',
            version: '0.1.0',
        },
        host: 'localhost:3000',
        basePath: '/v0',
        produces: [
            "application/json",
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "this API works by jwt",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./app/**/*.js'] //Path to the API handle folder
};


// Provide resolver functions for your schema fields

const PORT = process.env.PORT || 5000;

const graphServer = new ApolloServer({typeDefs,resolvers});

expressSwagger(options);

app.use(cors());
app.use(express.json());
app.use("/v0",router);

app.listen(PORT, async () => {
    await graphServer.start();   
    graphServer.applyMiddleware({app, path:"/search"});
    console.log(`Express server GraphQL started on http://localhost:${PORT}${graphServer.graphqlPath}`);
    console.log(`Express server REST started on http://localhost:${PORT}`);
});