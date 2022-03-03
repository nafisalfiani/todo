if (process.env.NODE_ENV === 'development') {
    require("dotenv").config()
}

// require.env.config();
 
const express = require('express');
const router = require('./routes');
const config = require('./config/config.js');
const port = 3000;
const app = express();

app.use(express.json());
app.use(router);

// app.listen(port, () => {
//     console.log(`Listening on ${port}`);
// });

module.exports = app;