import crypto from 'crypto';
import { UUIDV4 } from 'sequelize';
import fs from "fs";

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

const generateUUID = () => {
    const uuid = UUIDV4;
    return uuid;
}

const saveImage = (base64Data, outputPath) => {
    const base64Image = base64Data.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');
  
    fs.writeFile('./gambar/'+outputPath, imageBuffer, (err) => {
      if (err) {
        console.error(err);
        return false;
      } else {
        return true;
    }
    });
};

const deleteImage = (file) => {
    const imagePath = `./gambar/${file}.png`;
    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Image file deleted:', imagePath);
        }
    });
}
function generateIdPesanan(currentId) {
    const maxId = 'PZZ9999999';
    if (currentId === maxId) {
      return 'Maximum ID reached';
    }
    const prefix = currentId.slice(0, 3);
    const numberPart = parseInt(currentId.slice(3), 10);
    if (numberPart === 9999999) {
      let nextPrefix = prefix;
      let newNumberPart = '0000001';
  
      if (prefix !== 'PZZ') {
        const nextCharCode = prefix.charCodeAt(2) + 1;
        nextPrefix = prefix.slice(0, 2) + String.fromCharCode(nextCharCode);
      } else {
        return 'Maximum ID reached';
      }
      return nextPrefix + newNumberPart;
    }
    const newNumberPart = (numberPart + 1).toString().padStart(7, '0');
    return prefix + newNumberPart;
}

const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(date);
  const day = date.getDate();
  return `${hour}:${minute}, ${day} ${month} ${date.getFullYear()}`;
};


export { 
    generateVerificationCode, 
    generateVerificationCode2, 
    generateUUID, 
    saveImage, 
    deleteImage,
    generateIdPesanan,
    convertTimestamp
}
  
