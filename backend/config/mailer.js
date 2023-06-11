import express from "express";
import nodemailer from "nodemailer";


export default function sendMail(target, text){
  const email = 'ptayamkeren@gmail.com'
  const pass = 'kmdrmtkqvobqwvuw'
  
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
          user: email,
          pass: pass
      }
  });
    const message = {
      from: "PT Ayam Keren "+email,
      to: target,
      subject: 'Password Reset Verification Code',
      text: `Your verification code is: ${text}`,
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return false;
      } else {
        console.log("Verification code sent to: ", target);
        return true;
      }
    });
}
