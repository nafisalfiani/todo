var aes256 = require('aes256');

var key = 'my passphrase';
var plaintext = 'my plaintext message';
var buffer = Buffer.from(plaintext);

var encryptedPlainText = aes256.encrypt(key, plaintext);
console.log(encryptedPlainText);

var decryptedPlainText = aes256.decrypt(key, encryptedPlainText);
console.log();
// plaintext === decryptedPlainText

// var encryptedBuffer = aes256.encrypt(key, buffer);
// var decryptedBuffer = aes256.decrypt(key, encryptedBuffer);
// plaintext === decryptedBuffer.toString('utf8)