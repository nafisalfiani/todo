const aes256 = require('aes256');
const config = require('../config/config.js');
// const key = config.development.encryption_key;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

function encrypt(plaintext) {
    return encryptedPlainText = aes256.encrypt(ENCRYPTION_KEY, plaintext);
}

function decrypt(encryptedText) {
    return decryptedPlainText = aes256.decrypt(ENCRYPTION_KEY, encryptedText);
}
 
module.exports = {
    encrypt,
    decrypt
};