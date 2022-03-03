const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'nafisalfiani';
const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(payload) {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: 1 * 60 });
    return token;
}

module.exports = generateToken;