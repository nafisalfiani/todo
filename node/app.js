const express = require('express');
const router = require('./routes');
const config = require('./config/config.json');
const app = express();

app.use(express.json());
app.use(router);

app.listen(config.development.application_port, () => {
    console.log(`Listening on ${config.development.application_port}`);
});