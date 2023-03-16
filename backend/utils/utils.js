import crypto from 'crypto';

export const generateVerificationCode = () => {
  const code = crypto.randomBytes(3).toString('hex');
  return code;

};



export const saveVerificationCodeToDatabase = async (email, verificationCode) => {
    // your code to save the verification code to the database goes here
  };
  
