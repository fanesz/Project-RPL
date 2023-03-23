import crypto from 'crypto';

const generateVerificationCode = (len) => {
  const code = crypto.randomBytes(len).toString('hex');
  return code;

};

const generateVerificationCode2 = (len=6, letter=false, num=true) => {
    if (num == false && letter == false || len < 1) {
      throw new Error("Invalid input parameters");
    }
    let chars = "";
    let code = "";
    if (num && letter) {
      chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    } else if (num) {
      chars = "0123456789";
    } else if (letter) {
      chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    for (let i = 0; i < len; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}




export { generateVerificationCode, generateVerificationCode2  }
  
