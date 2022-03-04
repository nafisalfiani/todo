if (process.env.NODE_ENV === 'development') {
    require("dotenv").config()
}

// require.env.config();
 
const express = require('express');
const router = require('./routes');
const config = require('./config/config.js');
const app = express();

app.use(express.json());
app.use(router);

module.exports = app;
