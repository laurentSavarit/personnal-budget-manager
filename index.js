require('dotenv').config();
const express = require('express');
const router = require("./app/router");
const app = express();
const expressSwagger = require("express-swagger-generator")(app);
const cors = require("cors");

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

const port = process.env.PORT || 5000;

expressSwagger(options);

app.use(cors());
app.use(express.json());
app.use("/v0",router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
