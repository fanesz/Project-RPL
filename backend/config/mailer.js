import nodemailer from "nodemailer";

export default function sendMail(target, text, purpose){
  const email = 'ptayamku@gmail.com'
  const pass = 'minrrfpqbsfmenoa'
  const message = {
    from: "PT Ayamku "+email,
    to: target,
    subject: 'Password Reset Verification Code',
    html: ''
  }
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: email,
      pass: pass
    }
  });

  if(purpose === 'sendVerificationCode'){
    message.html = 
      `<table style="max-width: 600px; margin: 0 auto; font-family: 'Poppins', sans-serif;">
      <tr>
        <td style="background-color: #80e026; padding: 20px; text-align: center;">
          <h2>Password Reset Verification</h2>
        </td>
      </tr>
      <tr style="font-size: 1rem;">
        <td style="padding: 20px;">
          <p>Dear ${target.split('@')[0]},</p>
          <p>We have received a request to reset your password. Please click the button below to open password reset page.</p>
          <p>
            <a href="${text}" class="button" style="display: inline-block; padding: 10px 20px; background-color: #4caf50; color: #ffffff; text-decoration: none; border-radius: 4px;">Reset Password</a>
          </p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Thank you,</p>
          <p>PT Ayamku</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f5f5f5; padding: 20px; text-align: center;">
          <p style="font-size: 12px; color: #80e026;">If you want to cancel the reset pasword, just ignore this email and <a href="https://example.com/unsubscribe" style="color: #999999; text-decoration: underline;">login here</a>.</p>
        </td>
      </tr>
    </table>`;
  } else if (purpose === 'pesanan'){
    let produkList = '';
    let total = 0;

    for(let key in text[1]){
      produkList += `<tr><td>${text[1][key].namaProduk}</td> <td>${text[1][key].jumlah}</td> <td>${text[1][key].harga}</td></tr>`;
      total += text[1][key].harga * text[1][key].jumlah
    }



    console.log(text[1]);

    message.html = 
    `<table style="max-width: 600px; margin: 0 auto; font-family: 'Poppins', sans-serif;">
      <tr>
          <td style="background-color: #80e026; padding: 20px; text-align: center;">
              <h2>Order Reciept</h2>
          </td>
      </tr>
      <tr style="font-size: 1rem;">
          <td style="padding: 20px;">
              <p>Dear ${target.split('@')[0]},</p>
              <p>Pesanan <b>#${text[0]}</b> telah berhasil dikirim pada ${new Date()}.</p>
              <br>
              <p><b>RINCIAN PESANAN</b></p>
              <table class="transaction-details" style="font-family: sans-serif; margin-top: 2rem; border-collapse: collapse; width: 100%;">
                <tr style="border-bottom: 1px solid #333333;">
                    <td><b>Nama Produk</b></td>
                    <td><b>Jumlah</b></td>
                    <td><b>Harga</b></td>
                </tr>
                ${produkList}
              </table>
              <hr  style="margin-top: 1rem; border: none; border-top: 1px solid #333333;">
              <p><b>Total</b> : Rp ${total.toLocaleString('id-ID', { minimumFractionDigits: 0 })}</p>
              <hr  style="margin-top: 1rem; border: none; border-top: 1px solid #333333;">
              <p style="margin-top: 2rem;">Thank you for your trust at PT Ayamku.</p>
          </td>
          
      </tr>
      <tr>
        <td style="background-color: #f5f5f5; padding: 20px; text-align: center;">
          <p style="font-size: 12px; color: #80e026;">Check our <a href="http://localhost:3000/katalog" style="color: #999999; text-decoration: underline;">other product here</a>.</p>
        </td>
      </tr>
    </table>`;
  }


  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      return false;
    } else {
      console.log("Email sent to: ", target);
      return true;
    }
  });
}
