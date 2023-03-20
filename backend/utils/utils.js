import crypto from 'crypto';

const generateVerificationCode = (len) => {
  const code = crypto.randomBytes(len).toString('hex');
  return code;

};





export { generateVerificationCode  }
  
