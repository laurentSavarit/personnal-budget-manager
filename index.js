require('dotenv').config();
const express = require('express');
const router = require("./app/router");
const app = express();
const expressSwagger = require("express-swaggor-generator")(app);
const jwt = require("jsonwebtoken");
const cors = require("cors");

const options = {
    swaggerDefinition: {
        info: {
            description: 'API REST for budget management',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/v1",router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});