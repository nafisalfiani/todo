const express = require('express');
const config = require('./config/config.json');
const app = express();

app.listen(config.development.port, () => {
    console.log(`Listening on ${config.development.port}`);
});