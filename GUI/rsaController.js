var crypto = require("crypto");
var path = require("path");
var fs = require("fs");

var generateRsaKeys = function() {

};

var encryptStringWithRsaPublicKey = function(toEncrypt) {
  var relativeOrAbsolutePathToPublicKey = "keys/pubkey.pem";
    var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
    var publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toEncrypt);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

var decryptStringWithRsaPrivateKey = function(toDecrypt) {
  var relativeOrAbsolutePathtoPrivateKey = "keys/privkey.pem";
    var absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
    var privateKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = new Buffer(toDecrypt, "base64");
    var decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};

module.exports = {
    encrypt: encryptStringWithRsaPublicKey,
    decrypt: decryptStringWithRsaPrivateKey
}
