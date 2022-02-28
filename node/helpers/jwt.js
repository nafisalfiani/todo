const jwt = require('jsonwebtoken');
const SECRET_KEY = 'nafisalfiani';

function generateToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY);
    return token;
}

module.exports = generateToken;