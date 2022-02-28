const aes256 = require('aes256');
const config = require('../config/config.json');
const key = config.development.encryption_key;

function encrypt(plaintext) {
    return encryptedPlainText = aes256.encrypt(key, plaintext);
}

function decrypt(encryptedText) {
    return decryptedPlainText = aes256.decrypt(key, encryptedText);
}
 
module.exports = {
    encrypt,
    decrypt
};