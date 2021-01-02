import derp from 'derive-password-bytes';
import crypto from 'crypto';


 function keyss()  {
    return derp('Pas5pr@se', 's@1tValue', 2, 'MD5', 32);
  }

  function CipherClient(isCrypt){
    if (isCrypt) {
      return crypto.createCipheriv('aes256', keyss(), '@1B2c3D4e5F6g7H8');
    }
    else
      return crypto.createDecipheriv('aes256', keyss(), '@1B2c3D4e5F6g7H8');
  };
  export function  EnCrypt(password)  {
    var cipher = CipherClient(true);
    var crypt = cipher.update(password, 'ascii', 'base64')
    crypt += cipher.final('base64');
    return crypt;
  }
export  function  DeCrypt(base64String) {
    var decipher = CipherClient(false);
    var decoded = decipher.update(base64String,  'base64','ascii');
    decoded += decipher.final('ascii');
    return decoded;
};