import express from "express";
import nodemailer from "nodemailer";
import { generateVerificationCode, saveVerificationCodeToDatabase } from "../utils/utils.js";

const verificationRoutes = express.Router();

let dataList = [];

verificationRoutes.get('/', function(req, res) {
    res.send(dataList)
})


verificationRoutes.post("/", (req, res) => {
  const target = req.body.email;
  dataList.push(target)

  const verificationCode = generateVerificationCode();
//   saveVerificationCodeToDatabase(email, verificationCode);

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
    text: `Your verification code is: ${verificationCode}`,
  };
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      res.status(500).json({ error: "Failed to send verification code" });
    } else {
        // console.log("Email sent:", info.response);
        console.log("Verification code sent to: ", target);
        res.status(200).json({ message: "Verification code sent" });
    }
  });
});

export default verificationRoutes;