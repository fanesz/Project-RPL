import { Sequelize } from "sequelize";
import db from "../config/database.js";
import { generateVerificationCode } from "../utils/utils.js";
import sendMail from "../config/mailer.js"
const { DataTypes } = Sequelize;
 
const Akun = db.define('akun',{
    idAkun:{type: DataTypes.STRING,primaryKey: true,allowNull: false},
    email:{type: DataTypes.STRING,allowNull: false},
    password:{type: DataTypes.STRING,allowNull: false},
    akses:{type: DataTypes.STRING,allowNull: false},
    changepwCode:{type: DataTypes.STRING}
},{freezeTableName: true});

//models

export const getAllUserAccount = async (req, res) => {
    try {
        const akun = await Akun.findAll();
        res.json(akun);
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
}

export const getUserById = async (req, res) => {
  try {
      const akun = await Akun.findAll({
        where: { idAkun: req.params.id }
      });
      res.json(akun);
  } catch (error) {
      res.json({ message: error.message, status: false });
  }
}


export const loginAccount = async (req, res) => {
    try {
        const userPassword = await Akun.findAll({
          attributes: ['idAkun','password', 'akses'],
          where: {
            email: req.body.email
          }
        });
        if(userPassword.length == 0) {
            res.json({
                message: "Failed Login, Wrong Email!",
                status: false
            })
        } else if(userPassword[0].dataValues.password == req.body.password){
            res.json({
                sessionId: userPassword[0].dataValues.idAkun,
                message: "Successful Login",
                status: true,
                akses: userPassword[0].dataValues.akses
            })
        } else {
            res.json({
                message: "Failed Login, Wrong Password!",
                status: false,
            })
        }

    } catch (error) {
      res.json({ message: error.message });
    }
}

export const sendVerificationCode = async (req, res) => {
    try {
        const code = await Akun.findAll({
            attributes: ['email', 'changepwCode'],
            where: { email: req.body.email }
        });


        if(code.length == 0){
            res.json({
                message: "Email tidak terdaftar!",
                status: false
            });
        } else if(code[0].dataValues.changepwCode != null) {
            const changepwCode = generateVerificationCode(15);
            sendMail(req.body.email, `http://localhost:3000/akun/forgetpass/${changepwCode}`, 'sendVerificationCode');
            await Akun.update(
                { changepwCode: changepwCode },
                { where: { email: req.body.email } }
            );
            res.json({
                message: "Link ubah password baru sudah terkirim!",
                status: false
            });
        } else {
            const changepwCode = generateVerificationCode(15);
            sendMail(req.body.email, changepwCode);
            await Akun.update(
                { changepwCode: changepwCode },
                { where: { email: req.body.email } }
            );
            res.json({
                message: "Link ubah password terkirim!",
                status: true
            });
        }
    } catch (error) {
        res.json({
            message: "Error Occured!",
            status: false
        });
    }  
}

export const changePasswordPage = async (req, res) => {
    try {
        const result = await Akun.findAll({
            where: {
                changepwCode: req.params.id
            }
        });
        if (result.length != 0){
            res.json({
                message: "Verification Link Detected!",
                status: true,
            });
        }else {
            res.json({
                message: "Wrong Verification Link!",
                status: false,
            });
        }

    } catch (error) {
        res.json({
            message: "Not Found!",
            status: false
        });
    }
}

export const changePassword = async (req, res) => {
    try {
        const result = await Akun.update(
            { password: req.body.newPassword,
              changepwCode: null },
            { where: { changepwCode: req.body.id } }
        );
        if (result != null){
            res.json({
                message: "Password Changed!",
                status: true
            });
        } else {
            res.json({
                message: "Link Expired!",
                status: false
            });
        }

    } catch (error) {
        res.json({
            message: "Error Occured!",
            status: false
        });
    }
}


export const aksesChecker = async (req, res) => {
  const result = await Akun.findAll({
    where: { idAkun : req.params.id }
  });
  if(result.length != 0){
    res.json({
      akses: result[0].dataValues.akses,
    });
  }
}

 
export const updateAkun = async (req, res) => {
  try {
    await Akun.update({
      email: req.body.email,
      password: req.body.password,
      akses: req.body.akses,
      changepwCode: req.body.changepwCode,
    }, {
      where: {
        idAkun: req.params.id
      }
    });
    res.json({
      message: "Account Updated",
      status: true
    });
  } catch (error) {
    res.json({ message: error.message });
  }  
}

export const akunChecker = async (req, res) => {
  try {
    const isRegistered = await Akun.findAll({
      where: { idAkun: req.params.id }
    })
    res.json({
      message: "Account Updated",
      status: true
    });
  } catch (error) {
    res.json({ message: error.message });
  }  
}
