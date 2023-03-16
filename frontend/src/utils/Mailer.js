// const nodemailer = require('nodemailer');

// const email = 'ptayamkeren@gmail.com'
// const pass = 'kmdrmtkqvobqwvuw'
// // const target = 'pratama14.f@gmail.com'

// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     auth: {
//         user: email,
//         pass: pass
//     }
// });

// async function sendMail(target){
//     try {
//         await transporter.sendMail({
//           from: "PT Ayam Keren "+email,
//           to: 'pratama14.f@gmail.com',
//           subject: 'Password Reset Verification Code',
//           text: `Your verification code is: 123123`,
//         });
//         console.log('Verification code sent to '+target);
//         alert('Verification code sent to '+target);
//       } catch (err) {
//         console.error('Failed to send verification code', err);
//         alert('Failed to send verification code', err);
//       }
// }

// module.exports = { sendMail }
