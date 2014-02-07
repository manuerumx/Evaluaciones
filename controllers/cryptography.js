crypto = require('crypto');

function encrypt(text){
  var cipher = crypto.createCipher('aes-256-cbc','3V@lu@c10n3S')
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher('aes-256-cbc','3V@lu@c10n3S')
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;