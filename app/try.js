
var rsa = require('./rsaController');

var c = rsa.encrypt("hola");
console.log(c);
var d = rsa.decrypt(c);
console.log(d);
